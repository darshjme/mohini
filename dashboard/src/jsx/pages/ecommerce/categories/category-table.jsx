import { Fragment } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../constant/theme";
import { useState } from "react";

const categorytabledta = [
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category14} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Air Conditioner </h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category14} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Air Conditioner </h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 100,
        type: <span className="badge badge-sm badge-success light">Manual</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category8} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">laptop</h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category14} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Air Conditioner </h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 100,
        type: <span className="badge badge-sm badge-success light">Manual</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category8} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">laptop</h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category13} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Fan</h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category14} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Air Conditioner </h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 100,
        type: <span className="badge badge-sm badge-success light">Manual</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category8} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">laptop</h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category13} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Fan</h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category14} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Air Conditioner </h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 100,
        type: <span className="badge badge-sm badge-success light">Manual</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category8} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">laptop</h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
    {
        products: 10,
        type: <span className="badge badge-sm badge-primary light">Automated</span>,
        category: <div className="d-flex align-items-center">
            <img src={IMAGES.category13} className="rounded-lg me-2" width="40" alt="" />
            <div>
                <h6 className="w-space-no mb-0 fs-14 font-w600">Fan</h6>
                <small>Our computers and tablets include all the big brands.</small>
            </div>
        </div>,
    },
]

function CategoryTable() {
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
            <PageTitle activeMenu="Category Table" motherMenu="Category" />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Category List</h4>
                            <Link to="/add-categary" className="btn btn-primary btn-sm">Add Category</Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="dataTables_wrapper no-footer">
                                    <table id="projectlist" className="display dataTable no-footer">
                                        <thead>
                                            <tr style={{borderBottom:"1px solid #e0e0e0"}}>
                                                <th style={{ width: "50px" }} className="sorting">
                                                    <div className="form-check custom-checkbox checkbox-primary  me-3">
                                                        <input type="checkbox" className="form-check-input product_order_single" id="checkAll" required="" onClick={() => chackboxFun("all")} />
                                                        <label className="form-check-label" htmlFor="checkAll"></label>
                                                    </div>
                                                </th>
                                                <th className="sorting c-pointer" onClick={() => sortData('category')} style={{ width: "460px" }}>Category</th>
                                                <th className="sorting c-pointer" onClick={() => sortData('products')}>Products</th>
                                                <th className="sorting c-pointer" onClick={() => sortData('type')}>Category Type</th>
                                                <th className="sorting text-end c-pointer" >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={index} style={{borderBottom:"1px solid rgba(82, 79, 79, 0.3)"}}>
                                                    <td className="sorting_1">
                                                        <div className="form-check custom-checkbox checkbox-primary me-3">
                                                            <input type="checkbox" className="form-check-input product_order" id="customCheckBox2" required="" onClick={() => chackboxFun()} />
                                                            <label className="form-check-label" htmlFor="customCheckBox2"></label>
                                                        </div>
                                                    </td>
                                                    <td style={{ width: "30%" }}> {item.category}</td>
                                                    <td>{item.products}</td>
                                                    <td>{item.type}</td>
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

export default CategoryTable;
