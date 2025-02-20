import React from 'react';

const IdCardContent = ({ cardData }) => {
  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b border-gray-100 ">
      <span className="text-gray-500 text-sm">{label}:</span>
      <span className="font-medium text-sm">{value || "N/A"}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg w-96 h-[700px] mt-20 overflow-scroll  p-4">
      <h4 className="font-semibold mb-4 text-sm text-start">Card Information</h4>
      <hr className="w-full bg-gray-300 text-gray-300 shadow my-2" />

      <InfoRow label="First Name" value={cardData?.first_name?.content} />
      <InfoRow label="Middle Name" value={cardData?.middle_name?.content} />
      <InfoRow label="Last Name" value={cardData?.last_name?.content} />
      <InfoRow label="Date of Birth" value={cardData?.date_of_birth?.content} />
      <InfoRow label="Gender" value={cardData?.gender?.content} />
      <InfoRow label="ID Number" value={cardData?.id_number?.content} />
      <InfoRow label="Document Type" value={cardData?.document_type} />
      <InfoRow label="Document Number" value={cardData?.document_number?.content} />
      <InfoRow label="Date of Issue" value={cardData?.date_of_issue?.content} />
      <InfoRow label="Date of Expiry" value={cardData?.date_of_expiry?.content} />
      <InfoRow label="Nationality" value={cardData?.nationality?.content} />
      <InfoRow label="State" value={cardData?.state?.content} />
      <InfoRow label="Country" value={cardData?.country?.content} />
      <InfoRow label="Decision" value={cardData?.decision} />
      <InfoRow label="Age" value={cardData?.age} />

      {/* Image Section */}
      <h4 className="font-semibold mt-4 text-sm text-start">Uploaded Images</h4>
      <hr className="w-full bg-gray-300 text-gray-300 shadow my-2" />
      <div className="flex flex-col space-y-20 mb-10">
        {cardData?.urls?.map((url, index) => (
            <div className='h-44 '>
          <img
            key={index}
            src={url}
            alt={`Document ${index + 1}`}
            className="w-full h-gull  object-cover rounded-lg shadow-sm"
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdCardContent;
