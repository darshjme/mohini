import React, { Fragment, lazy, useReducer } from "react";
import { Button, Dropdown, Modal, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { IMAGES, SVGICON } from "../../constant/theme";
import { followersgrid, projectgrid } from "../../constant/alldata";
import UserSidebar from "../../element/usersidebar"; 

const initialState = false;
const reducer = (state, action) => {
    switch (action.type) {
        case 'sendMessage':
            return { ...state, sendMessage: !state.sendMessage }
        case 'postModal':
            return { ...state, post: !state.post }
        case 'linkModal':
            return { ...state, link: !state.link }
        case 'cameraModal':
            return { ...state, camera: !state.camera }
        case 'replyModal':
            return { ...state, reply: !state.reply }
        default:
            return state
    }
}
const Profileactivitychart = lazy(() => import("../../components/user/profileactivitychart"));
const ProfileActivityChart2 = lazy(() => import("../../components/user/profileactivitychart2"));
const ProfileActivityChart3 = lazy(() => import("../../components/user/profileactivitychart3"));
function AppProfile() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Fragment>
            <PageTitle activeMenu="Profile" motherMenu="App" />
            <div className="row">
                <div className="col-xl-9 col-xxl-8">
                    <Tab.Container defaultActiveKey='Posts'>
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
                                        <div className="profile-info-3 d-sm-flex d-block align-items-end">
                                            <div className="project ">
                                                <Nav as='ul' className="nav nav-tabs border-0">
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link to={"#"} eventKey='Posts' className="nav-link">Posts</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link to={"#"} eventKey='Projects' className="nav-link">Projects</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link to={"#"} eventKey='Followers' className="nav-link">Followers</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link to={"#"} eventKey='Activity' className="nav-link">Activity</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </div>
                                            <div className="progress-box d-sm-block d-none w-25 ms-auto mb-md-4 mb-3">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <p className="mb-0  text-dark">Progress</p>
                                                    <p className="mb-0 text-dark font-w600">75%</p>
                                                </div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success" style={{ width: '75%', height: '8px', borderRadius: '4px' }} role="progressbar"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="Posts">
                                    <div className="col-xl-12">
                                        <div className="card h-auto">
                                            <div className="card-body">
                                                <div className="post-input">
                                                    <textarea name="textarea" id="textarea" cols="30" rows="5" className="form-control bg-transparent" placeholder="Please type what you want...."></textarea>
                                                    <Link to={"#"} className="btn btn-primary light me-1 px-3" onClick={() => dispatch({ type: 'linkModal' })}><i className="fa fa-link m-0" /> </Link>
                                                    <Link to={"#"} className="btn btn-primary light me-1 px-3" onClick={() => dispatch({ type: 'cameraModal' })}><i className="fa fa-camera m-0" /></Link>
                                                    <Link to={"#"} className="btn btn-primary" onClick={() => dispatch({ type: 'postModal' })}>Post</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card h-auto">
                                            <div className="card-header border-0">
                                                <div className="products border-0">
                                                    <img src={IMAGES.contactspic2} className="avatar avatar-md rounded-circle" alt="" />
                                                    <div>
                                                        <h5 className="mb-0"><Link to={"#"} className="text-black">Thomas Fleming</Link></h5>
                                                        <span>8 Hours ago</span>
                                                    </div>
                                                </div>
                                                <Dropdown className="dropdown c-pointer">
                                                    <Dropdown.Toggle as="div" className="btn-link i-false btn sharp btn-primary tp-btn  ms-3">
                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.5202 17.4167C13.5202 18.81 12.3927 19.9375 10.9994 19.9375C9.60601 19.9375 8.47852 18.81 8.47852 17.4167C8.47852 16.0233 9.60601 14.8958 10.9994 14.8958C12.3927 14.8958 13.5202 16.0233 13.5202 17.4167ZM9.85352 17.4167C9.85352 18.0492 10.3669 18.5625 10.9994 18.5625C11.6319 18.5625 12.1452 18.0492 12.1452 17.4167C12.1452 16.7842 11.6319 16.2708 10.9994 16.2708C10.3669 16.2708 9.85352 16.7842 9.85352 17.4167Z" fill="var(--text)"></path>
                                                            <path d="M13.5202 4.58369C13.5202 5.97699 12.3927 7.10449 10.9994 7.10449C9.60601 7.10449 8.47852 5.97699 8.47852 4.58369C8.47852 3.19029 9.60601 2.06279 10.9994 2.06279C12.3927 2.06279 13.5202 3.19029 13.5202 4.58369ZM9.85352 4.58369C9.85352 5.21619 10.3669 5.72949 10.9994 5.72949C11.6319 5.72949 12.1452 5.21619 12.1452 4.58369C12.1452 3.95119 11.6319 3.43779 10.9994 3.43779C10.3669 3.43779 9.85352 3.95119 9.85352 4.58369Z" fill="var(--text)"></path>
                                                            <path d="M13.5202 10.9997C13.5202 12.393 12.3927 13.5205 10.9994 13.5205C9.60601 13.5205 8.47852 12.393 8.47852 10.9997C8.47852 9.6063 9.60601 8.4788 10.9994 8.4788C12.3927 8.4788 13.5202 9.6063 13.5202 10.9997ZM9.85352 10.9997C9.85352 11.6322 10.3669 12.1455 10.9994 12.1455C11.6319 12.1455 12.1452 11.6322 12.1452 10.9997C12.1452 10.3672 11.6319 9.8538 10.9994 9.8538C10.3669 9.8538 9.85352 10.3672 9.85352 10.9997Z" fill="var(--text)"></path>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                        <Dropdown.Item>Option 1</Dropdown.Item>
                                                        <Dropdown.Item>Option 2</Dropdown.Item>
                                                        <Dropdown.Item>Option 3</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="card-body pt-0">
                                                <div className="post-img">
                                                    <img src={IMAGES.post1} className="w-100 rounded" alt="" />
                                                </div>
                                                <div className="mt-3">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                </div>
                                                <ul className="post-comment d-flex mt-3">
                                                    <li><label className="me-3"><Link to={"#"} className="btn btn-light btn-sm"><i className="fa-regular text-danger fa-heart me-2" />Like</Link></label></li>
                                                    <li><label className="me-3"><Link to={"#"} className="btn btn-light btn-sm"><i className="fa-regular text-success fa-message me-2" />Comment</Link></label></li>
                                                    <li><label className="me-3"><Link to={"#"} className="btn btn-light btn-sm"><i className="fa-solid text-info fa-share me-2" />Share</Link></label></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card h-auto">
                                            <div className="card-header border-0">
                                                <div className="products border-0">
                                                    <img src={IMAGES.contactspic2} className="avatar avatar-md rounded-circle" alt="" />
                                                    <div>
                                                        <h5 className="mb-0"><Link to={"#"} className="text-black">Jhon Fleming</Link></h5>
                                                        <span>8 Hours ago</span>
                                                    </div>
                                                </div>
                                                <Dropdown className="dropdown c-pointer">
                                                    <Dropdown.Toggle as="div" className="btn-link i-false btn sharp btn-primary tp-btn  ms-3">
                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.5202 17.4167C13.5202 18.81 12.3927 19.9375 10.9994 19.9375C9.60601 19.9375 8.47852 18.81 8.47852 17.4167C8.47852 16.0233 9.60601 14.8958 10.9994 14.8958C12.3927 14.8958 13.5202 16.0233 13.5202 17.4167ZM9.85352 17.4167C9.85352 18.0492 10.3669 18.5625 10.9994 18.5625C11.6319 18.5625 12.1452 18.0492 12.1452 17.4167C12.1452 16.7842 11.6319 16.2708 10.9994 16.2708C10.3669 16.2708 9.85352 16.7842 9.85352 17.4167Z" fill="var(--text)"></path>
                                                            <path d="M13.5202 4.58369C13.5202 5.97699 12.3927 7.10449 10.9994 7.10449C9.60601 7.10449 8.47852 5.97699 8.47852 4.58369C8.47852 3.19029 9.60601 2.06279 10.9994 2.06279C12.3927 2.06279 13.5202 3.19029 13.5202 4.58369ZM9.85352 4.58369C9.85352 5.21619 10.3669 5.72949 10.9994 5.72949C11.6319 5.72949 12.1452 5.21619 12.1452 4.58369C12.1452 3.95119 11.6319 3.43779 10.9994 3.43779C10.3669 3.43779 9.85352 3.95119 9.85352 4.58369Z" fill="var(--text)"></path>
                                                            <path d="M13.5202 10.9997C13.5202 12.393 12.3927 13.5205 10.9994 13.5205C9.60601 13.5205 8.47852 12.393 8.47852 10.9997C8.47852 9.6063 9.60601 8.4788 10.9994 8.4788C12.3927 8.4788 13.5202 9.6063 13.5202 10.9997ZM9.85352 10.9997C9.85352 11.6322 10.3669 12.1455 10.9994 12.1455C11.6319 12.1455 12.1452 11.6322 12.1452 10.9997C12.1452 10.3672 11.6319 9.8538 10.9994 9.8538C10.3669 9.8538 9.85352 10.3672 9.85352 10.9997Z" fill="var(--text)"></path>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                        <Dropdown.Item>Option 1</Dropdown.Item>
                                                        <Dropdown.Item>Option 2</Dropdown.Item>
                                                        <Dropdown.Item>Option 3</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="card-body pt-0">
                                                <div className="post-img">
                                                    <img src={IMAGES.post2} className="w-100 rounded" alt="" />
                                                </div>
                                                <div className="mt-3">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                </div>
                                                <ul className="post-comment d-flex mt-3">
                                                    <li><label className="me-3"><Link to={"#"} className="btn btn-light btn-sm"><i className="fa-regular text-danger fa-heart me-2" />Like</Link></label></li>
                                                    <li><label className="me-3"><Link to={"#"} className="btn btn-light btn-sm"><i className="fa-regular text-success fa-message me-2" />Comment</Link></label></li>
                                                    <li><label className="me-3"><Link to={"#"} className="btn btn-light btn-sm"><i className="fa-solid text-info fa-share me-2" />Share</Link></label></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Projects">
                                    <div className="row">
                                        {projectgrid.map((data, i) => (
                                            <div className="col-xl-6 col-xxl-12" key={i}>
                                                <div className="card project-card">
                                                    <div className="card-body">
                                                        <div className="d-flex mb-4 align-items-start">
                                                            <div className="dz-media me-3">
                                                                <img src={data.image} className="img-fluid" alt="" />
                                                            </div>
                                                            <div className="me-auto">
                                                                <p className="text-primary mb-1">#P-000441425</p>
                                                                <h5 className="title font-w600 mb-2"><Link to="/post-details" className="text-black">Redesign Zenix Mobile App</Link></h5>
                                                                <span>We Create Your Dream</span>
                                                            </div>
                                                            {data.btn}
                                                        </div>
                                                        <p className="mb-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <div className="me-auto mb-4">
                                                                <p className="mb-2 font-w500 text-black">Members</p>
                                                                <ul className="users-lg">
                                                                    <li><img src={IMAGES.userspic1} alt="" /></li>
                                                                    <li><img src={IMAGES.userspic2} alt="" /></li>
                                                                    <li><img src={IMAGES.userspic3} alt="" /></li>
                                                                    <li><img src={IMAGES.userspic4} alt="" /></li>
                                                                    <li><img src={IMAGES.userspic5} alt="" /></li>
                                                                    <li><img src={IMAGES.userspic6} alt="" /></li>
                                                                    <li><img src={IMAGES.userspic7} alt="" /></li>
                                                                </ul>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-4">
                                                                <div className="text-center border-bx me-3">
                                                                    <span>Budget</span>
                                                                    <p className="mb-0 pt-1 font-w500 text-black">$505,785</p>
                                                                </div>
                                                                <div className="text-center border-bx">
                                                                    <span>Expenses</span>
                                                                    <p className="mb-0 pt-1 font-w500 text-black">$458,388</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div>Questions:<span
                                                                    className="text-black ms-3 font-w600">56</span></div>
                                                                <div>Comments:<span
                                                                    className="text-black ms-3 font-w600">200</span></div>
                                                            </div>
                                                            <div className="col-6">
                                                                <h6>Progress
                                                                    <span className="pull-right">75%</span>
                                                                </h6>
                                                                <div className="progress mt-2">
                                                                    <div className={`progress-bar ${data.className} progress-animated`} style={{ width: "75%", height: "8px" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Followers">
                                    <div className="row">
                                        {followersgrid.map((data, i) => (
                                            <div className="col-xl-4 col-md-6 col-sm-6 items" key={i}>
                                                <div className="card contact-bx-1 item-content">
                                                    <div className="card-header border-0">
                                                        <div className="action-dropdown">
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
                                                    </div>
                                                    <div className="card-body user-profile">
                                                        <div className="image-bx"> {data.image}
                                                            <span className="active"></span>
                                                        </div>
                                                        <div className="media-body user-meta-info">
                                                            <h6 className="fs-20 font-w500 my-1"><Link to="/app-profile" className="text-black user-name">{data.title}</Link></h6>
                                                            <p className="fs-14 mb-3 user-work">{data.para}</p>
                                                            <ul>
                                                                <li><Link to={"#"}><i className="fa fa-phone" /></Link></li>
                                                                <li><Link to={"#"}><i className="fa-solid fa-message" /></Link></li>
                                                                <li><Link to={"#"}><i className="fas fa-video" /></Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Activity">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <Tab.Container id="user-activity" defaultActiveKey="day">
                                                <div id="user-activity" className="card">
                                                    <div className="card-header border-0 pb-0 d-sm-flex d-block">
                                                        <h4 className="card-title">Visitor Activity</h4>
                                                        <div className="card-action project mb-sm-0 my-2">
                                                            <Nav className="nav nav-tabs">
                                                                <Nav.Item className="nav-item">
                                                                    <Nav.Link className="nav-link" eventKey="day">Day</Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item className="nav-item">
                                                                    <Nav.Link className="nav-link" eventKey="month">Month</Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item className="nav-item">
                                                                    <Nav.Link className="nav-link" eventKey="year">Year</Nav.Link>
                                                                </Nav.Item>
                                                            </Nav>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <Tab.Content className="tab-content" id="myTabContent">
                                                            <Tab.Pane className="tab-pane fade" eventKey="day" >
                                                                <Profileactivitychart />
                                                            </Tab.Pane>
                                                            <Tab.Pane className="tab-pane fade" eventKey="month">
                                                                <ProfileActivityChart2 />
                                                            </Tab.Pane>
                                                            <Tab.Pane className="tab-pane fade" eventKey="year">
                                                                <ProfileActivityChart3 />
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </div>
                                                </div>
                                            </Tab.Container>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
                <UserSidebar />
            </div>
            {/* Post Modal */}
            <Modal show={state.post} className="modal fade" id="postModal" onHide={() => dispatch({ type: 'postModal' })} centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Post</h5>
                        <Button variant="" type="button" className="close" data-dismiss="modal" onClick={() => dispatch({ type: 'postModal' })} >
                            <span>×</span>
                        </Button>
                    </div>
                    <div className="modal-body">
                        <textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""} />
                        <Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
                    </div>
                </div>
            </Modal>
            {/* Link Modal */}
            <Modal show={state.link} className="modal fade post-input" id="linkModal" onHide={() => dispatch({ type: 'linkModal' })} centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Social Links</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({ type: 'linkModal' })}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Link className="btn-social me-1 facebook" to="/app-profile"><i className="fab fa-facebook-f" /></Link>
                        <Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fab fa-google-plus-g" /></Link>
                        <Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fab fa-linkedin-in" /></Link>
                        <Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fab fa-instagram" /></Link>
                        <Link className="btn-social me-1 twitter" to="/app-profile"><i className="fab fa-twitter" /></Link>
                        <Link className="btn-social me-1 youtube" to="/app-profile"><i className="fab fa-youtube" /></Link>
                        <Link className="btn-social whatsapp" to="/app-profile"><i className="fab fa-whatsapp" /></Link>
                    </div>
                </div>
            </Modal>
            {/* Camera Modal */}
            <Modal show={state.camera} className="modal fade" id="cameraModal" onHide={() => dispatch({ type: 'cameraModal' })} centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload images</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({ type: 'cameraModal' })}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group custom_file_input mb-3">
                            <span className="input-group-text">Upload</span>
                            <div className="form-file">
                                <input type="file" className="form-file-input form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default AppProfile;