import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0 ">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <div className="flex-grow overflow-y-auto">
            <Header />
            <div className="p-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
