import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Application = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <Sidebar />
        <div className="flex-grow transition-all">
          <Header />
        </div>
      </div>
    </div>
  );
};

export default Application;
