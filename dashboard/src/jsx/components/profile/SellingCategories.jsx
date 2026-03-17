import { Fragment } from "react";
import TopSellingChart from "./TopSellingChart";
import { Link } from "react-router-dom";

const partsBlog = [
    {title:'Laptop', color:'primary', number:'20',},
    {title:'Phone', color:'success', number:'05',},
    {title:'Keyboard', color:'danger', number:'05',},
    {title:'Mouse', color:'warning', number:'20',},
    {title:'Monitors', color:'purple', number:'21',},
    {title:'Watch', color:'dark', number:'04',},
    {title:'Earbuds', color:'', number:'25',},
];

function SellingCategories(){
    return(
        <Fragment>
            <div className="card">
                <div className="card-header pb-0 border-0">
                    <div className="clearfix">
                        <h5 className="mb-0">Top Selling Categories</h5>
                        <small className="d-block">7 Category</small>
                    </div>
                </div>
                <div className="card-body pt-1">
                    <div className="row align-items-center">
                        <div className="col-sm-6 mb-3 d-flex justify-content-center">
                            <div id="chartTopSelling">
                                <TopSellingChart/>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            {partsBlog.map((ele, index)=>(
                                <div className="d-flex justify-content-between mb-3" key={index}>
                                    <div className="text-black">
                                        <i className={`fa-solid fa-square me-1 text-${ele.color}`}/> {ele.title}
                                    </div>
                                    <span>{ele.number}</span>
                                </div>
                            ))}                            
                        </div>
                    </div>
                    <div className="alert alert-outline-light outline-dashed p-3 d-sm-flex align-items-center justify-content-between mb-0">
                        <p className="mb-0">Category report for a company's quarterly sales performance</p>
                        <div className="clearfix w-100 ms-auto text-sm-end mt-2 mt-sm-0">
                            <Link to={"#"} className="btn btn-primary">Download Report</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default SellingCategories;