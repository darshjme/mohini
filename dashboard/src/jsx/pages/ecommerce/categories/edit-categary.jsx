import { Fragment, useState } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { IMAGES } from "../../../constant/theme";
import CKediterCard from "../../../element/ckeditercard";
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
function EditCategory() {
    const [file, setFile] = useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    }
    return (
        <Fragment>
            <PageTitle activeMenu="Edit Category" motherMenu="Categories" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="card h-auto">
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label required">Category Name</label>
                                            <input type="text" className="form-control" placeholder="Fashion" />
                                        </div>
                                    </form>
                                    <label className="form-label">Description</label>
                                    <CKediterCard/>
                                </div>
                            </div>
                            <div className="card h-auto">
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label required">Meta Tag Title</label>
                                            <input type="text" className="form-control" placeholder="Meta Tag Name" />
                                        </div>
                                    </form>
                                    <label className="form-label">Meta Tag Description</label>
                                    <CKediterCard/>
                                    <div className="mt-3">
                                        <label className="form-label required">Meta Tag Keywords</label>
                                        <input type="text" className="form-control" placeholder="Meta Tag Keywords" />
                                    </div>
                                </div>
                            </div>
                            <div className="card h-auto">
                                <div className="card-header d-block py-3">
                                    <h4 className="card-title--medium mb-0">Automation</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-6 col-sm-6">
                                            <div className="check-ai"  >
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="manual" name="automationSelect" id="ManualInput" />
                                                    <label className="form-check-label" for="ManualInput">
                                                        <span className="text-dark d-block font-w600 fs-15 mb-2">Manual</span>
                                                        <span>Add products to this category one by one by manually selecting this category during product creation or update.</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-sm-0 mt-3">
                                            <div className="check-ai"   >
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="automatic" name="automationSelect" id="AutomaticInput" />
                                                    <label className="form-check-label" for="AutomaticInput">
                                                        <span className="text-dark d-block font-w600 fs-15 mb-2">Automatic</span>
                                                        <span>Add products to this category one by one by manually selecting this category during product creation or update.</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="check-sub-bx mt-3" style={{ display: "none" }}>
                                                <div className="row">
                                                    <div className="col-xl-3">
                                                        <div className="mb-3">
                                                            <label className="form-label required">Product Tag</label>
                                                            <select className=" default-select w-100" aria-label="Default select example">
                                                                <option selected>Product Title</option>
                                                                <option value="1">Product Tag</option>
                                                                <option value="2">Product Price</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="mb-3">
                                                            <label className="form-label required">Product Margin</label>
                                                            <select className=" default-select w-100" aria-label="Default select example">
                                                                <option selected>is less then</option>
                                                                <option value="1">is equal to</option>
                                                                <option value="2">is greater then</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="mb-3">
                                                            <label for="exampleFormControlInput1" className="form-label required">Quntity</label>
                                                            <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="1" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3 align-self-end">
                                                        <div className="mb-3">
                                                            <button className="btn btn-primary btn-sm" id="add-btn"> <i className="fa-solid fa-plus me-3"></i>Add another condition</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="right-sidebar-sticky">
                                <div className="card h-auto">
                                    <div className="card-header  py-3">
                                        <h4 className="card-title--medium mb-0">Thumbnail</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="avatar-upload d-flex align-items-center">
                                            <div className=" position-relative ">
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: file ? "url(" + URL.createObjectURL(file) + ")" : "url(" + IMAGES.addcategory + ")" }}> </div>
                                                </div>
                                                <div className="change-btn d-flex align-items-center flex-wrap">
                                                    <input type='file' className="form-control d-none" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={fileHandler} />
                                                    <label htmlFor="imageUpload" className="btn btn-primary light ms-0" >Select Image</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card h-auto">
                                    <div className="card-header  py-3">
                                        <h4 className="card-title--medium mb-0">Status</h4>
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
                                    <div className="card-header  py-3">
                                        <h4 className="card-title--medium mb-0">Store Template</h4>
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

export default EditCategory;
