import {cancelTutoring} from "../api/session.api"

function Tutorings(props){

    async function handleClickCancelTutoring(id) {
        if (window.confirm("¿Estás seguro que quieres cancelar la tutoría?") == true){
            await cancelTutoring(id)
        }
    };

    return(
        <div className="cart-item">
            <img src={process.env.PUBLIC_URL + `/images/${props.code}.png`} alt="" />
            <span className="fas fa-times" onClick={()=> handleClickCancelTutoring(props.id)}></span>
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