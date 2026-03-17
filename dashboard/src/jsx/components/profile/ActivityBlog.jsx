import { Fragment } from "react";

function ActivityBlog() {
    return (
        <Fragment>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title mb-0">Activity</h4>
                </div>
                <div className="card-body">
                    <div className="widget-timeline-status">
                        <ul className="timeline">
                            <li>
                                <span className="timeline-status">08:30</span>
                                <div className="timeline-badge border-dark"></div>
                                <div className="timeline-panel">
                                    <span>Quisque a consequat ante Sit amet magna at volutapt.</span>
                                </div>
                            </li>
                            <li>
                                <span className="timeline-status">10:30</span>
                                <div className="timeline-badge border-success"></div>
                                <div className="timeline-panel">
                                    <span className="text-black fs-14 fw-semibold">Video Sharing</span>
                                </div>
                            </li>
                            <li>
                                <span className="timeline-status">02:42</span>
                                <div className="timeline-badge border-danger"></div>
                                <div className="timeline-panel">
                                    <span className="text-black fs-14 fw-semibold">john just buy your product Sell  <span className="text-primary">$250</span></span>
                                </div>
                            </li>
                            <li>
                                <span className="timeline-status">15:40</span>
                                <div className="timeline-badge border-info"></div>
                                <div className="timeline-panel">
                                    <span>Mashable, a news website and blog, goes live.</span>
                                </div>
                            </li>
                            <li>
                                <span className="timeline-status">23:12</span>
                                <div className="timeline-badge border-warning"></div>
                                <div className="timeline-panel">
                                    <span className="text-black fs-14 fw-semibold">StumbleUpon is acquired by <span className="text-primary">eBay</span></span>
                                </div>
                            </li>
                            <li>
                                <span className="timeline-status">11:12</span>
                                <div className="timeline-badge border-primary"></div>
                                <div className="timeline-panel">
                                    <span>shared this on my fb wall a few months back.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ActivityBlog;