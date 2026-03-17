import { Fragment, useState } from "react";
import { IMAGES } from "../../constant/theme";
import { useNavigate } from "react-router-dom";

function BasicForm() {
    const [file, setFile] = useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    }
    const navigate = useNavigate();
    const onSubmit = (e) => {        
        e.preventDefault();
        navigate("/dashboard");
      };
    return (
        <Fragment>
            <form  className="mt-2" onSubmit={(e) => onSubmit(e)}>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <label className="form-label mb-md-0">Avatar</label>
                    </div>
                    <div className="col-md-9">
                        <div className="d-inline-block position-relative me-4 mb-3 mb-lg-0 account-profile">
                            <div className="avatar-preview rounded">
                                <div id="imagePreview" className="rounded-4 profile-avatar" 
                                  style={{ backgroundImage: file ? "url(" + URL.createObjectURL(file) + ")" : "url(" + IMAGES.avatarpic7 + ")" }}
                                >
                                </div>
                            </div>
                            <div className="upload-link" title="">
                                <input type="file" className="update-flie" id="imageUpload" onChange={fileHandler}/>
                                <i className="fa-solid fa-pen-to-square fs-16" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center mb-4">
                    <div className="col-md-3">
                        <label className="form-label mb-md-0">Full Name</label>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-sm-6">
                                <input type="text" className="form-control" placeholder="First Name" />
                            </div>
                            <div className="col-sm-6 mt-2 mt-sm-0">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center mb-4">
                    <div className="col-md-3">
                        <label className="form-label mb-md-0">Company</label>
                    </div>
                    <div className="col-md-9">
                        <input type="text" className="form-control" placeholder="DexignLab" />
                    </div>
                </div>
                <div className="row align-items-center mb-4">
                    <div className="col-md-3">
                        <label className="form-label mb-md-0">Contact Phone</label>
                    </div>
                    <div className="col-md-9">
                        <input type="number" className="form-control" placeholder="044 3276 454 935" />
                    </div>
                </div>
                <div className="row align-items-center mb-4">
                    <div className="col-md-3">
                        <label className="form-label mb-md-0">Company Site</label>
                    </div>
                    <div className="col-md-9">
                        <input type="text" className="form-control" placeholder="https://dexignlab.com/" />
                    </div>
                </div>
                <div className="row align-items-center mb-4">
                    <div className="col-md-3">
                        <label className="form-label mb-md-0">Country</label>
                    </div>
                    <div className="col-md-9">
                        <select className="default-select form-control">
                            <option>Please select</option>
                            <option>India</option>
                            <option>China</option>
                            <option>USA</option>
                        </select>
                    </div>
                </div>
                <div className="row align-items-center mb-4">
                    <div className="col-md-3">
                        <label className="form-label mb-md-0">Notifications</label>
                    </div>
                    <div className="col-md-9">
                        <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                            <input type="checkbox" className="form-check-input mb-0" id="checkboxEmail" required />
                            <label className="form-check-label" htmlFor="checkboxEmail">Email</label>
                        </div>
                        <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                            <input type="checkbox" className="form-check-input mb-0" id="checkboxPhone" required />
                            <label className="form-check-label" htmlFor="checkboxPhone">Phone</label>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center mb-3">
                    <div className="col-md-3 col-6">
                        <label className="form-label mb-md-0">Allow Changes</label>
                    </div>
                    <div className="col-md-9 col-6">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
export default BasicForm;