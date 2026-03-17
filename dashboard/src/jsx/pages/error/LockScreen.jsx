import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../../../assets/images/logo-full.png";
import logo2 from "../../../assets/images/logo-full-white.png";
import pic1 from "../../../assets/images/pic1.svg";

const LockScreen = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  const [openEyes, setOpenEyes] = useState(true);

  return (
    <>
      <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="login-aside text-center  d-flex flex-column flex-row-auto">
          <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
            <div className="text-center mb-4 pt-5">
              <Link to="/"><img src={logo} className="dark-login" alt="" /></Link>
              <Link to="/"><img src={logo2} className="light-login" alt="" /></Link>
            </div>
            <h3 className="mb-2">Welcome back!</h3>
            <p>User Experience & Interface Design <br />Strategy SaaS Solutions</p>
          </div>
          <div className="aside-image" style={{ backgroundImage: `url(${pic1})` }}></div>
        </div>
        <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
          <div className="d-flex justify-content-center h-100 align-items-center">
            <div className="authincation-content style-2">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h4 className="text-center mb-4">Account Locked</h4>
                    <form onSubmit={(e) => submitHandler(e)}>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="position-relative">
                          <input  type={openEyes ? "password" : "value"} className="form-control" defaultValue="123456" />
                          <span className={`show-pass eye ${openEyes ? '' : 'active'}`} onClick={() => setOpenEyes(!openEyes)}>
                            <i className="fa fa-eye-slash" />
                            <i className="fa fa-eye" />
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block">Unlock</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LockScreen;
