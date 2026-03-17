import { Fragment } from "react";
 import { Link } from "react-router-dom";
import AccountDefaultCard from "../../components/account/AccountDefaultCard";
import BasicForm from "../../components/account/BasicForm";
import AccountConnected from "../../components/account/AcccountConnected";
import { SVGICON } from "../../constant/theme";
import { notificationBlog } from "../../constant/alldata";

function AccountSettings() {
    return (
        <Fragment>
             <div className="card profile-overview">
                <AccountDefaultCard activePage={'settings'} />
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Basic Info</h6>
                            </div>
                            <div className="card-body">
                                <BasicForm />
                            </div>
                            <div className="card-footer text-end">
                                <Link to={"#"} className="btn btn-white">Discard</Link>
                                <Link to={"#"} className="btn btn-primary ms-2 mb-2">Save Changes</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="row">
                            <div className="col-12">
                                <AccountConnected />  
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="heading mb-0">Notifications</h4>
                                    </div>
                                    <div className="card-body py-3">
                                        <form className="mt-2">
                                            {notificationBlog.map((ele, ind)=>(
                                                <div className="clearfix border-bottom border-light py-3" key={ind}>
                                                    <div className="row align-items-center">
                                                        <div className="col-sm-6">
                                                            <label className="form-label mb-md-0">{ele.title}</label>
                                                        </div>
                                                        <div className="col-sm-3 col-6">
                                                            <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                                                                <input type="checkbox" className="form-check-input mb-0" id={`checkboxinp${ele.inputid}`} required=""/>
                                                                <label className="form-check-label mb-0" htmlFor={`checkboxinp${ele.inputid}`}>Email</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3 col-6">
                                                            <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                                                                <input type="checkbox" className="form-check-input mb-0" id={`checkboxsecond${ele.inputid}`} required=""/>
                                                                <label className="form-check-label mb-0" htmlFor={`checkboxinp${ele.inputid}`}>Phone</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}                      
                                             <div className="clearfix  py-3">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-6">
                                                        <label className="form-label mb-md-0">Newsletters</label>
                                                    </div>
                                                    <div className="col-sm-3 col-6">
                                                        <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                                                            <input type="checkbox" className="form-check-input mb-0" id={`checkboxinp12345`} required=""/>
                                                            <label className="form-check-label mb-0" htmlFor={`checkboxinp12345`}>Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3 col-6">
                                                        <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                                                            <input type="checkbox" className="form-check-input mb-0" id={`checkboxsecond456`} required=""/>
                                                            <label className="form-check-label mb-0" htmlFor={`checkboxinp456`}>Phone</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                      
                                        </form>
                                    </div>
                                    <div className="card-footer text-end">
                                        <Link to={"#"} className="btn btn-white">Discard</Link>
                                        <Link to={"#"} className="btn btn-primary ms-2 mb-2">Save Changes</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="heading mb-0">Deactivate Account</h4>
                            </div>
                            <div className="card-body">
                                <div className="alert alert-warning border-warning outline-dashed py-3 px-3 mt-1 mb-4 mb-0 text-dark d-flex align-items-center">
                                    <div className="clearfix">
                                        {SVGICON.erroryellow}
                                    </div>
                                    <div className="mx-3">
                                        <h6 className="mb-0 fw-semibold">You are deactivatiing your account</h6>
                                        <p className="mb-0">For extra security, this requires you to confirm your email or phone number when you reset your password. 
                                            <Link to={"#"} className="text-warning">Learn More</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="form-check custom-checkbox me-4 my-3 d-inline-block">
                                    <input type="checkbox" className="form-check-input mb-0" id="checkboxDeactivation" required="" />
                                    <label className="form-check-label mb-0" htmlFor="checkboxDeactivation">Confirm Account Deactivation</label>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <Link to={"#"} className="btn btn-danger ms-2">Deactivate Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AccountSettings;