import { Fragment } from "react";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { IMAGES } from "../../constant/theme";
import { Link } from "react-router-dom";
import CardFooterContent from "./CardFooterContent";

function CardGalleryOne(){
    return(
        <Fragment>
            <div className="card card-comment">
                <div className="card-body pb-0">
                    <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center py-2">
                            <div className="d-inline-block position-relative">
                                <img src={IMAGES.avtar2} alt="avat" className="rounded avatar avatar-md" />
                            </div>
                            <div className="clearfix ms-2">
                                <h6 className="fs-14 mb-0 fw-semibold">Kennedy</h6>
                                <span className="fs-13">Yestarday at 5:30 PM</span>
                            </div>
                        </div>
                        <div className="clearfix ms-auto">
                            <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"><i className="bi bi-grid" /></button>
                        </div>
                    </div>
                    <LightGallery                        
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                        elementClassNames="gallery-grid rows-3"
                        selector='.lightimg'
                    >                        
                        <Link to={IMAGES.postimgfull1} data-src={IMAGES.postimgfull1} className="grid-item colspan-3 rowspan-2 lightimg">
                            <img src={IMAGES.postimgfull1} alt="fullpost" />
                        </Link>
                        <Link to={IMAGES.postimage2} data-src={IMAGES.postimage2} className="grid-item lightimg">
                            <img src={IMAGES.postimage2} alt="post2"/>
                        </Link>
                        <Link to={IMAGES.postimage1} data-src={IMAGES.postimage1} className="grid-item lightimg">
                            <img src={IMAGES.postimage1} alt="post1"/>
                        </Link>
                        <Link to={IMAGES.postimage3} data-src={IMAGES.postimage3} className="grid-item gallery-more lightimg" data-more="+06">
                            <img src={IMAGES.postimage3} alt="post3"/>
                        </Link>                        
                    </LightGallery>
                    <div className="clearfix">
                        <p className="fs-14 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                   <CardFooterContent />
                </div>
            </div>
        </Fragment>
    )
}
export default CardGalleryOne;