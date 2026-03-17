import { Fragment, useState } from "react"
import PageTitle from "../layouts/PageTitle"
import { Link } from "react-router-dom"
import { Dropdown, Modal } from "react-bootstrap"
import { filemanagerfolderdata, filemanagerfolderdata2, filetabledata } from "../constant/alldata";
import { SVGICON } from "../constant/theme";

function FileManager() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([...filetabledata]);
    const [sortConfig, setSortConfig] = useState({ key: 'category', direction: 'ascending' });

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
        setSortConfig({ key, direction });
    };
    return (
        <Fragment>
            <PageTitle activeMenu="File Manager" motherMenu="File" />
            <div className="row">
                <div className="col-xl-9">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h2 className="card-title">Folders</h2>
                            <Link to={"#"} className="btn btn-primary btn-sm" onClick={() => setShow(true)}>Add Folder</Link>
                        </div>
                        <div className="card-body">
                            <div className="row g-4">
                                {filemanagerfolderdata.map((data, index) => (
                                    <div className="col-xl-3 col-sm-4" key={index}>
                                        <div className="ic-folder-bx">
                                            <div className=" d-flex align-items-center justify-content-between mb-3">
                                                <div className=" d-flex align-items-center">
                                                    {SVGICON.folder}
                                                    <h6 className="mb-0 ms-2 fs-15">{data.title}</h6>
                                                </div>
                                                <Dropdown className="dropdown c-pointer" align="end">
                                                    <Dropdown.Toggle as="div" className="btn-link i-false">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"></circle>
                                                            <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"></circle>
                                                            <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"></circle>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                                        <Dropdown.Item href="#" className="dropdown-item">Delete</Dropdown.Item>
                                                        <Dropdown.Item href="#" className="dropdown-item">Edit</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span className="mb-0 me-2 text-dark font-w500">245 Files</span>
                                                <small>2.0GB Usage</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="quick-bx">
                                <h4 className="card-title mb-3">Quick Access</h4>
                                <div className="row">
                                    {filemanagerfolderdata2.map((data, i) => (
                                        <div className="col-xl-3 col-lg-3 col-sm-6" key={i}>
                                            <div className="quick-bx-inner mb-lg-0 mb-3">
                                                <div className=" d-flex align-items-center">
                                                    <i className="flaticon-document fs-18 text-primary"></i>
                                                    <h6 className="mb-0 ms-2 fs-15"> {data.title} </h6>
                                                </div>
                                                <Dropdown className="dropdown c-pointer" align="end">
                                                    <Dropdown.Toggle as="div" className="btn-link i-false">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"></circle>
                                                            <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"></circle>
                                                            <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"></circle>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                                        <Dropdown.Item href="#" className="dropdown-item">Delete</Dropdown.Item>
                                                        <Dropdown.Item href="#" className="dropdown-item">Edit</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="quick-bx" >
                                <h4 className="card-title mb-3">Recents</h4>
                                <div className="table-responsive">
                                    <div className="dataTables_wrapper no-footer">
                                        <table id="projectlist-1" className="display dataTable no-footer">
                                            <thead>
                                                <tr>
                                                    <th className="sorting c-pointer" onClick={() => sortData('file')} style={{ width: "240px" }}>File Name</th>
                                                    <th className="sorting c-pointer" onClick={() => sortData('category')} style={{ width: "240px" }}>Category</th>
                                                    <th className="sorting c-pointer" onClick={() => sortData('size')} style={{ width: "240px" }}>Size</th>
                                                    <th className="sorting c-pointer" onClick={() => sortData('lastmodified')} style={{ width: "240px" }}>Last Modified</th>
                                                    <th className="text-end sorting" style={{ width: "145px" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((data, index) => (
                                                    <tr key={index} className={data.class} style={{borderBottom:"1px solid rgba(82, 79, 79, 0.3)"}}>
                                                        <td className="sorting_1">
                                                            <div className=" d-flex align-items-center">
                                                                {SVGICON.folder}
                                                                <h6 className="mb-0 ms-2 fs-15"> {data.file} </h6>
                                                            </div>
                                                        </td>
                                                        <td>{data.category}</td>
                                                        <td>{data.size}</td>
                                                        <td>{data.lastmodified}</td>
                                                        <td className="text-end">
                                                            <div>
                                                                <Link to="#" className="btn btn-primary shadow btn-xs sharp me-1"><i className="fa fa-pencil" /></Link>
                                                                <Link to="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash" /></Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center mb-3">
                                        <div className="mb-sm-0 mb-3 dataTables_info pt-0">
                                            <p className="mb-0 text-black"> Showing 1 to 5 of 9 entries</p>
                                        </div>
                                        <nav className="dataTables_paginate paging_simple_numbers mb-0">
                                            <ul className="pagination pagination-circle">
                                                <li className="page-item page-indicator"> <Link className="page-link" to={"#"}> <i className="fa fa-angle-double-left" /></Link> </li>
                                                <li className="page-item active"><Link className="page-link" to={"#"}>1</Link> </li>
                                                <li className="page-item"><Link className="page-link" to={"#"}>2</Link></li>
                                                <li className="page-item page-indicator"> <Link className="page-link" to={"#"}> <i className="fa fa-angle-double-right" /></Link> </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="card-title">Stroage</h4>
                                </div>
                                <div className="card-body">
                                    <div className="depostit-card-media d-flex justify-content-between ">
                                        <div className="d-flex align-items-center">
                                            <i className="flaticon-hard-drive fs-20 text-primary me-2"></i>
                                            <h6>Disk C</h6>
                                        </div>
                                        <div>
                                            <h6>300 MB</h6>
                                        </div>
                                    </div>
                                    <div className="progress-box mt-0">
                                        <p>Usage of 250GB</p>
                                        <div className="progress">
                                            <div className="progress-bar bg-primary" style={{ width: '50%', height: '5px' }} role="progressbar"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="card-title">Details Stroage</h4>
                                </div>

                                <div className="card-body">
                                    <div className="depostit-card-media d-flex justify-content-between ">
                                        <div className="d-flex align-items-center">
                                            <i className="flaticon-hard-drive fs-20 text-primary me-2"></i>
                                            <h6>Disk C</h6>
                                        </div>
                                        <div>
                                            <h6>300 MB</h6>
                                        </div>
                                    </div>

                                    <div className="progress-box mt-0">
                                        <p>Usage of 250GB</p>
                                        <div className="progress">
                                            <div className="progress-bar bg-primary" style={{ width: '50%', height: '5px' }} role="progressbar"></div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="depostit-card-media d-flex justify-content-between ">
                                        <div className="d-flex align-items-center">
                                            <i className="flaticon-hard-drive fs-20 text-success me-2"></i>
                                            <h6>Disk D</h6>
                                        </div>
                                        <div>
                                            <h6>600 MB</h6>
                                        </div>
                                    </div>
                                    <div className="progress-box mt-0">
                                        <p>Usage of 250GB</p>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" style={{ width: '50%', height: '5px' }} role="progressbar"></div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="depostit-card-media d-flex justify-content-between ">
                                        <div className="d-flex align-items-center">
                                            <i className="flaticon-hard-drive fs-20 text-dark me-2"></i>
                                            <h6>Disk E</h6>
                                        </div>
                                        <div>
                                            <h6>400 MB</h6>
                                        </div>
                                    </div>
                                    <div className="progress-box mt-0">
                                        <p>Usage of 250GB</p>
                                        <div className="progress">
                                            <div className="progress-bar bg-dark" style={{ width: '50%', height: '5px' }} role="progressbar"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Folder Name</h1>
                        <button type="button" className="btn-close p-0" onClick={() => setShow(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label required">Email address</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={() => setShow(false)}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

export default FileManager