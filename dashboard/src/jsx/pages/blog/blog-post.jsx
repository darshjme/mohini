import { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import { IMAGES, SVGICON } from "../../constant/theme";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { blogpostdata } from "../../constant/alldata";

function BlogPost() {
    return (
        <Fragment>
            <PageTitle activeMenu="Blog Post" motherMenu="Blog" />
            <div className="row">
                <div className="col-xl-8">
                    <div className="card ic-blog-bx">
                        <div className="card-body">
                            <div className="ic-media">
                                <img src={IMAGES.blog1} className="rounded" alt="" />
                            </div>
                            <div className="ic-content">
                                <span className="badge badge-outline-primary">Business</span>
                                <Link to=""><h3 className="mt-2 mb-1">Unlocking Business Efficiency With Sass Solutions</h3></Link>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore laudantium libero incidunt.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card h-auto">
                        <div className="card-header pb-0 border-0">
                            <h4 className="card-title mb-0">
                                Other Features Post
                            </h4>
                            <Dropdown className="dropdown c-pointer">
                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                    {SVGICON.threedotvertical}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="card-body py-3">
                            <div className="profile-news">
                                <div className="media pt-0 pb-3 border-bottom">
                                    <img src={IMAGES.profile05} alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h6 className="m-b-5"><Link to="/post-details" className="text-dark">The Role of SaaS Administration in Ensuring Data Security</Link></h6>
                                        <p className="mb-0">I shared this on my fb wall.</p>
                                    </div>
                                </div>
                                <div className="media pt-3 pb-3 border-bottom">
                                    <img src={IMAGES.profile06} alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h6 className="m-b-5"><Link to="/post-details" className="text-dark">Optimizing User Management in SaaS Platforms: Best Practices and Strategies</Link></h6>
                                        <p className="mb-0">I shared this on my fb wall.</p>
                                    </div>
                                </div>
                                <div className="media pt-3 pb-3 border-bottom">
                                    <img src={IMAGES.profile05} alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h6 className="m-b-5"><Link to="/post-details" className="text-dark">The Role of SaaS Administration in Ensuring Data Security</Link></h6>
                                        <p className="mb-0">I shared this on my fb wall.</p>
                                    </div>
                                </div>
                                <div className="media pt-3 pb-3">
                                    <img src={IMAGES.profile06} alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h6 className="m-b-5"><Link to="/post-details" className="text-dark">Optimizing User Management in SaaS Platforms: Best Practices and Strategies</Link></h6>
                                        <p className="mb-0">I shared this on my fb wall.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="row">
                        {blogpostdata.map((data, index) => (
                            <div className="col-xl-3 col-xxl-4 col-sm-6" key={index}>
                                <div className="card">
                                    <div className="card-body ic-blog-grid">
                                        <div className="ic-blog-media">
                                            <img src={data.image} className="w-100 rounded" alt="" />
                                        </div>
                                        <div className="ic-content mt-3">
                                            <span className="badge badge-outline-primary">{data.btn}</span>
                                            <Link to=""><h4 className="mt-2">The Role of SaaS Administration in Ensuring Data Security</h4></Link>
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
            </div>
        </Fragment>
    );
}
export default BlogPost;
