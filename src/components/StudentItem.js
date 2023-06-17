import { Fragment } from "react";
import { acceptTutoring, cancelTutoring, rateTutoring } from "../api/session.api";
import { StarRating } from "./StarRating";
import { useState } from "react";

function StudentItem({id, topic, place, status, date, time, name, tutor, changes, onDelete, onAccept, onRate}) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClickRate = async () => {
        if(rating === 0) {
            if (window.confirm("¿Seguro que quieres calificar con 0 estrellas?") === true) {
                await rateTutoring(id, {rate: rating})
                onRate(id)
            }
        }
        else {
            await rateTutoring(id, {rate: rating})
            onRate(id)
        }
    }


    const handleClickCancelTutoring = async () => {
        if (window.confirm("¿Estás seguro que quieres cancelar la tutoría?") === true){
            await cancelTutoring(id)
            onDelete(id)
        }
    }

    const handleClickAcceptTutoring = async () => {
        if (window.confirm("¿Estás seguro que quieres aceptar la tutoría?") === true){
            await acceptTutoring(id)
            onAccept(id)
        }
    }

    const today = new Date();

    const isTutoringDone = () => {
        const day = date.split('/')[0]
        const hour = time.split(':')[0]
        const minute = time.split(':')[1]

        const condition = parseInt(day) === today.getDate() && (parseInt(hour) < today.getHours() ||  (parseInt(hour) === today.getHours() && parseInt(minute) < today.getMinutes()))
        return condition
    }

    return(
        
                <div className="tuto-box">
                    <h3>{name}</h3>
                    <p><i className="fas fa-user"></i>  {tutor}</p>
                    <p><i className="fas fa-calendar"></i>  {date}</p>
                    <p><i className="fas fa-clock"></i>  {time}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {place}</p>

                    <p><i class="fas fa-book-reader"></i> {topic}</p>

                    <div className="buttons">
                    {
                        status==='changed' && <Fragment>
                        <button className="btn" onClick={handleClickAcceptTutoring}>Aceptar</button>
                        <button className="btn" onClick={handleClickCancelTutoring}>Cancelar</button>
                        </Fragment>
                    }
                    {
                        status==='accepted' && isTutoringDone() ? <Fragment>
                        <StarRating rating={rating} hover={hover} setRating={setRating} setHover={setHover} />
                        <button className="btn" onClick={handleClickRate}>Calificar</button>
                        </Fragment> : null
                    }
                    </div>

                    {
                        status==='accepted' && !isTutoringDone() && <h2>Aceptada</h2>
                    }
                    {
                        status==='done' && <h2>¡Gracias por usar TutoYT!</h2>
                    }
                    {
                        status==='canceled' && <h2>Cancelada</h2>
                    }
                    {
                        status==='changed' && <Fragment><h2>Tu tutor ha hecho cambios en:</h2><h3>{changes}</h3></Fragment>
                    }
                    {
                        status==='requested' && <h2>Esperando confirmación del tutor</h2>
                    }
                </div>
           
    );
}

export default StudentItem;