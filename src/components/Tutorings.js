function Tutorings(props){
    return(
        <div className="cart-item">
            <img src={process.env.PUBLIC_URL + `/images/${props.escuela}.png`} alt="" />
            <span className="fas fa-times"></span>
            <div className="content">
                <h3>{props.asignatura}</h3>
                <div className="info">
                    <div className="fas fa-calendar"></div>
                    <div className="date">{props.fecha}</div>

                    <div className="fas fa-clock"></div>
                    <div className="time">{props.hora}</div>
                </div>
            </div>
        </div>
    );
}

export default Tutorings;