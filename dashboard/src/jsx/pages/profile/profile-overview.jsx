import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import { Dropdown } from "react-bootstrap";
import ProfileOverviewCard from "../../components/profile/ProfileOverviewCard";
import CardOne from "../../components/profile/CardOne";
import CardGalleryOne from "../../components/profile/CardGalleryOne";
import CardGalleryTwo from "../../components/profile/CardGalleryTwo";
import ParagraphCard from "../../components/profile/ParagraphCard";
import BgParaCard from "../../components/profile/BgParaCard";
import ImageCard from "../../components/profile/ImageCard";
import VideoCard from "../../components/profile/VideoCard";
import BigImageCard from "../../components/profile/BigImageCard";
import YoutubeCard from "../../components/profile/YoutubeCard";
import CommentCard from "../../components/profile/CommentCard";
import Contributions from "../../components/profile/Contributions";
import ActivityBlog from "../../components/profile/ActivityBlog";
import SellingCategories from "../../components/profile/SellingCategories";
import DraggableBlog from "../../components/profile/DragabbleBlog";
import ProjectStatusChart from "../../components/profile/ProjectStatusChart";

function ProfileOverview() {
    const [control, setControl] = useState('Today');
    return (
        < >
            <div className="card profile-overview profile-overview-wide">
                <ProfileOverviewCard activePage="overview" />
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <CardOne Title="Jackson" Image={IMAGES.avtar1} />
                            </div>
                            <div className="col-lg-12">
                                <CardGalleryOne />
                            </div>
                            <div className="col-lg-12">
                                <CardGalleryTwo />
                            </div>
                            <div className="col-lg-12">
                                <ParagraphCard />
                            </div>
                            <div className="col-lg-12">
                                <BgParaCard />
                            </div>
                            <div className="col-lg-12">
                                <ImageCard />
                            </div>
                            <div className="col-lg-12">
                                <VideoCard />
                            </div>
                            <div className="col-lg-12">
                                <BigImageCard />
                            </div>
                            <div className="col-lg-12">
                                <YoutubeCard />
                            </div>
                            <div className="col-lg-12">
                                <CommentCard />
                            </div>
                            <div className="col-lg-12">
                                <CardOne Title="Lewis" Image={IMAGES.avtar3} />
                            </div>
                            <div className="col-lg-12">
                                <button type="button" className="btn btn-primary w-100 mb-4">More Feeds</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="row sticky-top z-0">
                            <div className="col-xxl-12 col-xl-6 col-md-6">
                                <Contributions />
                            </div> 
                            <div className="col-xxl-12 col-xl-6 col-md-6">
                                <ActivityBlog />
                            </div> 
                            <div className="col-xxl-12 col-xl-12 col-md-12">
                                <SellingCategories />
                            </div> 
                            <div className="col-xxl-7 col-xl-6 col-md-6">
                                <div className="card overflow-hidden">
                                    <div className="card-header border-0">
                                        <h5 className="mb-0">My To Do Items</h5>
                                        <div>
                                            <Link to={"#"} className="text-primary me-2">View All</Link>
                                            <Link to={"#"} className="text-black"> + Add To Do</Link>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="dt-do-bx">
                                            <div className="draggable-zone dropzoneContainer to-dodroup dz-scroll">
                                                <DraggableBlog />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-xxl-5 col-xl-6 col-md-6">
                                <div className="card">
                                    <div className="card-header pb-0 border-0">
                                        <h5 className="heading mb-0">Projects Status</h5>
                                        <Dropdown className="" >
                                            <Dropdown.Toggle as="button" className="btn btn-primary tp-btn-light  d-flex align-items-center i-false" >
                                                {control}
                                                <i className="fas fa-angle-down text-primary ms-1" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1" align="end">
                                                <Dropdown.Item className=" text-primary" onClick={() => setControl("Today")}>
                                                    Today
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setControl("Week")}>
                                                    Week
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setControl("Month")}>
                                                    Month
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <div id="chartProjectChart" className="project-chart d-flex justify-content-center">
                                            <ProjectStatusChart />
                                        </div>
                                        <div className="clearfix mt-3">
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="text-black fs-14">
                                                    <i className="fa-solid fa-square text-primary me-1" /> Completed Projects
                                                </div>
                                                <span className="fs-14">40 Projects</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="text-black fs-14">
                                                    <i className="fa-solid fa-square text-success me-1" /> Progress Projects
                                                </div>
                                                <span className="fs-14">20 Projects</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="text-black fs-14">
                                                    <i className="fa-solid fa-square text-danger me-1" /> Cancelled
                                                </div>
                                                <span className="fs-14">10 Projects</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="text-black fs-14">
                                                    <i className="fa-solid fa-square text-warning me-1" /> Yet to Start
                                                </div>
                                                <span className="fs-14">30 Projects</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileOverview;