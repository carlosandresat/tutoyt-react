function Login() {
 
    return (
        <div className="login-form">
            <form action="">
                <h3>Login</h3>
                <input type="email" placeholder="Username" className="box" />
                <input type="password" placeholder="Contraseña" className="box" />
                <p>No tienes una cuenta? <a href="#">Regístrate ya!</a></p>
                <input type="submit" className="btn" value="Login" />
                <i className="fas fa-times"></i>
            </form>
        </div>
    );
}

export default Login;