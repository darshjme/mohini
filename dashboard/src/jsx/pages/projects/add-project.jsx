import { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import CKediterCard from "../../element/ckeditercard";
import CustomClearIndicator from "../plugins/Select2/MultiSelect";
import Select from "react-select";

const options = [
    { value: '1', label: 'Published' },
    { value: '2', label: 'Scheduled' },
]
const options2 = [
    { value: '0', label: 'Electronics' },
    { value: '1', label: 'Office  ' },
    { value: '2', label: 'Fashion' },
]
const options3 = [
    { value: '0', label: 'worldnice' },
    { value: '1', label: 'pixio' },
    { value: '2', label: 'w3crm' },
    { value: '3', label: 'jiade' },
]
function AddProject() {
    return (
        <Fragment>
            <PageTitle activeMenu="Add Project" motherMenu="Projects" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="card h-auto">
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label required">Project Name</label>
                                            <input type="text" className="form-control" placeholder="Worldnic" />
                                        </div>
                                    </form>
                                    <label className="form-label">Description</label>
                                    <CKediterCard />
                                </div>
                            </div>
                            <div className="card h-auto">
                                <div className="card-header py-3">
                                    <h4 className="card-title--medium mb-0">Add Project Filed</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Project Name</label>
                                                <Select
                                                    isSearchable={false}
                                                    options={options3} className="custom-react-select"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Url</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="worldnic.dexignlab.com" />
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Owner</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="Yatin xarma" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card h-auto">
                                <div className="card-header py-3">
                                    <h4 className="card-title--medium mb-0">Add Project Search</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Project Name</label>
                                                <Select
                                                    isSearchable={false}
                                                    options={options3} className="custom-react-select"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Project Description</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput4" placeholder="Simple AWS Project" />
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Project State</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput5" placeholder="Created" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-xl-4">
                            <div className="right-sidebar-sticky">
                                <div className="card h-auto">
                                    <div className="card-header py-3">
                                        <h4 className="card-title--medium mb-0">Project Category</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault"> Bulding</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-1" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault-1"> Commerical</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-3" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault-3"> Ecommerce</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-4" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault-4"> Crypto</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="card h-auto">
                                    <div className="card-header py-3">
                                        <h4 className="card-title--medium mb-0">Tag </h4>
                                    </div>
                                    <div className="card-body">
                                        <CustomClearIndicator />
                                    </div>
                                </div>
                                <div className="card h-auto">
                                    <div className="card-header py-3">
                                        <h4 className="card-title--medium mb-0">Status </h4>
                                    </div>
                                    <div className="card-body">
                                        <label className="form-label">Status Type</label>
                                        <Select
                                            isSearchable={false}
                                            options={options} className="custom-react-select"
                                            placeholder="Select Status"
                                        />
                                    </div>
                                </div>
                                <div className="card h-auto">
                                    <div className="card-header py-3">
                                        <h4 className="card-title--medium mb-0">Project Name</h4>
                                    </div>
                                    <div className="card-body">
                                        <label className="form-label">Select a store template</label>
                                        <Select
                                            isSearchable={false}
                                            options={options2} className="custom-react-select"
                                            placeholder="Select Store Template"
                                        />
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

export default AddProject;
