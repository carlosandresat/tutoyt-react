import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
        
    return (
        <div>
        
            <header className="header">

                <a href="#home" className="logo">
                    <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
                </a>

                <nav className="navbar">
                    <a href="#home">Inicio</a>
                    {
                        !isAuthenticated && <a href="#objetivo">Objetivo</a>

                    }
                    {
                        (user ? user.role === 'tutor' : false) && <a href="#tutor-view">Tutor</a>
                    }
                    {
                        isAuthenticated && <a href="#student-view">Estudiante</a>
                    }
                    <a href="#asignaturas">Asignaturas</a>
                    <a href="#tutores">Tutores</a>
                </nav>

                <div className="icons">
                    {isAuthenticated ?
                    <div className="fas fa-power-off" id="logout-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}></div>
                    :
                    <button className="btn" id="user-btn" onClick={() => loginWithRedirect()}>Ingresa</button>
                    }
                </div>  

            </header>
        </div>
    );
}
  
export default Header;