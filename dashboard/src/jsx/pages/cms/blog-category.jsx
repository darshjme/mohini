import React, { useReducer } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import { tableData4 } from '../../constant/alldata';

const initialState = true;
const reducer = (state, action) => {
    switch (action.type) {
        case 'openCollapse1':
            return { ...state, openCollapse1: !state.openCollapse1 }
        case 'openCollapse2':
            return { ...state, openCollapse2: !state.openCollapse2 }
        default:
            return state
    }
}
function BlogCategory() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <PageTitle motherMenu="CMS" activeMenu="Blog Category" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa"> Add Blog Category  </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            className={`SlideToolHeader ${state.openCollapse1 ? 'collapse' : 'expand'}`}
                                            onClick={() => dispatch({ type: 'openCollapse1' })}
                                        >
                                            <i className="fas fa-angle-up" />
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.openCollapse1}>
                                    <div className="cm-content-body  form excerpt">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input type="text" className="form-control" placeholder="Franklin Jr." />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Slug</label>
                                                <input type="text" className="form-control" placeholder="franklin-jr." />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                                            </div>
                                            <div>
                                                <button type="submit" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title SlideToolHeader">
                                    <div className="cpa"> Blog List </div>
                                    <div className="tools">
                                        <Link to={"#"} className={`SlideToolHeader ${state.openCollapse2 ? 'collapse' : 'expand'}`} onClick={() => dispatch({ type: 'openCollapse2' })} >
                                            <i className="fas fa-angle-up" />
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.openCollapse2}>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped verticle-middle table-responsive-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No</th>
                                                            <th scope="col">name</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableData4.map((item, ind) => (
                                                            <tr key={ind}>
                                                                <td>{item.sr}</td>
                                                                <td>{item.title}</td>
                                                                <td>
                                                                    <div className="">
                                                                        <Link to={"#"} className="text-hover">Edit</Link>
                                                                        <span> |</span> {" "}
                                                                        <Link to={"#"} className="text-hover">Up</Link>
                                                                        <span> |</span>{" "}
                                                                        <Link to={"#"} className="text-hover">down</Link>
                                                                        <span> |</span> {" "}
                                                                        <Link to={"#"} className="text-hover">delete</Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCategory;