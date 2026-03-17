import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import { Dropdown, Modal } from "react-bootstrap";
import { useState } from "react";
import KanbanProcess from "../../components/dashboard/kanbanprocess";

function Kanban() {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="row">
                <div className="col-xl-12 px-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-7 col-xxl-6">
                                    <h3 className="font-w600">WorldNIC Company Profile Websites</h3>
                                    <p>Created by <strong className="text-black">WorldNIC</strong> on July 15, 2024</p>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                        <Link to="https://worldnic.dexignlab.com/" className="text-primary">worldnic.dexignlab.com</Link>
                                    </p>
                                    <div className="d-flex  justify-content-end align-items-center w-sm-50 w-100 pt-sm-4 pt-0 ">
                                        <h6 className="me-3 mb-0">Total Progress 60%</h6>
                                        <div className="progress default-progress flex-1">
                                            <div className="progress-bar bg-gradient1 progress-animated" style={{ width: '45%', height: '8px', }} >
                                                <span className="sr-only">45% Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-5 col-xxl-6">
                                    <div className="d-flex align-items-center mb-xl-4 mb-0 pb-3 justify-content-xl-end justify-content-start flex-wrap mt-xl-0 mt-3">
                                        <div className="me-3">
                                            <h4>WorldNIC</h4>
                                            <p className="mb-0 text-xl-end text-start">Software House</p>
                                        </div>
                                        <div className="facebook-icon me-3">
                                            <Link to={"#"}> {SVGICON.facebooklogo} </Link>
                                        </div>
                                        <div>
                                            <Dropdown className="c-pointer">
                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                    {SVGICON.threedotvertical2}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center pt-sm-4 pt-0 flex-wrap justify-content-xl-end justify-content-start pe-3">
                                        <div className="ms-0 my-3 my-sm-0 invite">
                                            <Link to={"#"} className="btn btn-primary light  mb-sm-0 mb-2 me-2 btn-sm" onClick={() => setShow(true)}><i className="fas fa-user-plus me-3 scale2" />Invite People</Link>
                                            <Link to={"#"} className="btn btn-primary light  btn-sm"><i className="far fa-comment-alt scale2 me-3" />45 Comments</Link>
                                        </div>
                                        <ul className="kanbanimg1 ms-sm-3">
                                            <li><img src={IMAGES.profilesmall1} alt="" /></li>
                                            <li><img src={IMAGES.profilesmall2} alt="" /></li>
                                            <li><img src={IMAGES.profilesmall3} alt="" /></li>
                                            <li><img src={IMAGES.profilesmall4} alt="" /></li>
                                            <li><img src={IMAGES.profilesmall5} alt="" /></li>
                                            <li><Link to={"#"}>5+</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <KanbanProcess />
            {/* Modal */}
            <Modal show={show} className="fade" centered>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">People Title</h1>
                    <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label required">People Name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="WorldNIC" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={() => setShow(false)}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </Modal>
        </>
    );
}
export default Kanban;