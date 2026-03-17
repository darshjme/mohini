import { Fragment } from "react";
import { SVGICON } from "../../constant/theme";
import { Link } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import AccountDefaultCard from "../../components/account/AccountDefaultCard";
import { paymentBlog, addressBlog } from "../../constant/alldata";

function AccountBilling() {
    return (
        <Fragment>
            <div className="card profile-overview">
                <AccountDefaultCard activePage={'billing'} />
            </div>
            <div className="tab-content">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="alert alert-warning border-warning outline-dashed py-3 px-3 mt-1 mb-4 mb-0 text-dark d-flex align-items-center">
                                    <div className="clearfix">
                                        {SVGICON.erroryellow}
                                    </div>
                                    <div className="mx-3">
                                        <h6 className="mb-0 fw-semibold">We need your attention!</h6>
                                        <p className="mb-0">Your Payment was declined. To start using tools, please <Link to={"#"} className="text-warning">Add Payment Method</Link></p>
                                    </div>
                                </div>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="border border-secondary border-opacity-10 rounded p-3">
                                            <h6 className="fs-14 mb-2">Remaining Account Credits</h6>
                                            <p className="fs-13 mb-2">We will send you a notification soon. <Link to={"#"} className="text-primary d-block">Make Action Here</Link></p>
                                            <span className="h6 mb-0">$136.00</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="border border-secondary border-opacity-10 rounded p-3">
                                            <h6 className="fs-14">Estimated Cost for Billing Period</h6>
                                            <p className="fs-13 mb-2">We will send you a notification upon Subscription expiration</p>
                                            <span className="h6 mb-0">$52.00</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="border border-secondary border-opacity-10 rounded p-3">
                                            <h6 className="fs-14">Current Service Usage</h6>
                                            <div className="progress my-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar rounded-0" style={{ width: "60%" }}></div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Team Users</span>
                                                <span className="h6">57 of 100 Used</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="border border-secondary border-opacity-10 rounded p-3 h-100">
                                            <h6 className="fs-14">Billing Alerts</h6>
                                            <p className="fs-13 mb-2">Create alerts to notify you on Billing. <Link to={"#"} className="text-primary">My Alerts Here</Link></p>
                                            <span className="badge badge-sm badge-success light border-0">New Alert</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-4">
                                    <div className="col-lg-6 col-md-7">
                                        <h6 className="fs-13 mb-1">Bob Marley <span className="text-muted">Is your last bill payer</span></h6>
                                        <p className="mb-0 fs-13">Extended Pro Package. Up to 100 Agents & 25 Projects. Make your business effective</p>
                                    </div>
                                    <div className="col-lg-6 col-md-5 text-md-end mt-3 mt-md-0">
                                        <Link to={"#"} className="btn btn-danger my-1 light">Cancel Subcription</Link>
                                        <Link to={"#"} className="btn btn-primary my-1 ms-2">Upgrade Plan</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="heading mb-0">Payment Methods</h4>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    {paymentBlog.map((elem, index) => (
                                        <div className="col-sm-6" key={index}>
                                            <div className="border border-secondary border-opacity-10 rounded p-3">
                                                <h6 className="fs-14 mb-3">{elem.title} <span className="badge badge-sm badge-success light border-0 ms-2">New</span></h6>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="clearfix me-2">
                                                        <img src={elem.image} alt="" />
                                                    </div>
                                                    <div className="clearfix">
                                                        <h6 className="fs-13 mb-1">{elem.cardnumber}</h6>
                                                        <p className="fs-13 mb-0">{elem.cardname}</p>
                                                    </div>
                                                </div>
                                                <Link to={"#"} className="btn btn-xxs btn-danger light">Delete</Link>{" "}
                                                <Link to={"#"} className="btn btn-xxs btn-info light">Edit</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="row align-items-center mt-4">
                                    <div className="col-lg-6 col-md-7">
                                        <h6 className="fs-13 mb-1">You have 2 active cards. <span className="text-muted">Another 3 are inactive</span></h6>
                                        <p className="mb-0 fs-13">Extended Pro Package. Up to 100 Agents & 25 Projects. Make your business effective</p>
                                    </div>
                                    <div className="col-lg-6 col-md-5 text-md-end mt-3 mt-md-0">
                                        <Link to={"#"} className="btn btn-light my-1">Action</Link>
                                        <Link to={"#"} className="btn btn-primary my-1 ms-2">Add New Card</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="heading mb-0">Billing Addresses</h4>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="border border-secondary border-opacity-10 rounded p-3">
                                            <h6 className="fs-14">Address 1 <span className="badge badge-sm badge-success light border-0 ms-2">New</span></h6>
                                            <p className="fs-13">Ap #285-7193 Ullamcorper Avenue Amesbury HI 93373 United States</p>
                                            <Link to={"#"} className="btn btn-xxs btn-danger light">Delete</Link>{" "}
                                            <Link to={"#"} className="btn btn-xxs btn-info light">Edit</Link>
                                        </div>
                                    </div>
                                    {addressBlog.map((item, ind) => (
                                        <div className="col-sm-6" key={ind}>
                                            <div className="border border-secondary border-opacity-10 rounded p-3" key={ind}>
                                                <h6 className="fs-14">{item.name}</h6>
                                                <p className="fs-13">Ap #285-7193 Ullamcorper Avenue Amesbury HI 93373 United States</p>
                                                <Link to={"#"} className="btn btn-xxs btn-danger light">Delete</Link>{" "}
                                                <Link to={"#"} className="btn btn-xxs btn-info light">Edit</Link>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                <div className="row align-items-center mt-4">
                                    <div className="col-md-6">
                                        <h6 className="fs-14 mb-0">Tax Location</h6>
                                        <p className="mb-0">United States - 10% VAT <Link to={"#"} className="text-primary">More Info</Link></p>
                                    </div>
                                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                                        <Link to={"#"} className="btn btn-primary">Add New Address</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card h-auto">
                            <Tab.Container defaultActiveKey={'Week'}>
                                <div className="card-header border-0 py-3 d-block d-sm-flex pb-0">
                                    <h4 className="heading mb-0">Billing History</h4>
                                    <Nav as="ul" className="nav nav-pills mt-3 mt-sm-0 mix-chart-tab" id="myTabBillingHistory" role="tablist">
                                        <Nav.Item as="li" className="nav-item ms-1">
                                            <Nav.Link as="button" className="btn btn-light btn-sm" eventKey={'Week'}>Week</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="nav-item ms-1">
                                            <Nav.Link as="button" className="btn btn-light btn-sm" eventKey={'Month'}>Month</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="nav-item ms-1">
                                            <Nav.Link as="button" className="btn btn-light btn-sm" eventKey={'Year'}>Year</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="nav-item ms-1">
                                            <Nav.Link as="button" className="btn btn-light btn-sm" eventKey={'All'}>All</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div className="card-body">
                                    <Tab.Content className="tab-content">
                                        <Tab.Pane eventKey={'Week'} >
                                            <div className="table-responsive">
                                                <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                            <th className="text-end">Invoice</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Nov 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for Ocrober 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Oct 08, 2024</td>
                                                            <td><span className="text-primary">Invoice for September 2024</span></td>
                                                            <td>$98.03</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aug 24, 2024</td>
                                                            <td>Paypal</td>
                                                            <td>$35.07</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aug 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for July 2024</span></td>
                                                            <td>$142.80</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jul 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for June 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jun 17, 2024</td>
                                                            <td>Paypal</td>
                                                            <td>$23.09</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={'Month'}>
                                            <div className="table-responsive">
                                                <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                            <th className="text-end">Invoice</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Nov 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for Ocrober 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aug 24, 2024</td>
                                                            <td>Paypal</td>
                                                            <td>$35.07</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aug 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for July 2024</span></td>
                                                            <td>$142.80</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jul 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for June 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jun 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for May 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={'Year'}>
                                            <div className="table-responsive">
                                                <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                            <th className="text-end">Invoice</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Nov 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for Ocrober 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aug 24, 2024</td>
                                                            <td>Paypal</td>
                                                            <td>$35.07</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aug 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for July 2024</span></td>
                                                            <td>$142.80</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jul 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for June 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jun 17, 2024</td>
                                                            <td>Paypal</td>
                                                            <td>$23.09</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={'All'}>
                                            <div className="table-responsive">
                                                <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                            <th className="text-end">Invoice</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Nov 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for Ocrober 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Oct 08, 2024</td>
                                                            <td><span className="text-primary">Invoice for September 2024</span></td>
                                                            <td>$98.03</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aug 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for July 2024</span></td>
                                                            <td>$142.80</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jul 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for June 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jun 17, 2024</td>
                                                            <td>Paypal</td>
                                                            <td>$23.09</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jun 01, 2024</td>
                                                            <td><span className="text-primary">Invoice for May 2024</span></td>
                                                            <td>$123.79</td>
                                                            <td className="text-end">
                                                                <button type="button" className="btn btn-xxs btn-light">PDF</button>
                                                                <button type="button" className="btn btn-xxs btn-light ms-2 mt-1 mt-sm-0">View</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AccountBilling;