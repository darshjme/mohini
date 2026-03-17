import { Fragment } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import ProfileOverviewCard from "../../components/profile/ProfileOverviewCard";
import { profileProjectCard } from "../../constant/alldata";

function ProfileProjects() {
    return (
        <Fragment>
            <div className="card profile-overview profile-overview-wide">
                <ProfileOverviewCard activePage="projects" />
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">My Projects</h5>
                            <div className="d-flex align-items-center">
                                <Link to={"#"} className="btn btn-primary btn-sm ms-2">+ New Project</Link>
                            </div>
                        </div>
                    </div>
                    {profileProjectCard.map((data, i) => (
                        <div className="col-xl-3 col-sm-6" key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="clearfix d-flex">
                                        <div className="avatar avatar-md style-1 rounded bg-light d-flex align-items-center justify-content-center me-3">
                                            <img src={data.logo} className="m-0" alt="logo" />
                                        </div>
                                        <div className="clearfix">
                                            <h6 className="mb-0 fw-semibold">{data.title}</h6>
                                            <span className="text-muted fs-13">There are many variations</span>
                                        </div>
                                    </div>
                                    <p className="my-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    <div className="clearfix">
                                        <p className="text-black mb-1 font-w500">Team</p>
                                        {data.id % 2 === 1 ?
                                            <div className="avatar-list avatar-list-stacked">
                                                <img src={IMAGES.avtar8} className="avatar rounded-circle" alt="avat" />{" "}
                                                <img src={IMAGES.avtar6} className="avatar rounded-circle" alt="avat" />{" "}
                                                <img src={IMAGES.avtar4} className="avatar rounded-circle" alt="avat" />{" "}
                                                <img src={IMAGES.avtar2} className="avatar rounded-circle" alt="avat" />
                                            </div>
                                            :
                                            <div className="avatar-list avatar-list-stacked">
                                                <img src={IMAGES.avtar1} className="avatar rounded-circle" alt="avat" />{" "}
                                                <img src={IMAGES.avtar3} className="avatar rounded-circle" alt="avat" />{" "}
                                                <img src={IMAGES.avtar5} className="avatar rounded-circle" alt="avat" />{" "}
                                                <img src={IMAGES.avtar7} className="avatar rounded-circle" alt="avat" />
                                            </div>
                                        }
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-medium">Project Complete</span>
                                            <span className="">{data.progress}</span>
                                        </div>
                                        <div className="progress mt-2">
                                            {data.id % 2 === 1 ?
                                                <div className="progress-bar bg-purple" style={{ width: data.progress, borderRadius: "4px" }} ></div>
                                                :
                                                <div className="progress-bar bg-danger" style={{ width: data.progress, borderRadius: "4px" }} ></div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between flex-wrap">
                                    <div className="due-progress mb-0">
                                        <p className="mb-0 "> Due <span className="text-purple"> : 2025-10-02</span></p>
                                    </div>
                                    <span className={`badge badge-sm light border-0 badge-${data.statuscolor}`}>{data.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}
export default ProfileProjects;