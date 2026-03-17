import { Fragment } from "react";
import CardFooterContent from "./CardFooterContent";

function CardOne({Image, Title}){
    return(
        <Fragment>
            <div className="card card-comment">
                <div className="card-body pb-0">
                    <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center py-2">
                            <div className="d-inline-block position-relative">
                                <img src={Image} alt="avat" className="rounded avatar avatar-md" />
                            </div>
                            <div className="clearfix ms-2">
                                <h6 className="fs-14 mb-0 fw-semibold">{Title}</h6>
                                <span className="fs-13">Yestarday at 4:30 PM</span>
                            </div>
                        </div>
                        <div className="clearfix ms-auto">
                            <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"><i className="bi bi-grid"></i></button>
                        </div>
                    </div>
                    <div className="clearfix">
                        <p className="fs-14 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                    <CardFooterContent />
                </div>
            </div>
        </Fragment>
    )
}
export default CardOne;