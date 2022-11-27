function Header() {

    const handleClickUser = event => {
        document.getElementById('theLogin').classList.add('popup');
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
                <a href="#home" className="btn">checkout now</a>
            </div>           

        </header>
    );
}
  
export default Header;