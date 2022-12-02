function Login(props) {

    const handleClickCloseUser = event => {
        document.getElementById('theLogin').classList.remove('popup');
    };

 
    return (
        <div className="login-form" id="theLogin">
            <form action="">
                <h3>Login</h3>
                <input type="text" placeholder="Username" className="box" ref={props.inputUser} />
                <input type="password" placeholder="Contraseña" className="box" ref={props.inputPassword} />
                <p>No tienes una cuenta? <a href="#home">Regístrate ya!</a></p>
                <input type="button" className="btn" value="Login" onClick={props.handleLogin} />
                <i className="fas fa-times" onClick={handleClickCloseUser}></i>
            </form>
        </div>
    );
}

export default Login;