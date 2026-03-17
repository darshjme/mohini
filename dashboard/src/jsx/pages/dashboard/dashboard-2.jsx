import { Dropdown, Nav, Tab } from "react-bootstrap";
import { IMAGES, SVGICON } from "../../constant/theme";
import Contactdata from "../../element/contactdata";
import InvoiceChart from "../../components/dashboard/invoicechart";
import EarningsChart from "../../components/dashboard/earningschart";
import EarningPredictionChart from "../../components/dashboard/earningpredictionchart";

function Dashboard2() {
    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h6 className="mb-0">Sales</h6>
                            <Dropdown className="dropdown ms-auto c-pointer">
                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                    {SVGICON.threedot}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="card-body pt-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h2 className="card-title">69,700</h2>
                                    <span><small className="text-success font-w600 me-1">+1.6%</small>than last week</span>
                                </div>
                                <div id="totalInvoices">
                                    <InvoiceChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h6 className="mb-0">Earnings</h6>
                            <Dropdown className="dropdown ms-auto c-pointer">
                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                    {SVGICON.threedot}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="card-body pt-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h2 className="card-title">40,700</h2>
                                    <span><small className="text-danger font-w600 me-1">-1.6%</small>than last week</span>
                                </div>
                                <div id="chart">
                                    <EarningsChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h6 className="mb-0">Users</h6>
                            <Dropdown className="dropdown ms-auto c-pointer">
                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                    {SVGICON.threedot}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="card-body pt-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h2 className="card-title">5.2700</h2>
                                    <span><small className="text-danger font-w600 me-1">-1.6%</small>than last week</span>
                                </div>
                                <div id="chart-1">
                                    <EarningsChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h6 className="mb-0">View</h6>
                            <Dropdown className="dropdown ms-auto c-pointer">
                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                    {SVGICON.threedot}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="card-body pt-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h2 className="card-title">6.2589</h2>
                                    <span><small className="text-success font-w600 me-1">+1.6%</small>than last week</span>
                                </div>
                                <div id="totalInvoices-1">
                                    <InvoiceChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-0">Earnings Prediction</h4>
                        </div>
                        <div className="card-body">
                            <div id="EarningsPrediction">
                                <EarningPredictionChart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="mb-0">Users</h4>
                        </div>
                        <Contactdata gap="g-4"/>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-0">Product Specific Earnings</h4>
                        </div>
                        <div className="card-body px-0">
                            <Tab.Container defaultActiveKey="social">
                                <Nav className="nav nav-pills success-tab">
                                    <Nav.Item className="nav-item">
                                        <Nav.Link eventKey="social" className="nav-link">{SVGICON.socialheart} <span>Social</span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link eventKey="project" className="nav-link"> {SVGICON.project} <span>Project</span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link eventKey="sale" className="nav-link">{SVGICON.scale} <span>Sale</span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link eventKey="mobile" className="nav-link">{SVGICON.mobile} <span>Mobile</span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link eventKey="all" className="nav-link">{SVGICON.all} <span>All</span></Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="social">
                                        <div className="table-responsive">
                                            <table className="table  card-table border-no success-tbl">
                                                <thead>
                                                    <tr>
                                                        <th>Project</th>
                                                        <th>Avg.</th>
                                                        <th>Date</th>
                                                        <th>status</th>
                                                        <th>Budget</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning1} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span></td>
                                                        <td>  $4.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning2} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span></td>
                                                        <td>$15.5k</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning3} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Creativerse</h6>
                                                                    <span>A free-to-play game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span></td>
                                                        <td>$15.5k</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning4} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span></td>
                                                        <td>$4.5k</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning5} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span></td>
                                                        <td>$15.5k</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="project">
                                        <div className="table-responsive">
                                            <table className="table  card-table border-no success-tbl">
                                                <thead>
                                                    <tr>
                                                        <th>Project</th>
                                                        <th>Avg.</th>
                                                        <th>Date</th>
                                                        <th>status</th>
                                                        <th>Budget</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning4} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span>
                                                        </td>
                                                        <td>
                                                            $4.5k
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning5} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span>
                                                        </td>
                                                        <td>
                                                            $15.5k
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning6} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Creativerse</h6>
                                                                    <span>A free-to-play game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-success light border-0">Success</span>
                                                        </td>
                                                        <td>
                                                            $15.5k
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="sale">
                                        <div className="table-responsive">
                                            <table className="table  card-table border-no success-tbl">
                                                <thead>
                                                    <tr>
                                                        <th>Project</th>
                                                        <th>Avg.</th>
                                                        <th>Date</th>
                                                        <th>status</th>
                                                        <th>Budget</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning1} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span>
                                                        </td>
                                                        <td> $4.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning2} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span>
                                                        </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning3} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Creativerse</h6>
                                                                    <span>A free-to-play game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span>
                                                        </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning4} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span>
                                                        </td>
                                                        <td> $4.5k </td>
                                                    </tr> 
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="mobile">
                                        <div className="table-responsive">
                                            <table className="table  card-table border-no success-tbl">
                                                <thead>
                                                    <tr>
                                                        <th>Project</th>
                                                        <th>Avg.</th>
                                                        <th>Date</th>
                                                        <th>status</th>
                                                        <th>Budget</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning1} className="avatar avatar-xl"
                                                                    alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span>
                                                        </td>
                                                        <td> $4.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning2} className="avatar avatar-xl"
                                                                    alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning3} className="avatar avatar-xl"
                                                                    alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Creativerse</h6>
                                                                    <span>A free-to-play game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning4} className="avatar avatar-xl"
                                                                    alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span>
                                                        </td>
                                                        <td> $4.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning5} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning6} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Creativerse</h6>
                                                                    <span>A free-to-play game</span>
                                                                </div>
                                                            </div>
                                                        </td>   
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-success light border-0">Success</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="all">
                                        <div className="table-responsive">
                                            <table className="table  card-table border-no success-tbl">
                                                <thead>
                                                    <tr>
                                                        <th>Project</th>
                                                        <th>Avg.</th>
                                                        <th>Date</th>
                                                        <th>status</th>
                                                        <th>Budget</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning1} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span> </td>
                                                        <td> $4.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning2} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning3} className="avatar avatar-xl"
                                                                    alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Creativerse</h6>
                                                                    <span>A free-to-play game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning4} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Block Craft 3D</h6>
                                                                    <span>A free game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>66.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-primary light border-0">Inprogress</span> </td>
                                                        <td> $4.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning5} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Survivalcraft</h6>
                                                                    <span>A game with a focus</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-danger light border-0">Pending</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={IMAGES.earning6} className="avatar avatar-xl" alt="" />
                                                                <div className="ms-2 cat-name">
                                                                    <h6 className="mb-0">Creativerse</h6>
                                                                    <span>A free-to-play game</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>90.99%</td>
                                                        <td>20 Aug 2024</td>
                                                        <td><span className="badge badge-success light border-0">Success</span> </td>
                                                        <td> $15.5k </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>

                </div>
                <div className="col-xl-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-0">Activity</h4>
                        </div>
                        <div className="card-body">
                            <div className="widget-timeline-status">
                                <ul className="timeline">
                                    <li>
                                        <span className="timeline-status">08:30</span>
                                        <div className="timeline-badge border-dark"></div>
                                        <div className="timeline-panel"> <span>Quisque a consequat ante Sit amet magna at volutapt.</span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">10:30</span>
                                        <div className="timeline-badge border-success"></div>
                                        <div className="timeline-panel"> <span className="text-black fs-14 fw-semibold">Video Sharing</span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">02:42</span>
                                        <div className="timeline-badge border-danger"></div>
                                        <div className="timeline-panel"> <span className="text-black fs-14 fw-semibold">john just buy your product Sell <span className="text-primary">$250</span></span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">15:40</span>
                                        <div className="timeline-badge border-info"></div>
                                        <div className="timeline-panel"> <span>Mashable, a news website and blog, goes live.</span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">23:12</span>
                                        <div className="timeline-badge border-warning"></div>
                                        <div className="timeline-panel"> <span className="text-black fs-14 fw-semibold">StumbleUpon is acquired by <span className="text-primary">eBay</span></span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">11:12</span>
                                        <div className="timeline-badge border-primary"></div>
                                        <div className="timeline-panel"> <span>shared this on my fb wall a few months back.</span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">08:30</span>
                                        <div className="timeline-badge border-dark"></div>
                                        <div className="timeline-panel"> <span>Quisque a consequat ante Sit amet magna at volutapt.</span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">10:30</span>
                                        <div className="timeline-badge border-success"></div>
                                        <div className="timeline-panel"> <span className="text-black fs-14 fw-semibold">Video Sharing</span> </div>
                                    </li>
                                    <li>
                                        <span className="timeline-status">02:42</span>
                                        <div className="timeline-badge border-danger"></div>
                                        <div className="timeline-panel"> <span className="text-black fs-14 fw-semibold">john just buy your product Sell <span className="text-primary">$250</span></span> </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="card">
                        <div className="card-header pb-0 border-0">
                            <div className="clearfix">
                                <h5 className=" mb-0">Projects Contributions</h5>
                                <small className="d-block">84 New Tasks & 29 Guides</small>
                            </div>
                            <div className="clearfix ms-auto">
                                <button type="button" className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start">
                                    <i className="bi bi-grid" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1">
                                <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                                    <img src={IMAGES.google} alt="" />
                                </div>
                                <div className="clearfix ms-3">
                                    <h6 className="mb-0 fw-semibold">Piper Aerostar</h6>
                                    <span className="fs-13">piper-aircraft-class.jsp</span>
                                </div>
                                <div className="clearfix ms-auto">
                                    <span className="badge badge-sm badge-light">0</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1">
                                <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                                    <img src={IMAGES.slack} alt="" />
                                </div>
                                <div className="clearfix ms-3">
                                    <h6 className="mb-0 fw-semibold">Beachcraft Baron</h6>
                                    <span className="fs-13">baron-class.pyt</span>
                                </div>
                                <div className="clearfix ms-auto">
                                    <span className="badge badge-sm badge-light">0</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1">
                                <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                                    <img src={IMAGES.html} alt="" />
                                </div>
                                <div className="clearfix ms-3">
                                    <h6 className="mb-0 fw-semibold">Cessna SF150</h6>
                                    <span className="fs-13">cessna-aircraft-class.jsp</span>
                                </div>
                                <div className="clearfix ms-auto">
                                    <span className="badge badge-sm badge-light">0</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1">
                                <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                                    <img src={IMAGES.figma} alt="" />
                                </div>
                                <div className="clearfix ms-3">
                                    <h6 className="mb-0 fw-semibold">Cirrus SR22</h6>
                                    <span className="fs-13">cirrus-aircraft.jsp</span>
                                </div>
                                <div className="clearfix ms-auto">
                                    <span className="badge badge-sm badge-light">3</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1">
                                <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                                    <img src={IMAGES.slack} alt="" />
                                </div>
                                <div className="clearfix ms-3">
                                    <h6 className="mb-0 fw-semibold">Beachcraft Baron</h6>
                                    <span className="fs-13">baron-class.pyt</span>
                                </div>
                                <div className="clearfix ms-auto">
                                    <span className="badge badge-sm badge-light">0</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1">
                                <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                                    <img src={IMAGES.html} alt="" />
                                </div>
                                <div className="clearfix ms-3">
                                    <h6 className="mb-0 fw-semibold">Cessna SF150</h6>
                                    <span className="fs-13">cessna-aircraft-class.jsp</span>
                                </div>
                                <div className="clearfix ms-auto">
                                    <span className="badge badge-sm badge-light">0</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 hover-bg-light rounded my-1">
                                <div className="avatar avatar-md style-1 border border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
                                    <img src={IMAGES.html} alt="" />
                                </div>
                                <div className="clearfix ms-3">
                                    <h6 className="mb-0 fw-semibold">Cessna SF150</h6>
                                    <span className="fs-13">cessna-aircraft-class.jsp</span>
                                </div>
                                <div className="clearfix ms-auto">
                                    <span className="badge badge-sm badge-light">0</span>
                                </div>
                            </div>
                            <div className="alert alert-primary border-primary outline-dashed py-3 px-3 mt-4 mb-0 text-black">
                                <strong className="text-primary">Intive New .NET Collaborators</strong>
                                to creating great outstanding business to business .jsp modutr class scripts
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard2;
