import { Fragment } from "react";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import CardFooterContent from "./CardFooterContent";

function CardGalleryTwo(){
    return(
        <Fragment>
            <div className="card card-comment">
                <div className="card-body pb-0">
                    <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center py-2">
                            <div className="d-inline-block position-relative">
                                <img src={IMAGES.avtar3} alt="avat" className="rounded avatar avatar-md"/>
                            </div>
                            <div className="clearfix ms-2">
                                <h6 className="fs-14 mb-0 fw-semibold">Kennedy</h6>
                                <span className="fs-13">Yestarday at 5:30 PM</span>
                            </div>
                        </div>
                        <div className="clearfix ms-auto">
                            <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"><i className="bi bi-grid"/></button>
                        </div>
                    </div>
                    <LightGallery                        
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                        elementClassNames="gallery-grid rows-3"
                        selector='.lightimg'
                    >                                            
                        <Link to={IMAGES.postimgfull2} data-src={IMAGES.postimgfull2} className="grid-item colspan-2 rowspan-3 lightimg">
                            <img src={IMAGES.postimgfull2} alt=""/>
                        </Link>
                        <Link to={IMAGES.postimage4} data-src={IMAGES.postimage4} className="grid-item lightimg">
                            <img src={IMAGES.postimage4} alt=""/>
                        </Link>
                        <Link to={IMAGES.postimage5} data-src={IMAGES.postimage5} className="grid-item lightimg">
                            <img src={IMAGES.postimage5} alt=""/>
                        </Link>
                        <Link to={IMAGES.postimage6} data-src={IMAGES.postimage6} className="grid-item gallery-more lightimg" data-more="+3">
                            <img src={IMAGES.postimage6} alt=""/>
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
export default CardGalleryTwo;