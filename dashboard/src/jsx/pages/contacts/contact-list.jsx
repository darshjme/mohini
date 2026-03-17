import { Fragment, useState } from "react"
import PageTitle from "../../layouts/PageTitle"
import { Modal } from "react-bootstrap";
import { IMAGES } from "../../constant/theme";
import { Link } from "react-router-dom";

const contactlistdata = [
    {
        id: 1,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic1} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 2,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic2} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">Alex Smith</h6>
                <span>alexsmith@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-danger light">Closed</span>,
    },
    {
        id: 3,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic3} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 4,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic4} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 5,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic5} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 6,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic6} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 7,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic7} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 8,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic8} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 9,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic1} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
    {
        id: 10,
        customer: <div className="media style-1">
            <img src={IMAGES.userspic2} className="img-fluid me-3" alt="" />
            <div className="media-body">
                <h6 className="mb-0">John Doe</h6>
                <span>johndoe@gmail.com</span>
            </div>
        </div>,
        status: <span className="badge badge-warning light">Pending</span>,
    },
]
function ContactList() {
    const [reviewToggle, setReviewToggle] = useState(false);
    const [data, setData] = useState([...contactlistdata]);
    const [sortConfig, setSortConfig] = useState({ key: 'customer', direction: 'ascending' });

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
            <PageTitle activeMenu="Contact List" motherMenu="Contacts" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header d-sm-flex d-block">
                            <div className="me-auto mb-sm-0 mb-3">
                                <h4 className="card-title">Contact</h4>

                            </div>
                            <Link to="#" className="btn btn-primary btn-sm" onClick={() => setReviewToggle(true)}>Add Customer</Link>
                        </div>
                        <div className="card-body pt-3">
                            <div className="table-responsive">
                                <table className="table display dataTable no-footer" id="ListDatatableView">
                                    <thead>
                                        <tr>
                                            <th className="sorting c-pointer" onClick={() => sortData('id')}> # </th>
                                            <th className="sorting c-pointer" onClick={() => sortData('customer')}> Customer </th>
                                            <th className="sorting c-pointer" onClick={() => sortData('country')}> Country </th>
                                            <th className="sorting c-pointer" onClick={() => sortData('date')}> Date </th>
                                            <th className="sorting c-pointer" onClick={() => sortData('companyName')}> Company Name </th>
                                            <th className="sorting c-pointer" onClick={() => sortData('status')}> Status </th>
                                            <th className="sorting c-pointer" onClick={() => sortData('action')}> Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index} style={{borderBottom:"1px solid rgba(82, 79, 79, 0.3)"}}>
                                                <td className="sorting_1"> <h6>{item.id}.</h6> </td>
                                                <td> {item.customer}</td>
                                                <td>
                                                    <div>
                                                        <h6>England</h6>
                                                        <span>COde:En</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <h6 className="text-primary">10/21/2016</h6>
                                                        <span>Paid</span>
                                                    </div>
                                                </td>
                                                <td>Abbott-Jacobs</td>
                                                <td> {item.status}</td>
                                                <td>
                                                    <div className="d-flex justify-content-end">
                                                        <Link to="#" className="btn btn-primary shadow btn-xs sharp me-1"><i className="fa fa-pencil" /></Link>
                                                        <Link to="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash" /></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}
            <Modal show={reviewToggle} onHide={setReviewToggle} className="modal fade" id="reviewModal" centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Coustomer</h1>
                        <button type="button" className="btn-close" onClick={() => setReviewToggle(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xl-12">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                    </div>
                                </form>
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

export default ContactList