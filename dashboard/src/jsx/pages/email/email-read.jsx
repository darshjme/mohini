import { Fragment } from "react"
import InboxSidebar from "../../element/inboxsidebar"
import { Nav, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"
import { IMAGES } from "../../constant/theme"
import { useState } from "react"

function EmailRead() {
    const [show, SetShow] = useState(false)
    return (
        <Fragment>
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
                                <Tab.Container defaultActiveKey="1">
                                    <div className="col-xl-3 col-xxl-4 p-0">
                                        <div className="border-end inbox-area-list">
                                            <div className="d-flex align-items-center p-3">
                                                <h4 className="card-title--medium mb-0">Inbox</h4>
                                                <div className={`email-tools-box dz-resp-tool ms-auto float-end ${show ? 'active' : ''}`} onClick={() => SetShow(!show)}>
                                                    <i className="fa-solid fa-list-ul" />
                                                </div>
                                            </div>
                                            <div className="input-group contacts-search-1 mb-3">
                                                <input type="text" className="form-control rounded-0 bg-transparent border-0" placeholder="Search Worldnic..." />
                                                <span className="input-group-text rounded-0 bg-transparent border-0"><Link to={"#"}><i className="flaticon-search" /></Link></span>
                                            </div>
                                            <div className="pb-3 ic-scroll height800">
                                                <div className="email-left-box ">
                                                    <Nav as="ul" className="nav nav-tabs  mail-tab">
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="1" className="nav-link mail-tab">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Jack Lee </h6>
                                                                        <span>Insurance documents</span>
                                                                        <p> Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu </p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa-regular  text-warning fa-star me-1" />Jan</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="2" className="nav-link">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Samulas Jack </h6>
                                                                        <span>Insurance documents</span>
                                                                        <p>Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu</p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa-regular fa-star text-warning me-1" /> Feb</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="3" className="nav-link">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Nella Beck </h6>
                                                                        <span>Insurance documents</span>
                                                                        <p>Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu</p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa fa-star text-warning me-1" aria-hidden="true" /> Apr</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="4" className="nav-link style-2">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Jhon Beck </h6>
                                                                        <span>Insurance documents</span>
                                                                        <p>Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu</p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa fa-star text-warning me-1" aria-hidden="true" /> Mar</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="5" className="nav-link">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Yatin </h6>
                                                                        <span>Insurance documents</span>
                                                                        <p>Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu</p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa fa-star text-warning me-1" aria-hidden="true" /> Feb</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="6" className="nav-link">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Hanu Beck </h6>
                                                                        <span>Insurance documents</span>
                                                                        <p>Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu</p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa-regular fa-paper-plane me-1" /><i className="fa fa-star text-warning me-1" aria-hidden="true" /> Feb</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="7" className="nav-link style-1">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Nitesh Lewe </h6>
                                                                        <span>Apple documents</span>
                                                                        <p>Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu</p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa fa-star text-warning me-1" aria-hidden="true" /> Dec</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li" className="nav-item" >
                                                            <Nav.Link eventKey="8" className="nav-link">
                                                                <div className="inbox">
                                                                    <div>
                                                                        <h6> Liam Antony </h6>
                                                                        <span>Apple documents</span>
                                                                        <p>Hi Brian, Aliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu</p>
                                                                    </div>
                                                                    <span className="ms-auto d-flex align-items-center"><i className="fa-regular fa-paper-plane me-1" /> <i className="fa fa-star text-warning me-1" aria-hidden="true" /> Feb</span>
                                                                </div>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-xxl-5">
                                        <div className="read-content-bx">
                                            <div className=" d-xl-none d-flex align-items-center p-3">
                                                <h4 className="card-title--medium mb-0">Inbox</h4>
                                                <div className="ms-auto">
                                                    <div className="dz-resp-tool dz-back-arrow me-2">  <i className="fa-solid fa-arrow-left" /> </div>
                                                    <div className="email-tools-box dz-resp-tool"> <i className="fa-solid fa-list-ul" /> </div>
                                                </div>
                                            </div>
                                            <div className="d-xl-none d-inline-flex input-group contacts-search-1 mb-3">
                                                <input type="text" className="form-control rounded-0 bg-transparent border-0" placeholder="Search Worldnic..." />
                                                <span className="input-group-text rounded-0 bg-transparent border-0"><Link to={"#"}><i className="flaticon-search" /></Link></span>
                                            </div>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="1" className="tab-pane fade">
                                                    <div className=" ps-4 pe-3 py-4 ">
                                                        <div className="d-flex align-items-center flex-wrap mb-3">
                                                            <img src={IMAGES.contactpic2} className="avatar avatar-md rounded me-2" alt="" />
                                                            <div>
                                                                <Link to={"#"}> <h6 className="mb-1">Jack Lee</h6>  </Link>
                                                                <span>Web Doveloper</span>
                                                            </div>
                                                            <div className="read-content-attachment  ms-sm-auto ms-0">
                                                                <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-reply me-1" />Reply</button>{" "}
                                                                <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-forward me-1" />Forward</button>
                                                            </div>
                                                        </div>
                                                        <div className="read-content-body">
                                                            <h5 className="mb-3">Hi,Ingredia,</h5>
                                                            <p className="mb-2"><strong>Ingredia Nutrisha,</strong> A
                                                                collection of textile samples lay spread out on the
                                                                table - Samsa was a travelling salesman - and above it
                                                                there hung a picture</p>
                                                            <p className="mb-2">Even the all-powerful Pointing has no
                                                                control about the blind texts it is an almost
                                                                unorthographic life One day however a small line of
                                                                blind text by the name of Lorem Ipsum decided to leave
                                                                for
                                                                the far World of Grammar. Aenean vulputate eleifend
                                                                tellus. Aenean leo ligula, porttitor eu, consequat
                                                                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                                                                in, viverra quis, feugiat a, tellus.
                                                            </p>
                                                            <p className="mb-2">Aenean vulputate eleifend tellus. Aenean leo
                                                                ligula, porttitor eu, consequat vitae, eleifend ac,
                                                                enim. Aliquam lorem ante, dapibus in, viverra quis,
                                                                feugiat a, tellus. Phasellus viverra nulla ut
                                                                metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                                                Etiam ultricies nisi vel augue. Curabitur ullamcorper
                                                                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                                                                tempus, tellus eget condimentum
                                                                rhoncus, sem quam semper libero, sit amet adipiscing sem
                                                                neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                                pulvinar,</p>
                                                            <h5 className="pt-3">Kind Regards</h5>
                                                            <p>Mr Smith</p>
                                                            <hr />
                                                        </div>
                                                        <div className="mb-3 pt-3">
                                                            <textarea name="write-email" id="write-email" cols="30" rows="8" className="form-control" placeholder="It's really an amazing.I want to know more about it..!"></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            <button className="btn btn-primary " type="button">Send</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="2" className="tab-pane fade">
                                                    <div className=" ps-4 pe-3 py-4 ">
                                                        <div className="d-flex align-items-center flex-wrap mb-3">
                                                            <img src={IMAGES.contactpic1} className="avatar avatar-md rounded me-2" alt="" />
                                                            <div>
                                                                <Link to={"#"}> <h6 className="mb-1">Samulas Jack </h6> </Link>
                                                                <span>Web Doveloper</span>
                                                            </div>
                                                            <div className="read-content-attachment  ms-sm-auto ms-0">
                                                                <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-reply me-1" />Reply</button>{" "}
                                                                <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-forward me-1" />Forward</button>
                                                            </div>
                                                        </div>
                                                        <div className="read-content-body">
                                                            <h5 className="mb-3">Hi,Ingredia,</h5>
                                                            <p className="mb-2"><strong>Ingredia Nutrisha,</strong> A
                                                                collection of textile samples lay spread out on the
                                                                table - Samsa was a travelling salesman - and above it
                                                                there hung a picture</p>
                                                            <p className="mb-2">Even the all-powerful Pointing has no
                                                                control about the blind texts it is an almost
                                                                unorthographic life One day however a small line of
                                                                blind text by the name of Lorem Ipsum decided to leave
                                                                for
                                                                the far World of Grammar. Aenean vulputate eleifend
                                                                tellus. Aenean leo ligula, porttitor eu, consequat
                                                                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                                                                in, viverra quis, feugiat a, tellus.
                                                            </p>
                                                            <p className="mb-2">Aenean vulputate eleifend tellus. Aenean leo
                                                                ligula, porttitor eu, consequat vitae, eleifend ac,
                                                                enim. Aliquam lorem ante, dapibus in, viverra quis,
                                                                feugiat a, tellus. Phasellus viverra nulla ut
                                                                metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                                                Etiam ultricies nisi vel augue. Curabitur ullamcorper
                                                                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                                                                tempus, tellus eget condimentum
                                                                rhoncus, sem quam semper libero, sit amet adipiscing sem
                                                                neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                                pulvinar,</p>
                                                            <h5 className="pt-3">Kind Regards</h5>
                                                            <p>Mr Smith</p>
                                                            <hr />
                                                        </div>
                                                        <div className="mb-3 pt-3">
                                                            <textarea name="write-email-1" id="write-email-1" cols="30" rows="8" className="form-control" placeholder="It's really an amazing.I want to know more about it..!"></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            <button className="btn btn-primary " type="button">Send</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="3" className="tab-pane fade">
                                                    <div className=" ps-4 pe-3 py-4 ">
                                                        <div className="d-flex align-items-center flex-wrap mb-3">
                                                            <img src={IMAGES.contactpic3} className="avatar avatar-md rounded me-2" alt="" />
                                                            <div>
                                                                <Link to={"#"}>
                                                                    <h6 className="mb-1"> Nella Beck </h6>
                                                                </Link>
                                                                <span>Web Doveloper</span>
                                                            </div>
                                                            <div className="read-content-attachment  ms-sm-auto ms-0">
                                                                <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-reply me-1" />Reply</button>{" "}
                                                                <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-forward me-1" />Forward</button>
                                                            </div>
                                                        </div>
                                                        <div className="read-content-body">
                                                            <h5 className="mb-3">Hi,Ingredia,</h5>
                                                            <p className="mb-2"><strong>Ingredia Nutrisha,</strong> A
                                                                collection of textile samples lay spread out on the
                                                                table - Samsa was a travelling salesman - and above it
                                                                there hung a picture</p>
                                                            <p className="mb-2">Even the all-powerful Pointing has no
                                                                control about the blind texts it is an almost
                                                                unorthographic life One day however a small line of
                                                                blind text by the name of Lorem Ipsum decided to leave
                                                                for
                                                                the far World of Grammar. Aenean vulputate eleifend
                                                                tellus. Aenean leo ligula, porttitor eu, consequat
                                                                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                                                                in, viverra quis, feugiat a, tellus.
                                                            </p>
                                                            <p className="mb-2">Aenean vulputate eleifend tellus. Aenean leo
                                                                ligula, porttitor eu, consequat vitae, eleifend ac,
                                                                enim. Aliquam lorem ante, dapibus in, viverra quis,
                                                                feugiat a, tellus. Phasellus viverra nulla ut
                                                                metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                                                Etiam ultricies nisi vel augue. Curabitur ullamcorper
                                                                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                                                                tempus, tellus eget condimentum
                                                                rhoncus, sem quam semper libero, sit amet adipiscing sem
                                                                neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                                pulvinar,</p>
                                                            <h5 className="pt-3">Kind Regards</h5>
                                                            <p>Mr Smith</p>
                                                            <hr />
                                                        </div>
                                                        <div className="mb-3 pt-3">
                                                            <textarea name="write-email-2" id="write-email-2" cols="30" rows="8" className="form-control" placeholder="It's really an amazing.I want to know more about it..!"></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            <button className="btn btn-primary " type="button">Send</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="4" className="tab-pane fade">
                                                    <div className=" ps-4 pe-3 py-4 ">
                                                        <div className="d-flex align-items-center flex-wrap mb-3">
                                                            <img src={IMAGES.contactpic3} className="avatar avatar-md rounded me-2" alt="" />
                                                            <div>
                                                                <Link to={"#"}>
                                                                    <h6 className="mb-1">Jhon Beck </h6>
                                                                </Link>
                                                                <span>Web Doveloper</span>
                                                            </div>
                                                            <div className="read-content-attachment  ms-sm-auto ms-0">
                                                                <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-reply me-1" />Reply</button>{" "}
                                                                <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-forward me-1" />Forward</button>
                                                            </div>
                                                        </div>
                                                        <div className="read-content-body">
                                                            <h5 className="mb-3">Hi,Ingredia,</h5>
                                                            <p className="mb-2"><strong>Ingredia Nutrisha,</strong> A
                                                                collection of textile samples lay spread out on the
                                                                table - Samsa was a travelling salesman - and above it
                                                                there hung a picture</p>
                                                            <p className="mb-2">Even the all-powerful Pointing has no
                                                                control about the blind texts it is an almost
                                                                unorthographic life One day however a small line of
                                                                blind text by the name of Lorem Ipsum decided to leave
                                                                for
                                                                the far World of Grammar. Aenean vulputate eleifend
                                                                tellus. Aenean leo ligula, porttitor eu, consequat
                                                                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                                                                in, viverra quis, feugiat a, tellus.
                                                            </p>
                                                            <p className="mb-2">Aenean vulputate eleifend tellus. Aenean leo
                                                                ligula, porttitor eu, consequat vitae, eleifend ac,
                                                                enim. Aliquam lorem ante, dapibus in, viverra quis,
                                                                feugiat a, tellus. Phasellus viverra nulla ut
                                                                metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                                                Etiam ultricies nisi vel augue. Curabitur ullamcorper
                                                                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                                                                tempus, tellus eget condimentum
                                                                rhoncus, sem quam semper libero, sit amet adipiscing sem
                                                                neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                                pulvinar,</p>
                                                            <h5 className="pt-3">Kind Regards</h5>
                                                            <p>Mr Smith</p>
                                                            <hr />
                                                        </div>

                                                        <div className="mb-3 pt-3">
                                                            <textarea name="write-email-3" id="write-email-3" cols="30" rows="8" className="form-control" placeholder="It's really an amazing.I want to know more about it..!"></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            <button className="btn btn-primary " type="button">Send</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="5" className="tab-pane fade">
                                                    <div className=" ps-4 pe-3 py-4 ">
                                                        <div className="d-flex align-items-center flex-wrap mb-3">
                                                            <img src={IMAGES.contactpic2} className="avatar avatar-md rounded me-2" alt="" />
                                                            <div>
                                                                <Link to={"#"}>
                                                                    <h6 className="mb-1">Yatin</h6>
                                                                </Link>
                                                                <span>Web Doveloper</span>
                                                            </div>
                                                            <div className="read-content-attachment  ms-sm-auto ms-0">
                                                                <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-reply me-1" />Reply</button>{" "}
                                                                <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-forward me-1" />Forward</button>
                                                            </div>
                                                        </div>
                                                        <div className="read-content-body">
                                                            <h5 className="mb-3">Hi,Ingredia,</h5>
                                                            <p className="mb-2"><strong>Ingredia Nutrisha,</strong> A
                                                                collection of textile samples lay spread out on the
                                                                table - Samsa was a travelling salesman - and above it
                                                                there hung a picture</p>
                                                            <p className="mb-2">Even the all-powerful Pointing has no
                                                                control about the blind texts it is an almost
                                                                unorthographic life One day however a small line of
                                                                blind text by the name of Lorem Ipsum decided to leave
                                                                for
                                                                the far World of Grammar. Aenean vulputate eleifend
                                                                tellus. Aenean leo ligula, porttitor eu, consequat
                                                                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                                                                in, viverra quis, feugiat a, tellus.
                                                            </p>
                                                            <p className="mb-2">Aenean vulputate eleifend tellus. Aenean leo
                                                                ligula, porttitor eu, consequat vitae, eleifend ac,
                                                                enim. Aliquam lorem ante, dapibus in, viverra quis,
                                                                feugiat a, tellus. Phasellus viverra nulla ut
                                                                metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                                                Etiam ultricies nisi vel augue. Curabitur ullamcorper
                                                                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                                                                tempus, tellus eget condimentum
                                                                rhoncus, sem quam semper libero, sit amet adipiscing sem
                                                                neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                                pulvinar,</p>
                                                            <h5 className="pt-3">Kind Regards</h5>
                                                            <p>Mr Smith</p>
                                                            <hr />
                                                        </div>
                                                        <div className="mb-3 pt-3">
                                                            <textarea name="write-email-4" id="write-email-4" cols="30" rows="8" className="form-control" placeholder="It's really an amazing.I want to know more about it..!"></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            <button className="btn btn-primary " type="button">Send</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="6" className="tab-pane fade">
                                                    <div className=" ps-4 pe-3 py-4 ">
                                                        <div className="d-flex align-items-center flex-wrap mb-3">
                                                            <img src={IMAGES.contactpic2} className="avatar avatar-md rounded me-2" alt="" />
                                                            <div>
                                                                <Link to={"#"}>
                                                                    <h6 className="mb-1"> Hanu Beck </h6>
                                                                </Link>
                                                                <span>Web Doveloper</span>
                                                            </div>
                                                            <div className="read-content-attachment  ms-sm-auto ms-0">
                                                                <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-reply me-1" />Reply</button>{" "}
                                                                <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-forward me-1" />Forward</button>
                                                            </div>
                                                        </div>
                                                        <div className="read-content-body">
                                                            <h5 className="mb-3">Hi,Ingredia,</h5>
                                                            <p className="mb-2"><strong>Ingredia Nutrisha,</strong> A
                                                                collection of textile samples lay spread out on the
                                                                table - Samsa was a travelling salesman - and above it
                                                                there hung a picture</p>
                                                            <p className="mb-2">Even the all-powerful Pointing has no
                                                                control about the blind texts it is an almost
                                                                unorthographic life One day however a small line of
                                                                blind text by the name of Lorem Ipsum decided to leave
                                                                for
                                                                the far World of Grammar. Aenean vulputate eleifend
                                                                tellus. Aenean leo ligula, porttitor eu, consequat
                                                                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                                                                in, viverra quis, feugiat a, tellus.
                                                            </p>
                                                            <p className="mb-2">Aenean vulputate eleifend tellus. Aenean leo
                                                                ligula, porttitor eu, consequat vitae, eleifend ac,
                                                                enim. Aliquam lorem ante, dapibus in, viverra quis,
                                                                feugiat a, tellus. Phasellus viverra nulla ut
                                                                metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                                                Etiam ultricies nisi vel augue. Curabitur ullamcorper
                                                                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                                                                tempus, tellus eget condimentum
                                                                rhoncus, sem quam semper libero, sit amet adipiscing sem
                                                                neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                                pulvinar,</p>
                                                            <h5 className="pt-3">Kind Regards</h5>
                                                            <p>Mr Smith</p>
                                                            <hr />
                                                        </div>

                                                        <div className="mb-3 pt-3">
                                                            <textarea name="write-email-5" id="write-email-5" cols="30" rows="8" className="form-control" placeholder="It's really an amazing.I want to know more about it..!"></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            <button className="btn btn-primary " type="button">Send</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="7" className="tab-pane fade">
                                                    <div className=" ps-4 pe-3 py-4 ">
                                                        <div className="d-flex align-items-center flex-wrap mb-3">
                                                            <img src={IMAGES.contactpic2} className="avatar avatar-md rounded me-2" alt="" />
                                                            <div>
                                                                <Link to={"#"}>
                                                                    <h6 className="mb-1"> Nitesh Lewe </h6>
                                                                </Link>
                                                                <span>Web Doveloper</span>
                                                            </div>
                                                            <div className="read-content-attachment  ms-sm-auto ms-0">
                                                                <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-reply me-1" />Reply</button>{" "}
                                                                <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-forward me-1" />Forward</button>
                                                            </div>
                                                        </div>
                                                        <div className="read-content-body">
                                                            <h5 className="mb-3">Hi,Ingredia,</h5>
                                                            <p className="mb-2"><strong>Ingredia Nutrisha,</strong> A
                                                                collection of textile samples lay spread out on the
                                                                table - Samsa was a travelling salesman - and above it
                                                                there hung a picture</p>
                                                            <p className="mb-2">Even the all-powerful Pointing has no
                                                                control about the blind texts it is an almost
                                                                unorthographic life One day however a small line of
                                                                blind text by the name of Lorem Ipsum decided to leave
                                                                for
                                                                the far World of Grammar. Aenean vulputate eleifend
                                                                tellus. Aenean leo ligula, porttitor eu, consequat
                                                                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                                                                in, viverra quis, feugiat a, tellus.
                                                            </p>
                                                            <p className="mb-2">Aenean vulputate eleifend tellus. Aenean leo
                                                                ligula, porttitor eu, consequat vitae, eleifend ac,
                                                                enim. Aliquam lorem ante, dapibus in, viverra quis,
                                                                feugiat a, tellus. Phasellus viverra nulla ut
                                                                metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                                                Etiam ultricies nisi vel augue. Curabitur ullamcorper
                                                                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                                                                tempus, tellus eget condimentum
                                                                rhoncus, sem quam semper libero, sit amet adipiscing sem
                                                                neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                                pulvinar,</p>
                                                            <h5 className="pt-3">Kind Regards</h5>
                                                            <p>Mr Smith</p>
                                                            <hr />
                                                        </div>
                                                        <div className="mb-3 pt-3">
                                                            <textarea name="write-email-6" id="write-email-6" cols="30" rows="8" className="form-control" placeholder="It's really an amazing.I want to know more about it..!"></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            <button className="btn btn-primary " type="button">Send</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="8" className="tab-pane fade">
                                                    <div className="empty-msg-bx">
                                                        <i className="flaticon-email fs-35" />
                                                        <h6>Select a mail to read</h6>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </div>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default EmailRead
