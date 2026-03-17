import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";

function Error404() {
   return (
      <div className="fix-wrapper" id="app-banner" style={{backgroundImage: `url(${IMAGES.bg1})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
      <div className="container">
          <div className="row justify-content-center h-100 align-items-center">
              <div className="inner-content col-xl-12 text-center">
             <h1 className="error-head">404</h1>
             <h3 className="error-para">The page you were looking for is not found!</h3>
             <p>You 😭 may have mistyped the address or the page may have moved.</p>
             <Link to="/" className="btn btn-secondary btn-hover-1"><span>Back to Home</span></Link>
          </div>
          </div>
      </div>
  </div>
   );
};

export default Error404;
