import { Fragment } from "react";
import { useTutorings } from "../context/TutoringContext";

function TutoringItem({id, topic, place, status, date, time, classname, student, loadEdit}) {

    const { acceptTutoring, cancelTutoring } = useTutorings();

    const handleClickChanges = event => {
        loadEdit(id);
        document.getElementById('tutoringChangeForm').classList.add('popup');
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
                        <button className="btn" onClick={async ()=> await acceptTutoring(id, "tutor")}>Aceptar</button>
                        <button className="btn" onClick={handleClickChanges}>Proponer cambios</button>
                        <button className="btn" onClick={()=> cancelTutoring(id, "tutor")}>Cancelar</button>
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