import { Fragment, lazy } from "react";
import { IMAGES, SVGICON } from "../../constant/theme";
import { Link } from "react-router-dom"; 

const ProfilePages = [
    {pagename:'Overview', pageurl:'overview'},
    {pagename:'Settings', pageurl:'settings'},
    {pagename:'Security', pageurl:'security'},
    {pagename:'Activity', pageurl:'activity'},
    {pagename:'Billing', pageurl:'billing'},
    {pagename:'Statements', pageurl:'statements'},
    {pagename:'Referrals', pageurl:'referrals'},
    {pagename:'API Keys', pageurl:'apikeys'},
    {pagename:'Logs', pageurl:'logs'},
];
const earningBlog = [
    { icon: SVGICON.DollerSign, title:'Total Earnings', number:'$1,250'},
    { icon: SVGICON.DoubleUser, title:'New Referrals', number:'125'},
    { icon: SVGICON.DealBox, title:'New Deals', number:'25'},
]; 
const socialIcon = [
    { name:'fa-brands fa-linkedin-in'},
    { name:'fa-brands fa-instagram'},
    { name:'fa-brands fa-facebook-f'},
    { name:'fa-brands fa-telegram'},
    { name:'fa-brands fa-youtube'},
];
const ProfileProgress = lazy(() => import("../../components/profile/ProfileProgress"));
function AccountDefaultCard({activePage}){
    return(
        <Fragment>
            <div className="card-body d-flex">
                <div className="clearfix">
                    <div className="d-inline-block position-relative me-sm-4 me-3 mb-3 mb-lg-0">
                        <img src={IMAGES.avatarpic7} alt="" className="rounded-4 profile-avatar"/>
                        <span className="fa fa-circle border border-3 border-white text-success position-absolute bottom-0 end-0 rounded-circle"></span>
                    </div>
                </div>
                <div className="clearfix d-xl-flex flex-grow-1">
                    <div className="clearfix pe-md-5">
                        <h3 className="fw-semibold mb-1"> Atkinson <img src={IMAGES.blueTick} alt="Blue Tick" /></h3>
                        <ul className="d-flex flex-wrap fs-6 align-items-center">
                            <li className="me-3 d-inline-flex align-items-center"><i className="las la-user me-1 fs-18"></i>Web Designer</li>
                            <li className="me-3 d-inline-flex align-items-center"><i className="las la-map-marker me-1 fs-18"></i>420 City Path, AU 123-456</li>
                            <li className="me-3 d-inline-flex align-items-center"><i className="las la-envelope me-1 fs-18"></i>info@gmail.com</li>
                        </ul>
                        <div className="d-md-flex d-none flex-wrap">
                            {earningBlog.map((data, ind)=>(
                                <div className="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3" key={ind}>
                                    <div className="avatar avatar-md bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
                                        {data.icon}
                                    </div>
                                    <div className="clearfix ms-2">
                                        <h3 className="mb-0 fw-semibold lh-1">{data.number}</h3>
                                        <span className="fs-14">{data.title}</span>
                                    </div>
                                </div>
                            ))}                               
                        </div>
                    </div>
                    <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column col-xl-3">
                        <div className="clearfix mb-3 text-xl-end">
                            <Link to={"#"} className="btn btn-light mb-2">Follow</Link>
                            <Link to={"#"} className="btn btn-primary ms-2 mb-2">Hire Me</Link>
                        </div>
                        <div className="mt-auto d-flex align-items-center">
                            <div className="clearfix me-3">
                                <span className="fw-medium text-black d-block mb-1">Progress</span>
                                <p className="mb-0 d-flex">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.83334 14.1668L14.1667 5.8335" stroke="var(--bs-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M5.83334 5.8335H14.1667V14.1668" stroke="var(--bs-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="text-success me-1">+3.50%</span>
                                </p>
                            </div>     
                                <ProfileProgress />   
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer py-0 d-flex flex-wrap justify-content-between align-items-center">
                <ul className="nav nav-underline nav-underline-primary nav-underline-text-dark nav-underline-gap-x-0" id="tabMyProfileBottom">
                    {ProfilePages.map((ele, ind)=>(
                        <li className="nav-item ms-1" key={ind}>
                            <Link to={`/account-${ele.pageurl}`}  className={`nav-link py-3 border-3 text-black ${activePage === ele.pageurl ? 'active':''}`}>{ele.pagename}</Link>
                        </li>
                    ))}                   
                </ul>
                <ul className="d-md-flex d-none py-2">
                    {socialIcon.map((data, index)=>(
                        <li className="px-1" key={index}>
                            <Link className="btn btn-light btn-sharp" to={"#"}>
                                <i className={data.name} />
                            </Link>
                        </li>
                    ))}                        
                </ul>
            </div>
        </Fragment>
    )
}
export default AccountDefaultCard;