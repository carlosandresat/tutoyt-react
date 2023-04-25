import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import tutoresData from "../data/tutores";
import { useState, useEffect } from "react";
import { SERVER } from "../config";

function Tutores() {
    const [tutors, setTutores] = useState([]);

    useEffect(() => {
        fetch(`${SERVER}/tutores`)
        .then(res => res.json())
        .then(data => setTutores(data))
        .catch(err => console.log(err));
    }, []);


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

    const tutoresdata = tutors.map(tutor => (
        <SwiperSlide className="box">
            <a href="#" className="btn">Conócelo</a>
            <div className="image">
                <img src={process.env.PUBLIC_URL + `/images/${tutor.id}.jpeg`} alt="" />
            </div>
            <div className="content">
                <h3>{tutor.name}</h3>
                <div className="stars">
                    <i className="fas fa-star"></i>
                </div>
                <div className="rating">
                    {tutor.rating} <span>({tutor.nreviews} reviews)</span>
                </div>
            </div>
          </SwiperSlide> 
    ))
    
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
            {tutoresdata}
        </Swiper>
    )
}

export default Tutores;