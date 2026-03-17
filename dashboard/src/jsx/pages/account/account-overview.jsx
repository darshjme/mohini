import { Fragment, useState } from "react";
import AccountDefaultCard from "../../components/account/AccountDefaultCard";
import { IMAGES, SVGICON } from "../../constant/theme";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Contributions from "../../components/profile/Contributions";
import SellingCategories from "../../components/profile/SellingCategories";
import { basicDetail, tableData5 } from "../../constant/alldata";

function AccountOverview(){    
    const [control, setControl] = useState('Slow All');
    return(
        <Fragment>
            <div className="card profile-overview">
                <AccountDefaultCard activePage={'overview'}/>
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="row">
                    <div className="col-xl-5 col-xxl-6">
                        <div className="card">
                            <div className="card-header py-3">
                                <h6 className="card-title">Profile Details</h6>
                                <Link to={"#"} className="btn btn-sm btn-primary">Edit Profile</Link>
                            </div>
                            <div className="card-body">
                                {basicDetail.map((elem, ind)=>(
                                    <div className="row py-2" key={ind}>
                                        <div className="col-6">
                                            <span className="fs-13">{elem.title}</span>
                                        </div>
                                        <div className="col-6">
                                            <span className="fs-13 fw-semibold">{elem.subtitle}</span>
                                        </div>
                                    </div>
                                ))} 
                                <div className="alert alert-warning border-warning outline-dashed py-3 px-3 mt-4 mb-0 text-dark d-flex align-items-center">
                                    <div className="clearfix">
                                       {SVGICON.erroryellow}
                                    </div>
                                    <div className="mx-3">
                                        <h6 className="mb-0 fw-semibold">We need your attention!</h6>
                                        <p className="mb-0 fs-13">Your Payment was declined. To start using tools, please <Link to={"#"} className="text-warning">Add Payment Method</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-xxl-6 col-lg-6">
                        <Contributions />
                    </div>
                    <div className="col-xl-3 col-xxl-4 col-lg-6">
                        <div className="card">
                            <div className="card-body text-center p-3 pb-1">
                                <div className="clearfix">
                                    <h4>Upgrade to Pro <br/> Create Limitless Deals</h4>
                                    <p>Craft a headline that is both informative and will capture creating an outline, and checking facts</p>
                                    <Link to={"#"} className="btn btn-primary">Upgrade Now</Link>
                                </div>
                                <div className="px-md-3">
                                    <img className="view-light w-100" src={IMAGES.upgradelight} alt="upgrade" />
                                </div>
                            </div>
                        </div>           
                    </div>
                    <div className="col-xl-5 col-xxl-8">
                        <SellingCategories/> 
                    </div>
                    <div className="col-xl-7 col-xxl-12">
                        <div className="card">
                            <div className="card-header border-0 pt-3 pb-0">
                                <h4 className="heading mb-0">Stock Report</h4>
                                <div className="clearfix d-inline-flex">                                   
                                    <Dropdown className="" >
                                        <Dropdown.Toggle as="div" className="btn btn-primary tp-btn-light  d-flex align-items-center i-false" >
                                            {control}
                                            <i className="fas fa-angle-down text-primary ms-1" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1" align="end">                                            
                                            <Dropdown.Item  onClick={() => setControl("Slow All")}>
                                               Slow All
                                            </Dropdown.Item>
                                            <Dropdown.Item  onClick={() => setControl("In Stock")}>
                                               In Stock
                                            </Dropdown.Item>
                                            <Dropdown.Item  onClick={() => setControl("Out of Stock")}>
                                              Out of Stock
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button type="button" className="btn btn-sm btn-primary ms-2">View All</button>
                                </div>
                            </div>
                            <div className="card-body py-3">
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-md table-border-last-0">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Product Id</th>
                                                <th>Date Added</th>
                                                <th>Status</th>
                                                <th>Price</th>
                                                <th className="text-end">Qty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData5.map((data, ind)=>(
                                                <tr key={ind}>
                                                    <td>{data.itemname}</td>
                                                    <td>{data.productid}</td>
                                                    <td>{data.added}</td>
                                                    <td><span className={`badge badge-sm light border-0 badge-${data.statuscolor}`}>{data.status}</span></td>
                                                    <td>{data.price}</td>
                                                    <td className="text-end">{data.qty}</td>
                                                </tr>
                                            ))}                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AccountOverview;