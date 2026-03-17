import { Collapse } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { tableData3 } from "../../constant/alldata";
import DatePicker from "react-datepicker";
import Select from "react-select";

const options = [
    { value: '0', label: 'Select Status' },
    { value: '1', label: 'Published' },
    { value: '2', label: 'Draft' },
    { value: '3', label: 'Trash' },
    { value: '4', label: 'Private' },
    { value: '5', label: 'Pending' }
]
function Blog() {
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);

    const [deleteItem, setDeleteItem] = useState(tableData3);
    const handleDelete = ind => {
        setDeleteItem(oldValues => {
            return oldValues.filter((_, i) => i !== ind)
        })
    }
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <PageTitle motherMenu="CMS" activeMenu="Blog" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="filter cm-content-box box-primary">
                        <div className="content-title SlideToolHeader">
                            <div className="cpa">
                                <i className="fa-sharp fa-solid fa-filter me-2" />Filter
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open ? 'collapse' : 'expand'}`} onClick={() => setOpen(!open)}>
                                    <i className="fal fa-angle-up" />
                                </Link>
                            </div>
                        </div>

                        <Collapse in={open}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-3 col-sm-6">
                                            <label className="form-label">Title</label>
                                            <input type="text" className="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="Title" />
                                        </div>
                                        <div className="col-xl-3  col-sm-6 mb-3 mb-xl-0">
                                            <label className="form-label">Status</label>
                                            <Select
                                                isSearchable={false}
                                                options={options} className="custom-react-select"
                                                placeholder="Select Status"
                                            />
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <label className="form-label">Date</label>
                                           <div className="input-hasicon mb-sm-0 mb-3 d-flex w-100 border form-control cmscalender"> 
                                                 <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    dateFormat="yyyy-MM-dd"
                                                    className="border-0 pt-2 bg-transparent clearallselect"
                                                />
                                                <div className="icon"><i className="far fa-calendar" /></div>
                                            </div> 
                                        </div>
                                        <div className="col-xl-3 col-sm-6 align-self-end">
                                            <div className="mb-1">
                                                <button className="btn btn-primary me-2" title="Click here to Search" type="button"><i className="fa fa-filter me-1" />Filter</button>
                                                <button className="btn btn-danger light" title="Click here to remove filter" type="button">Remove Filter</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="mb-4 pb-3">
                        <ul className="d-flex align-items-center flex-wrap">
                            <li><Link to={"/content-add"} className="btn btn-primary btn-sm">Add Blog</Link></li>
                            <li><Link to={"/blog-category"} className="btn btn-primary btn-sm mx-1">Blog Category</Link></li>
                            <li><Link to={"/blog-category"} className="btn btn-primary btn-sm mt-sm-0 mt-1">Add Blog Category</Link></li>
                        </ul>
                    </div>
                    <div className="filter cm-content-box box-primary ">
                        <div className={`content-title SlideToolHeader`}>
                            <div className="cpa">
                                <i className="fa-solid fa-file-lines me-1" />Blogs List
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open2 ? 'collapse' : 'expand'}`} onClick={() => setOpen2(!open2)} >
                                    <i className="fal fa-angle-up" />
                                </Link>
                            </div>
                        </div>
                        <Collapse in={open2}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Title</th>
                                                    <th>Status</th>
                                                    <th>Modified</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {deleteItem.map((item, ind) => (
                                                    <tr key={ind}>
                                                        <td>{item.number}</td>
                                                        <td>{item.title}</td>
                                                        <td>Published</td>
                                                        <td className="text-nowrap">18 May, 2025</td>
                                                        <td className="text-nowrap">
                                                            <Link to={"#"} className="btn btn-warning btn-sm content-icon">
                                                                <i className="fa fa-edit" />
                                                            </Link>
                                                            <Link to={"#"} className="btn btn-danger btn-sm content-icon" onClick={() => handleDelete(ind)} >
                                                                <i className="fa-solid fa-trash" />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="d-flex align-items-center justify-content-between justify-content-center flex-wrap">
                                            <small className="mb-lg-0 mb-2">Page 1 of 5, showing 2 records out of 8 total, starting on record 1, ending on 2</small>
                                            <nav aria-label="Page navigation example mb-2">
                                                <ul className="pagination mb-2 mb-sm-0">
                                                    <li className="page-item"><Link className="page-link" to={"#"}><i className="fa-solid fa-angle-left" /></Link></li>
                                                    <li className="page-item"><Link className="page-link" to={"#"}>1</Link></li>
                                                    <li className="page-item"><Link className="page-link" to={"#"}>2</Link></li>
                                                    <li className="page-item"><Link className="page-link" to={"#"}>3</Link></li>
                                                    <li className="page-item"><Link className="page-link" to={"#"}><i className="fa-solid fa-angle-right" /></Link></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Blog;