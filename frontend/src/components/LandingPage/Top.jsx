import React from "react";

const Top = () => {
  return (
    <div className="flex flex-col items-center py-16 text-xl text-[#8590AA]">
      <div className="flex items-center w-full justify-between px-38">
        <hr className="flex-1 border-[#8590AA] h-0.5 mt-2" />
        <p className="text-[#8590AA] mx-8 text-2xl">Top companies hiring now</p>
        <hr className="flex-1 border-[#8590AA] h-0.5 mt-2" />
      </div>
      <div className="flex justify-center gap-16 mt-10">
        <img src="/path-to/google-logo.png" alt="Google" className="h-16" />
        <img
          src="/path-to/microsoft-logo.png"
          alt="Microsoft"
          className="h-16"
        />
        <img src="/path-to/flipkart-logo.png" alt="Flipkart" className="h-16" />
        <img src="/path-to/youtube-logo.png" alt="YouTube" className="h-16" />
        <img src="/path-to/ibm-logo.png" alt="IBM" className="h-16" />
      </div>
    </div>
  );
};

export default Top;
