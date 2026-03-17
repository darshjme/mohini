import React, { useState } from 'react';   
import Select from 'react-select';
import { IMAGES } from '../../constant/theme.jsx';
import MainContent from '../../components/aikit/MainContent.jsx';
import TopMenus from '../../components/aikit/TopMenus.jsx';
import Nouislider from "nouislider-react";
import { Form } from 'react-bootstrap';

const data = [
	{ icon: IMAGES.englandsvg, value: 1, label: 'England', },
	{ icon: IMAGES.indiasvg, value: 2, label: 'India', },
	{ icon: IMAGES.uaesvg, value: 3, label: 'UAE' },
] 

function Chatbot() {
	const [selectedOption, setSelectedOption] = useState(data[0]);
	const handleChange = e => {
		setSelectedOption(e);
	}
	const [value, setValue] = useState([0, 30]);
	const [colorChange, setColorChange] = useState("#0d99ff");
	const [colorChange2, setColorChange2] = useState("#2c2c2c");
	const [colorChange3, setColorChange3] = useState("#495A69");
	const [colorChange4, setColorChange4] = useState("#9084B1");
	const [colorChange5, setColorChange5] = useState("#9084B1");
	const [colorChange6, setColorChange6] = useState("#0d99ff");
	return (
		<>
			<div className="row">
				<div className="col-xl-12">
					<MainContent detail="This is a demo of AIKit plugin made for you to test the experience of using the plugin. "
						subtitle="AIKit Chatbot allows you to create a chatbot that can be used on your website. You, or your users can use it to answer questions and provide support about your products or services." />
					<TopMenus id={5} />
					<div className="card h-auto">
						<div className="card-header border-0 pb-0">
							<h4 className="heading mb-0">Auto Writer</h4>
							<Select
								className="custom-react-select img-select flagselect"
								isSearchable={false}
								value={selectedOption}
								options={data}
								onChange={handleChange}
								getOptionLabel={e => (
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<img src={e.icon} alt="" style={{ width: 20, marginRight: 5 }} />
										<span style={{ marginLeft: 5 }}>{e.label}</span>
									</div>
								)}
							/>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-xl-2">
									<p className="mb-2">Choose content type:</p>
									<div className="btn-group d-block" role="group">
										<input type="radio" className="btn-check" name="btnradio" id="btnradio1" defaultChecked />
										<label className="btn btn-outline-primary btn-sm rounded" htmlFor="btnradio1">Yes</label>
										<input type="radio" className="btn-check" name="btnradio" id="btnradio2" />
										<label className="btn btn-outline-primary btn-sm rounded ms-2" htmlFor="btnradio2">No</label>
									</div>
								</div>
								<div className="col-xl-3">
									<p className="mb-2">Default view:</p>
									<div className="btn-group d-block" role="group" >
										<input type="radio" className="btn-check" name="btnradio" id="btnradio3" defaultChecked />
										<label className="btn btn-outline-primary btn-sm rounded" htmlFor="btnradio3">Collapsed</label>
										<input type="radio" className="btn-check" name="btnradio" id="btnradio4" />
										<label className="btn btn-outline-primary btn-sm rounded ms-2" htmlFor="btnradio4">Expanded</label>

									</div>
								</div>

								<div className="col-xl-7"></div>
								<div className="col-xl-4">
									<label className="form-label">Chatbot model</label>
									<div className="mb-3">
										<Form.Select className="default-select form-control new-select">
											<option selected>gpt-3.5-turbo</option>
											<option value="1">gpt-3.6-turbo</option>
										</Form.Select>
										<div id="emailHelp" className="form-text">For best results, please use chat models like gpt-3.5-turbo or gpt-4.</div>
									</div>
								</div>
								<div className="col-xl-4">
									<label className="form-label">Show Chatbot on</label>
									<div className="mb-3">
										<Form.Select className="default-select form-control new-select">
											<option selected>Frontend Only</option>
											<option value="1">Backend Only</option>
										</Form.Select>
									</div>
								</div>
								<div className="col-xl-4">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput1" className="form-label">Max response tokens</label>
										<input type="number" className="form-control" id="exampleFormControlInput1" placeholder="150" />
									</div>
								</div>
								<div className="col-xl-6">
									<div className="mb-3">
										<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
											defaultValue={"Prompt stop sequence"}
										/>
										<div id="emailHelp-1" className="form-text">Please set this only if you are using a fine-tuned model. Leave empty if you are using any of the built-in models. Completion stop sequence is used to mark the stop of the completion.</div>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="mb-3">
										<textarea className="form-control" id="exampleFormControlTextarea2" rows="3"
											defaultValue={"Completion stop sequence"}
										/>

										<div id="emailHelp-2" className="form-text">Please set this only if you are using a fine-tuned model. Leave empty if you are using any of the built-in models. Completion stop sequence is used to mark the stop of the completion.</div>
									</div>
								</div>
								<div className="col-xl-12">
									<div className="mb-3">
										<textarea className="form-control" id="exampleFormControlTextarea3" rows="5"
											defaultValue={"Chatbot Context"}
										/>
										<div id="emailHelp-3" className="form-text">You can use this field to set the behaviour of the chatbot. For example, use something like "You are a helpful assistant." or "Answer in the style of Shakespeare."</div>
									</div>
									<label className="form-label">Show Chatbot only for user role</label>
									<div className="mb-3"> 
										<Form.Select className="default-select form-control new-select">
											<option selected>All</option>
											<option value="1">One</option>
										</Form.Select>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
										<label className="form-check-label" htmlFor="flexCheckDefault"> Page content aware?</label>
									</div>
									<div id="emailHelp-4" className="form-text">If enabled, the chatbot will be able to use the content of the current page to generate better responses. Important: it will increase your API costs!
									</div>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<h4 className="heading">Create Repurpose Job</h4>
							<div className="row">
								<div className="col-xl-4">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput4" className="form-label">Title</label>
										<input type="text" className="form-control" id="exampleFormControlInput4" placeholder="Chat with us" />
									</div>
								</div>
								<div className="col-xl-4">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput2" className="form-label">Input text placeholder</label>
										<input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Input text placeholder" />
									</div>
								</div>
								<div className="col-xl-4">
									<div className="mb-3">
										<label htmlFor="exampleFormControlInput3" className="form-label">Start Message</label>
										<input type="text" className="form-control" id="exampleFormControlInput3" placeholder="Hi there! How can I help you?" />
									</div>
								</div>
								<div className="col-xl-12 mt-3">
									<div className="check-ai mb-3">
										<h4 className="heading mb-2">Width (px)</h4>
										<div id="slider" className=" ai-slider">
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
								</div>
								<div className="col-xl-2 col-sm-4">
									<div className="example style-1">
										<p className="mb-1">Main Color</p>
										<input
											type="color" 
											className="complex-colorpicker  as_colorpicker asColorPicker-trigger rounded-2 border border-0"
											value={colorChange}
											onChange={(e) => setColorChange(e.target.value)}

										/>
									</div>
								</div>
								<div className="col-xl-2 col-sm-4">
									<div className="example style-1">
										<p className="mb-1">Title Color</p>
										<input
											type="color"
											className="complex-colorpicker  as_colorpicker asColorPicker-trigger rounded-2 border-0 "
											value={colorChange2}
											onChange={(e) => setColorChange2(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-2 col-sm-4">
									<div className="example style-1">
										<p className="mb-1">AI Message Bubble Color</p>  
										<input
											type="color"
											className="complex-colorpicker  as_colorpicker asColorPicker-trigger rounded-2 border-0"
											value={colorChange3}
											onChange={(e) => setColorChange3(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-2 col-sm-4">
									<div className="example style-1">
										<p className="mb-1">AI Message Text Color</p> 
										<input
											type="color"
											className="complex-colorpicker  as_colorpicker asColorPicker-trigger rounded-2 border-0"
											value={colorChange4}
											onChange={(e) => setColorChange4(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-2 col-sm-4">
									<div className="example style-1">
										<p className="mb-1">User Message Bubble Color</p> 
										<input
											type="color"
											className="complex-colorpicker  as_colorpicker asColorPicker-trigger rounded-2 border-0"
											value={colorChange5}
											onChange={(e) => setColorChange5(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-2 col-sm-4">
									<div className="example style-1">
										<p className="mb-1">User Message Text Color</p> 
										<input
											type="color"
											className="complex-colorpicker  as_colorpicker asColorPicker-trigger rounded-2 border-0"
											value={colorChange6}
											onChange={(e) => setColorChange6(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<button type="button" className="btn btn-primary float-end mt-3">Save Settings</button>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default Chatbot;