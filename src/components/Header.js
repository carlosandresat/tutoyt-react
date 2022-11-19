import tutoLogo from '../images/logo.png';


function Header() {
    


    return (
        <header className="header">

            <a href="#" className="logo">
                <img src={tutoLogo} alt="" />
            </a>

            <nav className="navbar">
                <a href="#home">Inicio</a>
                <a href="#objetivo">Objetivo</a>
                <a href="#asignaturas">Asignaturas</a>
                <a href="#tutores">Tutores</a>
                <a href="#review">Reviews</a>
            </nav>

            <div className="icons">
                <div className="fas fa-user" id="user-btn"></div>
                <div className="fas fa-bars" id="asignaturas-btn"></div>
            </div>

            <div className="cart-items-container">
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src="images/cart-item-1.png" alt="" />
                    <div className="content">
                        <h3>cart item 01</h3>
                        <div className="price">$15.99/-</div>
                    </div>
                </div>
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src="images/cart-item-2.png" alt="" />
                    <div className="content">
                        <h3>cart item 02</h3>
                        <div className="price">$15.99/-</div>
                    </div>
                </div>
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src="images/cart-item-3.png" alt="" />
                    <div className="content">
                        <h3>cart item 03</h3>
                        <div className="price">$15.99/-</div>
                    </div>
                </div>
                <div className="cart-item">
                    <span className="fas fa-times"></span>
                    <img src="images/cart-item-4.png" alt="" />
                    <div className="content">
                        <h3>cart item 04</h3>
                        <div className="price">$15.99/-</div>
                    </div>
                </div>
                <a href="#" className="btn">checkout now</a>
            </div>           

        </header>
    );
  }
  
  export default Header;