import { Fragment } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { IMAGES } from "../../constant/theme";
import UserSidebar from "../../element/usersidebar";

function PostDetails() {

    return (
        <Fragment>
            <PageTitle activeMenu="Post Details" motherMenu="App" />
            <div className="row">
                <div className="col-xl-9 col-xxl-8">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="profile card card-body p-0">
                                <div className="profile-head">
                                    <div className="photo-content">
                                        <div className="photo-btn">
                                            <Link to="/edit-profile" className="btn bgl-light text-white"><i className="flaticon-editing me-2" />Edit</Link>
                                        </div>
                                        <div className="cover-photo"></div>
                                    </div>
                                    <div className="profile-info z-1">
                                        <div className="profile-photo">
                                            <img src={IMAGES.profile} className="img-fluid" alt="" />
                                        </div>
                                        <div className="profile-details">
                                            <div className="profile-name px-3 pt-2">
                                                <h4 className="text-white  mb-0 fs-23">Yatin xarma</h4>
                                                <p className="text-white">Frentend Developer</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-info-1">
                                        <div className="row">
                                            <div className="col-xl-6 col-xxl-7 col-lg-7">
                                                <div className="social-bx">
                                                    <div className="row gx-2">
                                                        <div className="col-4">
                                                            <div className="text-center">
                                                                <h4 className="font-w600 counter mb-0">248</h4>
                                                                <p className="mb-0 text-dark">Project</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="text-center">
                                                                <h4 className="font-w600 counter text-success mb-0"> 5,200</h4>
                                                                <p className="mb-0 text-dark">& Earnings</p>
                                                            </div>

                                                        </div>
                                                        <div className="col-4">
                                                            <div className="text-center">
                                                                <h4 className="font-w600 counter text-danger mb-0">20 </h4>
                                                                <p className="mb-0 text-dark">% Rate</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-xxl-5 col-lg-5">
                                                <div className="float-lg-end float-strat">
                                                    <Link to={"#"} className="btn btn-primary me-3"> Follow </Link>
                                                    <Link to={"#"} className="btn btn-outline-primary">Contact </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="post-details">
                                        <h3 className="mb-2 text-black">Market Analysis and Competitive Intelligence</h3>
                                        <ul className="mb-4 post-meta d-flex flex-wrap">
                                            <li className="post-author me-3">By Admin</li>
                                            <li className="post-date me-3"><i className="far fa-calendar-plus me-2"></i>18 Nov 2020</li>
                                            <li className="post-comment"><i className="far fa-comment me-2"></i>28</li>
                                        </ul>
                                        <img src={IMAGES.post1} className="w-100 rounded" alt="" />
                                        <p className="mt-3">A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.</p>
                                        <p>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
                                        <blockquote>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimencenturies.</blockquote>
                                        <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.</p>
                                        <div className="profile-skills mt-5 mb-5">
                                            <h4 className="text-primary mb-2">Skills</h4>
                                            <Link to={"#"} className="btn btn-primary light btn-xs mb-1 me-1">Admin </Link>
                                            <Link to={"#"} className="btn btn-primary light btn-xs mb-1 me-1"> Dashboard </Link>
                                            <Link to={"#"} className="btn btn-primary light btn-xs mb-1 me-1"> Photoshop </Link>
                                            <Link to={"#"} className="btn btn-primary light btn-xs mb-1 me-1"> Bootstrap </Link>
                                            <Link to={"#"} className="btn btn-primary light btn-xs mb-1 me-1"> Responsive </Link>
                                            <Link to={"#"} className="btn btn-primary light btn-xs mb-1 me-1"> Crypto </Link>
                                        </div>
                                        <div className="comment-respond" id="respond">
                                            <h4 className="comment-reply-title text-primary mb-3" id="reply-title">Leave a Reply </h4>
                                            <form className="comment-form" id="commentform" method="post">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="author" className="text-black font-w600 form-label required">Name</label>
                                                            <input type="text" className="form-control" value="Author" name="Author" placeholder="Author" id="author" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="email" className="text-black font-w600 form-label required">Email</label>
                                                            <input type="text" className="form-control" value="Email" placeholder="Email" name="Email" id="email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="comment" className="text-black font-w600 form-label">Comment</label>
                                                            <textarea rows="6" className="form-control h-100" name="comment" placeholder="Comment" id="comment"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <input type="submit" value="Post Comment" className="submit btn btn-primary" id="submit" name="submit" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserSidebar />
            </div>
        </Fragment>
    );
};
export default PostDetails;