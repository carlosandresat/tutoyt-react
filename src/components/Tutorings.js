function Tutorings(props){
    return(
        <div className="cart-item">
            <img src={process.env.PUBLIC_URL + `/images/${props.code}.png`} alt="" />
            <span className="fas fa-times"></span>
            <div className="content">
                <h3>{props.name}</h3>
                <div className="info">
                    <div className="fas fa-calendar"></div>
                    <div className="date">{props.date}</div>

                    <div className="fas fa-clock"></div>
                    <div className="time">{props.time}</div>
                </div>
            </div>
        </div>
    );
}

export default Tutorings;