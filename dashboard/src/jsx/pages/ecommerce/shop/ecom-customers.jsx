import { Fragment } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { Link } from "react-router-dom"; 
import { Dropdown } from "react-bootstrap";
import { customerstabledata } from "../../../constant/alldata";

function Customers() {
    const chackboxFun = (type) => {
        setTimeout(() => {
            const motherChackBox = document.querySelector(".product_order_single");
            const chackbox = document.querySelectorAll(".product_order");
            for (let i = 0; i < chackbox.length; i++) {
                const element = chackbox[i];
                if (type === "all") {
                    if (motherChackBox.checked) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                } else {
                    if (!element.checked) {
                        motherChackBox.checked = false;
                        break;
                    } else {
                        motherChackBox.checked = true;
                    }
                }
            }
        }, 100);
    };
    return (
        <Fragment>
            <PageTitle activeMenu="Customers" motherMenu="Shop" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <table className="table table-sm mb-0 table-striped">
                                    <thead>
                                        <tr>
                                            <th className="pe-3">
                                                <div className="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" className="form-check-input product_order_single" id="checkAll" onClick={() => chackboxFun("all")} />
                                                    <label className="form-check-label" htmlFor="checkAll"></label>
                                                </div>
                                            </th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th className="ps-5" style={{ minWidth: '200px' }}>Billing Address</th>
                                            <th>Joined</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="customers">
                                        {customerstabledata.map((data, i) => (  
                                            <tr className="btn-reveal-trigger" key={i}>
                                                <td className="py-2">
                                                    <div className="form-check custom-checkbox mx-2">
                                                        <input type="checkbox" onClick={() => chackboxFun()} className="form-check-input product_order" id="checkbox" />
                                                        <label className="form-check-label" htmlFor="checkbox" />
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <Link to="/ecom-customers">
                                                        <div className="media d-flex align-items-center">
                                                            <div className="avatar avatar-xl me-2">
                                                                <div className="">
                                                                    <img className="rounded-circle img-fluid" src={data.image} width="30" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <h5 className="mb-0 fs--1">{data.name}</h5>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="py-2"> <Link to="mailto:ricky@example.com">info@example.com</Link></td>
                                                <td className="py-2"> <Link to="tel:2012001851">{data.phone}</Link></td>
                                                <td className="py-2 ps-5">{data.address}</td>
                                                <td className="py-2">{data.joined}</td>
                                                <td className="py-2 text-right">
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="" className="btn btn-primary tp-btn-light sharp i-false">
                                                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                    <rect x="0" y="0" width="24" height="24"></rect>
                                                                    <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                                                                    <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                                                                    <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                                                                </g>
                                                            </svg>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#">Edit</Dropdown.Item>
                                                            <Dropdown.Item href="#" className="text-danger"> Delete </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
        </Fragment>
    )
}
export default Customers;
