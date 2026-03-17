import { SVGICON } from "../../constant/theme";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Nav, Dropdown } from 'react-bootstrap';
import { navtabdata1, navtabdata2, navtabdata3, navtabdata4 } from "../../constant/alldata";

function Projectpage() {
    const [show, setShow] = useState(false);
    return (
        <>
            <Tab.Container defaultActiveKey="allstatus" >
                <div className="project-page d-flex justify-content-between align-items-center flex-wrap">
                    <div className="project mb-4">
                        <Nav className="nav nav-tabs style-1">
                            <Nav.Item className="nav-item">
                                <Nav.Link to={"#"} className="nav-link c-pointer" eventKey="allstatus" >All Status</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="nav-item">
                                <Nav.Link to={"#"} className="nav-link c-pointer" eventKey="on-progress">On Progress</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="nav-item">
                                <Nav.Link to={"#"} className="nav-link c-pointer" eventKey="pending">Pending</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="nav-item">
                                <Nav.Link to={"#"} className="nav-link c-pointer" eventKey="closed">Closed</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="mb-4">
                        <Link to={"#"} className="btn btn-primary btn-sm" onClick={() => setShow(true)}>+ New Project</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <Tab.Content>
                            <Tab.Pane eventKey="allstatus" >
                                {navtabdata1.map((data, i) => (
                                    <div className="card project-card" key={i}>
                                        <div className="card-body py-3 px-4">
                                            <div className="row align-items-center">
                                                <div className="col-xl-3  col-md-4 col-sm-12 align-items-center customers">
                                                    <div className="media-body">
                                                        <p className="text-primary mb-0">#P-000441425</p>
                                                        <h6 className="text-black">{data.title}</h6>
                                                        <p className="mb-0"><i className="fas fa-calendar me-2"></i>Created on Sep 8th, 2024</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-md-4 col-sm-6 mt-md-0 mt-sm-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image} alt="" />
                                                        <div>
                                                            <p className="mb-0">Client</p>
                                                            <h6 className="mb-0">{data.name}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2 col-md-4 col-sm-6 text-lg-center mt-md-0 mt-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image2} alt="" />
                                                        <div>
                                                            <p className="mb-0">Person in charge</p>
                                                            <h6 className="mb-0">Marley Dokidis</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3  col-md-6 col-sm-6 mt-3 mt-xl-0">
                                                    <div className="d-flex project-image">
                                                        {SVGICON.energybox}
                                                        <div>
                                                            <p className="mb-0">Deadline</p>
                                                            <h6 className="mb-0">Tuesday, Sep 29th 2024</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-sm-6 col-sm-4 mt-xl-0  mt-3">
                                                    <div className="d-flex justify-content-sm-end project-btn">
                                                        {data.action}
                                                        <Dropdown className="c-pointer ms-4  mt-auto mb-auto">
                                                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                                            {SVGICON.threedothorizontal}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                <Dropdown.Item>Edit</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Tab.Pane>
                            <Tab.Pane eventKey="on-progress" >
                                {navtabdata2.map((data, i) => (
                                    <div className="card project-card" key={i}>
                                        <div className="card-body py-3 px-4">
                                            <div className="row align-items-center">
                                                <div className="col-xl-3  col-md-4 col-sm-12 align-items-center customers">
                                                    <div className="media-body">
                                                        <p className="text-primary mb-0">#P-000441425</p>
                                                        <h6 className="text-black">{data.title}</h6>
                                                        <p className="mb-0"><i className="fas fa-calendar me-2"></i>Created on Sep 8th, 2024</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-md-4 col-sm-6 mt-md-0 mt-sm-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image} alt="" />
                                                        <div>
                                                            <p className="mb-0">Client</p>
                                                            <h6 className="mb-0">{data.name}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2 col-md-4 col-sm-6 text-lg-center mt-md-0 mt-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image2} alt="" />
                                                        <div>
                                                            <p className="mb-0">Person in charge</p>
                                                            <h6 className="mb-0">Marley Dokidis</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3  col-md-6 col-sm-6 mt-3 mt-xl-0">
                                                    <div className="d-flex project-image">
                                                        {SVGICON.energybox}
                                                        <div>
                                                            <p className="mb-0">Deadline</p>
                                                            <h6 className="mb-0">Tuesday, Sep 29th 2024</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-sm-6 col-sm-4 mt-xl-0  mt-3">
                                                    <div className="d-flex justify-content-sm-end project-btn">
                                                        {data.action}
                                                        <Dropdown className="c-pointer ms-4  mt-auto mb-auto">
                                                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                {SVGICON.threedothorizontal}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                <Dropdown.Item>Edit</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Tab.Pane>
                            <Tab.Pane eventKey="pending" >
                                {navtabdata3.map((data, i) => (
                                    <div className="card project-card" key={i}>
                                        <div className="card-body py-3 px-4">
                                            <div className="row align-items-center">
                                                <div className="col-xl-3  col-md-4 col-sm-12 align-items-center customers">
                                                    <div className="media-body">
                                                        <p className="text-primary mb-0">#P-000441425</p>
                                                        <h6 className="text-black">{data.title}</h6>
                                                        <p className="mb-0"><i className="fas fa-calendar me-2"></i>Created on Sep 8th, 2024</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-md-4 col-sm-6 mt-md-0 mt-sm-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image} alt="" />
                                                        <div>
                                                            <p className="mb-0">Client</p>
                                                            <h6 className="mb-0">{data.name}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2 col-md-4 col-sm-6 text-lg-center mt-md-0 mt-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image2} alt="" />
                                                        <div>
                                                            <p className="mb-0">Person in charge</p>
                                                            <h6 className="mb-0">Marley Dokidis</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3  col-md-6 col-sm-6 mt-3 mt-xl-0">
                                                    <div className="d-flex project-image">
                                                        {SVGICON.energybox}
                                                        <div>
                                                            <p className="mb-0">Deadline</p>
                                                            <h6 className="mb-0">Tuesday, Sep 29th 2024</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-sm-6 col-sm-4 mt-xl-0  mt-3">
                                                    <div className="d-flex justify-content-sm-end project-btn">
                                                        {data.action}
                                                        <Dropdown className="c-pointer ms-4  mt-auto mb-auto">
                                                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                                            {SVGICON.threedothorizontal}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                <Dropdown.Item>Edit</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Tab.Pane>
                            <Tab.Pane eventKey="closed" >
                                {navtabdata4.map((data, i) => (
                                    <div className="card project-card" key={i}>
                                        <div className="card-body py-3 px-4">
                                            <div className="row align-items-center">
                                                <div className="col-xl-3  col-md-4 col-sm-12 align-items-center customers">
                                                    <div className="media-body">
                                                        <p className="text-primary mb-0">#P-000441425</p>
                                                        <h6 className="text-black">{data.title}</h6>
                                                        <p className="mb-0"><i className="fas fa-calendar me-2"></i>Created on Sep 8th, 2024</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-md-4 col-sm-6 mt-md-0 mt-sm-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image} alt="" />
                                                        <div>
                                                            <p className="mb-0">Client</p>
                                                            <h6 className="mb-0">{data.name}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2 col-md-4 col-sm-6 text-lg-center mt-md-0 mt-3">
                                                    <div className="d-flex project-image">
                                                        <img src={data.image2} alt="" />
                                                        <div>
                                                            <p className="mb-0">Person in charge</p>
                                                            <h6 className="mb-0">Marley Dokidis</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3  col-md-6 col-sm-6 mt-3 mt-xl-0">
                                                    <div className="d-flex project-image">
                                                        {SVGICON.energybox}
                                                        <div>
                                                            <p className="mb-0">Deadline</p>
                                                            <h6 className="mb-0">Tuesday, Sep 29th 2024</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2  col-sm-6 col-sm-4 mt-xl-0  mt-3">
                                                    <div className="d-flex justify-content-sm-end project-btn">
                                                        {data.action}
                                                        <Dropdown className="c-pointer ms-4  mt-auto mb-auto">
                                                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                                            {SVGICON.threedothorizontal}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                <Dropdown.Item>Edit</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="mb-sm-0 mb-3">
                            <p className="mb-0 text-black">Showing 5 of 102 Data</p>
                        </div>
                        <nav>
                            <ul className="pagination pagination-circle">
                                <li className="page-item page-indicator"> <Link className="page-link" to={"#"}> <i className="la la-angle-left" /></Link> </li>
                                <li className="page-item active"><Link className="page-link" to={"#"}>1</Link> </li>
                                <li className="page-item"><Link className="page-link" to={"#"}>2</Link></li>
                                <li className="page-item"><Link className="page-link" to={"#"}>3</Link></li>
                                <li className="page-item"><Link className="page-link" to={"#"}>4</Link></li>
                                <li className="page-item page-indicator"> <Link className="page-link" to={"#"}> <i className="la la-angle-right" /></Link> </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Tab.Container>
            {/* Modal */}
            <Modal show={show} className="fade" centered>
                <div className="modal-header">
                    <h1 className="modal-title fs-5">Project title</h1>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Project Id</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="#P-000441425" />
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Client Name</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="James Jr." />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={() => setShow(false)}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </Modal>
        </>
    )
}
export default Projectpage;
