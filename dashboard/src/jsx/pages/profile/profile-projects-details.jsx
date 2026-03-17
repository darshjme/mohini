import { Fragment, useState } from "react";
import ApexCharts from 'apexcharts';
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ProfileOverviewCard from "../../components/profile/ProfileOverviewCard"; 
import ProjectStatusChart from "../../components/profile/ProjectStatusChart";
import OverTimeChart from "../../components/profile/OverTimeChart";
import SocialBlogCard from "../../components/profile/SocailBlogCard";
import NewContributorsCard from "../../components/profile/NewContributorsCard";
import CustomerTask from "../../components/profile/CustomerTask";
import LatestFileBlog from "../../components/profile/LatestFileBlog"; 

function ProfileProjectsDetails(){
    const [control, setControl] = useState('2024');

    const handleSeries = (value) => {		
		ApexCharts.exec('assetDistribution', 'toggleSeries', value)
	}
	
    return(
        <Fragment>
            <div className="card profile-overview profile-overview-wide">
                <ProfileOverviewCard activePage="projects" />   
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Projects Details</h5>
                    <div className="d-flex align-items-center">
                        <Link to="/profile-projects" className="btn-link ms-2">More Project</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-6">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <div className="clearfix">
                                    <h5 className="mb-0">Tasks Summary</h5>
                                    <small className="d-block">24 Overdue Tasks</small>
                                </div>
                                <Link to={"#"} className="btn btn-sm btn-light">View Tasks</Link>
                            </div>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-sm-6 mb-3">
                                        <div id="chartTasksSummary" className="project-chart d-flex justify-content-center">
                                            <ProjectStatusChart />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="text-black">
                                                <i className="fa-solid fa-square text-primary me-1"></i> Employee
                                            </div>
                                            <span>25</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="text-black">
                                                <i className="fa-solid fa-square text-success me-1"></i> Present
                                            </div>
                                            <span>17</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="text-black">
                                                <i className="fa-solid fa-square text-danger me-1"></i> Absent
                                            </div>
                                            <span>20</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-black">
                                                <i className="fa-solid fa-square text-warning me-1"></i> Holiday
                                            </div>
                                            <span>38</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="alert alert-outline-light outline-dashed p-3 mb-0 text-black">
                                    <strong className="text-primary">Intive New .NET Collaborators</strong> to creating great outstanding business to business .jsp modutr class scripts
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <div className="card" id="user-activity">
                            <div className="card-header pb-0 border-0 align-items-start">
                                <div className="clearfix">
                                    <h5 className="mb-0">Tasks Over Time</h5>
                                    <div className="clearfix d-flex">
                                        <div className="chart-series me-3" id="seriesIncomplete">
                                            <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="8" height="3" rx="1.5" fill="var(--bs-danger)"/>
                                            </svg>
                                            <input className="d-none" type="checkbox" id="checkSeriesIncomplete" name="chart-series" value="Incomplete" 
                                                onClick={() => handleSeries('Incomplete')}
                                            />
                                            <label className="mb-0" htmlFor="checkSeriesIncomplete"> Incomplete </label>												
                                        </div>
                                        <div className="chart-series" id="seriesComple">
                                            <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="8" height="3" rx="1.5" fill="var(--primary)"/>
                                            </svg>
                                            <input className="d-none" type="checkbox" id="checkSeriesComple" name="chart-series" value="Complete" 
                                                onClick={() => handleSeries('Complete')}
                                            />
                                            <label className="mb-0" htmlFor="checkSeriesComple"> Complete </label>
                                        </div>
                                    </div>
                                </div>                               
                                <Dropdown className="" >
                                    <Dropdown.Toggle as="button" className="btn btn-primary tp-btn-light  d-flex align-items-center i-false" >
                                        {control}
                                        <i className="fas fa-angle-down text-primary ms-1" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1" align="end">
                                        <Dropdown.Item className=" text-primary" onClick={() => setControl("2020")}>2020</Dropdown.Item>
                                        <Dropdown.Item  onClick={() => setControl("2021")}>2021</Dropdown.Item>
                                        <Dropdown.Item  onClick={() => setControl("2022")}>2022</Dropdown.Item>
                                        <Dropdown.Item  onClick={() => setControl("2023")}>2023</Dropdown.Item>
                                        <Dropdown.Item  onClick={() => setControl("2024")}>2024</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="card-body ps-0 pe-1 pb-1">
                                <div id="chartTasksOverTime">
                                    <OverTimeChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <div className="clearfix">
                                    <h5 className="mb-0">Projects Contributions</h5>
                                    <small className="d-block">84 New Tasks & 29 Guides</small>
                                </div>
                                <div className="clearfix ms-auto">
                                    <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"><i className="flaticon-app"></i></button>
                                </div>
                            </div>
                            <div className="card-body">
                                <SocialBlogCard />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <div className="clearfix">
                                    <h5 className="mb-0">New Contributors</h5>
                                    <small className="d-block">From total 482 Participants</small>
                                </div>
                                <Link to={"#"} className="btn btn-sm btn-light">View All</Link>
                            </div>
                            <div className="card-body">
                               <NewContributorsCard />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <div className="clearfix">
                                <h5 className="mb-0">My Tasks</h5>
                                    <small className="d-block">From total 482 Participants</small>
                                </div>
                                <Link to={"#"} className="btn btn-sm btn-light">View All</Link>
                            </div>
                            <div className="card-body">
                               <CustomerTask />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <div className="clearfix">
                                <h5 className="mb-0">Latest Files</h5>
                                    <small className="d-block">Total 382 fiels, 2,6GB space usage</small>
                                </div>
                                <Link to={"#"} className="btn btn-sm btn-light">View All</Link>
                            </div>
                            <div className="card-body">
                                 <LatestFileBlog /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ProfileProjectsDetails;