import { Fragment } from "react";
const taskDetail = [
    { id: '11', title: 'Create FureStibe branding logo', name: 'Karina Clark', deadline: 'Due in 1 day', },
    { id: '12', title: 'Schedule a meeting with FireBear CTO John', name: 'Rober Doe', deadline: 'Due in 3 days', },
    { id: '13', title: '9 Degree Porject Estimation', name: 'Neil Owen', deadline: 'Due in 1 week', },
    { id: '14', title: 'Dashgboard UI & UX for Leafr CRM', name: 'Olivia Wild', deadline: 'Due in 1 week', },
    { id: '15', title: 'Mivy App R&D, Meeting with clients', name: 'Sean Bean', deadline: 'Due in 2 weeks', },
    { id: '11', title: 'Create FureStibe branding logo', name: 'Karina Clark', deadline: 'Due in 1 day', },
];

function CustomerTask() {
    return (
        <Fragment>
            {taskDetail.map((data, i) => (
                <div className="d-flex align-items-center py-2" key={i}>
                    <div className="timeline-vr-badge bg-light me-2"></div>
                    <div className="form-check custom-checkbox">
                        <input type="checkbox" className="form-check-input" id={`customCheckBox${data.id}`} required="" />
                        <label className="form-check-label" htmlFor={`customCheckBox${data.id}`}></label>
                    </div>
                    <div className="clearfix ms-2">
                        <h6 className="mb-0 fw-semibold">{data.title}</h6>
                        <span className="fs-13">{data.deadline} <span className="text-primary">{data.name}</span></span>
                    </div>
                    <div className="clearfix ms-auto">
                        <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"><i className="flaticon-app" /></button>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}
export default CustomerTask;