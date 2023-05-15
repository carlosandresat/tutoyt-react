function Objetivo(){
    return(
        <section class="objetivo" id="objetivo">

            <h1 class="heading"> <span>Nuestro</span> objetivo </h1>

            <div class="row">

                <div class="image">
                    <img src={process.env.PUBLIC_URL + "/images/objetivo-img.jpeg"} alt="" />
                </div>

                <div class="content">
                    <h3>¿Qué es Tutoring Sessions?</h3>
                    <p>Aquí puedes encontrar ayuda en tus asignaturas con personas dispuestas a enseñarte mediante tutorías propuestas a tu comodidad. O tambien puedes dar un paso más allá y convertirte en uno de nuestros tutores en Tutoring Sessions Yachay Tech.</p>
                    <p>¿De qué sirve el poder del conocimiento si no se lo comparte con los demás?</p>
                </div>

            </div>

        </section>
    );
}

export default Objetivo;