import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 

export const sliderData = [
    { id: 11111, name: 'Security Guidelines', },
    { id: 22222, name: 'Security Guidelines', },
    { id: 33333, name: 'Security Guidelines', },
];

function SliderBlog2() {
    return (
        <Fragment>
            <div className="owl-carousel owl-theme card-carousel card-carousel-dots p-2 account-security-swiper">
                <Swiper
                    slidesPerView={1}
                    autoplay={{
                        delay: 1000
                    }}
                    speed={2500}
                    pagination={{
                        el: '.swiper-pagination',
                        clickable: true
                    }}
                    modules={[Autoplay, Pagination]}
                >
                    {sliderData.map((item, ind) => (
                        <SwiperSlide className="item" key={ind}>
                            <span className="fs-14 mb-3 d-block">{item.name}</span>
                            <h6 className="mb-2">Get Start Your Security</h6>
                            <p className="mb-4 pb-1">To start a blog, think of a topic about which you're passionate, brainstorm awesome ideas for your content</p>
                            <Link to={"#"} className="btn btn-primary light">Get Started</Link>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>
        </Fragment>
    )
}
export default SliderBlog2;