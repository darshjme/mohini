import { IMAGES, SVGICON } from "../../constant/theme";
import { Tab, Nav, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { navdata2 } from "../../constant/alldata";

function Message() {
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-xl-3 col-xxl-4 border-end chat-left-body">
                                    <Tab.Container defaultActiveKey="home-tab"  >
                                        <div className="p-4 meassge-left-side">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <div>
                                                    <span className="fs-24 font-w700 mb-0 text-dark me-2">Inbox</span>
                                                    <span className="fs-18 font-w600 text-light">(2,456)</span>
                                                </div>
                                                <div className="plus-bx">
                                                    <Link to={"#"}><i className="fas fa-plus" /></Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center project-tab message-tab">
                                                <div className="project style-1">
                                                    <Nav as="ul" className="nav nav-tabs">
                                                        {navdata2.map((item, i) => (
                                                            <Nav.Item as="li" className="nav-item" key={i}>
                                                                <Nav.Link as="a" to={"#"} className="nav-link c-pointer" eventKey={item.eventkey}>{item.title}</Nav.Link>
                                                            </Nav.Item>
                                                        ))}
                                                    </Nav>
                                                </div>
                                            </div>
                                        </div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="home-tab"  >
                                                <div className="chat-sidebar" id="chatSidebar">
                                                    <p className="ms-4 mb-2">TEAM</p>
                                                    <div className="chat-bx d-flex active mb-2 border-bottom">
                                                        <div className="group-pic">
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg1} alt="" />
                                                                <img src={IMAGES.groupg2} alt="" />
                                                            </div>
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg3} alt="" />
                                                                <img src={IMAGES.groupg4} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center justify-content-between">
                                                                <h6 className="mb-0">Fillow Designer Team</h6>
                                                                <small className="">2m ago</small>
                                                            </div>
                                                            <p className="mb-0">Hey Jenny, don’t forget to prepare prototype for next week</p>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="group-pic">
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg1} alt="" />
                                                                <img src={IMAGES.groupg2} alt="" />
                                                            </div>
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg3} alt="" />
                                                                <img src={IMAGES.groupg4} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center justify-content-between">
                                                                <h6 className="mb-0">Fillow Designer Team</h6>
                                                                <small className="">2m ago</small>
                                                            </div>
                                                            <p className="mb-0">Hey Jenny, don’t forget to prepare prototype for next week</p>
                                                        </div>
                                                    </div>
                                                    <div className="recent-msg pt-3 chat-bx">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p className="mb-0">RECENT MESSAGE</p>
                                                            <Dropdown className="dropdown ms-2">
                                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                    {SVGICON.threedotvertical}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic33} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Skylar Dorwart</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic11} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Rayna Carder</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                                <span> {SVGICON.doubleright}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic22} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Skylar Dorwart</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic33} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Kierra Curtis</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="profile-tab"  >
                                                <div className="chat-sidebar" id="chatSidebar">
                                                    <p className="ms-4 mb-2">TEAM</p>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="group-pic">
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg1} alt="" />
                                                                <img src={IMAGES.groupg2} alt="" />
                                                            </div>
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg3} alt="" />
                                                                <img src={IMAGES.groupg4} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center justify-content-between">
                                                                <h6 className="mb-0">Fillow Designer Team</h6>
                                                                <small className="">2m ago</small>
                                                            </div>
                                                            <p className="mb-0">Hey Jenny, don’t forget to prepare prototype for next week</p>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex active mb-2 border-bottom">
                                                        <div className="group-pic">
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg1} alt="" />
                                                                <img src={IMAGES.groupg2} alt="" />
                                                            </div>
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg3} alt="" />
                                                                <img src={IMAGES.groupg4} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center justify-content-between">
                                                                <h6 className="mb-0">Fillow Designer Team</h6>
                                                                <small className="">2m ago</small>
                                                            </div>
                                                            <p className="mb-0">Hey Jenny, don’t forget to prepare prototype for next week</p>
                                                        </div>
                                                    </div>
                                                    <div className="recent-msg pt-3 chat-bx">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p className="mb-0">RECENT MESSAGE</p>
                                                            <Dropdown className="dropdown ms-2">
                                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                    {SVGICON.threedotvertical}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic33} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Kierra Curtis</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic11} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Rayna Carder</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                                <span>
                                                                    {SVGICON.doubleright}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic22} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Skylar Dorwart</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic33} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Skylar Dorwart</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="contact-tab"  >
                                                <div className="chat-sidebar" id="chatSidebar">
                                                    <p className="ms-4 mb-2">TEAM</p>
                                                    <div className="chat-bx d-flex active mb-2 border-bottom">
                                                        <div className="group-pic">
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg1} alt="" />
                                                                <img src={IMAGES.groupg2} alt="" />
                                                            </div>
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg3} alt="" />
                                                                <img src={IMAGES.groupg4} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center justify-content-between">
                                                                <h6 className="mb-0">Fillow Designer Team</h6>
                                                                <small className="">2m ago</small>
                                                            </div>
                                                            <p className="mb-0">Hey Jenny, don’t forget to prepare prototype for next week</p>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="group-pic">
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg1} alt="" />
                                                                <img src={IMAGES.groupg2} alt="" />
                                                            </div>
                                                            <div className="d-flex">
                                                                <img src={IMAGES.groupg3} alt="" />
                                                                <img src={IMAGES.groupg4} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center justify-content-between">
                                                                <h6 className="mb-0">Fillow Designer Team</h6>
                                                                <small className="">2m ago</small>
                                                            </div>
                                                            <p className="mb-0">Hey Jenny, don’t forget to prepare prototype for next week</p>
                                                        </div>
                                                    </div>
                                                    <div className="recent-msg pt-3 chat-bx">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p className="mb-0">RECENT MESSAGE</p>
                                                            <Dropdown className="dropdown ms-2">
                                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                    {SVGICON.threedotvertical}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic11} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Rayna Carder</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                                <span>
                                                                    {SVGICON.doubleright}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic22} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Skylar Dorwart</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic33} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Kierra Curtis</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-bx d-flex border-bottom">
                                                        <div className="chat-img">
                                                            <img src={IMAGES.contactspic33} alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex mb-1 align-items-center">
                                                                <h6 className="mb-0">Skylar Dorwart</h6>
                                                                <small className="ms-auto">2m ago</small>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 lh-base">I remember that project due is tomorrow.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                                <div className="col-xl-9 col-xxl-8">
                                    <div className="d-flex justify-content-between align-items-center border-bottom px-4 pt-4 flex-wrap">
                                        <div className="d-flex align-items-center pb-3">
                                            <div className="image-box">
                                                <img src={IMAGES.groupg1} alt="" className=" img-1" />
                                            </div>
                                            <div className="ms-3">
                                                <h4 className="fs-20 mb-1 font-w700"><Link to="/app-profile" className="text-dark">Rayna Carder</Link></h4>
                                                <span>Last online at 04:45 AM</span>
                                            </div>
                                        </div>
                                        <div className="activity d-flex align-items-center pb-3">
                                            <ul className="d-flex">
                                                <li><Link to={"#"}><i className="fas fa-video" /></Link></li>
                                                <li><Link to={"#"}><i className="fas fa-search" /></Link></li>
                                                <li><Link to={"#"}><i className="fas fa-star text-orange" /></Link></li>
                                            </ul>
                                            <div className="chat-toogle">
                                                <i className="fa-solid fa-list-ul" />
                                            </div>
                                            <Dropdown className="dropdown ms-2">
                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                    {SVGICON.threedotvertical2}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="chat-box-area ic-scroll chat-box-area" id="chatArea">
                                        <div className="chat-box-area dz-scroll" id="chartBox">
                                            <div className="media my-4  justify-content-start align-items-start">
                                                <div className="image-box me-sm-3 me-2">
                                                    <img src={IMAGES.groupg1} alt="" className="img-1" />
                                                    <span className="active1"></span>
                                                </div>
                                                <div className="message-received">
                                                    <p className="mb-1"> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptat</p>
                                                    <span className="fs-12">Sunday, October 24th, 2020  at 4.30 AM</span>
                                                </div>
                                            </div>
                                            <div className="media my-4  justify-content-start align-items-start">
                                                <div className="image-box me-sm-3 me-2">
                                                    <img src={IMAGES.groupg1} alt="" className=" img-1" />
                                                    <span className="active1"></span>
                                                </div>
                                                <div className="message-received">
                                                    <p className="mb-1 me-5"> Hey, check my design update last night. Tell me what you think and if that is OK </p>
                                                    <span className="fs-12">Sunday, October 24th, 2020  at 4.30 AM</span>
                                                </div>
                                            </div>
                                            <div className="media mb-4 justify-content-end align-items-end">
                                                <div className="message-sent">
                                                    <p className="mb-1"> sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet </p>
                                                    <span className="fs-12">9.30 AM</span>
                                                </div>
                                                <div className="image-box ms-sm-3 ms-2 mb-4">
                                                    <img src={IMAGES.contacts3} alt="" className=" img-1" />
                                                    <span className="active"></span>
                                                </div>
                                            </div>
                                            <div className="media mb-4 justify-content-end align-items-end">
                                                <div className="message-sent">
                                                    <p className="mb-1"> sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet </p>
                                                    <span className="fs-12">9.30 AM</span>
                                                </div>
                                                <div className="image-box ms-sm-3 ms-2 mb-4">
                                                    <img src={IMAGES.contacts3} alt="" className=" img-1" />
                                                    <span className="active"></span>
                                                </div>
                                            </div>
                                            <div className="media my-4  justify-content-start align-items-start">
                                                <div className="image-box me-sm-3 me-2">
                                                    <img src={IMAGES.groupg1} alt="" className=" img-1" />
                                                    <span className="active1"></span>
                                                </div>
                                                <div className="message-received">
                                                    <p className="mb-1 me-5"> Hey, check my design update last night. Tell me what you think and if that is OK </p>
                                                    <span className="fs-12">Sunday, October 24th, 2020  at 4.30 AM</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer border-0 type-massage">
                                        <div className="input-group">
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="I think we should get that project in this month"></textarea>
                                        </div>
                                        <div className="input-group-append d-flex justify-content-between flex-wrap">
                                            <div>
                                                <button type="button" className="btn btn-primary text-white p-2"><i className="far fa-paper-plane me-2" />SEND</button>
                                                <button type="button" className="btn pr-0"><i className="fas fa-smile scale5 text-primary" /></button>
                                                <button type="button" className="btn"><i className="fas fa-paperclip scale5 text-primary" /></button>
                                            </div>
                                            <div>
                                                <button type="button" className="btn pr-0"> {SVGICON.msgbtn1} </button>
                                                <button type="button" className="btn"> {SVGICON.msgbtn2} </button>
                                                <button type="button" className="btn"> {SVGICON.msgbtn3} </button>
                                                <button type="button" className="btn"> {SVGICON.msgbtn4} </button>
                                                <button type="button" className="btn"> {SVGICON.msgbtn5} </button>
                                                <button type="button" className="btn"> {SVGICON.msgbtn6} </button>
                                                <button type="button" className="btn"> {SVGICON.msgbtn7} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Message;