import { Fragment } from "react";
import {Nav, Tab} from 'react-bootstrap';

const weekDataTable = [
    {
        date: "Nov 01, 2024",
        id: "002445788",
        description: "Darknight transparency 36 Icons Pack",
        amount: 38.00,
        type: "success"
    },
    {
        date: "Oct 24, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: -2.60,
        type: "danger"
    },
    {
        date: "Oct 08, 2024",
        id: "002445788",
        description: "Cartoon Mobile Emoji Phone Pack",
        amount: 76.00,
        type: "success"
    },
    {
        date: "Sep 15, 2024",
        id: "002445788",
        description: "Iphone 12 Pro Mockup Mega Bundle",
        amount: 5.00,
        type: "success"
    },
    {
        date: "May 30, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: -1.30,
        type: "danger"
    },
    {
        date: "Apr 22, 2024",
        id: "002445788",
        description: "Parcel Shipping / Delivery Service App",
        amount: 204.00,
        type: "success"
    },
    {
        date: "Feb 09, 2024",
        id: "002445788",
        description: "Visual Design Illustration",
        amount: 31.00,
        type: "success"
    },
    {
        date: "Jan 17, 2024",
        id: "002445788",
        description: "Abstract Visual Pack",
        amount: 52.00,
        type: "success"
    },
    {
        date: "Jan 04, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: -0.80,
        type: "danger"
    }
];

  
const monthTable = [
    {
        date: "Nov 01, 2024",
        id: "002445788",
        description: "Darknight transparency 36 Icons Pack",
        amount: "$38.00",
        type:'success',
        action: "Download"
    },
    {
        date: "Oct 24, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: "$-2.60",
        type:'danger',
        action: "Download"
    },
    {
        date: "Sep 15, 2024",
        id: "002445788",
        description: "Iphone 12 Pro Mockup Mega Bundle",
        amount: "$5.00",
        type:'success',
        action: "Download"
    },
    {
        date: "May 30, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: "$-1.30",
        type:'danger',
        action: "Download"
    },
    {
        date: "Apr 22, 2024",
        id: "002445788",
        description: "Parcel Shipping / Delivery Service App",
        amount: "$204.00",
        type:'success',
        action: "Download"
    },
    {
        date: "Feb 09, 2024",
        id: "002445788",
        description: "Visual Design Illustration",
        amount: "$31.00",
        type:'success',
        action: "Download"
    },
    {
        date: "Jan 17, 2024",
        id: "002445788",
        description: "Abstract Visual Pack",
        amount: "$52.00",
        type:'success',
        action: "Download"
    },
    {
        date: "Jan 04, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: "$-0.80",
        type:'danger',
        action: "Download"
    }
];

const YearTable = [
    {
        date: "Sep 15, 2024",
        id: "002445788",
        description: "Iphone 12 Pro Mockup Mega Bundle",
        amount: "$5.00",
        type:'success',
        action: "Download"
    },
    {
        date: "May 30, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: "$-1.30",
        type:'danger',
        action: "Download"
    },
    {
        date: "Apr 22, 2024",
        id: "002445788",
        description: "Parcel Shipping / Delivery Service App",
        amount: "$204.00",
        type:'success',
        action: "Download"
    },
    {
        date: "Feb 09, 2024",
        id: "002445788",
        description: "Visual Design Illustration",
        amount: "$31.00",
        type:'success',
        action: "Download"
    },
    {
        date: "Jan 17, 2024",
        id: "002445788",
        description: "Abstract Visual Pack",
        amount: "$52.00",
        type:'success',
        action: "Download"
    },
    {
        date: "Jan 04, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: "$-0.80",
        type:'danger',
        action: "Download"
    }
];

const AllTable = [
    {
        date: "Jan 17, 2024",
        id: "002445788",
        description: "Abstract Visual Pack",
        amount: "$38.00",
        type: "success"
    },
    {
        date: "Jan 04, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: "$-2.60",
        type: "danger"
    },
    {
        date: "Oct 08, 2024",
        id: "002445788",
        description: "Cartoon Mobile Emoji Phone Pack",
        amount: "$5.00",
        type: "success"
    },
    {
        date: "Sep 15, 2024",
        id: "002445788",
        description: "Iphone 12 Pro Mockup Mega Bundle",
        amount: "$-1.30",
        type: "success"
    },
    {
        date: "May 30, 2024",
        id: "002445788",
        description: "Seller Fee",
        amount: "$204.00",
        type: "danger"
    },
    {
        date: "Apr 22, 2024",
        id: "002445788",
        description: "Parcel Shipping / Delivery Service App",
        amount: "$31.00",
        type: "success"
    },
    {
        date: "Feb 09, 2024",
        id: "002445788",
        description: "Visual Design Illustration",
        amount: "$52.00",
        type: "success"
    },
];

function StatementTable(){
    return(
        <Fragment>
            <div className="card">
                <Tab.Container defaultActiveKey={'Week'}>
                    <div className="card-header border-0 py-3 pb-0 d-block d-sm-flex">
                        <h4 className="heading mb-0">Statement</h4>                    
                        <Nav as="ul" className="nav nav-pills mt-3 mt-sm-0 mix-chart-tab" id="myTabBillingHistory" role="tablist">
                            <Nav.Item as="li" className="ms-1">
                                <Nav.Link as="button" className="btn btn-light"  eventKey={'Week'}>Week</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="ms-1">
                                <Nav.Link as="button" className="btn btn-light" eventKey={'Month'}>Month</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="ms-1">
                                <Nav.Link as="button" className="btn btn-light" eventKey={'Year'}>Year</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="ms-1">
                                <Nav.Link as="button" className="btn btn-light"  eventKey={'All'}>All</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="card-body">
                        <Tab.Content>
                            <Tab.Pane eventKey={'Week'}>
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Order ID</th>
                                                <th>Details</th>
                                                <th>Amount</th>
                                                <th className="text-end">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {weekDataTable.map((elem, index)=>(
                                                <tr key={index}>
                                                    <td>{elem.date}</td>
                                                    <td>{elem.id}</td>
                                                    <td>{elem.description}</td>
                                                    <td><span className={`text-${elem.type}`}>${elem.amount}</span></td>
                                                    <td className="text-end"><button type="button" className="btn btn-xxs btn-light">Download</button></td>
                                                </tr>
                                            ))}                                            
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'Month'}>
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Order ID</th>
                                                <th>Details</th>
                                                <th>Amount</th>
                                                <th className="text-end">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monthTable.map((data, index)=>(
                                                <tr key={index}>
                                                    <td>{data.date}</td>
                                                    <td>{data.id}</td>
                                                    <td>{data.description}</td>
                                                    <td><span className={`text-${data.type}`}>{data.amount}</span></td>
                                                    <td className="text-end"><button type="button" className="btn btn-xxs btn-light">Download</button></td>
                                                </tr>
                                            ))}                                            
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'Year'} >
                                <div className="table-responsive">
                                    <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Order ID</th>
                                                <th>Details</th>
                                                <th>Amount</th>
                                                <th className="text-end">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {YearTable.map((data, index)=>(
                                                <tr key={index}>
                                                    <td>{data.date}</td>
                                                    <td>{data.id}</td>
                                                    <td>{data.description}</td>
                                                    <td><span className={`text-${data.type}`}>{data.amount}</span></td>
                                                    <td className="text-end"><button type="button" className="btn btn-xxs btn-light">Download</button></td>
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
                                                <th>Date</th>
                                                <th>Order ID</th>
                                                <th>Details</th>
                                                <th>Amount</th>
                                                <th className="text-end">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {AllTable.map((data, index)=>(
                                                <tr key={index}>
                                                    <td>{data.date}</td>
                                                    <td>{data.id}</td>
                                                    <td>{data.description}</td>
                                                    <td><span className={`text-${data.type}`}>{data.amount}</span></td>
                                                    <td className="text-end"><button type="button" className="btn btn-xxs btn-light">Download</button></td>
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
export default StatementTable;