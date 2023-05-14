function Home(props) {

    const handleClicRegister = event => {
        document.getElementById('registerForm').classList.add('popup');
    };

    return (
        <section className="home" id="home">

            <div className="content">
                <h3>Tutoring Sessions Yachay Tech</h3>
                <p>Donde nos reunimos en nombre del conomiento</p>
                {
                    props.auth ?
                    null 
                    :
                    <button onClick={handleClicRegister} className="btn">Regístrate ya!</button>
                }
                
            </div>

        </section>    
    );
}

export default Home;