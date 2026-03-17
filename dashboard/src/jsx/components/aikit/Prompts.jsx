import React from 'react';
import {Accordion} from 'react-bootstrap'; 

const Prompts = () => {
    return (
        <>
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
                            <textarea className="form-control bg-transparent" id="exampleFormControlTextarea1" rows="3"
                                defaultValue="Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]]

Title:   
                                "
                            />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <h6 className="mb-0">article-title:</h6>
                                <span className="badge badge-sm badge-danger light ms-1">description</span>
                                <span className="mx-1">,</span>
                                <span className="badge badge-sm badge-danger light">section-headlines</span>
                            </div>
                            <div className="mb-3">
                            <textarea className="form-control bg-transparent" id="exampleFormControlTextarea2" rows="3" 
                                defaultValue="Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]]

Title:
                                "
                            />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <h6 className="mb-0">article-title:</h6>
                                <span className="badge badge-sm badge-danger light ms-1">description</span>
                                <span className="mx-1">,</span>
                                <span className="badge badge-sm badge-danger light">section-headlines</span>
                            </div>
                            <div className="mb-3">
                            <textarea className="form-control bg-transparent" id="exampleFormControlTextarea3" rows="3" 
                                defaultValue="Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]]

Title:"
                            />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <h6 className="mb-0">article-title:</h6>
                                <span className="badge badge-sm badge-danger light ms-1">description</span>
                                <span className="mx-1">,</span>
                                <span className="badge badge-sm badge-danger light">section-headlines</span>
                            </div>
                            <div className="mb-3">
                            <textarea className="form-control bg-transparent" id="exampleFormControlTextarea4" rows="3"
                                defaultValue="Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]]

Title:"
                            />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <h6 className="mb-0">article-title:</h6>
                                <span className="badge badge-sm badge-danger light ms-1">description</span>
                                <span className="mx-1">,</span>
                                <span className="badge badge-sm badge-danger light">section-headlines</span>
                            </div>
                            <div className="mb-3">
                            <textarea className="form-control bg-transparent" id="exampleFormControlTextarea5" rows="3"
                                defaultValue="Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]]

Title:
                                "
                            />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <h6 className="mb-0">article-title:</h6>
                                <span className="badge badge-sm badge-danger light ms-1">description</span>
                                <span className="mx-1">,</span>
                                <span className="badge badge-sm badge-danger light">section-headlines</span>
                            </div>
                            <div className="mb-3">
                            <textarea className="form-control bg-transparent" id="exampleFormControlTextarea6" rows="3"
                                defaultValue="Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]]

Title:
                                "
                            />
                            </div><div className="d-flex align-items-center mb-1">
                                <h6 className="mb-0">article-title:</h6>
                                <span className="badge badge-sm badge-danger light ms-1">description</span>
                                <span className="mx-1">,</span>
                                <span className="badge badge-sm badge-danger light">section-headlines</span>
                            </div>
                            <div className="mb-3">
                            <textarea className="form-control bg-transparent" id="exampleFormControlTextarea7" rows="3"
                                defaultValue="Generate a title for an article that discusses the following topic:
[[description]]
The article will include the following sections:
[[section-headlines]]

Title:
                                "
                            />
                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion.Item>
            </Accordion>   
        </>
    );
};

export default Prompts;