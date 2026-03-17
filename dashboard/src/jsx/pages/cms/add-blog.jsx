import { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { IMAGES } from '../../constant/theme';
import PageTitle from '../../layouts/PageTitle';
import Select from 'react-select';
import { foodOptions, screenOption } from '../../constant/alldata';
import CKediterCard from '../../element/ckeditercard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const options = [
    { value: '1', label: 'admin@gmail.com' },
    { value: '2', label: 'India' },
    { value: '3', label: 'Information' },
    { value: '4', label: 'New Menu' },
    { value: '5', label: 'Page Menu' }
]

const initialState = true;
const reducer = (state, action) => {

    switch (action.type) {
        case 'collpase0':
            return { ...state, collpase0: !state.collpase0 }
        case 'collpase1':
            return { ...state, collpase1: !state.collpase1 }
        case 'collpase2':
            return { ...state, collpase2: !state.collpase2 }
        case 'collpase3':
            return { ...state, collpase3: !state.collpase3 }
        case 'collpase4':
            return { ...state, collpase4: !state.collpase4 }
        case 'collpase5':
            return { ...state, collpase5: !state.collpase5 }
        case 'collpase6':
            return { ...state, collpase6: !state.collpase6 }
        case 'collpase7':
            return { ...state, collpase7: !state.collpase7 }
        case 'collpase8':
            return { ...state, collpase8: !state.collpase8 }
        case 'collpase9':
            return { ...state, collpase9: !state.collpase9 }
        case 'collpase10':
            return { ...state, collpase10: !state.collpase10 }
        case 'collpase11':
            return { ...state, collpase11: !state.collpase11 }
        case 'collpase12':
            return { ...state, collpase12: !state.collpase12 }
        case 'collpase13':
            return { ...state, collpase13: !state.collpase13 }
        case 'section1':
            return { ...state, section1: !state.section1 }
        case 'section2':
            return { ...state, section2: !state.section2 }
        case 'section3':
            return { ...state, section3: !state.section3 }
        case 'section4':
            return { ...state, section4: !state.section4 }
        case 'section5':
            return { ...state, section5: !state.section5 }
        case 'section6':
            return { ...state, section6: !state.section6 }
        case 'section7':
            return { ...state, section7: !state.section7 }
        case 'section8':
            return { ...state, section8: !state.section8 }
        case 'section9':
            return { ...state, section9: !state.section9 }
        case 'section10':
            return { ...state, section10: !state.section10 }
        default:
            return state
    }
}

function AddBlog() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [file, setFile] = useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    }
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <PageTitle motherMenu="CMS" activeMenu="Add Blog" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="mb-4">
                        <ul className="d-flex align-items-center flex-wrap">
                            <li><Link to={"/blog"} className="btn btn-primary btn-sm">Blog List</Link></li>
                            <li><Link to={"/blog-category"} className="btn btn-primary btn-sm mx-1">Blog Category</Link>
                            </li>
                            <li><Link to={"/blog-category"} className="btn btn-primary btn-sm me-1 mt-sm-0 mt-1">Add
                                Blog Category</Link></li>
                            <li><Link to={"#"} className="btn btn-primary btn-sm open mt-1 mt-md-0" onClick={() => dispatch({ type: 'collpase0' })}>Screen Option</Link></li>
                        </ul>
                    </div>
                    <Collapse in={!state.collpase0} >
                        <div className="main-check" >
                            <div className="row">
                                <h6 className="mb-3">Show on screen</h6>
                                {screenOption.map((item, ind) => (
                                    <div className="col-xl-2 col-lg-3 col-sm-4" key={ind}>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <label className="form-check-label mb-0 text-nowrap"  > {item.title} </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Collapse>
                    <div className="row">
                        <div className="col-xl-8">
                            <div className='card h-auto'>
                                <div className='card-body'>
                                    <form>
                                        <div className="mb-3">
                                            <label className="from-label">Title</label>
                                            <input type="text" className="form-control" placeholder="Title" />
                                        </div>
                                    </form>
                                    <label className="form-label">Description</label>
                                    <div className="custom-ekeditor cms-radius add-content-ckeditor mb-3">
                                        <CKediterCard />
                                    </div>
                                </div>
                            </div>
                            {!state.section1 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title">
                                        <div className="cpa">Excerpt</div>
                                        <div className="tools">
                                            <Link to={"#"}
                                                className={`SlideToolHeader ${state.collpase1 ? 'collapse' : 'expand'}`}
                                                onClick={() => dispatch({ type: 'collpase1' })}
                                            >
                                                <i className="fas fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase1} className='rounded-0'>
                                        <div className="cm-content-body publish-content form excerpt">
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Excerpt</label>
                                                    <textarea className="form-control" rows="3"></textarea>
                                                    <div className="form-text">Excerpts are optional hand-crafted summaries of your content that can be used in your theme. </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section2 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa"> Custom Fields </div>
                                        <div className="tools">
                                            <Link to={"#"} onClick={() => dispatch({ type: 'collpase2' })} className={`SlideToolHeader ${state.collpase2 ? 'collapse' : 'expand'}`} >
                                                <i className="fas fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase2}>
                                        <div className="cm-content-body form excerpt">
                                            <div className="card-body">
                                                <h6 className="mb-4 font-w500">Add New Custom Field:</h6>
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <form>
                                                            <div className="mb-3">
                                                                <label className="from-label">Title</label>
                                                                <input type="text" className="form-control" placeholder="Title" />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-6">
                                                        <label className="from-label">Value</label>
                                                        <textarea className="form-control" rows="2"></textarea>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-sm mt-3 mt-sm-0">Add Custom Field</button>
                                                <p className="mt-3 mb-0">Custom fields can be used to extra metadata to a post that you can use in your theme.</p>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section3 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className={`content-title SlideToolHeader`}>
                                        <div className="cpa"> Discussion</div>
                                        <div className="tools">
                                            <Link to={"#"} className={`SlideToolHeader ${state.collpase3 ? 'collapse' : 'expand'}`} onClick={() => dispatch({ type: 'collpase3' })} >
                                                <i className="fal fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase3}>
                                        <div className="cm-content-body form excerpt">
                                            <div className="card-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">  Allow comments. </label>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section4 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">Slug</div>
                                        <div className="tools">
                                            <Link to={"#"} className={`SlideToolHeader ${state.collpase4 ? 'collapse' : 'expand'}`} onClick={() => dispatch({ type: 'collpase4' })} >
                                                <i className="fal fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase4}>
                                        <div className="cm-content-body form excerpt">
                                            <div className="card-body">
                                                <label className="from-label">Slug</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section5 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">Author</div>
                                        <div className="tools">
                                            <Link to={"#"} className={`SlideToolHeader ${state.collpase5 ? 'collapse' : 'expand'}`} onClick={() => dispatch({ type: 'collpase5' })} >
                                                <i className="fal fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase5}>
                                        <div className="cm-content-body form excerpt">
                                            <div className="card-body">
                                                <label className="from-label">User</label>
                                                <Select
                                                    isSearchable={false}
                                                    options={options} className="custom-react-select"
                                                />
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section6 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">Seo</div>
                                        <div className="tools">
                                            <Link to={"#"} className={`SlideToolHeader ${state.collpase6 ? 'collapse' : 'expand'}`} onClick={() => dispatch({ type: 'collpase6' })} >
                                                <i className="fal fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase6}>
                                        <div className="cm-content-body form excerpt">
                                            <div className="card-body">
                                                <label className="form-label">Page Title</label>
                                                <input type="text" className="form-control mb-3" placeholder="Page title" />
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <label className="form-label">Keywords</label>
                                                        <input type="text" className="form-control mb-3 mb-sm-0" placeholder="Enter meta Keywords" />
                                                    </div>
                                                    <div className="col-xl-6 col-sm-6">
                                                        <label className="form-label">Descriptions</label>
                                                        <textarea className="form-control" placeholder="Enter meta Keywords" rows="3"></textarea>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                        </div>
                        <div className="col-xl-4">
                            {!state.section7 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className={`content-title SlideToolHeader`}>
                                        <div className="cpa"> Published </div>
                                        <div className="tools">
                                            <Link to={"#"} className={`SlideToolHeader ${state.collpase7 ? 'collapse' : 'expand'}`} onClick={() => dispatch({ type: 'collpase7' })}>
                                                <i className="fas fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase7} className='rounded-0'>
                                        <div className="cm-content-body publish-content form excerpt">
                                            <div className="card-body py-3">
                                                <ul className="list-style-1 block">
                                                    <li>
                                                        <div>
                                                            <label className="form-label mb-0 me-2"> <i className="fa-solid fa-key" /> Status: </label>
                                                            <span className="font-w500">Published</span>
                                                            <Link to={"#"} className="badge badge-primary light ms-3" onClick={() => dispatch({ type: 'collpase8' })} > Edit </Link>
                                                        </div>
                                                        <Collapse in={state.collpase8}>
                                                            <div className=" border rounded p-3 mt-3">
                                                                <div className="mb-2">
                                                                    <label className="form-label w-100">Content Type</label>
                                                                    <select className="form-control solid default-select">
                                                                        <option selected>Select Status</option>
                                                                        <option value="1">Published</option>
                                                                        <option value="2">Draft</option>
                                                                        <option value="3">Trash</option>
                                                                        <option value="4">Private</option>
                                                                        <option value="5">Pending</option>
                                                                    </select>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <button className="btn btn-primary btn-sm me-2" type="button"> Ok </button>
                                                                    <button className="btn btn-danger light btn-sm" type="button"> Cancel </button>
                                                                </div>
                                                            </div>
                                                        </Collapse>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <label className="form-label mb-0 me-2"> <i className="fa-solid fa-eye" />  Visible: </label>
                                                            <span className="font-w500">Public</span>
                                                            <Link to={"#"} className="badge badge-primary light ms-3" onClick={() => dispatch({ type: 'collpase9' })} >Edit</Link>
                                                        </div>
                                                        <Collapse in={state.collpase9}>
                                                            <div className="p-3 mt-3 border rounded">
                                                                <div className="basic-form">
                                                                    <form>
                                                                        <div className="mb-3 mb-0">
                                                                            <div className="radio">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                                                                    <label className="form-check-label" htmlFor="flexRadioDefault1"> Public </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="radio">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                                                                    <label className="form-check-label" htmlFor="flexRadioDefault2"> Password Protected </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="radio disabled">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                                                                    <label className="form-check-label" htmlFor="flexRadioDefault3"> Private </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div>
                                                                    <button className="btn btn-primary btn-sm me-2" type="button"> Ok </button>
                                                                    <button className="btn btn-danger light btn-sm" type="button"> Cancel </button>
                                                                </div>
                                                            </div>
                                                        </Collapse>
                                                    </li>
                                                    <li className="border-bottom-0">
                                                        <div>
                                                            <label className="form-label mb-0 me-2"> <i className="fa-solid fa-calendar-days" /> Published </label>
                                                            <span className="font-w500"> on :24-09-2023 16:22:52</span>
                                                            <Link to={"#"} className="badge badge-primary light ms-3" onClick={() => dispatch({ type: 'collpase10' })} >Edit </Link>
                                                        </div>
                                                        <Collapse in={!state.collpase10}>
                                                            <div className="p-3 mt-3 border rounded"> 
                                                                    <div className="input-hasicon mb-sm-0 mb-3 d-flex w-100 border form-control cmscalender">
                                                                        <DatePicker
                                                                            selected={startDate}
                                                                            onChange={(date) => setStartDate(date)}
                                                                            dateFormat="2025-05-10"
                                                                            className="border-0 pt-2 bg-transparent clearallselect"
                                                                        />
                                                                        <div className="icon"><i className="far fa-calendar" /></div>
                                                                    </div>  
                                                                <div className="mt-3">
                                                                    <button className="btn btn-primary btn-sm me-2" type="button"> Ok </button>
                                                                    <button className="btn btn-danger light btn-sm" type="button"> Cancel </button>
                                                                </div>
                                                            </div>
                                                        </Collapse>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-footer border-top text-end py-3 ">
                                                <Link to={"#"} className="btn btn-primary btn-sm">Publish</Link>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section8 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title">
                                        <div className="cpa">
                                            Categories
                                        </div>
                                        <div className="tools">
                                            <Link to={"#"}
                                                className={`SlideToolHeader ${state.collpase11 ? 'collapse' : 'expand'}`}
                                                onClick={() => dispatch({ type: 'collpase11' })}
                                            >
                                                <i className="fas fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase11} className='rounded-0'>
                                        <div className="cm-content-body publish-content form excerpt">
                                            <div className="card-body">
                                                <div className="border rounded p-3 mb-3">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-10" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault-10">Food</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-11" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault-11">Beauty</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-12" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault-12">Fashion</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-13" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault-13">Lifestyle</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-14" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault-14">Food</label>
                                                    </div>
                                                </div>
                                                <Link to={"#"}><i className="fas fa-plus"></i> Add New Categories</Link>
                                                <div className="input-group mt-3">
                                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                    <span className="input-group-text" id="basic-addon1"><Link to={"#"}>Add New</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section9 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title">
                                        <div className="cpa">
                                            Tag
                                        </div>
                                        <div className="tools">
                                            <Link to={"#"}
                                                className={`SlideToolHeader ${state.collpase12 ? 'collapse' : 'expand'}`}
                                                onClick={() => dispatch({ type: 'collpase12' })}
                                            >
                                                <i className="fas fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase12} className='rounded-0'>
                                        <div className="cm-content-body form excerpt">
                                            <div className="card-body">
                                                <Select
                                                    className='select2dark'
                                                    closeMenuOnSelect={false}
                                                    defaultValue={[foodOptions[0], foodOptions[2]]}
                                                    isMulti
                                                    options={foodOptions}
                                                />
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {!state.section10 &&
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa"> Featured Image </div>
                                        <div className="tools">
                                            <Link to={"#"} className={`SlideToolHeader ${state.collpase13 ? 'collapse' : 'expand'}`} onClick={() => dispatch({ type: 'collpase13' })} >
                                                <i className="fas fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase13} className='rounded-0'>
                                        <div className="cm-content-body publish-content form excerpt">
                                            <div className="card-body">
                                                <div className="avatar-upload d-flex align-items-center">
                                                    <div className=" position-relative ">
                                                        <div className="avatar-preview">
                                                            <div id="imagePreview" style={{ backgroundImage: file ? `url(${URL.createObjectURL(file)})` : `url(${IMAGES.noimageavatar})` }} > </div>
                                                        </div>
                                                        <div className="change-btn d-flex align-items-center flex-wrap">
                                                            <input type="file" onChange={fileHandler} id="imageUpload" className='form-control d-none' />
                                                            <label htmlFor="imageUpload" className="btn btn-light ms-0">Select Image</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AddBlog;
