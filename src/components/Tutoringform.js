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
        time: Yup.string().required('Debes ingresar una fecha'),
        topic: Yup.string().required('Debes ingresar un tema').min(4, 'Describe mejor el tema')
    })

 
    return (
        <div className="login-form" id="tutoringForm">
        <Formik
            initialValues={{
                tutor: "",
                date:"",
                time: "",
                topic: ""
            }}
            validationSchema={tutoringSchema}
            onSubmit={async (values, actions) => {
                const data = {className: props.courseName, ...values, student: props.user}
                try {
                    const response = await requestSession(data)
                    props.onRequest(response.data)
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
                    
                    <h4>Tema tutoría:</h4>
                    {errors.topic && touched.topic ? (
                            <p>{errors.topic}</p>
                    ): null}
                    <textarea rows="3" cols="80"
                        type="text" placeholder="Detalla tu tema (max. 30 caracteres)" className="box"
                        name='topic' onChange={handleChange} value={values.topic}
                    />

                    <p>Recuerda que tu tutor debe confirmar el horario solicitado</p>
                    <button type="submit" className="btn" value="Login" disabled={isSubmitting}>
                        {isSubmitting ? "Solicitando" : "Solicitar"}
                    </button>
                    <i className="fas fa-times" onClick={handleClickCloseUser}></i>
                </Form>

            )}

        </Formik>
        </div>
        
    );
}

export default Tutoringform;