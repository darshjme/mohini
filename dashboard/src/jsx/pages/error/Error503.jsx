import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";

function Error503() {
   return (
      <div className="fix-wrapper" id="app-banner" style={{backgroundImage: `url(${IMAGES.bg1})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
      <div className="container">
          <div className="row justify-content-center h-100 align-items-center">
              <div className="inner-content col-xl-12 text-center">
             <h1 className="error-head">503</h1>
             <h3 className="error-para">Service Unavailable</h3>
             <p>Sorry.😭 We are under maintenance!</p>
             <Link to="/" className="btn btn-secondary btn-hover-1"><span>Back to Home</span></Link>
          </div>
          </div>
      </div>
  </div>
   );
};

export default Error503;
