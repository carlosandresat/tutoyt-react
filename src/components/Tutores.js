import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import tutoresData from "../data/tutores";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../config";

function Tutores() {
    const [tutors, setTutores] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_URL}/tutores`)
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


    const drawStars = (nstars) => {
        const stars = []
        for(let i = 0; i < Math.trunc(nstars); i++){
            console.log("OA")
            stars.push(<i className="fas fa-star"></i>)
        }
        if(nstars - Math.trunc(nstars) > 0.1){
            stars.push(<i className="fas fa-star-half"></i>)

        }
        return stars
    }
    const prueba = 'holi'

    const tutoresdata = tutors.map(tutor => (
        <SwiperSlide className="box">
            <a href="#" className="btn">Conócelo</a>
            <div className="image">
                <img src={process.env.PUBLIC_URL + `/images/${tutor.id}.jpeg`} alt="" />
            </div>
            <div className="content">
                <h3>{tutor.name}</h3>
                <div className="stars">
                    {
                        drawStars(tutor.rating)
                    }
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