import { Fragment } from "react";
import ReferralsTable from "../../components/account/ReferralsTable";
import { Link } from "react-router-dom";
import AccountDefaultCard from "../../components/account/AccountDefaultCard";
import { balanceSheet } from "../../constant/alldata";  

function AccountReferrals(){
    return(
        <Fragment>
            <div className="card profile-overview">
                <AccountDefaultCard activePage={'referrals'} />
            </div>
            <div className="tab-content">
                <div className="row">
                    <div className="col-xl-6 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="heading mb-0">Referral Program</h4>
                            </div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-lg-6 mb-3">
                                        <h6 className="mb-1 fw-semibold">How to use Referral Program</h6>
                                        <p className="fs-14">Elevate your post: Integrate images for impact, smooth flow, humor, and clarity on complex subjects</p>
                                        <Link to={"#"} className="btn btn-light">Get Started</Link>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <h6 className="mb-1 fw-semibold">Your Referral Link</h6>
                                        <p className="fs-14">Craft your blog post: Choose a topic, outline, research, and fact-check diligently</p>
                                        <div className="select-text-wrap">
                                            <div className="text-select-copy border border-secondary border-opacity-10 px-3 py-2 rounded mb-3 text-primary">https://dexginlab.com/reffer/</div>
                                            <button type="button" className="btn btn-light btn-select-text">Copy Link</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    {balanceSheet.map((ele, ind)=>(
                                        <div className="col-lg-3 col-sm-6 mb-3" key={ind}>
                                            <div className={`rounded p-3 text-center ${ele.bgColor}`}>
                                                <h3 className="mb-0 fw-semibold">{ele.amount}</h3>
                                                <span className={`fs-14 ${ele.textColor}`}>{ele.label}</span>
                                            </div>
                                        </div>
                                    ))}                                    
                                </div>
                                <div className="mb-4">
                                    <p className="fs-14 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                </div>
                                <div className="alert alert-outline-light bg-light bg-opacity-25 outline-dashed p-3 d-sm-flex align-items-center">
                                    <i className="fa-solid fa-building-columns text-primary fs-24 align-self-start"></i>
                                    <div className="mx-sm-3 my-3 my-sm-0">
                                        <h6 className="fs-14 fw-semibold mb-1">Withdraw Your Funds to Bank</h6>
                                        <p className="fs-14 mb-0">Securely withdraw money to your bank account, with a $25 fee.</p>
                                    </div>
                                    <div className="clearfix flex-shrink-0 ms-sm-auto">
                                        <Link to={"#"} className="btn btn-primary">Withdraw Money</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-xxl-12">
                        <ReferralsTable />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AccountReferrals;