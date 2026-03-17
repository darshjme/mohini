import { Fragment, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const licensesData = [
    { addclass: 'odd', status: "License", statusClass: "success", workstation: "DSI: Workstation 2", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "fftt456765gjkkjhi83093985" },
    { addclass: 'even', status: "Unknown", statusClass: "danger", workstation: "ReXe: Workstation 29", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "none" },
    { addclass: 'odd', status: "License", statusClass: "success", workstation: "RamenLC: Workstation 2", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "none" },
    { addclass: 'even', status: "License", statusClass: "success", workstation: "Nest Five: Workstation 86", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "fftt456765gjkkjhi83093985" },
    { addclass: 'odd', status: "Unknown", statusClass: "danger", workstation: "DSI: Workstation 3", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "none" },
    { addclass: 'even', status: "License", statusClass: "success", workstation: "ReXe: Workstation 7", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "fftt456765gjkkjhi83093985" },
    { addclass: 'odd', status: "To be Paid", statusClass: "warning", workstation: "Swedline: Workstation 54", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "fftt456765gjkkjhi83093985" },
    { addclass: 'even', status: "License", statusClass: "success", workstation: "Swedline: Workstation 21", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "fftt456765gjkkjhi83093985" },
    { addclass: 'odd', status: "License", statusClass: "success", workstation: "DSI: Workstation 320", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "fftt456765gjkkjhi83093985" },
    { addclass: 'odd', status: "License", statusClass: "success", workstation: "Samsung LDE : Workstation 45", ip: "236.125.56.78", timeAgo: "2 mins ago", key: "fftt456765gjkkjhi83093985" }
];
function LicenseTable() {
    const [data, setData] = useState([...licensesData]);
    const [sortConfig, setSortConfig] = useState({ key: 'workstation', direction: 'ascending' });

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
    const [selectValue, setSelectValue] = useState('All Time');
    const [copyText, setCopyText] = useState(''); 
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopyText(text);
    };

    return (
        <Fragment>
            <div className="card">
                <div className="card-header border-0 py-3">
                    <h4 className="heading mb-0">License Usage</h4>
                    <div className="clearfix d-flex align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle as="button" className="btn btn-primary tp-btn-light d-flex align-items-center i-false" >
                                {selectValue} <i className="fas fa-angle-down text-primary ms-1" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1" align="end">
                                <Dropdown.Item className="text-primary" onClick={() => setSelectValue("All Time")}> All Time </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectValue("Week")}> Week </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectValue("Month")}> Month </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="dt-buttons">
                            <button className="dt-button buttons-excel buttons-html5 btn btn-primary tp-btn-light btn-sm mb-0 me-0" type="button">
                                <span><i className="las la-file" /> Export Report</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive active-projects">
                        <div className="dataTables_wrapper no-footer" id="license_table">
                            <table className="table mb-4 table-striped-thead table-wide table-sm dataTable no-footer" id="tableLicenseUsage">
                                <thead>
                                    <tr>
                                        <th className="sorting c-pointer" onClick={() => sortData('status')}>Status</th>
                                        <th className="sorting c-pointer" onClick={() => sortData('workstation')}>Operator</th>
                                        <th className="sorting c-pointer" onClick={() => sortData('ip')}>IP Address</th>
                                        <th className="sorting c-pointer" onClick={() => sortData('timeAgo')}>Created</th>
                                        <th className="sorting c-pointer" onClick={() => sortData('key')}>API Keys</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} className={item.addclass}>
                                            <td><span className={`badge badge-sm light border-0 badge-${item.statusClass}`}>License</span></td>
                                            <td>{item.workstation}</td>
                                            <td>{item.ip}</td>
                                            <td>{item.timeAgo}</td>
                                            <td>
                                                <div className="select-text-wrap d-flex justify-content-between">
                                                    <div className="text-select-copy">{item.key}</div>
                                                    <button className="btn-select-text btn p-0 border-0 ms-4" onClick={() => handleCopy(item.key)}><i className="las la-copy fs-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center mb-3">
                                <div className="mb-sm-0 mb-3 dataTables_info pt-0">
                                    <p className="mb-0 text-black">Showing 1 to 9 of 11 entries</p>
                                </div>
                                <nav className="dataTables_paginate paging_simple_numbers mb-0">
                                    <ul className="pagination pagination-circle">
                                        <li className="page-item page-indicator"> <Link className="page-link" to={"#"}> <i className="la la-angle-left" /></Link> </li>
                                        <li className="page-item active"><Link className="page-link" to={"#"}>1</Link> </li>
                                        <li className="page-item"><Link className="page-link" to={"#"}>2</Link></li> 
                                        <li className="page-item page-indicator"> <Link className="page-link" to={"#"}> <i className="la la-angle-right" /></Link> </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default LicenseTable;