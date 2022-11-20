function Asignaturas(props) {
    return(
        <div className="box">
            <img src = {`tutoyt-react/images/${props.school}.png`} alt="" />
            <h3>{props.name}</h3>
            <a href="#" className="btn">Consigue tutoría</a>
        </div>
    )
}

export default Asignaturas;