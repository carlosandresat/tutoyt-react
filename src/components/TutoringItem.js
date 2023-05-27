function TutoringItem({id, topic, status, date, time, classname, student}) {

    return(
        
                <div className="tuto-box">
                    <h3>{classname}</h3>
                    <p><i className="fas fa-user"></i>  {student}</p>
                    <p><i className="fas fa-calendar"></i>  {date}</p>
                    <p><i className="fas fa-clock"></i>  {time}</p>
                    <p><span>Tema: </span>{topic}</p>
                    {
                        status==='requested' && <div className="buttons">
                        <button className="btn">Aceptar</button>
                        <button className="btn">Proponer cambios</button>
                        <button className="btn">Rechazar</button>
                        </div>
                    }
                    
                    

                </div>
           
    );
}

export default TutoringItem;