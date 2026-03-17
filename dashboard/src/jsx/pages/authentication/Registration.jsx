import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import {
  loadingToggleAction,
  signupAction,
} from '../../../store/actions/AuthActions';
// image
import logo from "../../../assets/images/logo-full.png";
import logo2 from "../../../assets/images/logo-full-white.png";
import pic1 from "../../../assets/images/pic1.svg";

function Register(props) {
  const [openEyes, setOpenEyes] = useState(true);
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
      swal('Oops', errorObj.email, "error");
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
      swal('Oops', errorObj.password, "error");
    }
    setErrors(errorObj);
    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(email, password, props.history));
  }
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
                    <h4 className="text-center mb-4">Sign up your account</h4>
                    {props.errorMessage && (
                      <div className=''>
                        {props.errorMessage}
                      </div>
                    )}
                    {props.successMessage && (
                      <div className=''>
                        {props.successMessage}
                      </div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="mb-3">
                        <label className="mb-1 form-label">Username</label>
                        <input type="text" className="form-control" placeholder="username" />
                      </div>

                      <div className="mb-3">
                        <label className="mb-1 form-label">Email</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email" className="form-control" placeholder="hello@example.com" />
                        {errors.email && <div>{errors.email}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="mb-1 form-label">Password</label>
                        <div className="position-relative">
                          <input
                            value={password}
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }
                            placeholder="Password"
                            type={openEyes ? "password" : "value"} id="ic-password" className="form-control" />
                          {errors.password && <div>{errors.password}</div>}
                          <span className={`show-pass eye ${openEyes ? '' : 'active'}`} onClick={() => setOpenEyes(!openEyes)}>
                            <i className="fa fa-eye-slash" />
                            <i className="fa fa-eye" />
                          </span>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button type="submit" to="/" className="btn btn-primary btn-block">Sign me up</button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p>Already have an account? <Link className="text-primary" to="/page-login">Sign in</Link></p>
                    </div>
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

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register);

