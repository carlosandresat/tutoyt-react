import React from "react";
import Login from "./Login";
import Tutorings from "./Tutorings";
import { logout } from "../api/login.api";
import axios from "axios";

function Header(props) {

    const [isListActive, setIsListActive] = React.useState(false);


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
    

    const approvedTutorings = props.tutorings.filter(tutoring => tutoring.status === 'accepted').map(item =>{
        return(
                <Tutorings
                    key={item.id}
                    {...item}
                    onDelete = {props.onDelete}
                />            
        )
    });

    const requestedTutorings = props.tutorings.filter(tutoring => tutoring.status === 'requested').map(item =>{
        return(
                <Tutorings
                    key={item.id}
                    {...item}
                    onDelete = {props.onDelete}
                />            
        )
    });

    const handleClickUser = event => {
        document.getElementById('theLogin').classList.add('popup');
    };

    const handleClickAsignaturas = event => {
        setIsListActive(prevCount => !prevCount);
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