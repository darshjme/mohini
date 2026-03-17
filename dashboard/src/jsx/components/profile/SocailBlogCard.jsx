import { Fragment } from "react";
import { IMAGES } from "../../constant/theme";

const socialBlog = [
    {image: IMAGES.google, title:'Piper Aerostar', subtitle:'piper-aircraft-class.jsp', number:'0'},
    {image: IMAGES.figma, title:'Cirrus SR22', subtitle:'cirrus-aircraft.jsp', number:'3'},
    {image: IMAGES.slack, title:'Beachcraft Baron', subtitle:'baron-class.pyt', number:'0'},
    {image: IMAGES.html, title:'Cessna SF150', subtitle:'cessna-aircraft-class.jsp', number:'0'},
];

function SocialBlogCard(){
    return(
        <Fragment>
            {socialBlog.map((ele, ind)=>(
                <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1" key={ind}>
                    <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                        <img src={ele.image} alt="" />
                    </div>
                    <div className="clearfix ms-3">
                        <h6 className="fs-14 mb-0 fw-semibold">{ele.title}</h6>
                        <span className="fs-13">{ele.subtitle}</span>
                    </div>
                    <div className="clearfix ms-auto">
                        <span className="badge badge-sm badge-light">{ele.number}</span>
                    </div>
                </div>
            ))}  
        </Fragment>
    )
}
export default SocialBlogCard;