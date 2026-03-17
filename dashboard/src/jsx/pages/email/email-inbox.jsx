import { Fragment } from "react"
import PageTitle from "../../layouts/PageTitle"
import InboxSidebar from "../../element/inboxsidebar"
import { Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { inboxdata } from "../../constant/alldata"
import { useState } from "react"

function EmailInbox() {
    const [show, SetShow] = useState(false)
    const chackboxFun = (type) => {
        setTimeout(() => {
            const motherChackBox = document.querySelector(".message_input");
            const chackbox = document.querySelectorAll(".message_input1");
            for (let i = 0; i < chackbox.length; i++) {
                const element = chackbox[i];
                if (type === "all") {
                    if (motherChackBox.checked) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                } else {
                    if (!element.checked) {
                        motherChackBox.checked = false;
                        break;
                    } else {
                        motherChackBox.checked = true;
                    }
                }
            }
        }, 100);
    };
    return (
        <Fragment>
            <PageTitle activeMenu="Inbox" motherMenu="Email" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card ">
                        <div className="card-body p-0">
                            <div className="row g-0">
                            <div className="col-xl-2 col-xxl-3">
                                    <div className={`mail-left-body ${show ? 'active' : ''}`}>
                                        <InboxSidebar />
                                    </div>
                                </div>
                                <div className="col-xl-10 col-xxl-9">
                                    <div className="py-4">
                                        <div role="toolbar" className="email-toolbar">
                                            <div className="btn-group mb-1 ">
                                                <div className="form-check custom-checkbox ">
                                                    <input type="checkbox" className="form-check-input message_input" id="checkbox1" onClick={() => chackboxFun("all")} />
                                                    <label className="form-check-label" htmlFor="checkbox1"></label>
                                                </div>
                                            </div>{"  "}
                                            <div className="btn-group mb-1">
                                                <button className="btn btn-primary light px-3" type="button"><i className="ti-reload" /></button>{"  "}
                                            </div>{"  "}
                                            <Dropdown className="btn-group mb-1">
                                                <Dropdown.Toggle className="btn btn-primary px-3 light dropdown-toggle ms-1" type="button">More <span className="caret"></span></Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu" align="end">
                                                    <Dropdown.Item className="dropdown-item">Mark as Unread</Dropdown.Item>
                                                    <Dropdown.Item to="/email-inbox" className="dropdown-item" > Add to Tasks </Dropdown.Item>
                                                    <Dropdown.Item to="/email-inbox" className="dropdown-item" > Add Star </Dropdown.Item>
                                                    <Dropdown.Item to="/email-inbox" className="dropdown-item" > Mute </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <div className={`email-tools-box ${show ? 'active' : ''}`} onClick={() => SetShow(!show)}>
                                                <i className="fa-solid fa-list-ul" />
                                            </div>
                                            <form className="d-none d-md-block ms-auto">
                                                <div className="input-group  ms-auto w-100 d-sm-inline-flex d-none">
                                                    <input type="text" className="form-control" placeholder="Search here" />
                                                    <span className="input-group-text"><Link to={"#"}><i className="flaticon-search-interface-symbol" /></Link></span>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="email-list mt-3">
                                            {inboxdata.map((data, i) => (
                                                <div className="message" key={i}>
                                                    <div>
                                                        <div className={`d-flex message-single ${data.style}`}>
                                                            <div className="ps-1 align-self-center">
                                                                <div className="form-check custom-checkbox">
                                                                    <input type="checkbox" className="form-check-input message_input1" onClick={() => chackboxFun()}/>
                                                                    <label className="form-check-label" htmlFor="checkbox1" />
                                                                </div>
                                                            </div>
                                                            <div className="ms-2">
                                                                <button className="border-0 bg-transparent align-middle p-0">
                                                                    <i className="fa fa-star" onClick={(e) => e.target.classList.toggle('yellow')} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <Link to="/email-read" className="col-mail col-mail-2">
                                                            <div className="subject">{data.subject} </div>
                                                            <div className="date">11:49 am</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-12 ps-3">
                                                <nav>
                                                    <ul className="pagination pagination-gutter ps-3 pagination-primary pagination-sm no-bg justify-content-center justify-content-xl-start ">
                                                        <li className="page-item page-indicator"><Link className="page-link" to={"#"}><i className="la la-angle-left" /></Link></li>
                                                        <li className="page-item "><Link className="page-link" to={"#"}>1</Link></li>
                                                        <li className="page-item active"><Link className="page-link" to={"#"}>2</Link></li>
                                                        <li className="page-item"><Link className="page-link" to={"#"}>3</Link></li>
                                                        <li className="page-item"><Link className="page-link" to={"#"}>4</Link></li>
                                                        <li className="page-item page-indicator"><Link className="page-link" to={"#"}><i className="la la-angle-right" /></Link></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default EmailInbox
