import React from "react";
import Login from "./Login";
import userData from "../data/userData";
import Tutorings from "./Tutorings";

function Header() {

    const [isActive, setIsActive] = React.useState(false);
    const [isListActive, setIsListActive] = React.useState(false);
    const [userLogged, setUserLogged] = React.useState('');
    const [userTutorings, setUserTutorings] = React.useState([]);

    const inputRefUser = React.useRef(null);
    const inputRefPassword = React.useRef(null);

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

    const handleClickAsignaturas = event => {
        setIsListActive(prevCount => !prevCount);
    };

    const handleClickLogin = () => {
        let callback = u => u.user === inputRefUser.current.value;
        const user = userData.filter(callback);
        if(user[0].password === inputRefPassword.current.value){
            setIsActive(prevIsActive => true);
            document.getElementById('theLogin').classList.remove('popup');        
            setUserLogged(user[0].userFirstName);
            setUserTutorings(user[0].tutorias);
        }
    }

    const handleClickLogout = () => {
        setIsActive(false);
        setUserLogged('');
        setIsListActive(false);
    }
    
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
                <div className="saludo">{isActive ? `Hola, ${userLogged}` : ''}</div>

                <div className="icons">
                    {isActive ?
                    <div>
                    <div className="fas fa-power-off" id="logout-btn" onClick={handleClickLogout}></div>
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
            <Login inputUser={inputRefUser} inputPassword={inputRefPassword} handleLogin={handleClickLogin} />
        </div>
    );
}
  
export default Header;