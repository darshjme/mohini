import { Fragment, useState } from "react"
import PageTitle from "../../layouts/PageTitle"
import { Dropdown, Modal, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { contactcarddata2 } from "../../constant/alldata";

function ContactCard() {
    const [reviewToggle, setReviewToggle] = useState(false);
    return (
        <Fragment>
            <PageTitle activeMenu="Contact Card" motherMenu="Contacts" />
            <Tab.Container defaultActiveKey={1}>
                <div className="project-page d-flex justify-content-between align-items-center flex-wrap">
                    <div className="project mb-4">
                        <Nav className="nav nav-tabs style-1">
                            <Nav.Item className="nav-item">
                                <Nav.Link eventKey="1" className="nav-link">All Contacs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2" className="nav-link">Pending Invitation</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="mb-4">
                        <Link to={"#"} className="btn btn-primary btn-sm" onClick={() => setReviewToggle(true)} >+ New Contact</Link>
                    </div>
                </div>
                <Tab.Content>
                    <Tab.Pane eventKey="1">
                        <div className="row dz-scroll  loadmore-content searchable-items list" id="allContactListContent">
                            <div className="items items-header-section"> </div>
                            {contactcarddata2.map((data, i) => (
                                <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6 items" key={i}>
                                    <div className="card contact-bx-1 item-content">
                                        <div className="card-header border-0">
                                            <div className="action-dropdown">
                                                <Dropdown className="dropdown" align="end">
                                                    <Dropdown.Toggle as="div" className="btn-link i-false">
                                                        <Link to={"#"}  >
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                        </Link>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu class="dropdown-menu dropdown-menu-end">
                                                        <Dropdown.Item className="dropdown-item edit" >edit</Dropdown.Item>
                                                        <Dropdown.Item className="dropdown-item delete" >Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <div className="card-body user-profile">
                                            <div className="image-bx">
                                                {data.image}
                                                <span className="active"></span>
                                            </div>
                                            <div className="media-body user-meta-info">
                                                <h6 className="fs-20 font-w500 my-1"><Link to="/app-profile" className="text-black user-name" data-name="Alan Green">{data.title}</Link> </h6>
                                                <p className="fs-14 mb-3 user-work" data-occupation="UI Designer">{data.para}
                                                </p>
                                                <ul>
                                                    <li><Link to={"#"}><i className="fa fa-phone" aria-hidden="true" /></Link></li>
                                                    <li><Link to={"#"}><i className="fa-solid fa-message" /></Link> </li>
                                                    <li><Link to={"#"}><i className="fas fa-video" aria-hidden="true" /></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">
                        <div className="row dz-scroll  loadmore-content searchable-items list" id="allContactListContent">
                            <div className="items items-header-section"> </div>
                            {contactcarddata2.slice(2, 8).map((data, i) => (
                                <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6 items" key={i}>
                                    <div className="card contact-bx-1 item-content">
                                        <div className="card-header border-0">
                                            <div className="action-dropdown">
                                                <Dropdown className="dropdown" align="end">
                                                    <Dropdown.Toggle as="div" className="btn-link i-false">
                                                        <Link to={"#"}  >
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                        </Link>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu class="dropdown-menu dropdown-menu-end">
                                                        <Dropdown.Item className="dropdown-item edit" >edit</Dropdown.Item>
                                                        <Dropdown.Item className="dropdown-item delete" >Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <div className="card-body user-profile">
                                            <div className="image-bx">
                                                {data.image}
                                                <span className="active"></span>
                                            </div>
                                            <div className="media-body user-meta-info">
                                                <h6 className="fs-20 font-w500 my-1"><Link to="/app-profile" className="text-black user-name" data-name="Alan Green">{data.title}</Link> </h6>
                                                <p className="fs-14 mb-3 user-work" data-occupation="UI Designer">{data.para}
                                                </p>
                                                <ul>
                                                    <li><Link to={"#"}><i className="fa fa-phone" aria-hidden="true" /></Link></li>
                                                    <li><Link to={"#"}><i className="fa-solid fa-message" /></Link> </li>
                                                    <li><Link to={"#"}><i className="fas fa-video" aria-hidden="true" /></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            {/* modal */}
            <Modal show={reviewToggle} onHide={setReviewToggle} className="modal fade" id="reviewModal" centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Contact title</h1>
                        <button type="button" className="btn-close" onClick={() => setReviewToggle(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={() => setReviewToggle(false)}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </Modal>

        </Fragment>
    )
}

export default ContactCard