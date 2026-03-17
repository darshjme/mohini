import { Fragment, useState } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { IMAGES } from "../../../constant/theme";
import { Nav, Tab } from "react-bootstrap";
import CKediterCard from "../../../element/ckeditercard";
import CustomClearIndicator from "../../plugins/Select2/MultiSelect";
import { useDropzone } from 'react-dropzone';
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
function EditProduct() {
    const [file, setFile] = useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    }
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path}
        </li>
    ));
    return (
        <Fragment>
            <PageTitle activeMenu="Edit Product" motherMenu="Products" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="card h-auto">
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label required">Product Name</label>
                                            <input type="text" className="form-control" placeholder="Sample Product" />
                                        </div>
                                    </form>
                                    <label className="form-label">Description</label>
                                    <CKediterCard />
                                </div>
                            </div>
                            <div className="card h-auto">
                                <div className="card-header py-3">
                                    <h4 className="card-title--medium mb-0">Media</h4>
                                </div>
                                <div className="card-body">
                                    <div className="dz-default ic-message upload-img mb-3">
                                        <div {...getRootProps({ className: 'dropzone dz-clickable' })} style={{border:"2px solid rgba(0, 0, 0, 0.3)"}}>
                                            <input {...getInputProps()} />
                                            <div className="dz-default dz-message"
                                                style={{
                                                    textAlign: "center",
                                                    margin: "5em 0"
                                                }}
                                            >
                                                <p type="button" onClick={open}>Drop file here to upload</p>
                                                <ul>{files}</ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card h-auto">
                                <div className="card-header py-3">
                                    <h4 className="card-title--medium mb-0">Pricing</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label required">Base Price</label>
                                            <input type="number" className="form-control" placeholder="Sample product" />
                                        </div>
                                        <label className="form-label required mt-3">Discount Type</label>
                                        <Tab.Container defaultActiveKey="no_discount">
                                            <Nav as="ul" className="nav nav-pills mb-4" >
                                                <Nav.Item as="li" className="nav-item">
                                                    <Nav.Link eventKey="no_discount" className="nav-link">NO Discount</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item as="li" className="nav-item">
                                                    <Nav.Link eventKey="percentage" className="nav-link">Percentage</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item as="li" className="nav-item">
                                                    <Nav.Link eventKey="fixed_price" className="nav-link">Fixed Price</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="no_discount">
                                                    <div className="row">
                                                        <div className="col-xl-6">
                                                            <div className="mb-3">
                                                                <label className="form-label required">Tax Class</label>
                                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Taxable Goods" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <div className="mb-3">
                                                                <label className="form-label required">VAT Amount (%)</label>
                                                                <input type="number" className="form-control" id="exampleFormControlInput2" placeholder="35" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="percentage">
                                                    <div className="row">
                                                        <div className="col-xl-6">
                                                            <div className="mb-3">
                                                                <label className="form-label required">Tax Class</label>
                                                                <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="Taxable Goods" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <div className="mb-3">
                                                                <label className="form-label required">VAT Amount (%)</label>
                                                                <input type="number" className="form-control" id="exampleFormControlInput4" placeholder="35" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="fixed_price">
                                                    <div className="row">
                                                        <div className="col-xl-12">
                                                            <div className="mb-3">
                                                                <label className="form-label required">Fixed Discounted Price</label>
                                                                <input type="text" className="form-control" id="exampleFormControlInput5" placeholder="Discounted price" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <div className="mb-3">
                                                                <label className="form-label required">Tax Class</label>
                                                                <input type="text" className="form-control" id="exampleFormControlInput6" placeholder="Taxable Goods" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <div className="mb-3">
                                                                <label className="form-label required">VAT Amount (%)</label>
                                                                <input type="number" className="form-control" id="exampleFormControlInput7" placeholder="35" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="right-sidebar-sticky">
                                <div className="card">
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
                                    <div className="card-header py-3">
                                        <h4 className="card-title--medium mb-0">Tag </h4>
                                    </div>
                                    <div className="card-body">
                                    <CustomClearIndicator/>
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
                                        <h4 className="card-title--medium mb-0">Product Template</h4>
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

export default EditProduct;
