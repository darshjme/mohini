import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import AccountDefaultCard from "../../components/account/AccountDefaultCard";
import LogsTable from "../../components/account/LogsTable";
import { logsTable } from "../../constant/alldata";

function AccountLogs() {
    const [selectValue, setSelectValue] = useState('All Time');
    return (
        <Fragment>
            <div className="card profile-overview">
                <AccountDefaultCard activePage={'logs'} />
            </div>
            <div className="tab-content" id="tabContentMyProfileBottom">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="heading mb-0">Logs</h4>
                                <div className="d-flex align-items-center">
                                    <Dropdown>
                                        <Dropdown.Toggle as="button" className="btn btn-primary tp-btn-light  d-flex align-items-center i-false" >
                                            {selectValue}
                                            <i className="fas fa-angle-down text-primary ms-1" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1" align="end">
                                            <Dropdown.Item className=" text-primary" onClick={() => setSelectValue("All Time")}>
                                                All Time
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => setSelectValue("Week")}>
                                                Week
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => setSelectValue("Month")}>
                                                Month
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button className="btn btn-sm btn-primary ms-2">View All</button>
                                </div>
                            </div>
                            <div className="card-body p-4">
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>URL</th>
                                                <th className="text-end">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {logsTable.map((item, index) => (
                                                <tr key={index}>
                                                    <td><span className={`badge badge-sm light border-0 badge-${item.statusClass}`}>{item.status}</span></td>
                                                    <td><Link to={"#"} className="text-primary">{item.action}</Link></td>
                                                    <td className="text-end">{item.dateTime}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="heading mb-0">Login Sessions</h4>
                                <div className="dt-buttons">
                                    <button className="dt-button buttons-excel buttons-html5 btn btn-primary tp-btn-light btn-sm mb-0 me-0" type="button">
                                        <span><i className="las la-file" /> Export Report</span>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects">
                                    <LogsTable />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AccountLogs;