import { Fragment, useState } from "react"
import PageTitle from "../layouts/PageTitle"
import { Link } from "react-router-dom"
import { Dropdown, Form, Modal } from "react-bootstrap"
import { notesdata } from "../constant/alldata"
import { SVGICON } from "../constant/theme"

function Notes() {
    const [reviewToggle, setReviewToggle] = useState(false);
    const [reviewToggle2, setReviewToggle2] = useState(false);
    const [active, setActive] = useState(false)
    const [status, setStatus] = useState("High")
    return (
        <Fragment>
            <PageTitle activeMenu="Notes" motherMenu="Notes" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card ">
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-xl-2 col-xxl-3">
                                    <div className={`mail-left-body dz-resp-tab ${active ? "active" : ""}`}>
                                        <div className=" ps-4 pe-3 py-4 ic-scroll height800">
                                            <div className="mb-3 mt-4 mt-sm-0 email-left-box">
                                                <div className="p-0">
                                                    <Link to={"#"} className="btn btn-primary btn-sm btn-block" onClick={() => setReviewToggle(true)}>Add New Note</Link>
                                                </div>
                                                <div className="mail-list">
                                                    <p className="text-primary font-w500 mb-2"> NOTES </p>
                                                    <Link to="/email-inbox" className="list-group-item"><i className="flaticon-document" />All Notes</Link>
                                                    <Link to="/email-inbox" className="list-group-item"><i className="fa-regular fa-star" /> Favourites </Link>
                                                </div>
                                                <div className="mail-list">
                                                    <p className="text-secondary mb-2 font-w500">Tags </p>
                                                    <Link to={"#"} className="list-group-item ">
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M5.25 5.25H5.268" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg> Personal </Link>
                                                    <Link to={"#"} className="list-group-item ">
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M5.25 5.25H5.268" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg> Work </Link>

                                                    <Link to={"#"} className="list-group-item ">
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="#09BD3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M5.25 5.25H5.268" stroke="#09BD3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg> Accounts </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-10 col-xxl-9">
                                    <div className="p-4">
                                        <div className="row">
                                            <div className="d-flex align-items-center p-3">
                                                <h4 className="d-xl-none d-lg-block card-title--medium mb-0">Notes</h4>
                                                <div className={`email-tools-box dz-resp-tool ms-auto float-end ${active ? "active" : ""}`} onClick={() => setActive(!active)}>
                                                    <i className="fa-solid fa-list-ul" />
                                                </div>
                                            </div>
                                            {notesdata.map((data, i) => (
                                                <div className="col-xl-4" key={i}>
                                                    <div className={`card ic-send-bx ${data.class}`}>
                                                        <div className="card-header align-items-strat border-0 pb-0">
                                                            <img src={data.img} className="avatar avatar-md" alt="" />
                                                            <div>
                                                                <h4 className="card-title--medium mb-0">{data.name}</h4>
                                                                <small>11/01/2025</small>
                                                            </div>
                                                            <Dropdown className="action-dropdown ms-auto align-self-start" align="end" >
                                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                    <Link to={"#"}> {SVGICON.threedotvertical} </Link>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu class="dropdown-menu dropdown-menu-end">
                                                                    <Dropdown.Item className="text-warning dropdown-item edit" onClick={() => setReviewToggle(true)}>edit</Dropdown.Item>
                                                                    <Dropdown.Item className="dropdown-item text-danger delete" onClick={() => setReviewToggle2(true)}>Delete</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="card-body">
                                                            <h5>{data.para}</h5>
                                                            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                                        </div>
                                                        <div className="card-footer d-flex align-items-center border-0 pt-0">
                                                            <div>
                                                                <i className="flaticon-bin fs-18 text-danger" />
                                                            </div>
                                                            <div className="ms-auto dz-dropdown">
                                                                <Dropdown className="default-select status-select c-pointer px-2 py-1 rounded" align="end" style={{backgroundColor:"rgba(1, 189, 155, 0.1)"}}>
                                                                    <Dropdown.Toggle as="div" variant="success" className="text-success">
                                                                        {status}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu class="dropdown-menu dropdown-menu-end">
                                                                        <Dropdown.Item onClick={() => setStatus("High")} >High</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => setStatus("Medium")} >Medium</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => setStatus("Low")} >Low</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
            <Modal show={reviewToggle} onHide={setReviewToggle} className="modal fade" id="reviewModal" centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                        <button type="button" className="btn-close" onClick={() => setReviewToggle(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Title</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Meet with tailor" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label required">User Name</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Max Smith" />
                                </div>
                                <div className="mb-3 dz-dropdown">
                                    <label className="form-label required d-block">Tag</label>
                                    <Form.Select as="ul" className="default-select status-select w-100">
                                        <option>Personal</option>
                                        <option>Work</option>
                                        <option>Important</option>
                                        <option>Social</option>
                                    </Form.Select>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label required">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" class="btn btn-danger light" onClick={() => setReviewToggle(false)}>Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </Modal>
            {/* modal2 */}
            <Modal show={reviewToggle2} onHide={setReviewToggle2} className="modal fade" centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel1">Delete Notes</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setReviewToggle2(false)}> </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="text-center">
                                    <div className="delete-icon-bx">
                                        <i className="flaticon-bin" />
                                    </div>
                                    <p className="mb-0">Are you sure you want to delete Notes?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={() => setReviewToggle2(false)}>Close</button>
                        <button type="button" className="btn btn-primary">Delete</button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

export default Notes