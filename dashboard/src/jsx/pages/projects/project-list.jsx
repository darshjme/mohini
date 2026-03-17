import { Fragment } from "react"
import PageTitle from "../../layouts/PageTitle"
import { Link } from "react-router-dom"; 
import { useState } from "react";

const categorytabledta = [
    {
        sn: 1,
        projectname: <div>
            <h6>Create Frontend Glower</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "Mana William",
        assigneeby: "Yatin xarma",
        startdate: "26 June 2023",   
        enddate: "07 June 2032",
        progress: <span className="badge badge-warning light">Pending</span>,
    },
    {
        sn: 2,
        projectname: <div>
            <h6>Create Frontend Glower</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "Mana William",
        assigneeby: "Yatin xarma",
        startdate: "26 June 2023",   
        enddate: "07 June 2032",
        progress: <span className="badge badge-warning light">Pending</span>,
    },
    {
        sn: 3,
        projectname: <div>
            <h6>Create Frontend Glower</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "Mana William",
        assigneeby: "Yatin xarma",
        startdate: "26 June 2023",   
        enddate: "07 June 2032",
        progress: <span className="badge badge-warning light">Pending</span>,
    },
    {
        sn: 4,
        projectname: <div>
            <h6>Create Frontend WordPress</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "James Soap",
        assigneeby: "Yatin xarma",
        startdate: "26 June 2023",   
        enddate: "07 June 2032",
        progress:<span className="badge badge-success light">Success</span>,
    },
    {
        sn: 5,
        projectname: <div>
            <h6>Create Frontend WordPress</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "James Soap",
        assigneeby: "Yatin xarma",
        startdate: "26 June 2023",   
        enddate: "07 June 2032",
        progress:<span className="badge badge-success light">Success</span>,
    },
    {
        sn: 6,
        projectname: <div>
            <h6>Create Frontend WordPress</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "James Soap",
        assigneeby: "Yatin xarma",
        startdate: "06 Feb 2024",   
        enddate: "15 Feb 2024",
        progress:<span className="badge badge-success light">Success</span>,
    },
    {
        sn: 7,
        projectname: <div>
            <h6>HTML To React Convert</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "Jack Adja",
        assigneeby: "YHarry Sir",
        startdate: "06 Feb 2024",   
        enddate: "15 Feb 2024",
        progress: <span className="badge badge-success light">Success</span>,
    },
    {
        sn: 8,
        projectname: <div>
            <h6>HTML To wordpress</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "Mana William",
        assigneeby: "	john sir",
        startdate: "08 March 2024",   
        enddate: "15 March 2024",
        progress: <span className="badge badge-warning light">Pending</span>,
    },
    {
        sn: 9,
        projectname: <div>
            <h6>Create Frontend Glower</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "Mana William",
        assigneeby: "Yatin xarma",
        startdate: "26 June 2023",   
        enddate: "07 June 2032",
        progress: <span className="badge badge-warning light">Pending</span>,
    },
    {
        sn: 10,
        projectname: <div>
            <h6>Create Frontend WordPress</h6>
            <span>INV-100023456</span>
        </div>,
        projectlead: "James Soap",
        assigneeby: "Yatin xarma",
        startdate: "26 June 2023",   
        enddate: "07 June 2032",
        progress:<span className="badge badge-success light">Success</span>,
    },  
]

function ProjectList() {
    const [data, setData] = useState([...categorytabledta]);
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
            <PageTitle activeMenu="Product List" motherMenu="Products" />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Project List</h4>
                            <Link to="/add-project" className="btn btn-primary btn-sm">Add Project</Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="dataTables_wrapper no-footer">
                                    <table id="projectlist" className="display dataTable no-footer">
                                        <thead>
                                            <tr>
                                                <th className="sorting c-pointer" onClick={() => sortData('sn')} style={{width: '150px'}}> SN. </th>
                                                <th className="sorting c-pointer" onClick={() => sortData('projectname')} style={{width: '300px'}}>Project Name</th>
                                                <th className="sorting c-pointer" onClick={() => sortData('projectlead')} style={{width: '200px'}}>Project Lead</th>
                                                <th className="sorting c-pointer" onClick={() => sortData('assigneeby')} style={{width: '200px'}}>Assignee By</th>
                                                <th className="sorting c-pointer" onClick={() => sortData('startdate')} style={{width: '200px'}}>Start Date</th>
                                                <th className="sorting c-pointer" onClick={() => sortData('enddate')} style={{width: '200px'}}>Ending Date</th>
                                                <th className="sorting c-pointer" onClick={() => sortData('progress')} style={{width: '200px'}}>Progress</th>
                                                <th className="sorting c-pointer" style={{width: '200px'}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={index} style={{borderBottom:"1px solid rgba(82, 79, 79, 0.3)"}}>
                                                    <td className="sorting_1"> {item.sn}</td>
                                                    <td>{item.projectname}</td>
                                                    <td>{item.projectlead}</td>
                                                    <td>{item.assigneeby}</td>
                                                    <td>{item.startdate}</td>
                                                    <td>{item.enddate}</td>
                                                    <td>{item.progress}</td>
                                                    <td>
                                                        <div className="d-flex">
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
                                            <p className="mb-0 text-black"> Showing 1 to 10 of 12 entries</p>
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
        </Fragment>
    )
}

export default ProjectList