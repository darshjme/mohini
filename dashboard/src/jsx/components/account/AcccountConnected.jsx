import { Fragment } from "react";
import { IMAGES } from "../../constant/theme";
import { Link } from "react-router-dom";

function AccountConnected() {
    return (
        <Fragment>            
            <div className="card">
                <div className="card-header">
                    <div className="clearfix">
                        <h4 className="card-title mb-0">Connected Accounts</h4>
                    </div>
                </div>
                <div className="card-body">
                    <div className="alert alert-primary border-primary outline-dashed py-3 px-3 mt-1 mb-3 mb-0 text-dark d-flex">
                        <div className="clearfix">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M27.75 12C29.8211 12 31.5 10.3211 31.5 8.25C31.5 6.17893 29.8211 4.5 27.75 4.5C25.6789 4.5 24 6.17893 24 8.25C24 10.3211 25.6789 12 27.75 12ZM27.75 31.5C29.8211 31.5 31.5 29.8211 31.5 27.75C31.5 25.6789 29.8211 24 27.75 24C25.6789 24 24 25.6789 24 27.75C24 29.8211 25.6789 31.5 27.75 31.5ZM12 27.75C12 29.8211 10.3211 31.5 8.25 31.5C6.17893 31.5 4.5 29.8211 4.5 27.75C4.5 25.6789 6.17893 24 8.25 24C10.3211 24 12 25.6789 12 27.75Z" fill="var(--primary)" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.25 12C10.3211 12 12 10.3211 12 8.25C12 6.17893 10.3211 4.5 8.25 4.5C6.17893 4.5 4.5 6.17893 4.5 8.25C4.5 10.3211 6.17893 12 8.25 12ZM15 7C15 6.44772 15.4477 6 16 6H20C20.5523 6 21 6.44772 21 7V8C21 8.55229 20.5523 9 20 9H16C15.4477 9 15 8.55229 15 8V7ZM16 27C15.4477 27 15 27.4477 15 28V29C15 29.5523 15.4477 30 16 30H20C20.5523 30 21 29.5523 21 29V28C21 27.4477 20.5523 27 20 27H16ZM6 16C6 15.4477 6.44772 15 7 15H8C8.55229 15 9 15.4477 9 16V20C9 20.5523 8.55229 21 8 21H7C6.44772 21 6 20.5523 6 20V16ZM28 15C27.4477 15 27 15.4477 27 16V20C27 20.5523 27.4477 21 28 21H29C29.5523 21 30 20.5523 30 20V16C30 15.4477 29.5523 15 29 15H28Z" fill="var(--primary)" />
                            </svg>
                        </div>
                        <div className="mx-3">
                            Two-factor authentication adds an extra layer of security to your account. To log in, in you'll need to provide a 4 digit amazing code <Link to={"#"} className="text-primary">Learn More</Link>
                        </div>                                
                    </div>
                    <div className="d-flex align-items-center border-bottom border-light py-3">
                        <div className="avatar avatar-md rounded d-flex align-items-center justify-content-center bg-white" >
                            <img src={IMAGES.google} alt="google" />
                        </div>
                        <div className="clearfix ms-2">
                            <h6 className="fs-14 mb-0 fw-semibold">Google</h6>
                            <span className="fs-13">Plan properly your workflow</span>
                        </div>
                        <div className="clearfix ms-auto">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchGoogle" defaultChecked />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center border-bottom border-light py-3">
                        <div className="avatar avatar-md rounded d-flex align-items-center justify-content-center bg-white">
                            <img src={IMAGES.github} alt="git" />
                        </div>
                        <div className="clearfix ms-2">
                            <h6 className="fs-14 mb-0 fw-semibold">Github</h6>
                            <span className="fs-13">Keep eye on on your Repositories</span>
                        </div>
                        <div className="clearfix ms-auto">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchGithub" defaultChecked />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center py-3">
                        <div className="avatar avatar-md d-flex align-items-center justify-content-center bg-white">
                            <img src={IMAGES.slack} alt="slack" />
                        </div>
                        <div className="clearfix ms-2">
                            <h6 className="fs-14 mb-0 fw-semibold">Slack</h6>
                            <span className="fs-13">Integrate Projects Discussions</span>
                        </div>
                        <div className="clearfix ms-auto">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchSlack" />
                            </div>
                        </div>
                    </div>                            
                </div>
                <div className="card-footer text-end">
                    <Link to={"#"} className="btn btn-white">Discard</Link>
                    <Link to={"#"} className="btn btn-primary ms-2 mb-2">Save Changes</Link>
                </div>                       
            </div>  
        </Fragment >
    )
}
export default AccountConnected;