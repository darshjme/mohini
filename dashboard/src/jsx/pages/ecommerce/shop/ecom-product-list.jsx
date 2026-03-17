import { Fragment } from "react";
import PageTitle from "../../../layouts/PageTitle";
import ShopSidebar from "../../../element/shopsidebar"; 
import { Link } from "react-router-dom";
import { productlistdata } from "../../../constant/alldata";

function ProductList() {
    return (
        <Fragment>
            <PageTitle activeMenu="Product List" motherMenu="Shop" />
            <div className="row">
                <ShopSidebar />
                <div className="col-xl-10 col-xxl-9 col-md-8">
                    <div className="row">
                        {productlistdata.map((item, index) => (
                            <div className="col-xl-6" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row m-b-30">
                                            <div className="col-xl-4 col-xxl-12">
                                                <div className="new-arrival-product mb-xxl-4">
                                                    <div className="new-arrivals-img-contnent">
                                                        <img className="img-fluid" src={item.image} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-8 col-xxl-12">
                                                <div className="position-relative d-flex align-items-center mb-3 pt-2 pt-sm-0">
                                                    <div>
                                                        <Link to="/ecom-product-detail">
                                                            <h5 className="font-w500 mb-0">{item.title}</h5>
                                                        </Link>
                                                        <span>Accessories, Clocks</span>
                                                    </div>
                                                    <div className="star-rating ms-auto">
                                                        <ul>
                                                            <li><i className="fa fa-star" /></li>{" "}
                                                            <li><i className="fa fa-star" /></li>{" "}
                                                            <li><i className="fa fa-star" /></li>{" "}
                                                            <li><i className="fa-solid fa-star-half-stroke" /></li>{" "}
                                                        </ul>
                                                        <span>34 Review</span>
                                                    </div>
                                                </div>
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</p>
                                                <div className="rate">
                                                    <div className="d-flex align-items-center mb-xl-3 mb-2">
                                                        <div>
                                                            <h6>Price</h6>
                                                            <span className="price-num">$40.00</span>
                                                        </div>
                                                        <div className="meta-content">
                                                            <h6>Color</h6>
                                                            <div className="d-flex align-items-center color-filter">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel11" value="#24262B" aria-label="..." checked="" />
                                                                    <span style={{ backgroundColor: 'rgb(208, 237, 255)' }}></span>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel12" value="#8CB2D1" aria-label="..." />
                                                                    <span style={{ backgroundColor: 'rgb(241, 231, 230)' }}></span>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel13" value="#0D775E" aria-label="..." />
                                                                    <span style={{ backgroundColor: 'rgb(91, 191, 191)' }}></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ms-auto">
                                                            <Link to="/ecom-product-detail" className="btn btn-primary btn-sm">Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
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
    )
}

export default ProductList;
