import { Fragment } from "react";
import SliderBlog from "../../components/account/SliderBlog";
import SliderBlog2 from "../../components/account/SliderBlog2";
import { IMAGES } from "../../constant/theme";
import { Link } from "react-router-dom"; 
import AccountDefaultCard from "../../components/account/AccountDefaultCard";
import LicenseTable from "../../components/account/LicenseTable";
import { Nav, Tab } from "react-bootstrap";
import AccountActivityChart from "../../components/account/AccountActivityChart"; 
import AccountActivityChart2 from "../../components/account/AccountActivityChart2";

function AccountSecurity() {
    return (
        <Fragment>
            <div className="card profile-overview">
                <AccountDefaultCard activePage={'security'} />
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="row">
                    <div className="col-xl-6">
                        <Tab.Container defaultActiveKey={'agents'}>  
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="heading mb-0">Security Summary</h4>
                                </div>
                                <div className="card-body pb-0">
                                    <div className="row mb-2">
                                        <div className="col-sm-4 col-6 mb-3">
                                            <div className="bg-success-light rounded px-3 py-2 text-center">
                                                <span className="fs-14 text-success">User Sign-in</span>
                                                <h3 className="mb-0 fw-semibold">36,899</h3>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-6 mb-3">
                                            <div className="bg-primary-light rounded px-3 py-2 text-center">
                                                <span className="fs-14 text-primary">Admin Sign-in</span>
                                                <h3 className="mb-0 fw-semibold">72</h3>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-6 mb-3">
                                            <div className="bg-danger-light rounded px-3 py-2 text-center">
                                                <span className="fs-14 text-danger">Failed Attempts</span>
                                                <h3 className="mb-0 fw-semibold">291</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h4 className="heading mb-0">Activity Chart</h4>
                                        <Nav as="ul" className="nav chart-summary-tab nav-pills mix-chart-tab" >
                                            <Nav.Item as="li" className="nav-item ms-1">
                                                <Nav.Link as="button" className="nav-link btn btn-light btn-sm" eventKey={"agents"} >Agents</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item as="li" className="nav-item ms-1">
                                                <Nav.Link as="button" className="nav-link btn btn-light btn-sm" eventKey={"clients"} >Clients</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </div>
                                <div className="clearfix overflow-hidden">
                                    <Tab.Content>
                                        <Tab.Pane eventKey={"agents"}>
                                             <div id="lineChartSecuritySummary">
                                                <AccountActivityChart/>
                                             </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={"clients"}>
                                             <div id="lineChartSecuritySummary">
                                                <AccountActivityChart2/>
                                             </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>  
                            </div>
                        </Tab.Container>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <SliderBlog />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <SliderBlog2 />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                        <div className="card">
                            <div className="card-body text-center p-3 pb-1">
                                <div className="clearfix">
                                    <h4>Upgrade to Pro <br /> Create Limitless Deals</h4>
                                    <p>Craft a headline that is both informative and will capture creating an outline, and checking facts</p>
                                    <Link to={"#"} className="btn btn-primary">Upgrade Now</Link>
                                </div>
                            </div>
                            <div className="card-footer border-0 p-0">
                                <div className="px-xl-0 px-md-5">
                                    <img className="view-light w-100" src={IMAGES.upgradelight} alt="light" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <LicenseTable />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AccountSecurity;