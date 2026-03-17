import { Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";

const WeekTableData = [
    {
        id: "678935899",
        name: "Marcus Harris",
        date: "Nov 24, 2024",
        percentage: "26%",
        amount: "$620.00",
        status: "success"
    },
    {
        id: "578433345",
        name: "Maria Garcia",
        date: "Aug 10, 2024",
        percentage: "35%",
        amount: "$1,200.00",
        status: "success"
    },
    {
        id: "678935899",
        name: "Robert Smith",
        date: "May 06, 2024",
        percentage: "35%",
        amount: "$940.00",
        status: "success"
    },
    {
        id: "098669322",
        name: "Williams Brown",
        date: "Apr 30, 2024",
        percentage: "18%",
        amount: "$200.00",
        status: "success"
    },
    {
        id: "245899092",
        name: "Paul Johnson",
        date: "Feb 29, 2024",
        percentage: "21%",
        amount: "$380.00",
        status: "success"
    },
    {
        id: "505432578",
        name: "Sarah Jones",
        date: "Jan 08, 2024",
        percentage: "47%",
        amount: "$2,050.00",
        status: "success"
    },
    {
        id: "256899235",
        name: "Juan Carlos",
        date: "Jan 02, 2024",
        percentage: "35%",
        amount: "$820.00",
        status: "success"
    }
];

function ReferralsTable(){
    return(
        <Fragment>
            <div className="card h-auto">
                <Tab.Container defaultActiveKey={'All'}>
                    <div className="card-header border-0 py-3 d-block d-sm-flex pb-0">
                        <h4 className="heading mb-0">Referred Users</h4>
                        <Nav as="ul" className="nav nav-pills mt-3 mt-sm-0 mix-chart-tab">
                            <Nav.Item as="li" className="nav-item ms-1">
                                <Nav.Link as="button" className="nav-link btn btn-light btn-sm" eventKey={'Week'}>Week</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item ms-1">
                                <Nav.Link as="button" className="nav-link btn btn-light btn-sm" eventKey={'Month'}>Month</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item ms-1">
                                <Nav.Link as="button" className="nav-link btn btn-light btn-sm" eventKey={'Year'}>Year</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item ms-1">
                                <Nav.Link as="button" className="nav-link btn btn-light btn-sm" eventKey={'All'}>All</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="card-body">
                        <Tab.Content>
                            <Tab.Pane  eventKey={'Week'}>
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Bonus</th>
                                                <th className="text-end">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {WeekTableData.map((item, ind)=>(
                                                <tr key={ind}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.percentage}</td>
                                                    <td className="text-end"><span className={`text-${item.status}`}>{item.amount}</span></td>
                                                </tr>
                                            ))}                                            
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane  eventKey={'Month'}>
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Bonus</th>
                                                <th className="text-end">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {WeekTableData.map((item, ind)=>(
                                                <tr key={ind}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.percentage}</td>
                                                    <td className="text-end"><span className={`text-${item.status}`}>{item.amount}</span></td>
                                                </tr>
                                            ))}   
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane  eventKey={'Year'}>
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Bonus</th>
                                                <th className="text-end">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {WeekTableData.map((item, ind)=>(
                                                <tr key={ind}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.percentage}</td>
                                                    <td className="text-end"><span className={`text-${item.status}`}>{item.amount}</span></td>
                                                </tr>
                                            ))}   
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'All'}>
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Bonus</th>
                                                <th className="text-end">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {WeekTableData.map((item, ind)=>(
                                                <tr key={ind}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.percentage}</td>
                                                    <td className="text-end"><span className={`text-${item.status}`}>{item.amount}</span></td>
                                                </tr>
                                            ))}   
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>								
                    </div>
                </Tab.Container>
            </div>
        </Fragment>
    )
}

export default ReferralsTable;