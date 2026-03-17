import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Form } from 'react-bootstrap';
import Select from 'react-select';
import { IMAGES } from '../../constant/theme.jsx';
import MainContent from '../../components/aikit/MainContent';
import TopMenus from '../../components/aikit/TopMenus';

const tableData = [
	{ title: 'Landing Page' },
	{ title: 'Landing Page' },
	{ title: 'Landing Page' },
	{ title: 'Landing Page' }
];
const data = [
	{ icon: IMAGES.englandsvg, value: 1, label: 'England', },
	{ icon: IMAGES.indiasvg, value: 2, label: 'India', },
	{ icon: IMAGES.uaesvg, value: 3, label: 'UAE' },
]

const AutoWrite = () => {
	const [selectedOption, setSelectedOption] = useState(data[0]);
	const handleChange = e => {
		setSelectedOption(e);
	}

	return (
		<>
			<div className="row">
				<div className="col-xl-12">
					<MainContent detail="This is a demo of AIKit plugin made for you to test the experience of using the plugin. Text & images generated in this demo are dummy. In real life, AIKit will call OpenAI API and generate relevant text and images based on your prompts."
						subtitle="AIKit Auto Writer is a tool helps you write drafts quickly, but please review and edit before publishing for best results. This is not a substitute for human editing, but a drafting aid. Happy writing!"
					/>
					<TopMenus id={1} />
					<div className="row">
						<div className="col-xl-4">
							<div className="card h-auto overflow-hidden">
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
												<img src={e.icon} alt={e.label} style={{ width: 20, height: 20 }} />
												<span style={{ marginLeft: 5 }}>{e.label}</span>
											</div>
										)}
									/>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-xl-12">
											<div className="mb-3">
												<textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
													defaultValue={"Write a brief description of the topic you want to write about..."}
												/>

											</div>
											<div className="mb-3">
												<label htmlFor="exampleFormControlInput2" className="form-label">Write a brief description of the topic you want to write about...</label>
												<input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Find My Device" />
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
													<option selected>Uncategorized</option>
													<option value="1">Categorized</option>
												</Form.Select> 
											</div>
											<label className="form-label">Post status</label>
											<div className="mb-3"> 
												<Form.Select className="default-select form-control new-select">
													<option selected>Draft</option>
													<option value="1">Categorized</option>
												</Form.Select>
											</div>
											<div className="row">
												<div className="col-xl-4 col-xxl-12 col-md-6 col-sm-4">
													<div className="mb-3 d-flex align-items-center">
														<label htmlFor="exampleFormControlInput10" className="form-label me-2 mb-0">Articles:</label>
														<input type="number" className="form-control w-50" id="exampleFormControlInput10" placeholder="10" />
													</div>
												</div>
												<div className="col-xl-8 col-xxl-12 col-md-6 col-sm-8">
													<div className="mb-3 d-flex align-items-center">
														<label htmlFor="exampleFormControlInput3" className="form-label me-2 mb-0">Sections per article:</label>
														<input type="number" className="form-control w-50" id="exampleFormControlInput3" placeholder="10" />
													</div>
												</div>
												<div className="col-xl-12">
													<div className="mb-3 d-flex align-items-center">
														<label htmlFor="exampleFormControlInput4" className="form-label me-2 mb-0">Maximum words per section:</label>
														<input type="number" className="form-control w-25" id="exampleFormControlInput4" placeholder="10" />
													</div>
												</div>
											</div>
											<hr style={{ marginLeft: "-21px", marginRight: "-21px" }} />
											<div className="btn-group d-block card-length" role="group">
												<input type="checkbox" className="btn-check" id="btncheck1" />
												<label className="btn btn-outline-primary btn-sm rounded me-1" htmlFor="btncheck1">Include outline</label>{" "}

												<input type="checkbox" className="btn-check" id="btncheck2" />
												<label className="btn btn-outline-primary btn-sm rounded me-1" htmlFor="btncheck2">Include conclusion</label>{" "}

												<input type="checkbox" className="btn-check" id="btncheck3" />
												<label className="btn btn-outline-primary btn-sm rounded me-1" htmlFor="btncheck3">Include TL;DR</label>{" "}

												<input type="checkbox" className="btn-check  me-1" id="btncheck4" />
												<label className="btn btn-outline-primary btn-sm rounded me-1" htmlFor="btncheck4">Include featured article Image3</label>{" "}

												<input type="checkbox" className="btn-check" id="btncheck5" />
												<label className="btn btn-outline-primary btn-sm rounded" htmlFor="btncheck5">Include section images</label>
											</div>
											<hr style={{ marginLeft: "-21px", marginRight: "-21px", marginBottom: "0" }} />
										</div>
									</div>
								</div>
								<div className="card-footer border-0">
									<div className="text-center">
										<Link to={"#"} className="btn btn-outline-primary me-2">
											<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<g clipPath="url(#clip0_28_2466)">
													<path d="M0.833496 3.33301V8.33301H5.8335" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M19.1665 16.667V11.667H14.1665" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M17.0752 7.49998C16.6525 6.30564 15.9342 5.23782 14.9873 4.39616C14.0403 3.55451 12.8956 2.96645 11.6599 2.68686C10.4242 2.40727 9.13787 2.44527 7.92084 2.79729C6.70381 3.14932 5.59579 3.80391 4.70016 4.69998L0.833496 8.33331M19.1668 11.6666L15.3002 15.3C14.4045 16.1961 13.2965 16.8506 12.0795 17.2027C10.8625 17.5547 9.57609 17.5927 8.3404 17.3131C7.10472 17.0335 5.96 16.4455 5.01305 15.6038C4.06611 14.7621 3.3478 13.6943 2.92516 12.5" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</g>
												<defs>
													<clipPath id="clip0_28_2466">
														<rect width="20" height="20" fill="var(--primary)" />
													</clipPath>
												</defs>
											</svg>{" "}
											Schedule
										</Link>
										<Link to={"#"} className="btn btn-primary">
											<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M11.1498 15.1013H7.30563L6.86828 12.8455H4.15205L3.71469 15.1013H0.0546875L2.67883 0.806641H8.52563L11.1498 15.1013ZM6.43092 10.1523L5.62526 5.04211H5.46413L4.65847 10.1523H6.43092Z" fill="white" />
												<path d="M16.4903 0.806641H12.5771V15.1013H16.4903V0.806641Z" fill="white" />
											</svg>{" "}
											Generate
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-8">
							<Accordion className='writer-accordion promtaccordion'>
								<Accordion.Item>
									<Accordion.Header className="accordion-header prompt-header rounded-lg">
										<span className="accordion-header-icon"></span>
										<span className="accordion-header-text fw-semibold">Prompts</span>
										<span className="accordion-header-indicator"></span>
									</Accordion.Header>
									<Accordion.Collapse id="collapseOne" className="collapse">
										<div className="accordion-body-text">
											<div className="d-flex align-items-center mb-1">
												<h6 className="mb-0">article-title:</h6>
												<span className="badge badge-sm badge-danger light ms-1">description</span>
												<span className="mx-1">,</span>
												<span className="badge badge-sm badge-danger light">section-headlines</span>
											</div>
											<div className="mb-3">
												<textarea className="form-control bg-transparent" id="exampleFormControlTextarea11" rows="3"
												defaultValue='Generate a title for an article that discusses the following topic: 
[[description]] 
The article will include the following sections: 
[[section-headlines]]  
Title:'
												> 
												</textarea>
											</div>
											<div className="d-flex align-items-center mb-1">
												<h6 className="mb-0">article-title:</h6>
												<span className="badge badge-sm badge-danger light ms-1">description</span>
												<span className="mx-1">,</span>
												<span className="badge badge-sm badge-danger light">section-headlines</span>
											</div>
											<div className="mb-3">
												<textarea className="form-control bg-transparent" id="exampleFormControlTextarea2" rows="3"
													defaultValue='Generate a title for an article that discusses the following topic: 
[[description]]
The article will include the following sections:
[[section-headlines]] 
Title:'
												>
												</textarea>
											</div>
											<div className="d-flex align-items-center mb-1">
												<h6 className="mb-0">article-title:</h6>
												<span className="badge badge-sm badge-danger light ms-1">description</span>
												<span className="mx-1">,</span>
												<span className="badge badge-sm badge-danger light">section-headlines</span>
											</div>
											<div className="mb-3">
												<textarea className="form-control bg-transparent" id="exampleFormControlTextarea3" rows="3"
													defaultValue='Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]] 
Title:'
												>

												</textarea>
											</div>
											<div className="mb-3">
												<textarea className="form-control bg-transparent" id="exampleFormControlTextarea12" rows="3"
													defaultValue=' Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]] 
Title:'
												>

												</textarea>
											</div>

										</div>
									</Accordion.Collapse>
								</Accordion.Item>
							</Accordion>
							<div className="card h-auto">
								<div className="card-body p-0">
									<div className="table-responsive ai-table writer-table">
										<table className="table table-responsive-md ">
											<thead>
												<tr>
													<th className="text-black">Type</th>
													<th className="text-black">Title</th>
													<th className="text-black">Date created</th>
												</tr>
											</thead>
											<tbody>
												{tableData.map((item, ind) => (
													<tr key={ind}>
														<td>{item.title}</td>
														<td className="text-primary">This is a test title generation</td>
														<td>July {ind + 10}, 2025</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default AutoWrite;