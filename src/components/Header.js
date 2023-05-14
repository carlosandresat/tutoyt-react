import React from "react";
import Login from "./Login";
import userData from "../data/userData";
import Tutorings from "./Tutorings";
import { logout } from "../api/login.api";
import { getSessionsByStudent } from "../api/session.api";
import { useState, useEffect } from 'react';
import axios from "axios";

function Header(props) {

    const [isActive, setIsActive] = React.useState(false);
    const [isListActive, setIsListActive] = React.useState(false);
    const [userLogged, setUserLogged] = React.useState('');
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
    

    const tutorings = userTutorings.map(item =>{
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
                    {tutorings}
                </div>           

            </header>
            <Login/>
        </div>
    );
}
  
export default Header;