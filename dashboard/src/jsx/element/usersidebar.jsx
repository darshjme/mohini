import { Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "../constant/theme";
import { Link } from "react-router-dom";
import { galleryBlog } from "../constant/alldata";
import LightGallery from 'lightgallery/react'; 
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

function UserSidebar() {
    return (
        <>
            <div className="col-xl-3 col-xxl-4">
                <div className="card h-auto">
                    <div className="card-header pb-0 border-0">
                        <h4 className="card-title--medium mb-0"> Biography </h4>
                        <Dropdown className="dropdown c-pointer">
                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                {SVGICON.threedotvertical}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="card-body pt-3">
                        <p className="text-dark"> My Name is Yatin I Am Frentend Developer and I Can Do Anything in Software Field.</p>
                        <div className="adrees-bx">
                            <ul>
                                <li className="mb-3"><Link to=""><i className="flaticon-location" /> </Link> Dubai - United Arab Emirates</li>
                                <li className="mb-3"><Link to=""><i className="flaticon-cake" /> </Link>December 21, 2025</li>
                                <li className="mb-3"><Link to=""><i className="flaticon-business-and-trade" /> </Link>worldnic - Software Company</li>
                            </ul>
                        </div>
                        <div className="proile-social-bx adrees-bx mt-3">
                            <h4 className="card-title--medium mb-3">Social</h4>
                            <ul className="d-flex align-items-center flex-wrap">
                                <li className="mb-3"><Link to=""><i className="flaticon-facebook" /> </Link></li>
                                <li className="mb-3"><Link to=""><i className="flaticon-instagram" /> </Link></li>
                                <li className="mb-3"><Link to=""><i className="flaticon-twitter" /> </Link></li>
                                <li className="mb-3"><Link to=""><i className="flaticon-linkedin" /> </Link></li>
                                <li className="mb-3"><Link to=""><i className="flaticon-dribble-big-logo" /> </Link></li>
                                <li className="mb-3"><Link to=""><i className="flaticon-behance" /> </Link></li>
                            </ul>
                        </div>
                        <div className="mt-3">
                            <h4 className="card-title--medium mb-3">Skills</h4>
                            <ul className="d-flex align-items-center flex-wrap">
                                <li className="mb-3"><Link to="" className="badge badge-light me-2">Html</Link></li>
                                <li className="mb-3"><Link to="" className="badge badge-light me-2">Css</Link></li>
                                <li className="mb-3"><Link to="" className="badge badge-light me-2">Figma</Link></li>
                                <li className="mb-3"><Link to="" className="badge badge-light me-2">React</Link></li>
                                <li className="mb-3"><Link to="" className="badge badge-light me-2">Scss</Link></li>
                                <li className="mb-3"><Link to="" className="badge badge-light me-2">Tailwand css</Link></li>
                                <li className="mb-3"><Link to="" className="badge badge-light">React Native</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card h-auto">
                    <div className="card-header pb-0 border-0">
                        <h4 className="card-title--medium mb-0">Prople you know</h4>
                        <Dropdown className="dropdown c-pointer">
                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                {SVGICON.threedotvertical}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="card-body  py-3 ic-scroll height250" id="RecentActivityContent">
                        <div className="products pt-0">
                            <img src={IMAGES.contactpic2} className="avatar avatar-md" alt="" />
                            <div>
                                <Link to={"#"}> <h6 className="mb-0">Liam Antony</h6></Link>
                                <small>Web Doveloper</small>
                            </div>
                            <div className="ms-auto app-icon"> <i className="fa-solid fa-user-plus" /> </div>
                        </div>
                        <div className="products">
                            <img src={IMAGES.contactpic3} className="avatar avatar-md" alt="" />
                            <div>
                                <Link to={"#"}> <h6 className="mb-0">Liam Antony</h6></Link>
                                <small>Web Doveloper</small>
                            </div>
                            <div className="ms-auto app-icon"> <i className="fa-solid fa-user-plus" /> </div>
                        </div>
                        <div className="products">
                            <img src={IMAGES.contactpic1} className="avatar avatar-md" alt="" />
                            <div>
                                <Link to={"#"}> <h6 className="mb-0">Liam Antony</h6></Link>
                                <small>Web Doveloper</small>
                            </div>
                            <div className="ms-auto app-icon"> <i className="fa-solid fa-user-plus" /> </div>
                        </div>
                    </div>
                    <div className="text-center card-footer pt-0 border-0">
                        <Link to={"#"} className="btn btn-outline-primary btn-block btn-sm ic-load-more" id="RecentActivity" rel="ajax/contacts.html">Load More</Link>
                    </div>
                </div>
                <div className="card h-auto">
                    <div className="card-header pb-0 border-0">
                        <h4 className="card-title--medium mb-0">Interest</h4>
                        <Dropdown className="dropdown c-pointer">
                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                {SVGICON.threedotvertical}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="card-body py-3">
                        <div className="profile-interest c-pointer">
                            <LightGallery
                                speed={500}
                                plugins={[lgThumbnail, lgZoom]}
                                elementClassNames="row sp4 mt-4"
                            >
                                {galleryBlog.map((item, index) => (
                                    <div data-src={item.image} className="lg-item mb-1 col-lg-4 col-xl-4 col-sm-4 col-6" key={index}>
                                        <img src={item.image} style={{ width: "100%" }} alt="gallery" className="img-fluid rounded" />
                                    </div>
                                ))}
                            </LightGallery>
                        </div>
                    </div>
                </div>
                <div className="card h-auto">
                    <div className="card-header pb-0 border-0">
                        <h4 className="card-title--medium mb-0"> Our Latest News </h4>
                        <Dropdown className="dropdown c-pointer">
                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                {SVGICON.threedotvertical}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="card-body py-3">
                        <div className="profile-news">
                            <div className="media pt-0 pb-3">
                                <img src={IMAGES.profile05} alt="image" className="me-3 rounded" width="75" />
                                <div className="media-body">
                                    <h5 className="m-b-5"><Link to={"/post-details"} className="text-dark">Innovations in Event Ticketing</Link></h5>
                                    <p className="mb-0">I shared this on my fb wall.</p>
                                </div>
                            </div>
                            <div className="media pt-3 pb-3">
                                <img src={IMAGES.profile06} alt="image" className="me-3 rounded" width="75" />
                                <div className="media-body">
                                    <h5 className="m-b-5"><Link to={"/post-details"} className="text-dark">Getting More for Your Money</Link></h5>
                                    <p className="mb-0">I shared this on my fb wall.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserSidebar;
