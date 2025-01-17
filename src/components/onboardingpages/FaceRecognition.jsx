import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Select from 'react-select';
import face from "../../assets/img/svg/faceid.svg";
import logo from "../../assets/img/svg/logo.svg";
import { Camera } from 'lucide-react';
import * as faceapi from 'face-api.js';

// Importing required dependencies
import { AzureKeyCredential } from '@azure/core-auth';
import createFaceClient, {
  isUnexpected,
} from '@azure-rest/ai-vision-face';

// Setting up


const API_BASE_URL = 'https://onboarding-api.bdudcloud.com';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaWdieXRlOTA3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJfaWQiOiI2MTM5NmE0MC1lMzA4LTRiYzYtOTFhOS0zOGViMDBiYjZjYjIiLCJleHAiOjE3MzY4MDc0MTksInR5cGUiOiJhY2Nlc3MiLCJqdGkiOiJqY2p3NndrVjNxeDlVSWpQb0R1NHBqaEJGbVpSMnFSaWlOWlpzNDVrUDFzIn0.i429ahrSCyC7KV7eZnlZXlTTlUj9Q1KENmRb7-Sa2pg'

const endpoint = 'https://ai-engineers.cognitiveservices.azure.com/';
const apikey = "SaksPOsEnXoYLWLqdLFFfoi37A6FfoTr3mH8GtlbAmuKu46gIu0pJQQJ99ALACYeBjFXJ3w3AAAKACOGWRdl";
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);

function FaceRecognition({ setTab }) {
  const [sessionId, setSessionId] = useState(null);
  const [authtoken, setAuthToken] = useState(null);

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [deviceId] = useState(crypto.randomUUID()); // Generate once when component mounts
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const checkInterval = useRef(null);

  useEffect(() => {
    // Remove separator from react-select
    const elements = document.getElementsByClassName('css-1u9des2-indicatorSeparator');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }, []);

  const countryOptions = [
    {
      value: "English",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex">
          English
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="English"
            style={{ width: 17, height: 17, marginLeft: 10 }}
            className="rounded-full"
          />
        </div>
      ),
    },
    {
      value: "French",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex">
          French
          <img
            src="https://flagcdn.com/w40/fr.png"
            alt="French"
            className="rounded-full"
            style={{ width: 17, height: 17, marginLeft: 10 }}
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      color: "#374151",
      border: state.isFocused ? "1px solid #9ca3af" : "1px solid #e5e7eb",
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: "0.5rem",
      height: "33px",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      zIndex: 5,
      height: "250px",
      overflowY: "scroll",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "transparent",
      color: "#374151",
      padding: "5px 5px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
    }),
  };

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Failed to access camera');
      console.error(err);
    }
  };

  const createSession = async () => {
    try {
      setStatus('starting');
      
      const url = new URL(`${API_BASE_URL}/onboarding/live-check-session`);
      url.searchParams.append('device_id', deviceId);
      url.searchParams.append('live_mode', 'Passive');

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create session');
      }
      
      const data = await response.json();
      console.log("connected",data)
      setSessionId(data.sessionId);
      setAuthToken(data.authToken)
      await initializeCamera();
      setStatus('ready');
      
      // Start polling for results once session is created
      startPolling(data.sessionId);
    } catch (err) {
      setError(err.message);
      setStatus('error');
      console.error(err);
    }
  };

  const startPolling = (sid) => {
    checkInterval.current = setInterval(async () => {
      try {
        const result = await checkLivenessResult(sid);
        if (result.status === 'Completed') {
          clearInterval(checkInterval.current);
          setStatus(result.result?.liveness_decision === 'realface' ? 'success' : 'failed');
        }
      } catch (err) {
        clearInterval(checkInterval.current);
        setError('Failed to get liveness result');
        setStatus('error');
      }
    }, 2000); // Poll every 2 seconds
  };

  const checkLivenessResult = async (sid) => {
    const response = await fetch(`${API_BASE_URL}/onboarding/live-check-result/${sid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get liveness result');
    }

    return await response.json();
  };

  const performLivenessCheck = async () => {
  try {
    setStatus("checking");

    // Capture image from video stream
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    // Convert canvas to a blob
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.95)
    );

    // Convert blob to binary data (Uint8Array)
    const arrayBuffer = await blob.arrayBuffer();
    const binaryData = new Uint8Array(arrayBuffer);

    console.log("Captured Binary Data: ", binaryData);

    // Submit captured binary data to Azure's Face Liveness API
    const livenessCheckResponse = await client
      .path(`/detectLiveness/singleModal/sessions/${sessionId}/media`)
      .post({
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: binaryData,
      });

    // Check if the request was successful
    if (isUnexpected(livenessCheckResponse)) {
      console.log(livenessCheckResponse)
      throw new Error(livenessCheckResponse.body.error.message);
    }

    // Handle a successful response
    console.log("Azure Liveness Response: ", livenessCheckResponse.body);
    setStatus("success");
    return livenessCheckResponse.body;

  } catch (err) {
    setStatus("error");
    setError("Failed to perform liveness check");
    console.error("Liveness Check Error: ", err);
    throw err;
  }
};

  const cleanup = async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (checkInterval.current) {
      clearInterval(checkInterval.current);
    }
    if (sessionId) {
      try {
        await fetch(`${API_BASE_URL}/onboarding/live-check-session/${sessionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
          },
        });
      } catch (err) {
        console.error('Failed to delete session:', err);
      }
    }
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  const resetCheck = async () => {
    await cleanup();
    setStatus('idle');
    setError(null);
    setSessionId(null);
  };

  return (
    <div className="w-full h-full justify-center items-center overflow-y-scroll">
      <div className="w-full flex justify-center items-center mt-11 pb-10 pt-3 max-sm:px-4 max-xs:px-3">
        <div className="md:w-[50%] sm:w-[65%] xs:w-[80%] w-[96%] border pb-8 pt-3 max-md:px-3 md:px-5 rounded-lg shadow bg-[#FBFBFB59]">
          <div className="w-full flex justify-end px-4 mb-4">
            <div>
              <Select
                options={countryOptions}
                placeholder="Choose a country"
                styles={customStyles}
                defaultValue={countryOptions[0]}
              />
            </div>
          </div>
          
          <div className="w-full flex justify-center items-center flex-col mb-4">
            <img src={logo} className="mb-2" alt="logo" />
            <h4 className="font-poppins font-semibold text-xl mb-1">
              Face ID Verification
            </h4>
          </div>

          <div className="w-full my-8 flex justify-center items-center">
            <div className="p-4 rounded-full bg-[#F5E4FF] w-fit">
              <img src={face} alt="face verification icon" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[90%] flex flex-col text-center justify-center items-center">
              <div className="text-slate-900 font-semibold w-full">
                Verify Your Identity with Onboard
              </div>
              <div className="text-slate-600 w-full">
                Scan your face within to verify your Identity.
              </div>
            </div>

            {status === 'idle' && (
              <button
                onClick={createSession}
                className="bg-gradient-to-r mt-6 from-[#8600D9EB] to-[#470073EB] w-[90%] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 font-semibold text-center justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          <div className="w-full max-w-md mx-auto p-4">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-lg">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {status === 'idle' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {status === 'checking' && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {status === 'ready' && (
                <button
                  onClick={performLivenessCheck}
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                >
                  Perform Check
                </button>
              )}

              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Liveness check passed successfully!
                </div>
              )}
              
              {status === 'failed' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  Liveness check failed. Please try again.
                </div>
              )}

              {(status === 'success' || status === 'failed' || status === 'error') && (
                <button
                  onClick={resetCheck}
                  className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

FaceRecognition.propTypes = {
  setTab: PropTypes.func
};

export default FaceRecognition;