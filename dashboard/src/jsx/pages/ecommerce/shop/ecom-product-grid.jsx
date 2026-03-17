import { Fragment } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { Link } from "react-router-dom";
import ShopSidebar from "../../../element/shopsidebar"; 
import { productgriddata } from "../../../constant/alldata";

function ProductGrid() {
    return (
        <Fragment>
            <PageTitle activeMenu="Product Grid" motherMenu="Shop" />
            <div className="row">
                <ShopSidebar />
                <div className="col-xl-10 col-xxl-9 col-md-8 mt-4 mt-md-0">
                    <div className="row">
                        {productgriddata.map((item, index) => (
                            <div className="col-xl-3 col-xxl-4  col-md-6 col-sm-6" key={index}>
                                <div className="card">
                                    <div className="card-body product-card">
                                        <div className="dz-product-bx">
                                            <img loading="lazy" className="dz-media" src={item.image2} alt="" />
                                            <img loading="lazy" className="dz-media-1" src={item.image} alt="" />
                                            <div className="dz-side-view">
                                                <Link to={"#"} className="wishlist mb-2"> <i className="fa-regular fa-heart" /> </Link>
                                                <Link to={"#"} className="wishlist"> <i className="fa-regular fa-eye" /> </Link>
                                            </div>
                                        </div>
                                        <div className="new-arrival-content text-center mt-3">
                                            <h4><Link to="/ecom-product-detail">Bonorum et Malorum</Link></h4>
                                            <ul className="star-rating">
                                                <li> <i className="fa fa-star" /> </li>{" "}
                                                <li> <i className="fa fa-star" /> </li>{" "}
                                                <li ><i className="fa fa-star" /> </li>{" "}
                                                <li> <i className="fa-solid fa-star-half-stroke" /> </li>{" "}
                                                <li> <i className="fa-solid fa-star-half-stroke" /> </li>{" "}
                                            </ul>
                                            <del className="discount">$761.00</del>
                                            <span className="price">$159</span>
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

export default ProductGrid;
