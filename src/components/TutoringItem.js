import { Fragment } from "react";
import { acceptTutoring, cancelTutoring } from "../api/session.api";

function TutoringItem({id, topic, place, status, date, time, classname, student, onDelete, onAccept, onEdit}) {

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

    const handleClickChanges = event => {
        document.getElementById('tutoringChangeForm').classList.add('popup');
        onEdit(id)
    };

    return(
        
                <div className="tuto-box">
                    <h3>{classname}</h3>
                    <p><i className="fas fa-user"></i>  {student}</p>
                    <p><i className="fas fa-calendar"></i>  {date}</p>
                    <p><i className="fas fa-clock"></i>  {time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> {place}</p>

                    <p><i class="fas fa-book-reader"></i> {topic}</p>

                    <div className="buttons">
                    {
                        status==='requested' && <Fragment>
                        <button className="btn" onClick={handleClickAcceptTutoring}>Aceptar</button>
                        <button className="btn" onClick={handleClickChanges}>Proponer cambios</button>
                        <button className="btn" onClick={handleClickCancelTutoring}>Cancelar</button>
                        </Fragment>
                    }
                    </div>
                    {
                        status==='done' && <h2>¡Gracias por usar TutoYT!</h2>
                    }
                    {
                        status==='accepted' && <h2>Aceptada</h2>
                    }
                    {
                        status==='canceled' && <h2>Cancelada</h2>
                    }
                    {
                        status==='changed' && <h2>Esperando confirmación de los cambios</h2>
                    }
                </div>
           
    );
}

export default TutoringItem;