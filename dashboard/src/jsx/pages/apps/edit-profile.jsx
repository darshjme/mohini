import { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import { IMAGES } from "../../constant/theme";
import { Link } from "react-router-dom";
import Select from "react-select";

const options = [
    { value: 'html', label: 'Male' },
    { value: 'css', label: 'Female' },
    { value: 'javascript', label: 'Other' },
]
const options2 = [
    { value: '0', label: 'Please select' },
    { value: '1', label: 'Russia' },
    { value: '2', label: 'Canada' },
    { value: '3', label: 'China' },
    { value: '4', label: 'India' },
]
const options3 = [
    { value: '0', label: 'Please select' },
    { value: '1', label: 'Krasnodar' },
    { value: '2', label: 'Tyumen' },
    { value: '3', label: 'Chelyabinsk' },
    { value: '4', label: 'Moscow' },
]
function EditProfile() {
    return (
        <Fragment>
            <PageTitle activeMenu="Edit Profile" motherMenu="App" />
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <div className="clearfix">
                        <div className="card  profile-card author-profile m-b30">
                            <div className="card-body">
                                <div className="p-5">
                                    <div className="author-profile">
                                        <div className="author-media">
                                            <img src={IMAGES.tab1} alt="" />
                                            <div className="upload-link" title="" data-toggle="tooltip" data-placement="right" data-original-title="update">
                                                <input type="file" className="update-flie" />
                                                <i className="fa fa-camera" />
                                            </div>
                                        </div>
                                        <div className="author-info">
                                            <h6 className="title">Nella Vita</h6>
                                            <span>Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-list">
                                    <ul>
                                        <li><Link to="/app-profile">Models</Link><span>36</span></li>
                                        <li><Link to="/uc-lightgallery">Gallery</Link><span>3</span></li>
                                        <li><Link to="/app-profile">Lessons</Link><span>1</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="input-group mb-3">
                                    <div className="form-control rounded text-center">Portfolio</div>
                                </div>
                                <div className="input-group">
                                    <Link to="https://www.dexignlab.com/" target="_blank" className="form-control text-hover rounded ">www.dexignlab.com</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-8">
                    <div className="card profile-card m-b30">
                        <div className="card-header">
                            <h4 className="card-title">Account setup</h4>
                        </div>
                        <form className="profile-form">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="Name">Name</label>
                                            <input type="text" className="form-control" defaultValue="John" id="Name" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="Surname">Surname</label>
                                            <input type="text" className="form-control" defaultValue="osib" id="Surname" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="Specialty">Specialty</label>
                                            <input type="text" className="form-control" defaultValue="Developer" id="Specialty" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="Skills">Skills</label>
                                            <input type="text" className="form-control" defaultValue="HTML,  JavaScript,  PHP" id="Skills" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label">Gender</label> 
                                            <Select
                                                isSearchable={false}
                                                options={options} className="custom-react-select"
                                                placeholder="Select Gender"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="datepicker">DOB</label>
                                            <div className="input-hasicon mb-xl-0 mb-3">
                                                <input className="form-control mb-xl-0 mb-3 bt-datepicker" type="date" id="datepicker" />
                                                <div className="icon"><i className="far fa-calendar" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <input type="number" className="form-control" placeholder="123456789" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="Email">Email address</label>
                                            <input type="text" className="form-control" defaultValue="demo@gmail.com" id="Email" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label">Country</label>
                                            <Select
                                                isSearchable={false}
                                                options={options2} className="custom-react-select"
                                                placeholder="Select Country"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <div className="mb-3">
                                            <label className="form-label">City</label>
                                            <Select
                                                isSearchable={false}
                                                options={options3} className="custom-react-select"
                                                placeholder="Select City"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">UPDATE</button>
                                <Link to="/page-forgot-password" className="text-hover float-end">Forgot your password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default EditProfile;
