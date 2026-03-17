import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import MainContent from '../../components/aikit/MainContent';
import TopMenus from '../../components/aikit/TopMenus';
import { IMAGES, SVGICON } from '../../constant/theme';
import Nouislider from "nouislider-react";
import Aikittaify from '../../components/aikit/multiselect';

const options1 = [
	{ icon: IMAGES.englandsvg, value: 1, label: 'England', },
	{ icon: IMAGES.indiasvg, value: 2, label: 'India', },
	{ icon: IMAGES.uaesvg, value: 3, label: 'UAE' },
]
const options2 = [
	{ value: '1', label: 'gpt-3.5-turbo' },
	{ value: '2', label: 'gpt-4.5-turbo' },
]
function ToolTipBlog() {
	return (
		<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Enter your RapidAPI key for Subtitles for YouTube here.!</Tooltip>}>
			{SVGICON.hovercircle}
		</OverlayTrigger>
	)
}
const initialTags = [
	"Watercolor", "Vector", "Art",
	"Portrait", "Pencil Drawing", "Digital Painting",
	"Abstract", "Oil Painting", "Cartoon", "Black And White"
];
function Setting() {
	const [selectedOption, setSelectedOption] = useState(options1[0]);
	const handleChange = e => {
		setSelectedOption(e);
	}

	const [select, setSelect] = useState("")
	const handleRadioClick = (event) => {
		setSelect(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Selected value:', select);
	}
	return (
		<Fragment>
			<div className="row">
				<div className="col-xl-12">
					<MainContent detail="This is a demo of AIKit plugin made for you to test the experience of using the plugin." />
					<TopMenus id={8} />
					<div className="card h-auto">
						<div className="card-body border-0 pb-0">
							<h4 className="heading mb-0">OpenAI Settings</h4>
							<p>Adjust the plugin to your needs by editing the settings here.</p>
							<div className="row">
								<div className="col-xl-6 col-sm-6">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput1" className="form-label">OpenAI Key</label>
										<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="this-is-a-secret-key" />
										<div id="emailHelp" className="form-text">For instructions on how to get an OpenAI key, please visit
											<Link to={"#"} className="text-primary"> https://getaikit.com/docs/getting-started </Link>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-sm-6">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput2" className="form-label">Rapid API Key</label>
										<input type="email" className="form-control" id="exampleFormControlInput2" placeholder="this-is-rapid-api-key" />
										<div id="emailHelp-1" className="form-text">Enter your RapidAPI key for Subtitles for YouTube here. This API is used to read YouTube video subtitles to allow you to fetch.
											<Link to={"#"} className="text-primary">Read More
												<ToolTipBlog />
											</Link>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6">
									<label className="form-label">Post category</label>
									<div className="mb-3">
										<Select
											className="custom-react-select img-select flagselect border rounded"
											isSearchable={false}
											value={selectedOption}
											options={options1}
											onChange={handleChange}
											getOptionLabel={e => (
												<div style={{ display: 'flex', alignItems: 'center' }}>
													<img src={e.icon} alt="" style={{ width: 20, marginRight: 5 }} />
													<span style={{ marginLeft: 5 }}>{e.label}</span>
												</div>
											)}
										/>
										<div id="emailHelp-2" className="form-text"> The language of the text you want to generate.
											<Link to={"#"} className="text-primary"> Read More
												<ToolTipBlog />
											</Link>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6">
									<label className="form-label">OpenAI Preferred Model</label>
									<div className="mb-3 dz-dropdown2">
										<Select
											isSearchable={false}
											options={options2}
											className="custom-react-select"
											placeholder="Select Model"
										/>
										<div id="emailHelp-3" className="form-text"> The language of the text you want to generate.
											<Link to={"#"} className="text-primary"> Read More
												<ToolTipBlog />
											</Link>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput10" className="form-label">Prompt Stop Sequence</label>
										<input type="text" className="form-control" id="exampleFormControlInput10" />
										<div id="emailHelp-4" className="form-text"> The language of the text you want to generate.
											<Link to={"#"} className="text-primary"> Read More
												<ToolTipBlog />
											</Link>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput11" className="form-label">Completion Stop Sequence</label>
										<input type="text" className="form-control" id="exampleFormControlInput11" />
										<div id="emailHelp-5" className="form-text"> The language of the text you want to generate.
											<Link to={"#"} className="text-primary">Read More
												<ToolTipBlog />
											</Link>
										</div>
									</div>
								</div>
								<div className="col-xl-6 align-self-center">
									<h6> Multiplier </h6>
									<p className="text-end mb-2"> 2.7x </p>
									<div id="slider" class="mb-5 ai-slider">
										<Nouislider
											connect={[true, false]}
											start={20}
											step={10}
											behaviour="snap"
											range={{
												min: 0,
												max: 100
											}}
										/>
									</div>


								</div>
								<div className="col-xl-3 col-sm-6">
									<label htmlFor="exampleFormControlInput1" className="form-label">Autocompleted Text Background Color</label>
									<div className="back-theme-ai">
										<Link to={"#"} className="cross-svg" onClick={() => {
											const radioInputs = document.querySelectorAll('input[name="flexRadioDefault1"], input[name="flexRadioDefault"]');
											radioInputs.forEach(input => input.checked = false);
										}}>
											<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M13.5 6.5L6.5 13.5" stroke="#FF5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M6.5 6.5L13.5 13.5" stroke="#FF5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Link>
										<div className="form-check d-inline-block position-relative me-2">
											<input className="form-check-input bg-primary" type="radio" name="flexRadioDefault1" id="flexRadioDefault1"   />
											<span></span>
										</div>
										<div className="form-check d-inline-block  position-relative me-2">
											<input className="form-check-input bg-success" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
											<span></span>
										</div>
										<div className="form-check d-inline-block  position-relative me-2">
											<input className="form-check-input bg-info" type="radio" name="flexRadioDefault" id="flexRadioDefault3"  />
											<span></span>
										</div>
										<div className="form-check d-inline-block  position-relative me-2">
											<input className="form-check-input bg-secondary" type="radio" name="flexRadioDefault" id="flexRadioDefault4"  />
											<span></span>
										</div>
										<div className="form-check d-inline-block  position-relative">
											<input className="form-check-input bg-warning" type="radio" name="flexRadioDefault" id="flexRadioDefault5"  />
											<span></span>
										</div>
									</div>

									<div id="emailHelp-6" className="form-text mb-2">AIKit's builtin prompts are already.
										<Link to={"#"} className="text-primary">Read More
											<ToolTipBlog />
										</Link>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6">
									<label htmlFor="exampleFormControlInput1" className="form-label">Default view</label>
									<div className="ai-check">
										<div className="form-check mb-0">
											<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
											<label className="form-check-label mb-0" htmlFor="flexCheckDefault"> Elementor supported? </label>
										</div>
									</div>
									<div id="emailHelp-7" className="form-text mb-2"> The language of the text you want to generate.
										<Link to={"#"} className="text-primary"> Read More
											<ToolTipBlog />
										</Link>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6">
									<label htmlFor="exampleFormControlInput1" className="form-label">Default view</label>
									<div className="ai-check bg-grey">
										<div className="form-check mb-0">
											<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-1" />
											<label className="form-check-label text-white mb-0" htmlFor="flexCheckDefault-1"> Small (256x256) </label>
										</div>
									</div>
									<div id="emailHelp-8" className="form-text mb-2"> When this is enabled, you will be able to use AIKit right.
										<Link to={"#"} className="text-primary"> Read More
											<ToolTipBlog />
										</Link>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6 align-self-end">
									<div className="ai-check bg-grey">
										<div className="form-check mb-0">
											<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-2" />
											<label className="form-check-label text-white mb-0" htmlFor="flexCheckDefault-2"> Medium (512x512) </label>
										</div>
									</div>
									<div id="emailHelp-9" className="form-text mb-2"> When this is enabled, you will be able to use AIKit right.
										<Link to={"#"} className="text-primary"> Read More
											<ToolTipBlog />
										</Link>
									</div>
								</div>
								<div className="col-xl-3 col-sm-6 align-self-end">
									<div className="ai-check">
										<div className="form-check mb-0">
											<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-3" />
											<label className="form-check-label mb-0" htmlFor="flexCheckDefault-3">Large (1024x1204)</label>
										</div>
									</div>
									<div id="emailHelp-10" className="form-text mb-2"> When this is enabled, you will be able to use AIKit right.
										<Link to={"#"} className="text-primary"> Read More
											<ToolTipBlog />
										</Link>
									</div>

								</div>
								<div className="col-xl-3 col-sm-6">
									<div className="mb-3">
										<label htmlFor="exampleInputEmail1" className="form-label"> Image counts for each size</label>
										<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
									</div>
								</div>
								<div className="col-xl-6">
									<div className="mb-3">
										<label htmlFor="exampleInputEmail1" className="form-label">Image generation styles</label>
										<Aikittaify/>
										<div id="emailHelp-11" className="form-text mb-2">System message help set the
											behaviour of the model. You can use it to ask the model to mimic a
											certain style or take a certain perspective for all text generations.
											For example, if you set this to "Shakespeare' style", the mode will
											follow the style of Shakespeare in all text generations when possible.
											System message should work ONLY with GPT-4 and to a lesser extent with
											gpt-3.5-turbo models.</div>
									</div>
								</div>
								<div className="col-xl-6">
									<label htmlFor="floatingTextarea">OpenAI System Message</label>
									<div className="form-floating">
										<textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
										<div id="emailHelp-12" className="form-text mb-2">System message help set the
											behaviour of the model. You can use it to ask the model to mimic a
											certain style or take a certain perspective for all text generations.
											For example, if you set this to "Shakespeare' style", the mode will
											follow the style of Shakespeare in all text generations when possible.
											System message should work ONLY with GPT-4 and to a lesser extent with
											gpt-3.5-turbo models.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Setting;