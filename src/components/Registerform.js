import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import md5 from 'blueimp-md5';
import { checkUser, newUser } from '../api/register.api';

function Registerform(props) {

    const handleClickCloseUser = event => {
        document.getElementById('registerForm').classList.remove('popup');        
    };

    const registerSchema = Yup.object().shape({
        name: Yup.string().required('Ingresa un nombre').min(3, 'Nombre muy corto'),
        user: Yup.string().required('Ingrese un usuario').min(3, 'Usuario muy corto'),
        password: Yup.string().required('Ingresa tu contraseña').min(3, 'Contraseña muy corta'),
        passwordconf: Yup.string().oneOf([Yup.ref('password'), null], "Las contraseñas no coinciden").required('Comprueba tu contraseña')
    })

 
    return (
        <div className="login-form" id="registerForm">
        <Formik
            initialValues={{
                name: "",
                user:"",
                password: "",
                passwordconf: ""
            }}
            validationSchema={registerSchema}
            onSubmit={async (values, actions) => {
                try {
                    const validate = await checkUser(values.user)
                    if(validate.data.status === "Success"){
                        try{
                            const data = {
                                name: values.name,
                                user: values.user,
                                password: md5(values.password),
                            }
                            const response = await newUser(data)
                            alert('Usuario creado correctamente')
                            window.location.reload(true)
                        } catch (error) {
                            console.log(error)
                        }
                    } else {
                        alert(validate.data.message)
                    }
                }
                catch(error){
                    console.log(error)
                }
                handleClickCloseUser()
                actions.resetForm()                        
            }}
        >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched}) => (
                <Form onSubmit={handleSubmit}>
                    <h3>Registro</h3>
                    {errors.name && touched.name ? (
                            <p>{errors.name}</p>
                    ): null}
                    <input 
                        type="text" placeholder="Nombres" className="box"
                        name='name' onChange={handleChange} value={values.name}
                    />

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
                    
                    {errors.passwordconf && touched.passwordconf ? (
                            <p>{errors.passwordconf}</p>
                    ): null} 
                    <input 
                        type="password" placeholder="Confirmar contraseña" className="box"
                        name='passwordconf' onChange={handleChange} value={values.passwordconf}
                    /> 
                    <p>!Gracias por inscribirte en esta prueba!</p>
                    <button type="submit" className="btn" value="Regístrate" disabled={isSubmitting}>
                        {isSubmitting ? "Registrándote" : "Regístrate"}
                    </button>
                    <i className="fas fa-times" onClick={handleClickCloseUser}></i>
                </Form>

            )}

        </Formik>
        </div>
    );
}

export default Registerform;