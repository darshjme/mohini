import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";

function TabActivityData() {
    return (
        <div className="widget-timeline-icons pb-3">
            <ul className="timeline">
                <li>
                    <div className="timeline-media">
                        <i className="las la-book-open"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="fs-14 fw-semibold text-black">StumbleUpon is acquired by eBay.</span>
                            <span className="fs-14 d-block">3:30 PM by <span className="text-primary">You</span></span>
                        </div>
                        <div className="px-3 py-3 mt-3 border border-secondary border-opacity-10 rounded">
                            <div className="row align-items-center">
                                <div className="col-xxl-5 col-xl-5 col-lg-12 mb-3 mb-xl-0">
                                    <h6 className="fs-15 mb-0">Meeting with customer</h6>
                                </div>
                                <div className="col-xl-1 col-sm-3 col-6">
                                    <span className="badge badge-sm badge-light border-0">UI Design</span>
                                </div>
                                <div className="col-xxl-3 col-sm-3 col-6">
                                    <div className="avatar-list avatar-list-stacked ms-3">
                                        <img src={IMAGES.avatar3} alt="avat" className="avatar avatar-sm rounded-circle" />
                                        <img src={IMAGES.avatar4} alt="avat" className="avatar avatar-sm rounded-circle" />
                                        <div className="avatar avatar-sm bg-blue text-white rounded-circle d-inline-flex align-items-center justify-content-center">S</div>
                                    </div>
                                </div>
                                <div className="col-xl-1 col-sm-3 col-6 mt-2 mt-sm-0">
                                    <span className="badge badge-sm badge-info light border-0">In Progress</span>
                                </div>
                                <div className="col-xxl-2 col-xl-2 col-sm-3 col-6 text-end mt-2 mt-sm-0">
                                    <Link to={"#"} className="btn btn-xxs btn-light text-black">View</Link>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-3 mt-3 border border-secondary border-opacity-10 rounded">
                            <div className="row align-items-center">
                                <div className="col-xxl-5 col-xl-5 col-lg-12 mb-3 mb-xl-0">
                                    <h6 className="fs-15 mb-0">User Module Testing</h6>
                                </div>
                                <div className="col-xl-1 col-sm-3 col-6">
                                    <span className="badge badge-sm badge-light border-0">Phase 2.6 QA</span>
                                </div>
                                <div className="col-xxl-3 col-sm-3 col-6">
                                    <div className="avatar-list avatar-list-stacked ms-3">
                                        <div className="avatar avatar-sm bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center">A</div>
                                        <div className="avatar avatar-sm bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center">R</div>
                                    </div>
                                </div>
                                <div className="col-xl-1 col-sm-3 col-6 mt-2 mt-sm-0">
                                    <span className="badge badge-sm badge-success light border-0">Completed</span>
                                </div>
                                <div className="col-xxl-2 col-xl-2 col-sm-3 col-6 text-end mt-2 mt-sm-0">
                                    <Link to={"#"} className="btn btn-xxs btn-light text-black">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-user"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className=" text-black fs-14 fw-semibold">Mashable, a news website and blog, goes live</span>
                            <span className="fs-14 d-block">04:12 PM by <span className="text-primary">Jackson</span></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-link"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className=" text-black fs-14 fw-semibold">05 New Project Files Uploaded</span>
                            <span className="fs-14 d-block">12:25 PM by <span className="text-primary">You</span></span>
                        </div>
                        <div className="p-md-4 p-3 mt-3 border border-opacity-10 rounded">
                            <div className="row g-3">
                                <div className="col-lg-3 col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <img src={IMAGES.pdffile} width="35" alt="pdf" />
                                        </div>
                                        <div className="clearfix">
                                            <h6 className="mb-0">Airplus Guideline</h6>
                                            <span className="fs-13">1.5MB</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <img src={IMAGES.csvfile} width="35" alt="csv" />
                                        </div>
                                        <div className="clearfix">
                                            <h6 className="mb-0">FureStibe requirements</h6>
                                            <span className="fs-13">9KB</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <img src={IMAGES.cssfile} width="35" alt="css" />
                                        </div>
                                        <div className="clearfix">
                                            <h6 className="mb-0">FureStibe styles</h6>
                                            <span className="fs-13">52KB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-file-alt"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold"><Link to={"#"} className="text-primary fw-medium">jQuery.js</Link> was merged into <strong>Google</strong> Task task</span>
                            <span className="fs-14 d-block">12:38 PM by <span className="text-primary">Jogn Walles</span></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-book-open"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold"><strong>Hughes</strong> Created & assigned a new task <Link to={"#"} className="text-primary">Design Multistep Registraion Form</Link> to you </span>
                            <span className="fs-14 d-block">11:02 PM by <span className="text-primary">Hughes</span></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-image"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold">3 Dashboard concepts uploaded</span>
                            <span className="fs-14 d-block">1:56 PM by <span className="text-primary">You</span></span>
                        </div>
                        <div className="p-md-4 p-3 mt-3 border border-opacity-10 rounded d-flex">
                            <div className="row g-3">
                                <div className="col-md-2 col-4">
                                    <img src={IMAGES.blogscreen1} alt="screen1" className="w-100 rounded" />
                                </div>
                                <div className="col-md-2 col-4">
                                    <img src={IMAGES.blogscreen2} alt="screen2" className="w-100 rounded" />
                                </div>
                                <div className="col-md-2 col-4">
                                    <img src={IMAGES.blogscreen3} alt="screen1" className="w-100 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-book-open"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold"><strong>Hughes</strong> Fold Created & assigned a new task <Link to={"#"} className="text-primary">Design Multistep Registraion Form</Link> to you </span>
                            <span className="fs-14 d-block">11:02 PM by <span className="text-primary">Hughes</span></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-credit-card"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold">You have received your monthly Affiliate Fee</span>
                            <span className="fs-14 d-block">2:08 PM by <span className="text-primary">DexignLab Team</span></span>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="alert alert-primary border-primary outline-dashed py-3 px-4 d-flex align-items-center mb-0 mt-3">
                                    <i className="fa-solid fa-building-columns text-primary fs-30 align-self-start"></i>
                                    <div className="mx-3">
                                        <h6 className="fw-semibold mb-1">Withdraw Your Funds to Bank</h6>
                                        <p className="fs-14 mb-0 text-black">Securely withdraw money to your bank account, with a $25 fee.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-book-open"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold"><Link to={"#"} className="text-primary fw-medium">jQuery.js</Link> was merged into <strong>Google</strong> Task task</span>
                            <span className="fs-14 d-block">12:38 PM by <span className="text-primary">Jogn Walles</span></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-book-open"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold"><strong>Hughes</strong> Created & assigned a new task <Link to={"#"} className="text-primary">Design Multistep Registraion Form</Link> to you </span>
                            <span className="fs-14 d-block">11:02 PM by <span className="text-primary">Hughes</span></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-image"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold">3 Dashboard concepts uploaded</span>
                            <span className="fs-14 d-block">1:56 PM by <span className="text-primary">You</span></span>
                        </div>
                        <div className="p-md-4 p-3 mt-3 border border-opacity-10 rounded d-flex">
                            <div className="row g-3">
                                <div className="col-md-2 col-4">
                                    <img src={IMAGES.blogscreen1} alt="screen1" className="w-100 rounded" />
                                </div>
                                <div className="col-md-2 col-4">
                                    <img src={IMAGES.blogscreen2} alt="screen2" className="w-100 rounded" />
                                </div>
                                <div className="col-md-2 col-4">
                                    <img src={IMAGES.blogscreen3} alt="screen1" className="w-100 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-book-open"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold"><strong>Hughes</strong> Fold Created & assigned a new task <Link to={"#"} className="text-primary">Design Multistep Registraion Form</Link> to you </span>
                            <span className="fs-14 d-block">11:02 PM by <span className="text-primary">Hughes</span></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-media">
                        <i className="las la-credit-card"></i>
                    </div>
                    <div className="timeline-panel">
                        <div className="clearfix">
                            <span className="text-black fs-14 fw-semibold">You have received your monthly Affiliate Fee</span>
                            <span className="fs-14 d-block">2:08 PM by <span className="text-primary">DexignLab Team</span></span>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="alert alert-primary border-primary outline-dashed py-3 px-4 d-flex align-items-center mb-0 mt-3">
                                    <i className="fa-solid fa-building-columns text-primary fs-30 align-self-start"></i>
                                    <div className="mx-3">
                                        <h6 className="fw-semibold mb-1">Withdraw Your Funds to Bank</h6>
                                        <p className="fs-14 mb-0 text-black">Securely withdraw money to your bank account, with a $25 fee.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )

}
export default TabActivityData; 