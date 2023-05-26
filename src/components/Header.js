import React from "react";
import Login from "./Login";
import Tutorings from "./Tutorings";
import { logout } from "../api/login.api";
import { getSessionsByStudent } from "../api/session.api";
import axios from "axios";

function Header(props) {

    const [isListActive, setIsListActive] = React.useState(false);
    const [userTutorings, setUserTutorings] = React.useState([]);

    axios.defaults.withCredentials = true;

    //Login

    const handleLogout = async () => {
        const response = await logout()
        if (response.data.Status === "Success"){
            window.location.reload(true)
        } else {
            alert("Error al Logout")
        }
    }
    

    const approvedTutorings = userTutorings.filter(tutoring => tutoring.status === 'approved').map(item =>{
        return(
                <Tutorings
                    key={item.id}
                    {...item}
                />            
        )
    });

    const requestedTutorings = userTutorings.filter(tutoring => tutoring.status === 'requested').map(item =>{
        return(
                <Tutorings
                    key={item.id}
                    {...item}
                />            
        )
    });

    const handleClickUser = event => {
        document.getElementById('theLogin').classList.add('popup');
    };

    const handleClickAsignaturas = async event => {
        setIsListActive(prevCount => !prevCount);
        const response = await getSessionsByStudent(props.user)
        setUserTutorings(response.data)
        console.log(response.data)
    };

    
    return (
        <div>
        
            <header className="header">

                <a href="#home" className="logo">
                    <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
                </a>

                <nav className="navbar">
                    <a href="#home">Inicio</a>
                    <a href="#objetivo">Objetivo</a>
                    <a href="#asignaturas">Asignaturas</a>
                    <a href="#tutores">Tutores</a>
                    <a href="#review">Reviews</a>
                </nav>

                <div className="icons">
                    {props.auth ?
                    <div>
                    <div className="fas fa-power-off" id="logout-btn" onClick={handleLogout}></div>
                    <div className="fas fa-bars" id="asignaturas-btn" onClick={handleClickAsignaturas}></div>
                    </div>
                    :
                    <div className="fas fa-user" id="user-btn" onClick={handleClickUser}></div>
                    }
                </div>

                <div className={isListActive ? "cart-items-container active" : "cart-items-container"} id="asignaturas-list">
                    <h1>Tutorías aprobadas:</h1>
                    {approvedTutorings.length === 0 ? 
                    <p><center>No hay tutorías aprobadas</center></p> : 
                    approvedTutorings}
                    
                    <h1>Tutorías solicitadas:</h1>
                    {requestedTutorings.length === 0 ? 
                    <p><center>No has solicitado tutorías</center></p> : 
                    requestedTutorings}

                </div>           

            </header>
            <Login/>
        </div>
    );
}
  
export default Header;