import React from "react";

function Header() {

    const [isActive, setIsActive] = React.useState(true);

    const handleClickUser = event => {
        document.getElementById('theLogin').classList.add('popup');
    };

    const handleClickAsignaturas = event => {
        setIsActive(prevCount => !prevCount);
        if(isActive){
            document.getElementById('asignaturas-list').classList.add('active');
        }
        else{
            document.getElementById('asignaturas-list').classList.remove('active');
        }
    };
    
    return (
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
                <div className="fas fa-user" id="user-btn" onClick={handleClickUser}></div>
                <div className="fas fa-bars" id="asignaturas-btn" onClick={handleClickAsignaturas}></div>
            </div>

            <div className="cart-items-container" id="asignaturas-list">
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src={process.env.PUBLIC_URL +"/images/mate.png"} alt="" />
                    <div className="content">
                        <h3>Cálculo II</h3>
                        <div className="info">
                            <div className="fas fa-calendar"></div>
                            <div className="date">12/Nov</div>

                            <div className="fas fa-clock"></div>
                            <div className="time">08:00</div>
                        </div>
                    </div>
                </div>
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src={process.env.PUBLIC_URL +"/images/fis.png"} alt="" />
                    <div className="content">
                        <h3>Física I</h3>
                        <div className="info">
                            <div className="fas fa-calendar"></div>
                            <div className="date">12/Nov</div>

                            <div className="fas fa-clock"></div>
                            <div className="time">12:00</div>
                        </div>
                    </div>
                </div>
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src={process.env.PUBLIC_URL +"/images/quim.png"} alt="" />
                    <div className="content">
                        <h3>Química I</h3>
                        <div className="info">
                            <div className="fas fa-calendar"></div>
                            <div className="date">14/Nov</div>

                            <div className="fas fa-clock"></div>
                            <div className="time">10:00</div>
                        </div>
                    </div>
                </div>
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src={process.env.PUBLIC_URL +"/images/mate.png"} alt="" />
                    <div className="content">
                        <h3>Algoritmos</h3>
                        <div className="info">
                            <div className="fas fa-calendar"></div>
                            <div className="date">15/Nov</div>

                            <div className="fas fa-clock"></div>
                            <div className="time">14:00</div>
                        </div>
                    </div>
                </div>
            </div>           

        </header>
    );
}
  
export default Header;