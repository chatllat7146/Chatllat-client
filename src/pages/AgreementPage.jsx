import React from "react";
import Aside from "../components/Aside";
import BasicTabs from "../components/TabPanel";
import "../styles/style.min.css";

const AgreementPage = () => {
  return (
    <>  
      {/* Main Content (Locked behind modal) */}
      <div className="wrapper">
        <main className="main">
          <Aside />
          <BasicTabs />
        </main>
      </div>
    </>
  );
};

export default AgreementPage;
