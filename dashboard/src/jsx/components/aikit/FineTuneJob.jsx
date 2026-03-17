import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { IMAGES, SVGICON } from '../../constant/theme'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Form } from 'react-bootstrap';  

const data = [
    { icon: IMAGES.englandsvg, value: 1, label: 'England', },
    { icon: IMAGES.indiasvg, value: 2, label: 'India', },
    { icon: IMAGES.uaesvg, value: 3, label: 'UAE' },
]

const FineTuneJob = () => {

    const [selectedOption, setSelectedOption] = useState(data[0]);
    const handleChange = e => {
        setSelectedOption(e);
    }
    return (
        <div className="card overflow-hidden h-auto">
            <div className="card-header border-0 pb-0">
                <h4 className="heading mb-0">Create Repurpose Job</h4>

                <Select
                    className="custom-react-select img-select flagselect"
                    isSearchable={false}
                    value={selectedOption}
                    options={data}
                    onChange={handleChange}
                    getOptionLabel={e => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={e.icon} alt={e.label} style={{ width: 20, height: 20 }} />
                            <span style={{ marginLeft: 5 }}>{e.label}</span>
                        </div>
                    )}
                />

            </div>
            <div className="card-body">
                <div className="mb-3">
                    <span>Choose content type:</span>
                    <OverlayTrigger overlay={<Tooltip>Enter your RapidAPI key for Subtitles for YouTube here.!</Tooltip>}>
                        {SVGICON.hovercircle}
                    </OverlayTrigger>
                    <div className="my-2 d-flex align-items-center flex-wrap">
                        <Link to={"#"} className=" btn btn-outline-primary me-3"> {SVGICON.article} Post or article </Link>
                        <Link to={"#"} className=" btn btn-outline-primary"> {SVGICON.youtubevideo} YouTube video </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">URL of article, post or video</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Find My Device" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput2" className="form-label">Posts to generate:</label>
                            <input type="number" className="form-control" id="exampleFormControlInput2" placeholder="1" />
                        </div>
                        <label htmlFor="exampleFormControlInput2" className="form-label">Post type</label>
                        <div className="mb-3">
                            <Form.Select className="default-select form-control new-select">
                                <option selected>Post</option>
                                <option value="1">Product</option>
                            </Form.Select>
                        </div>
                        <label className="form-label">Post type</label>
                        <div className="mb-3">
                            <Form.Select className="default-select form-control new-select">
                                <option selected>Post</option>
                                <option value="1">Product</option>
                            </Form.Select>
                        </div>
                        <label className="form-label">Post category</label>
                        <div className="mb-3">
                            <Form.Select className="default-select form-control new-select">
                                <option selected>Categorized</option>
                                <option value="1">Uncategorized</option>
                            </Form.Select>
                        </div>
                        <label className="form-label">Post status</label>
                        <div className="mb-3">
                            <Form.Select className="default-select form-control new-select">
                                <option selected>Draft</option>
                                <option value="1">Published</option>
                            </Form.Select>
                        </div>
                        <hr style={{ marginLeft: "-21px", marginRight: "-21px" }} />
                        <div className="btn-group ai-tag-group" role="group" >
                            <input type="checkbox" className="btn-check" id="btncheck1" />
                            <label className="btn btn-outline-primary btn-sm mb-0" htmlFor="btncheck1">Include featured image</label>
                        </div>
                        <hr style={{ marginLeft: "-21px", marginRight: "-21px", marginBottom: "0" }} />
                    </div>
                </div>
            </div>
            <div className="card-footer border-0">
                <div className="text-center">
                    <Link to={"#"} className="btn btn-primary"> {SVGICON.refresh}  Repurpose </Link>
                </div>
            </div>
        </div>
    );
};

export default FineTuneJob;