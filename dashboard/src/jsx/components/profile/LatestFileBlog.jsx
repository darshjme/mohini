import { Fragment } from "react";
import { IMAGES } from "../../constant/theme";

const fileData = [
    { logo : IMAGES.pdffile, deadline:'2 days ago', name:'Rober Doe', title:'Project tech requirements' },
    { logo : IMAGES.cssfile, deadline:'Due in 1 day', name:'Neil Owen', title:'Create FureStibe branding logo' },
    { logo : IMAGES.csvfile, deadline:'Due in 2 day', name:'Olivia Wild', title:'Create FureStibe branding logo' },
    { logo : IMAGES.mp3file, deadline:'Due in 3 day', name:'Sean Bean', title:'Create FureStibe branding logo' },
];

function LatestFileBlog(){
    return(
        <Fragment>
            {fileData.map((data, index)=>(                
                <div className="d-flex align-items-center py-2" key={index}>
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <img src={data.logo} width="32" alt="logo" />
                        </div>
                        <div className="clearfix">
                            <h6 className=" mb-0 fw-semibold">{data.title}</h6>
                            <span className="fs-13">{data.deadline} <span className="text-primary">{data.name}</span></span>
                        </div>
                    </div>
                    <div className="clearfix ms-auto">
                        <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"><i className="flaticon-app"></i></button>
                    </div>
                </div>
            ))}            
            <div className="alert alert-primary border-primary outline-dashed py-3 px-3 d-flex align-items-center mb-0 mt-3">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.25" d="M4.125 5.5C4.125 3.22183 5.97183 1.375 8.25 1.375H21.6664C22.7604 1.375 23.8096 1.8096 24.5832 2.58318L27.6668 5.66682C28.4404 6.4404 28.875 7.48961 28.875 8.58363V27.5C28.875 29.7782 27.0282 31.625 24.75 31.625H8.25C5.97183 31.625 4.125 29.7782 4.125 27.5V5.5Z" fill="var(--primary)"/>
                    <path d="M20.625 2.60123C20.625 1.924 21.174 1.375 21.8512 1.375C22.8269 1.375 23.7626 1.76258 24.4525 2.45247L27.7975 5.79753C28.4874 6.48742 28.875 7.42312 28.875 8.39877C28.875 9.076 28.326 9.625 27.6488 9.625H22C21.2406 9.625 20.625 9.00939 20.625 8.25V2.60123Z" fill="var(--primary)"/>
                    <path d="M15.9737 12.4793C15.8115 12.5464 15.6596 12.6459 15.5277 12.7777L11.4027 16.9027C10.8658 17.4397 10.8658 18.3103 11.4027 18.8473C11.9397 19.3842 12.8103 19.3842 13.3473 18.8473L15.125 17.0695V23.375C15.125 24.1344 15.7406 24.75 16.5 24.75C17.2594 24.75 17.875 24.1344 17.875 23.375V17.0695L19.6527 18.8473C20.1897 19.3842 21.0603 19.3842 21.5973 18.8473C22.1342 18.3103 22.1342 17.4397 21.5973 16.9027L17.4723 12.7777C17.0671 12.3726 16.4721 12.2731 15.9737 12.4793Z" fill="var(--primary)"/>
                </svg>
                <div className="mx-3">
                    <h6 className="fw-semibold mb-1">Quick file uploader</h6>
                    <p className="fs-14 mb-0 text-black">Drag & Drop or choose files from computer</p>
                </div>
            </div> 
        </Fragment>
    )
}

export default LatestFileBlog;