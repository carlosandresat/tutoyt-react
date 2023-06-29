import { useAuth0 } from "@auth0/auth0-react";

function Home() {

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return (
        <section className="home" id="home">

            <div className="content">
                <h3>Tutoring Sessions Yachay Tech</h3>
                <h3>(Fase de pruebas)</h3>
                <p>Donde nos reunimos en nombre del conomiento</p>
                {
                    isAuthenticated ?
                    null 
                    :
                    <button onClick={() => loginWithRedirect()} className="btn">Ingresa ya!</button>
                }
                
            </div>

        </section>    
    );
}

export default Home;