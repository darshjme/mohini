import { Fragment } from "react";
import { Link } from "react-router-dom";
import AccountDefaultCard from "../../components/account/AccountDefaultCard";
import StatementTable from "../../components/account/StatementTable";
import Select from "react-select";

const options = [
    { value: '0', label: 'Seller Annual Fee' },
    { value: '1', label: 'Seller Monthly Fee' },
]

function AccountStatements() {
    return (
        <Fragment>
            <div className="card profile-overview">
                <AccountDefaultCard activePage={'statements'} />
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="heading mb-0">Earnings</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="fs-14">Last 30 day earnings calculated. Apart from arranging the order of topics.</p>
                                        <div className="row g-2 mb-3">
                                            <div className="col-sm-4 col-6">
                                                <div className="bg-light rounded p-3">
                                                    <h6 className="fs-15 mb-0">$6,840</h6>
                                                    <span className="fs-13">Net Earnings</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                                <div className="bg-light rounded p-3">
                                                    <h6 className="fs-15 mb-0">+17,8%</h6>
                                                    <span className="fs-13">Change</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-12">
                                                <div className="bg-light rounded p-3">
                                                    <h6 className="fs-15 mb-0">$1,240</h6>
                                                    <span className="fs-13">Fees</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={"#"} className="btn btn-primary">Withdraw Earnings</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="heading mb-0">Invoices</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="fs-14">Download apart from order of the good awesome invoice topics.</p>
                                        <form action="#">
                                            <div className="d-flex">
                                                <div className="clearfix flex-grow-1"> 
                                                    <Select options={options} className="custom-react-select" />
                                                </div>
                                                <div className="clearfix ms-3">
                                                    <button type="button" className="btn btn-primary" style={{padding:"12px 15px"}}><i className="fa fa-arrow-down"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <StatementTable />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AccountStatements;