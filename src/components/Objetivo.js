function Objetivo(){
    return(
        <section class="objetivo" id="objetivo">

            <h1 class="heading"> <span>Nuestro</span> objetivo </h1>

            <div class="row">

                <div class="image">
                    <img src={process.env.PUBLIC_URL + "/images/objetivo-img.jpeg"} alt="" />
                </div>

                <div class="content">
                    <h3>Qué es Tutoring session?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus qui ea ullam, enim tempora ipsum fuga alias quae ratione a officiis id temporibus autem? Quod nemo facilis cupiditate. Ex, vel?</p>
                    <p>Somos Yachay Tech.</p>
                </div>

            </div>

        </section>
    );
}

export default Objetivo;