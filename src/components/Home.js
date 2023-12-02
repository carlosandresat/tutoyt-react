import { useEffect, useState } from "react";
import { authorizeUser } from "../api/login.api";
import LoginForm from "./LoginForm";

function Home() {

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        async function validate() {
            const response = await authorizeUser();
            if(response.data.Status){
                setIsLogged(true)
            }
        }
        validate();
    }, []);

    return (
        <section className="home" id="home">

            <div className="content">
                <h3>Orientador Yachay Tech</h3>
                <h3>(Proyecto Piloto)</h3>
                <p>Donde nos reunimos en nombre del conomiento</p>
                {
                    isLogged ?
                    null 
                    :
                    <LoginForm text="Ingresa ya!"></LoginForm>
                }
                
            </div>

        </section>    
    );
}

export default Home;