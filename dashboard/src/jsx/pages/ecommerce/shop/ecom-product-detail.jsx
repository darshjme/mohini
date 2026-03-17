import { Fragment, useState } from "react";
import { IMAGES } from "../../../constant/theme";
import PageTitle from "../../../layouts/PageTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Link } from "react-router-dom";
import { Modal, Nav, Tab } from "react-bootstrap";
import Countdown from 'react-countdown';
import { productgriddata } from "../../../constant/alldata";

function ProductDetail() {
    const [reviewToggle, setReviewToggle] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const targetDate = new Date('2025-08-01T23:59:59');
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Time's up!</span>;
        } else {
            return (
                <div className="countdown text-center">
                    <div className="date"><span className="time days text-primary">{days}</span>
                        <span className="work-time">Days</span>
                    </div>
                    <div className="date"><span className="time hours text-primary">{hours}</span>
                        <span className="work-time">Hours</span>
                    </div>
                    <div className="date"><span className="time mins text-primary">{minutes}</span>
                        <span className="work-time">Minutess</span>
                    </div>
                    <div className="date"><span className="time secs text-primary">{seconds}</span>
                        <span className="work-time">Second</span>
                    </div>
                </div>
            );
        }
    };
    const [count, setCount] = useState(1);
    const increment = () => {
        setCount(count + 1);
    };
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return (
        <Fragment>
            <PageTitle activeMenu="Product Detail" motherMenu="Shop" />

            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-4">
                                    <Swiper
                                        className="swiper mySwiper2"
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[FreeMode, Thumbs]}
                                    >
                                        <SwiperSlide className="DZoomImage">
                                            <img src={IMAGES.product1} className="rounded w-100" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide className="DZoomImage">
                                            <img src={IMAGES.product2} className="rounded w-100" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide className="DZoomImage">
                                            <img src={IMAGES.product3} className="rounded w-100" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide className="DZoomImage">
                                            <img src={IMAGES.product4} className="rounded w-100" alt="" />
                                        </SwiperSlide>
                                    </Swiper>
                                    <Swiper
                                        className="swiper mySwiper gallery-slider"
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        onSwiper={setThumbsSwiper}
                                        modules={[FreeMode, Thumbs]}
                                    >
                                        <SwiperSlide>
                                            <img className="img-fluid" src={IMAGES.tab1} alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={IMAGES.tab2} alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={IMAGES.tab3} alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={IMAGES.tab4} alt="" />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="col-xl-5">
                                    <div className="product-details-bx">
                                        <div className="new-arrival-content pr">
                                            <h5 className="card-title">Lightweight Puffer Jacket With a Hood</h5>
                                            <div className="comment-review star-rating">
                                                <ul className="mb-2">
                                                    <li><span className="badge badge-success badge-sm me-3">#1 Best Seller</span></li>
                                                    <li><i className="fa fa-star" /></li>{" "}
                                                    <li><i className="fa fa-star" /></li>{" "}
                                                    <li><i className="fa fa-star" /></li>{" "}
                                                    <li><i className="fa fa-star" /></li>{" "}
                                                    <li><i className="fa fa-star" /></li>{" "}
                                                </ul>
                                                <span className="review-text">(34 reviews) / </span>
                                                <Link className="product-review" to="#" onClick={() => setReviewToggle(true)}>Write a review?</Link>
                                            </div>
                                            <div className="size-chart-bx">
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="size-filter">
                                                            <h5 className="m-b-15">Available size</h5>
                                                            <div className="d-flex select-size" role="group" aria-label="Basic radio toggle button group">
                                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" defaultChecked=""  checked/>
                                                                <label className="btn btn-outline-primary sharp sharp-xs me-2" htmlFor="btnradio1">XS</label>

                                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" checked/>
                                                                <label className="btn btn-outline-primary sharp sharp-xs me-2" htmlFor="btnradio2">SM</label>

                                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" checked/>
                                                                <label className="btn btn-outline-primary sharp sharp-xs me-2" htmlFor="btnradio3">MD</label>

                                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio4" checked/>
                                                                <label className="btn btn-outline-primary sharp sharp-xs me-2" htmlFor="btnradio4">LG</label>

                                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio5" checked/>
                                                                <label className="btn btn-outline-primary sharp sharp-xs" htmlFor="btnradio5">XL</label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6  col-sm-6 align-self-center">
                                                        <div className="meta-content meta-content ms-0 ms-sm-5 mt-3 mt-sm-0">
                                                            <h5>Available Color</h5>
                                                            <div className="d-flex align-items-center color-filter">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel11" value="#24262B" aria-label="..." defaultChecked="" />
                                                                    <span style={{ backgroundColor: 'rgb(36, 38, 43)' }}></span>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel12" value="#8CB2D1" aria-label="..." />
                                                                    <span style={{ backgroundColor: 'rgb(140, 178, 209)' }}></span>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel13" value="#0D775E" aria-label="..." />
                                                                    <span style={{ backgroundColor: 'rgb(13, 119, 94)' }}></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="size-chart-bx">
                                                <div className="row">
                                                    <div className="col-xl-5 col-6 ">
                                                        <div className="quntity">
                                                            <button onClick={decrement}>-</button>
                                                            <input className="form-control mx-2" data-value type="text" value={count}/>
                                                            <button onClick={increment}>+</button>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-7 col-6">
                                                        <div className="ms-2">
                                                            <Link className="btn btn-primary" to="#"><i className="flaticon-shopping-cart me-2"/>Add To Cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="row">
                                                    <div className="col-xl-12">
                                                        <div className="month-deal">
                                                            <div>
                                                                <h5>Deal of the month</h5>
                                                                <p className="mb-0">Yes! Send me exclusive offers, personalised, and unique gift ideas, tips for shopping on Worldnic
                                                                    <Link to="/shop-standard" className="dz-link-2">View All Products</Link></p>
                                                            </div>
                                                            <div className="sale-countdown">
                                                                <Countdown date={targetDate} renderer={renderer} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="size-chart-bx border-top-0">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div>
                                                        <ul>
                                                            <li className="mb-2">
                                                                <strong className="text-dark me-2">SKU:</strong>
                                                                <span>PRT584E63A</span>
                                                            </li>
                                                            <li className="mb-2">
                                                                <strong className="text-dark me-2">Category:</strong>
                                                                <span>Cable handles,</span>
                                                                <span>Rubber Weight,</span>
                                                                <span>Fitness Rope,</span>
                                                                <span>Hand Strengthener,</span>
                                                                <span>Kettle Bell</span>
                                                            </li>
                                                            <li className="mb-2">
                                                                <strong className="text-dark me-2">Tags:</strong>
                                                                <span>Fitness,</span>
                                                                <span>Shoes,</span>
                                                                <span>Everyday,</span>
                                                                <span>Sport</span>
                                                            </li>
                                                            <li className="social-bx">
                                                                <strong className="text-dark me-2">Share:</strong>
                                                                <span className="social-media">
                                                                    <Link to="https://www.facebook.com/dexignlab" target="_blank">
                                                                        <i className="flaticon-facebook"/>
                                                                    </Link>
                                                                </span>
                                                                <span className="social-media">
                                                                    <Link to="https://www.linkedin.com/showcase/3686700/admin/" target="_blank">
                                                                        <i className="flaticon-linkedin"/>
                                                                    </Link>
                                                                </span>
                                                                <span className="social-media">
                                                                    <Link to="https://www.instagram.com/dexignlab/" target="_blank">
                                                                        <i className="flaticon-instagram"/>
                                                                    </Link>
                                                                </span>
                                                                <span className="social-media">
                                                                    <Link to="https://twitter.com/dexignlabs" target="_blank">
                                                                        <i className="flaticon-twitter"/>
                                                                    </Link>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="cart-detail">
                                        <Link to={"#"} className="btn btn-outline-primary btn-block">Bank Offer 5% Cashback</Link>
                                        <div className="cart-bx">
                                            <i className="flaticon flaticon-ship text-primary"/>
                                            <div>
                                                <h6 className="mb-0">Easy Returen</h6>
                                                <p className="mb-0">30 Days</p>
                                            </div>
                                        </div>
                                        <div className="cart-bx">
                                            <i className="flaticon-box text-primary"/>
                                            <div>
                                                <h6 className="mb-0">Enjoy The Product</h6>
                                                <p className="mb-0">Lorem Ipsum is simply.</p>
                                            </div>
                                        </div>
                                        <div className="border-bottom d-flex align-items-center mt-4 pb-3">
                                            <svg className="me-3 svg-details" height="20" viewBox="1 1 511.99984 511" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m512 256.5c0 50.53125-15 99.671875-43.375 142.113281-3.855469 5.769531-10.191406 8.886719-16.644531 8.886719-3.820313 0-7.683594-1.089844-11.097657-3.375-9.183593-6.136719-11.648437-18.558594-5.511718-27.742188 23.964844-35.839843 36.628906-77.292968 36.628906-119.882812 0-18.300781-2.289062-36.476562-6.804688-54.015625-2.753906-10.695313 3.6875-21.601563 14.382813-24.355469 10.703125-2.75 21.601563 3.6875 24.355469 14.382813 5.351562 20.796875 8.066406 42.324219 8.066406 63.988281zm-144.265625 184.894531c-33.59375 20.347657-72.230469 31.105469-111.734375 31.105469-119.101562 0-216-96.898438-216-216s96.898438-216 216-216c44.097656 0 86.5 13.195312 122.628906 38.160156 9.085938 6.277344 21.542969 4 27.824219-5.085937 6.277344-9.085938 4.003906-21.542969-5.085937-27.824219-42.84375-29.601562-93.109376-45.25-145.367188-45.25-68.378906 0-132.667969 26.628906-181.019531 74.980469-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469 46.8125 0 92.617188-12.757812 132.460938-36.894531 9.449218-5.722657 12.46875-18.019531 6.746093-27.46875-5.726562-9.449219-18.023437-12.464844-27.472656-6.742188zm-109.804687-126.902343c-3.167969.125-6.125-1-8.421876-3.1875l-104.746093-99.316407c-8.015625-7.601562-20.675781-7.265625-28.273438.75-7.601562 8.015625-7.265625 20.675781.75 28.273438l104.726563 99.300781c9.671875 9.195312 22.183594 14.1875 35.441406 14.1875.710938 0 1.421875-.015625 2.132812-.042969 14.042969-.566406 26.941407-6.644531 36.316407-17.117187.238281-.261719.464843-.53125.6875-.808594l211.042969-262.5c6.921874-8.609375 5.554687-21.199219-3.054688-28.117188-8.605469-6.921874-21.199219-5.554687-28.121094 3.054688l-210.628906 261.988281c-2.070312 2.160157-4.84375 3.414063-7.851562 3.535157zm0 0" />
                                            </svg>
                                            <p className="mb-0 text-dark">You will save ₹504 on this order</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-3">
                                            <p>Price</p>
                                            <h4 className="card-title--medium">$125.75</h4>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary btn-block mb-3">Add to Cart</button>
                                            <button className="btn btn-outline-primary btn-block">Add to wishlist</button>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-xl-12">
                                    <div className="mt-5">
                                        <Tab.Container defaultActiveKey="Description" className="nav nav-tabs justify-content-center">
                                            <div className="project">
                                                <Nav as="ul" className="nav nav-tabs justify-content-center">
                                                    <Nav.Item as="li" className="nav-item">
                                                        <Nav.Link className="nav-link" to="#" eventKey="Description">Description</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as="li" className="nav-item">
                                                        <Nav.Link className="nav-link" to="#" eventKey="Reviews (2)">Reviews (2)</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </div>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="Description">
                                                    <div className="detail-bx text-center mt-4">
                                                        <h5 className="card-title--medium">Eco-friendly Products Revolution
                                                        </h5>
                                                        <p>
                                                            Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting industry. Lorem Ipsum has been the industry's
                                                            standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galley of type and scrambled it to make a
                                                            type specimen book. It has survived not only five centuries,
                                                            but also the leap into electronic typesetting, remaining
                                                            essentially unchanged. It was popularised in the 1960s with
                                                            the release of Letraset sheets containing Lorem Ipsum
                                                            passages, and more recently with desktop publishing software
                                                            like Aldus PageMaker including versions of Lorem Ipsum.
                                                        </p>
                                                        <ul className=" feature-detail d-flex align-items-center justify-content-lg-center justify-content-start flex-wrap">
                                                            <li>
                                                                <i className="fa-solid fa-check"/>
                                                                <h5 className="mb-0">Transform Your Look with Confidence</h5>
                                                              </li>
                                                            <li>
                                                                <i className="fa-solid fa-check"/>
                                                                <h5 className="mb-0">Timeless Beauty Secrets Revealed</h5>
                                                            </li>
                                                            <li>
                                                                <i className="fa-solid fa-check"/>
                                                                <h5 className="mb-0">Radiate Confidence Through Timeless Beauty</h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <h5 className="card-title my-3">Related Product Details</h5>
                                                    <div className="row">
                                                        {productgriddata.slice(0, 4).map((data, i) => (
                                                            <div className="col-xl-3 col-sm-6" key={i}>
                                                                <div className="card">
                                                                    <div className="card-body product-card border ">
                                                                        <div className="dz-product-bx">
                                                                            <img loading="lazy" className="dz-media" src={data.image2} alt="" />
                                                                            <img loading="lazy" className="dz-media-1" src={data.image} alt="" />
                                                                            <div className="dz-side-view">
                                                                                <Link to={"#"} className="wishlist mb-2"> <i className="fa-regular fa-heart"/> </Link>
                                                                                <Link to={"#"} className="wishlist"> <i className="fa-regular fa-eye"/> </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="new-arrival-content text-center mt-3">
                                                                            <h4><Link to="/ecom-product-detail">Bonorum et Malorum</Link></h4>
                                                                            <ul className="star-rating">
                                                                                <li><i className="fa fa-star"/></li>{" "}
                                                                                <li><i className="fa fa-star"/></li>{" "}
                                                                                <li><i className="fa fa-star"/></li>{" "}
                                                                                <li><i className="fa-solid fa-star-half-stroke"/></li>{" "}
                                                                                <li><i className="fa-solid fa-star-half-stroke"/></li>{" "}
                                                                            </ul>
                                                                            <del className="discount">$761.00</del>
                                                                            <span className="price">$159</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Reviews (2)">
                                                    <h4 className="card-title mt-4">Comments[02]</h4>
                                                    <p>There Are Many Variations Of Passages Of Lorem Ipsum Available. </p>
                                                    <div className="row">
                                                        <div className="col-xl-6">
                                                            <div className="d-flex align-items-strat">
                                                                <img src={IMAGES.userspic1} className="product-img" alt="" />
                                                                <div>
                                                                    <h5 className="mb-0">Monsur Rahman Lito</h5>
                                                                    <ul className="d-flex align-items-center">
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                    </ul>
                                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quae, ipsum commodi rerum porro totam libero est.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <div className="d-flex align-items-strat">
                                                                <img src={IMAGES.userspic1} className="product-img" alt="" />
                                                                <div>
                                                                    <h5 className="mb-0">Monsur Rahman Lito</h5>
                                                                    <ul className="d-flex align-items-center">
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                        <li><i className="fa-solid fa-star text-warning"/></li>{" "}
                                                                    </ul>
                                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quae, ipsum commodi rerum porro totam libero est.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="comment mt-3">
                                                        <h3 className="card-title">Leave Comment</h3>
                                                        <div className="row">
                                                            <div className="col-xl-6 col-sm-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Name</label>
                                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Karen Hope" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 col-sm-6 ">
                                                                <div className="mb-3">
                                                                    <label htmlFor="exampleFormControlInput2" className="form-label required">Email Id</label>
                                                                    <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="hello@example.com" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12">
                                                                <div className="mb-3">
                                                                    <label htmlFor="exampleFormControlTextarea3" className="form-label required">Messasge</label>
                                                                    <textarea className="form-control" id="exampleFormControlTextarea3" rows="3">Messasge</textarea>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button className="btn btn-primary" type="submit">Submit A Comment</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* review */}
            <Modal show={reviewToggle} onHide={setReviewToggle} className="modal fade" id="reviewModal" centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Review</h5>
                        <button type="button" onClick={() => setReviewToggle(false)} className="btn-close" data-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) => { e.preventDefault(); setReviewToggle(false); }}>
                            <div className="text-center mb-4">
                                <img className="img-fluid rounded" width={78} src={IMAGES.avatar1} alt="DexignZone" />
                            </div>
                            <div className="form-group">
                                <div className="rating-widget mb-4 text-center">
                                    {/* Rating Stars Box */}
                                    <div className="rating-stars">
                                        <ul id="stars" className="d-flex justify-content-center align-items-center">
                                            <li>
                                                <i className="fa fa-star me-1" />
                                            </li>{" "}
                                            <li>
                                                <i className="fa fa-star me-1" />
                                            </li>{" "}
                                            <li>
                                                <i className="fa fa-star me-1" />
                                            </li>{" "}
                                            <li>
                                                <i className="fa fa-star me-1" />
                                            </li>{" "}
                                            <li>
                                                <i className="fas fa-star-half-alt" />
                                            </li>{" "}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <textarea className="form-control" placeholder="Comment" rows={5} defaultValue={""} />
                            </div>
                            <button className="btn btn-success btn-block">RATE</button>
                        </form>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}
export default ProductDetail;
