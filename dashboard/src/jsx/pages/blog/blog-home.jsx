import { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import { IMAGES } from "../../constant/theme";
import { Link } from "react-router-dom";
import { blogpostdata } from "../../constant/alldata";

function BlogHome() {
    return (
        <Fragment>
            <PageTitle activeMenu="Blog Home" motherMenu="Blog" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="row g-2">
                        <div className="col-xl-8 col-lg-7">
                            <div className="card ic-blog-bx">
                                <div className="card-body p-2">
                                    <div className="ic-media">
                                        <img src={IMAGES.blog1} className="rounded" alt="" />
                                    </div>
                                    <div className="ic-content px-2">
                                        <span className="badge badge-outline-primary">Business</span>
                                        <Link to="">
                                            <h3 className="mt-2 mb-1">Unlocking Business Efficiency With Sass Solutions </h3>
                                        </Link>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore laudantium libero incidunt.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="card ic-blog-grid h-auto mb-2">
                                <div className="card-body p-0">
                                    <div className="ic-blog-media">
                                        <img src={IMAGES.blog2} className="w-100 rounded" alt="" />
                                        <div className="ic-blog-info">
                                            <div className="ic-meta">
                                                <ul>
                                                    <li><Link to="" className="me-2 text-white">lifestyle</Link></li>
                                                    <li><Link to="" className="text-white">Wooden</Link></li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4><Link to="" className="text-white">Embrace Luxury Living with our Elegant Couches</Link></h4>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="card ic-blog-grid h-auto">
                                <div className="card-body p-0">
                                    <div className="ic-blog-media">
                                        <img src={IMAGES.blog3} className="w-100 rounded" alt="" />
                                        <div className="ic-blog-info">
                                            <div className="ic-meta">
                                                <ul>
                                                    <li><Link to="" className="me-2 text-white">lifestyle</Link></li>
                                                    <li><Link to="" className="text-white">Wooden</Link></li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4><Link to="" className="text-white">Embrace Luxury Living with our Elegant Couches</Link></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="row g-2">
                        {blogpostdata.map((data, index) => (
                            <div className="col-xl-3 col-sm-6" key={index}>
                                <div className="card">
                                    <div className="card-body ic-blog-grid p-2">
                                        <div className="ic-blog-media">
                                            <img src={data.image} className="w-100 rounded ic-post" alt="" />
                                        </div>
                                        <div className="ic-content p-2 pt-3">
                                            <span className="badge badge-outline-primary">{data.btn}</span>
                                            <Link to="">
                                                <h4 className="mt-2">The Role of SaaS Administration in Ensuring Data Security</h4>
                                            </Link>
                                            <p className="mb-0">This post explores the critical role of SaaS administrators in maintaining data security within cloud-based applications</p>
                                            <div className="mt-2">
                                                <img src={IMAGES.contactpic2} className="avatar rounded-circle me-1 avatar-sm" alt="" />
                                                <span className="me-2">{data.name}</span>
                                                <span>3 Min Read</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h4 className="card-title">Editor Choice</h4>
                        <Link to="" className="text-primary">View All</Link>
                    </div>
                    <div className="row g-2">
                        {blogpostdata.map((data, index) => (
                            <div className="col-xl-3 col-sm-6" key={index}>
                                <div className="card">
                                    <div className="card-body ic-blog-grid style-1 p-2">
                                        <div className="ic-blog-media">
                                            <img src={data.image2} className="w-100 rounded ic-post" alt="" />
                                        </div>
                                        <div className="ic-content p-2 pt-3">
                                            <div className="ic-meta mb-2">
                                                <ul>
                                                    <li className="dz-comment"><Link to="" className="text-dark">0 Comment</Link> </li>
                                                    <li><Link to="" className="text-dark">Sep 10, 2023</Link></li>
                                                </ul>
                                            </div>
                                            <h5 className="card-title--medium"><Link to="" className="text-dark">Tuning an Acoustic and Electric Guitar in 6 Steps</Link></h5>
                                            <p>Lorem Ipsum is simply dummy text of has the printing and has been typesetting industry. </p>
                                            <div className="read-btn">
                                                <Link to="" className="btn btn-primary btn-sm  text-uppercase">Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default BlogHome;
