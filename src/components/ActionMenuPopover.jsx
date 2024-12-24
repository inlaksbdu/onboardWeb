import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Action Menu Popover Component
const ActionMenuPopover = ({ children, content }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverHovered, setIsPopoverHovered] = useState(false);

  return (
    <Popover
      isOpen={isPopoverVisible}
      positions={['right', 'left']}
      padding={0.5}
      onClickOutside={() => setIsPopoverVisible(false)}
      
    >
      <span
        className="cursor-pointer text-2xl text-slate-600"
        onMouseEnter={() => {
          setIsHovered(true);
          setIsPopoverVisible(true);
        }}
        onMouseLeave={() => {
          if (!isPopoverHovered) {
            setIsPopoverVisible(false);
          }
          setIsHovered(false);
        }}
      >
        {children}
      </span>
    </Popover>
  );
};

// Details Popover Component
const DetailsPopover = ({ profileImage, clientData }) => {
  const [isDetailsPopoverVisible, setIsDetailsPopoverVisible] = useState(false);

  return (
    <Popover
      isOpen={isDetailsPopoverVisible}
      positions={['left', 'right', 'top', 'bottom']}
      padding={10}
      onClickOutside={() => setIsDetailsPopoverVisible(false)}
      containerStyle={{zIndex:200}}
      content={
        <div className="bg-white w-[350px] z-40 py-2 rounded-md shadow-md h-screen overflow-y-scroll">
          <div className="flex items-center flex-col hover:bg-[#EEEEEE] rounded-md py-2 cursor-pointer">
            <div className="w-full flex px-4">
              <div className="w-[10%]">
                <FontAwesomeIcon icon={faTimesCircle} className="mr-1" />
              </div>
              <div className="text-md text-slate-700 text-center w-[90%]">
                View details
              </div>
            </div>

            <hr className="bg-[#3333332E] my-3 w-full" />
            
            {/* Client Profile Section */}
            <div className="flex flex-row justify-between w-full px-3 items-center">
              <img src={profileImage} className="w-10 h-10 rounded-md" alt="Profile" />
              <div>
                <span className="text-slate-600 text-sm">
                  Onboarding Status:
                  <span className="bg-[#5AD0000D] bg-opacity-30 text-[#02B62F] mx-2 font-medium rounded-lg p-2">
                    {clientData.status}
                  </span>
                </span>
              </div>
            </div>

            {/* Client Information Section */}
            <ClientInfoSection data={clientData} />
            
            {/* Onboarding Information Section */}
            <OnboardingInfoSection data={clientData} />
            
            {/* Document Information Section */}
            <DocumentInfoSection data={clientData} />
          </div>
        </div>
      }
    >
      <div
        onClick={() => setIsDetailsPopoverVisible(true)}
        className="flex items-center hover:scale-105 cursor-pointer"
      >
        ...
      </div>
    </Popover>
  );
};

// Helper Components for Details Sections
const InfoRow = ({ label, value }) => (
  <div className="flex flex-row justify-between w-full mb-3">
    <span className="text-slate-600 text-start">{label}:</span>
    <span className="text-end">{value}</span>
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="w-full px-3 my-4">
    <span className="font-semibold text-sm text-slate-800">{title}</span>
  </div>
);

const ClientInfoSection = ({ data }) => (
  <>
    <SectionTitle title="Client Information" />
    <div className="w-full flex flex-col px-3 mb-5 text-sm">
      <InfoRow label="First name" value={data.firstName} />
      <InfoRow label="Last name" value={data.lastName} />
      <InfoRow label="Date of birth" value={data.dateOfBirth} />
      <InfoRow label="Phone number" value={data.phoneNumber} />
      <InfoRow label="Address" value={data.address} />
      <InfoRow label="Nationality" value={data.nationality} />
      <InfoRow label="Gender" value={data.gender} />
    </div>
  </>
);

const OnboardingInfoSection = ({ data }) => (
  <>
    <hr className="bg-[#3333332E] h-1 w-full" />
    <SectionTitle title="Onboarding Information" />
    <div className="w-full flex flex-col px-3 mb-5 text-sm">
      <InfoRow label="Date of onboarding" value={data.onboardingDate} />
      <InfoRow label="Profile type" value={data.profileType} />
      <InfoRow label="Onboarding status" value={data.status} />
    </div>
  </>
);

const DocumentInfoSection = ({ data }) => (
  <>
    <hr className="bg-[#3333332E] h-1 w-full" />
    <SectionTitle title="Document Information" />
    <div className="w-full flex flex-col px-3 mb-5 text-sm">
      <InfoRow label="Document type" value={data.documentType} />
      <InfoRow label="ID card issue date" value={data.idCardIssueDate} />
      <InfoRow label="Place of Birth" value={data.placeOfBirth} />
      <InfoRow label="ID card expiry date" value={data.idCardExpiryDate} />
    </div>
  </>
);

export { ActionMenuPopover, DetailsPopover };