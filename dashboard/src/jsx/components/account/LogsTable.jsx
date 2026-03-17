import { Fragment,  useState } from "react";
import { Link } from "react-router-dom";

const CountryTable = [
    {
        country: "China",
        status: "OK",
        statusClass: "success",
        platform: "Chrome - Windows",
        ip: "236.125.56.78",
        timeAgo: "2 mins ago"
    },
    {
        country: "India",
        status: "ERROR",
        statusClass: "danger",
        platform: "Firefox - Windows",
        ip: "236.125.56.54",
        timeAgo: "20 mins ago"
    },
    {
        country: "United States",
        status: "ERROR",
        statusClass: "danger",
        platform: "Safari - Mac",
        ip: "236.125.56.78",
        timeAgo: "27 mins ago"
    },
    {
        country: "Indonesia",
        status: "OK",
        statusClass: "success",
        platform: "iOS - iPhone Pro",
        ip: "236.100.56.50",
        timeAgo: "40 mins ago"
    },
    {
        country: "Pakistan",
        status: "OK",
        statusClass: "success",
        platform: "Firefox - Windows",
        ip: "236.125.56.54",
        timeAgo: "48 mins ago"
    },
    {
        country: "Brazil",
        status: "ERROR",
        statusClass: "danger",
        platform: "Safari - Mac",
        ip: "236.125.56.78",
        timeAgo: "54 mins ago"
    },
    {
        country: "China",
        status: "OK",
        statusClass: "success",
        platform: "Chrome - Windows",
        ip: "236.125.56.78",
        timeAgo: "2 mins ago"
    },
    {
        country: "India",
        status: "ERROR",
        statusClass: "danger",
        platform: "Firefox - Windows",
        ip: "236.125.56.54",
        timeAgo: "20 mins ago"
    },
    {
        country: "United States",
        status: "ERROR",
        statusClass: "danger",
        platform: "Safari - Mac",
        ip: "236.125.56.78",
        timeAgo: "27 mins ago"
    },
    {
        country: "Indonesia",
        status: "OK",
        statusClass: "success",
        platform: "iOS - iPhone Pro",
        ip: "236.100.56.50",
        timeAgo: "40 mins ago"
    },
    {
        country: "Pakistan",
        status: "OK",
        statusClass: "success",
        platform: "Firefox - Windows",
        ip: "236.125.56.54",
        timeAgo: "48 mins ago"
    }
];

function LogsTable() {
    const [data, setData] = useState([...CountryTable]);
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

    return (
        <Fragment>
            <div className="dataTables_wrapper no-footer" id="applications-data">
                <table id="tableLogs" className="table mb-4 table-striped-thead table-wide table-sm dataTable no-footer text-nowrap">
                    <thead>
                        <tr>
                            <th className="sorting c-pointer" onClick={() => sortData('country')}>Location</th>
                            <th className="sorting c-pointer" onClick={() => sortData('status')}>Status</th>
                            <th className="sorting c-pointer" onClick={() => sortData('platform')}>Device</th>
                            <th className="sorting c-pointer" onClick={() => sortData('ip')}>IP Address</th>
                            <th className="text-end sorting c-pointer" onClick={() => sortData('timeAgo')}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, ind) => (
                            <tr key={ind}>
                                <td className="sorting_1">{item.country}</td>
                                <td><span className={`badge badge-sm light border-0 badge-${item.statusClass}`}>{item.status}</span></td>
                                <td><Link to={"#"} className="text-primary">{item.platform}</Link></td>
                                <td>{item.ip}</td>
                                <td className="text-end">{item.timeAgo}</td>
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
        </Fragment>
    )
}
export default LogsTable;