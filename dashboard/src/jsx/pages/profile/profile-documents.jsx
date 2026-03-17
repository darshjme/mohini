import { Fragment } from "react";
import { SVGICON } from "../../constant/theme";
import { Nav, Tab } from "react-bootstrap";
import ProfileOverviewCard from "../../components/profile/ProfileOverviewCard";
import { fileExtension } from "../../constant/alldata";

function ProfileDocuments() {
    return (
        <Fragment>
            <div className="card profile-overview profile-overview-wide">
                <ProfileOverviewCard activePage="documents" />
            </div>
            <Tab.Container defaultActiveKey={'List'}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Documents</h5>
                    <div className="d-flex align-items-center">
                        <Nav as="ul" className="nav nav-pills">
                            <Nav.Item as="li" className="nav-item ms-1">
                                <Nav.Link as="button" className="nav-link btn btn-light btn-sharp p-0" eventKey={'List'}>
                                    {SVGICON.tablist}
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item ms-1">
                                <Nav.Link as="button" className="nav-link btn btn-light btn-sharp p-0" eventKey={'Grid'}>
                                    {SVGICON.tabgrid}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                <Tab.Content>
                    <Tab.Pane eventKey={'List'}>
                        <div className="row">
                            {fileExtension.map((data, i) => (
                                <div className="col-xxl-2 col-xl-3 col-md-4 col-sm-6" key={i}>
                                    <div className="card">
                                        <div className="card-body px-4 py-3 d-flex align-items-center gap-3">
                                            <div>
                                                <img src={data.image} width="45" alt="icon" />
                                            </div>
                                            <div className="clearfix">
                                                <h6 className="mb-0">{data.name}</h6>
                                                <span className="fs-14">{data.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab.Pane>
                </Tab.Content>
                <Tab.Content>
                    <Tab.Pane eventKey={'Grid'}>
                        <div className="row">
                            {fileExtension.map((data, i) => (
                                <div className="col-xl-2 col-lg-4 col-sm-6" key={i}>
                                    <div className="card">
                                        <div className="card-body text-center p-4 d-flex flex-column justify-content-between">
                                            <div className="m-auto pb-3">
                                                <img src={data.image} alt="icon" />
                                            </div>
                                            <div className="clearfix">
                                                <h5 className="mb-0">{data.name}</h5>
                                                <span className="fs-14">{data.status2}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Fragment>
    )
}
export default ProfileDocuments;