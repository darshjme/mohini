import { Fragment } from "react"
import PageTitle from "../../layouts/PageTitle"
import { IMAGES, SVGICON } from "../../constant/theme"
import { projectgrid } from "../../constant/alldata"
import { Link } from "react-router-dom"

function ProjectCard() {
    return (
        <Fragment>
            <PageTitle activeMenu="Project Card" motherMenu="Projects" />
            <div className="row">
                {projectgrid.map((data, i) => (
                    <div className="col-xl-6 col-lg-12" key={i}>
                        <div className="card project-card">
                            <div className="card-body">
                                <div className="d-flex mb-4 align-items-start">
                                    <div className="dz-media me-3">
                                        <img src={data.image} className="img-fluid" alt="" />
                                    </div>
                                    <div className="me-auto">
                                        <p className="text-primary mb-1">#P-000441425</p>
                                        <h5 className="title font-w600 mb-2"><Link to="/post-details" className="text-black">Redesign Zenix Mobile App</Link></h5>
                                        <span>We Create Your Dream</span>
                                    </div>
                                    {data.btn}
                                </div>
                                <p className="mb-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                <div className="row mb-4">
                                    <div className="col-sm-6 mb-sm-0 mb-3 d-flex">
                                        <div className="dt-icon bgl-info me-3">
                                            {SVGICON.startdate}
                                        </div>
                                        <div>
                                            <span>Start Date</span>
                                            <p className="mb-0 pt-1 font-w500 text-black">Tuesday,Aug 15th 2024</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 d-flex">
                                        <div className="dt-icon me-3 bgl-danger">
                                            {SVGICON.deadlinedate}
                                        </div>
                                        <div>
                                            <span>Deadline</span>
                                            <p className="mb-0 pt-1 font-w500 text-black">Tuesday,Sep 29th 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap align-items-center">
                                    <div className="me-auto mb-4">
                                        <p className="mb-2 font-w500 text-black">Members</p>
                                        <ul className="users-lg">
                                            <li><img src={IMAGES.userspic1} alt="" /></li>
                                            <li><img src={IMAGES.userspic2} alt="" /></li>
                                            <li><img src={IMAGES.userspic3} alt="" /></li>
                                            <li><img src={IMAGES.userspic4} alt="" /></li>
                                            <li><img src={IMAGES.userspic5} alt="" /></li>
                                            <li><img src={IMAGES.userspic6} alt="" /></li>
                                            <li><img src={IMAGES.userspic7} alt="" /></li>
                                        </ul>
                                    </div>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="text-center border-bx me-3">
                                            <span>Budget</span>
                                            <p className="mb-0 pt-1 font-w500 text-black">$505,785</p>
                                        </div>
                                        <div className="text-center border-bx">
                                            <span>Expenses</span>
                                            <p className="mb-0 pt-1 font-w500 text-black">$458,388</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div>Questions:<span className="text-black ms-3 font-w600">56</span></div>
                                        <div>Comments:<span className="text-black ms-3 font-w600">200</span></div>
                                    </div>
                                    <div className="col-6">
                                        <h6>Progress
                                            <span className="pull-right">75%</span>
                                        </h6>
                                        <div className="progress mt-2">
                                            <div className={`progress-bar progress-animated ${data.class}`} style={{ width: '75%', height: '8px' }} role="progressbar"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default ProjectCard