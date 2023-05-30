import { Fragment } from "react";
import { acceptTutoring, cancelTutoring } from "../api/session.api";

function StudentItem({id, topic, place, status, date, time, name, tutor, changes, onDelete, onAccept}) {

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

    return(
        
                <div className="tuto-box">
                    <h3>{name}</h3>
                    <p><i className="fas fa-user"></i>  {tutor}</p>
                    <p><i className="fas fa-calendar"></i>  {date}</p>
                    <p><i className="fas fa-clock"></i>  {time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> {place}</p>

                    <p><i class="fas fa-book-reader"></i> {topic}</p>

                    <div className="buttons">
                    {
                        status==='changed' && <Fragment>
                        <button className="btn" onClick={handleClickAcceptTutoring}>Aceptar</button>
                        <button className="btn" onClick={handleClickCancelTutoring}>Cancelar</button>
                        </Fragment>
                    }
                    </div>

                    {
                        status==='accepted' && <h2>Aceptada</h2>
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