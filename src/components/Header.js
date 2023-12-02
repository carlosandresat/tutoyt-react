import React from "react";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import { authorizeUser, logout } from "../api/login.api";

function Header() {

    const [isLogged, setIsLogged] = useState(false)
    const [userRole, setUserRole] = useState("")

    useEffect(() => {
        async function validate() {
            const response = await authorizeUser();
            if(response.data.Status){
                setIsLogged(true)
                setUserRole(response.data.status)
            }
        }
        validate();
    }, []);
    
        
    return (
        <div>
        
            <header className="header">

                <a href="#home" className="logo">
                    <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
                </a>

                <nav className="navbar">
                    <a href="#home">Inicio</a>
                    {
                        !isLogged && <a href="#objetivo">Objetivo</a>

                    }
                    {
                        userRole === 'orientador' && <a href="#tutor-view">Tutor</a>
                    }
                    {
                        isLogged && <a href="#student-view">Estudiante</a>
                    }
                    <a href="#asignaturas">Asignaturas</a>
                    <a href="#tutores">Tutores</a>
                </nav>

                <div className="icons">
                    {isLogged ?
                    <div className="fas fa-power-off" id="logout-btn" onClick={async() => {await logout(); window.location.reload();}}></div>
                    :
                    <LoginForm text="Ingresa"></LoginForm>
                    }
                </div>  

            </header>
        </div>
    );
}
  
export default Header;