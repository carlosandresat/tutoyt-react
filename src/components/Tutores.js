import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import tutoresData from "../data/tutores";

function Tutores() {
    const tutores = tutoresData.map(item => {
        return(
          <SwiperSlide className="box">
            <a href="#" className="btn">Conócelo</a>
            <div className="image">
                <img src={process.env.PUBLIC_URL + `/images/${item.id}.jpeg`} alt="" />
            </div>
            <div className="content">
                <h3>{item.name}</h3>
                <div className="stars">
                    <i className="fas fa-star"></i>
                </div>
                <div className="rating">
                    {item.rating} <span>({item.nReviews} reviews)</span>
                </div>
            </div>
          </SwiperSlide> 
        )
    })
    
    return(
        <Swiper 
            pagination={true} 
            modules={[Pagination]} 
            className="box-container"
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }} 
            spaceBetween = {20}
            centeredSlides = {true}
        >
            {tutores}
        </Swiper>
    )
}

export default Tutores;