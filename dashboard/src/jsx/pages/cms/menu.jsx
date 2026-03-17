import { useState } from 'react';
import { Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import PageTitle from '../../layouts/PageTitle';
import MenusBlog from '../../components/cms/MenusBlog';
import MenusBlog2 from '../../components/cms/MenusBlog2';
import Select from 'react-select'; 

const options = [
    { value: '1', label: 'India' },
    { value: '2', label: 'Information' },
    { value: '3', label: 'New Menu' },
    { value: '4', label: 'Page Menu' }
]

function Menu() {
    const [open, setOpen] = useState(true);    

    return (
        <>
            <PageTitle motherMenu="CMS" activeMenu="Menus" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="filter cm-content-box box-primary">
                        <div className="content-title SlideToolHeader">
                            <div className="cpa"> <i className="fa fa-list-alt me-2" /> Menu </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open ? 'collapse' : 'expand'}`} onClick={() => setOpen(!open)}>
                                    <i className="fas fa-angle-up" />
                                </Link>
                            </div>
                        </div>
                        <Collapse in={open}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-xl-3 col-xxl-3 col-lg-4 mb-lg-0 mb-3">
                                            <h6 className="mb-0">Select a menu to edit:  </h6>
                                        </div>
                                        <div className="col-xl-6 col-xxl-5 col-lg-4 mb-lg-0 mb-3">
                                            <Select 
                                                isSearchable = {false}
                                                options={options} className="custom-react-select"
                                            />
                                        </div>
                                        <div className="col-xl-3 col-xxl-4 col-lg-4">
                                            <Link to={"#"} className="btn btn-primary">Select</Link>
                                            <span className="mx-2 d-inline-block">or</span>
                                            <Link to={"#"} className="text-primary">create new menu</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="row">
                        <div className="col-xl-4">
                            <MenusBlog />
                        </div>
                        <div className="col-xl-8">
                            <MenusBlog2 />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Menu;