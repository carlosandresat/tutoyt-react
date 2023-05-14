import {Form, Formik} from 'formik'
import { loginUser } from '../api/login.api';
import md5 from 'blueimp-md5';
import * as Yup from 'yup'


function Login(props) {

    const handleClickCloseUser = event => {
        document.getElementById('theLogin').classList.remove('popup');
    };

    const loginSchema = Yup.object().shape({
        user: Yup.string().required('Ingrese un usuario'),
        password: Yup.string().required('Ingresa tu contraseña')
    })

 
    return (
        <div className="login-form" id="theLogin">
            <Formik
            initialValues={{
                user: "",
                password: ""
            }}
            validationSchema={loginSchema}
            onSubmit={async (values, actions) => {
                try {
                    const response = await loginUser({
                        user: values.user,
                        password: md5(values.password)
                    })
                    if(response.data.Status === "Success") {
                        alert('Has ingresado correctamente')
                        window.location.reload(true)
                    } else {
                        alert(response.data.message)
                    }
                }
                catch (error){
                    console.log(error)                }
            }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        {errors.user && touched.user ? (
                            <p>{errors.user}</p>
                        ): null}
                        <input 
                        type="text" placeholder="Usuario" className="box"
                        name='user' onChange={handleChange} value={values.user}
                        />
                        {errors.password && touched.password ? (
                            <p>{errors.password}</p>
                        ): null}
                        <input 
                        type="password" placeholder="Contraseña" className="box"
                        name='password' onChange={handleChange} value={values.password} 
                        />
                        <p>No tienes una cuenta? <a href="#home">Regístrate ya!</a></p>
                        <button type="submit" className="btn" value="Login" disabled={isSubmitting}>
                        {isSubmitting ? "Loging..." : "Login"}
                        </button>
                        <i className="fas fa-times" onClick={handleClickCloseUser}></i>
                    </Form>
                )}
            </Formik>
        </div>

        //<div className="login-form" id="theLogin">
        //    <form action="">
        //        <h3>Login</h3>
        //        <input type="text" placeholder="Username" className="box" ref={props.inputUser} />
        //        <input type="password" placeholder="Contraseña" className="box" ref={props.inputPassword} />
        //        <p>No tienes una cuenta? <a href="#home">Regístrate ya!</a></p>
        //        <input type="button" className="btn" value="Login" onClick={props.handleLogin} />
        //        <i className="fas fa-times" onClick={handleClickCloseUser}></i>
        //    </form>
        //</div>
    );
}

export default Login;