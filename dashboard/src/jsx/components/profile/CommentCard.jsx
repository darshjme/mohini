import { Fragment } from "react";
import { IMAGES, SVGICON } from "../../constant/theme";
import { Link } from "react-router-dom";

function CommentCard(){
    return(
        <Fragment>
            <div className="card card-comment">
                <div className="card-body pb-0">
                    <div className="clearfix mb-3">
                        <div className="d-flex justify-content-between mb-2">
                            <div className="d-flex align-items-center py-2">
                                <div className="d-inline-block position-relative">
                                    <img src={IMAGES.avtar2} alt="avat" className="rounded avatar avatar-md"/>
                                </div>
                                <div className="clearfix ms-2">
                                    <h6 className="fs-14 mb-0 fw-semibold">Brad Dennis</h6>
                                    <span className="fs-13">Yestarday at 5:06 PM</span>
                                </div>
                            </div>
                            <div className="clearfix ms-auto">
                                <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"><i className="bi bi-grid"/></button>
                            </div>
                        </div>
                        <div className="clearfix">
                            <p className="fs-14 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        </div>
                        <div className="clearfix pt-1">
                            <Link to={"#"} className="me-3">
                                <i className="fa-regular fa-image"></i> 25
                            </Link>
                            <Link to={"#"} className="post-like">
                                <i className="fa-regular fa-heart"></i> 75
                            </Link>
                        </div>
                    </div>
                    <div className="d-flex py-2 position-relative">
                        <div className="d-inline-block position-relative">
                            <img src={IMAGES.avatar5} alt="a5" className="rounded avatar avatar-md"/>
                        </div>
                        <div className="clearfix ms-2">
                            <h6 className="fs-13 mb-1 fw-semibold">Mr. Hamilton <span className="fs-12 text-muted ms-1 fw-normal">2 Day ago</span></h6>
                            <p className="fs-12 mb-0">There are many variations of passages of Lorem Ipsum available.</p>
                        </div>
                        <Link to={"#"} className="position-absolute end-0 top-0">Reply</Link>
                    </div>
                    <div className="d-flex py-2 position-relative">
                        <div className="d-inline-block position-relative">
                            <img src={IMAGES.avatar5} alt="a5" className="rounded avatar avatar-md"/>
                        </div>
                        <div className="clearfix ms-2">
                            <h6 className="fs-13 mb-1 fw-semibold">Mrs. Anderson <span className="fs-12 text-muted ms-1 fw-normal">3 Days ago</span></h6>
                            <p className="fs-12 mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                        </div>
                        <Link to={"#"} className="position-absolute end-0 top-0">Reply</Link>
                    </div>
                    <div className="position-relative border-top border-secondary border-opacity-10 d-flex align-items-center mt-3">
                        <input type="text" className="form-control p-0 rounded-0 border-0 pe-2 bg-transparent" placeholder="Reply.."/>
                        <div className="d-flex">
                            <Link to={"#"} className="p-2">
                                {SVGICON.Attchement}
                            </Link>
                            <Link to={"#"} className="p-2">
                                {SVGICON.Location}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CommentCard;