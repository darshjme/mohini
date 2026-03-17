import { Fragment } from "react";
import PageTitle from "../layouts/PageTitle"; 
import { Link } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { companyswiperdata, pricingdata } from "../constant/alldata"; 

function Pricing() {
    return (
        <Fragment>
            <PageTitle activeMenu="Pricing" motherMenu="Pricing" />
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="text-center">
                            <h2>Select Your <strong className="text-primary">Plan</strong></h2>
                            <p>All Plan Come With a 14days Free trial peride.</p>
                        </div>
                        <Tab.Container defaultActiveKey="year">
                            <div className="d-flex justify-content-center mb-4">
                                <Nav as="ul" className="nav nav-pills">
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link eventKey="year" className="nav-link">Yearly</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link eventKey="month" className="nav-link">Monthly</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <div className="row">
                                <Tab.Content>
                                    <Tab.Pane eventKey="year">
                                        <div className="row">
                                            {pricingdata.map((data, index) => (
                                                <div className={data.className} key={index}>
                                                    <div className="card upgrad-plan">
                                                        <div className="card-body">
                                                            <div className="text-center">
                                                                {data.span}
                                                                <div className="d-flex align-items-baseline m-prise">
                                                                    <h4>{data.price}</h4><span>/Per Year</span>
                                                                </div>
                                                                {data.list}
                                                            </div>
                                                        </div>
                                                        <div className="card-footer text-center border-0">
                                                            <Link to={"#"} className="btn btn-primary light btn-block">Choose plans<i className="fa-solid fa-arrow-right ms-2" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="month">
                                        <div className="row">
                                            {pricingdata.map((data, index) => (
                                                <div className={data.className} key={index}>
                                                    <div className="card upgrad-plan">
                                                        <div className="card-body">
                                                            <div className="text-center">
                                                                {data.span}
                                                                <div className="d-flex align-items-baseline m-prise">
                                                                    <h4>{data.price2}</h4><span>/Per Month</span>
                                                                </div>
                                                                <ul className="prise-list">
                                                                    {data.list2}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer text-center border-0">
                                                            <Link to={"#"} className="btn btn-primary light btn-block">Choose plans<i className="fa-solid fa-arrow-right ms-2"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
                        <div>
                            <div className="pricing-title">
                                <h2>We’re just keep growing with 6.3k trusted companies</h2>
                            </div>
                            <div className="companies-inner">
                                <Swiper className="swiper swiper-company "
                                    slidesPerView={6}
                                    spaceBetween={30}
                                    speed={1000}
                                    loop={true}
                                    autoplay={{
                                        delay: 5000
                                    }}
                                    modules={[Autoplay]}
                                    breakpoints={{
                                        340: {
                                            slidesPerView: 1,
                                        },
                                        575: {
                                            slidesPerView: 1.5,
                                        },
                                        767: {
                                            slidesPerView: 2,
                                        },
                                        991: {
                                            slidesPerView: 3,
                                        },
                                        1200: {
                                            slidesPerView: 6,
                                        },
                                    }}
                                >
                                    {companyswiperdata.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <Link to={"#"} className="companies-wrapper">
                                                <div className="companies-media">
                                                    <img src={item.image} alt="" />
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Pricing;
