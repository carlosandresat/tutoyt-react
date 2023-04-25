import {Form, Formik} from 'formik'
import { requestSession } from "../api/session.api"
import * as Yup from 'yup'

function Tutoringform(props) {

    const handleClickCloseUser = event => {
        document.getElementById('tutoringForm').classList.remove('popup');
        var field = document.getElementById('selectedTutor');
        field.value = "";
        
    };

    const tutoringSchema = Yup.object().shape({
        tutor: Yup.string().required('Tutor requerido'),
        date: Yup.date().required().min(new Date(), 'La fecha debe ser con un dia de anticipación'),
        time: Yup.string().required('Required')
    })

 
    return (
        <div className="login-form" id="tutoringForm">
        <Formik
            initialValues={{
                tutor: "",
                date:"",
                time: ""
            }}
            validationSchema={tutoringSchema}
            onSubmit={async (values, actions) => {
                const data = {className: props.courseName, ...values, student: props.user}
                try {
                    const response = await requestSession(data)
                } catch (error) {
                    console.log(error)
                }
                handleClickCloseUser()
                actions.resetForm()                        
            }}
        >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched}) => (
                <Form onSubmit={handleSubmit}>
                    <h3>{props.courseName}</h3>
                    <h4>Seleccione tutor</h4>
                    {errors.tutor && touched.tutor ? (
                        <p>{errors.tutor}</p>
                    ): null}
                    <select 
                    className="box" name='tutor' 
                    placeholder='Seleccione un tutor' onChange={handleChange} 
                    id="selectedTutor" defaultValue={''} value={values.tutor}
                    >
                        <option value="" disabled>Elige un tutor</option>
                        {props.tutors.map(tutor =>(
                            <option>{tutor.name}</option>
                        ))}
                    </select>
                    
                    <h4>Seleccione fecha y hora</h4>
                    {errors.date && touched.date ? (
                        <p>{errors.date}</p>
                    ): null}
                    <input 
                    type="date" className="box" name='date' onChange={handleChange}
                    value={values.date}>
                        
                    </input>
                    <input 
                    type="time" className="box" name="time" onChange={handleChange}
                    value={values.time}>
                    </input>
                    <p>Recuerda que tu tutor debe confirmar el horario solicitado</p>
                    <button type="submit" className="btn" value="Login" disabled={isSubmitting}>
                        {isSubmitting ? "Solicitando" : "Solicitar"}
                    </button>
                    <i className="fas fa-times" onClick={handleClickCloseUser}></i>
                </Form>

            )}

        </Formik>
        </div>
        
        //<div className="login-form" id="tutoringForm">
        //    <form action="">
        //        <h3>{props.courseName}</h3>
        //        <input type="text" placeholder="Username" className="box" ref={props.inputUser} />
        //        <select className="box">
        //            {props.tutors.map(tutor =>(
        //                <option>{tutor.name}</option>
        //            ))}
        //        </select>
        //        <input type="date" className="box"></input>
        //        <input type="time" className="box"></input>
        //        <p>No tienes una cuenta? <a href="#home">Regístrate ya!</a></p>
        //        <input type="button" className="btn" value="Login" onClick={props.handleLogin} />
        //        <i className="fas fa-times" onClick={handleClickCloseUser}></i>
        //    </form>
        //</div>
    );
}

export default Tutoringform;