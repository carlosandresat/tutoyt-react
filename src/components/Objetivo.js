function Objetivo(){
    return(
        <section class="objetivo" id="objetivo">

            <h1 class="heading"> <span>Nuestro</span> objetivo </h1>

            <div class="row">

                <div class="image">
                    <img src={process.env.PUBLIC_URL + "/images/objetivo-img.jpeg"} alt="" />
                </div>

                <div class="content">
                    <h3>¿En qué consiste OrientaYT?</h3>
                    <p> Orientador Yachay Tech busca crear una plataforma moderna que fomente la colaboración, el aprendizaje compartido y el apoyo académico personalizado. Al integrar tecnologías innovadoras, aspiramos a construir una comunidad educativa donde cada estudiante tenga acceso a recursos y orientación, contribuyendo así a cerrar las brechas educativas y facilitar el éxito académico para todos. En OrientaYT, no solo creamos una plataforma, sino un espacio donde la tutoría se convierte en un acto de empoderamiento y crecimiento colectivo.</p>
                    <p>¿De qué sirve el poder del conocimiento si no se lo comparte con los demás?</p>
                </div>

            </div>

        </section>
    );
}

export default Objetivo;