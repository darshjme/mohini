import { Fragment } from "react";
import { SVGICON } from "../../constant/theme";
import { Link } from "react-router-dom";

function CardFooterContent(){
    return(
        <Fragment>
            <div className="clearfix pt-1">
                <Link to={"#"} className="me-3">
                    <i className="fa-regular fa-image"/> 25
                </Link>
                <Link to={"#"} className="post-like">
                    <i className="fa-regular fa-heart"/> 75
                </Link>
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
        </Fragment>
    )
}
export default CardFooterContent;