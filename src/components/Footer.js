function Footer({userType}) {
    return(
        <section className="footer">

            <div className="links">
                <a href="#home">Inicio</a>
                {
                    userType === 1 
                    ? <a href="#tutor-view">Tutor</a>
                    : null
                }
                {
                    userType === 1 || userType === 0 
                    ? <a href="#student-view">Estudiante</a>
                    : <a href="#objetivo">Objetivo</a>
                }
                <a href="#asignaturas">Asignaturas</a>
                <a href="#tutores">Tutores</a>
            </div>


            <div className="share">
                <a href="https://carlosandresat.netlify.app/" target={"_blank"} className="fas fa-laptop-code"></a>
                <a href="https://open.spotify.com/user/12141348471?si=bb3a11dc843345da" target={"_blank"} className="fab fa-brands fa-spotify"></a>
                <a href="https://twitter.com/carlosandresat" target={"_blank"} className="fab fa-twitter"></a>
                <a href="https://www.instagram.com/carlosandresat/" target={"_blank"} className="fab fa-instagram"></a>
                <a href="https://www.linkedin.com/in/carlosandresat/" target={"_blank"} className="fab fa-linkedin"></a>
                <a href="https://github.com/carlosandresat" target={"_blank"} className="fab fa-github"></a>

            </div>


            <div className="credit">
                Developed by <span>Carlos Arévalo</span> | © TutoYT v0.2
            </div>
        </section>
    )
}

export default Footer;