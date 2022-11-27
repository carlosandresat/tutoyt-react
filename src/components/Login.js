function Login() {

    const handleClickCloseUser = event => {
        document.getElementById('theLogin').classList.remove('popup');
    };

 
    return (
        <div className="login-form" id="theLogin">
            <form action="">
                <h3>Login</h3>
                <input type="email" placeholder="Username" className="box" />
                <input type="password" placeholder="Contraseña" className="box" />
                <p>No tienes una cuenta? <a href="#home">Regístrate ya!</a></p>
                <input type="submit" className="btn" value="Login" />
                <i className="fas fa-times" onClick={handleClickCloseUser}></i>
            </form>
        </div>
    );
}

export default Login;