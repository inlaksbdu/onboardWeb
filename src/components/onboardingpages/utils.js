// Utility functions for liveness check API interactions

const API_BASE_URL = '/onboarding';

/**
 * Generates a device ID using available device information or random UUID
 * @returns {Promise<string>} A UUID formatted device ID
 */
export const generateDeviceId = async () => {
  try {
    let deviceId = (await navigator.mediaDevices.enumerateDevices()).find(
      (device) => device.deviceId !== ""
    )?.deviceId;

    if (deviceId) {
      // Convert base64 device ID to hex if needed
      deviceId = deviceId.endsWith("=")
        ? Array.from(atob(deviceId), (char) =>
            ("0" + char.charCodeAt(0).toString(16)).slice(-2)
          ).join("")
        : deviceId;
    } else {
      // Fallback to random UUID if no device ID available
      deviceId = crypto.randomUUID().replace(/-/g, "") || "0".repeat(64);
    }

    // Ensure consistent length and format
    deviceId = "0".repeat(64 - deviceId.length) + deviceId;
    deviceId = (
      BigInt("0x" + deviceId.substring(0, 32)) ^
      BigInt("0x" + deviceId.substring(32, 64))
    )
      .toString(16)
      .substring(0, 32);
    
    // Format as UUID
    deviceId = ("0".repeat(32 - deviceId.length) + deviceId)
      .match(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/)
      ?.slice(1)
      .join("-") || "";

    return deviceId;
  } catch (error) {
    console.error('Error generating device ID:', error);
    throw error;
  }
};

/**
 * Creates a new liveness check session
 * @param {string} livenessOperationMode - "Passive" or "PassiveActive"
 * @returns {Promise<{sessionId: string, authToken: string}>}
 */
export const createLivenessSession = async (livenessOperationMode = 'Passive') => {
  try {
    const deviceId = await generateDeviceId();
    const response = await fetch(`${API_BASE_URL}/live-check-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_id: deviceId,
        live_mode: livenessOperationMode
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail?.[0]?.msg || 'Failed to create liveness session');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating liveness session:', error);
    throw error;
  }
};

/**
 * Fetches the result of a liveness check session
 * @param {string} sessionId - The ID of the session to check
 * @returns {Promise<Object>} The session result
 */
export const getLivenessResult = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/live-check-result/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail?.[0]?.msg || 'Failed to get liveness result');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting liveness result:', error);
    throw error;
  }
};

/**
 * Deletes a liveness check session
 * @param {string} sessionId - The ID of the session to delete
 * @returns {Promise<void>}
 */
export const deleteLivenessSession = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/live-check-session/${sessionId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail?.[0]?.msg || 'Failed to delete liveness session');
    }
  } catch (error) {
    console.error('Error deleting liveness session:', error);
    throw error;
  }
};

/**
 * Main function to handle the liveness check flow
 * @param {string} livenessOperationMode - "Passive" or "PassiveActive"
 * @param {Function} setToken - Callback to set the auth token
 * @param {Function} setLoadingToken - Callback to set loading state
 * @param {Function} setErrorMessage - Callback to set error message
 */
export const handleLivenessCheck = async (
  livenessOperationMode,
  setToken,
  setLoadingToken,
  setErrorMessage
) => {
  try {
    setLoadingToken?.(true);
    
    // Create new session
    const { sessionId, authToken } = await createLivenessSession(livenessOperationMode);
    setToken(authToken);
    
    // Poll for results (example implementation)
    const pollResult = async () => {
      const result = await getLivenessResult(sessionId);
      if (result.status === 'Completed') {
        // Clean up the session once we're done
        await deleteLivenessSession(sessionId);
        return result;
      }
      // If not completed, wait and try again
      return new Promise(resolve => {
        setTimeout(() => resolve(pollResult()), 2000);
      });
    };

    // Start polling for results
    return pollResult();
  } catch (error) {
    setErrorMessage?.(error.message);
    throw error;
  } finally {
    setLoadingToken?.(false);
  }
};