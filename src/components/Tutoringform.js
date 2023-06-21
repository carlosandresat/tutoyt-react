import {Form, Formik} from 'formik'
import { requestSession } from "../api/session.api"
import { useAuth0 } from "@auth0/auth0-react";
import { useTutorings } from '../context/TutoringContext';
import * as Yup from 'yup'

function Tutoringform(props) {

    const { user } = useAuth0();
    const { setStudentTutorings } = useTutorings();

    const handleClickCloseUser = event => {
        document.getElementById('tutoringForm').classList.remove('popup');
        var field = document.getElementById('selectedTutor');
        field.value = "";
        
    };

    const handleNewTutoring = (tutoring) => {
        setStudentTutorings((prevTutorings) => [...prevTutorings, tutoring])
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    

    const tutoringSchema = Yup.object().shape({
        tutor: Yup.string().required('Tutor requerido'),
        date: Yup.date().required().min(today, 'La fecha debe ser con un dia de anticipación'),
        time: Yup.string().required('Debes ingresar una fecha'),
        place: Yup.string().required('Debes ingresar un lugar').max(50, 'Usa menos caracteres'),
        topic: Yup.string().required('Debes ingresar un tema').min(4, 'Describe mejor el tema').max(50, 'Usa menos caracteres'),
    })

 
    return (
        <div className="login-form" id="tutoringForm">
        <Formik
            initialValues={{
                tutor: "",
                date:"",
                time: "",
                place: "",
                topic: ""
            }}
            validationSchema={tutoringSchema}
            onSubmit={async (values, actions) => {
                const date_r = new Date(values.date)
                const date_f = date_r.getFullYear() + '-' + ((date_r.getMonth() > 8) ? (date_r.getMonth() + 1) : ('0' + (date_r.getMonth() + 1))) + '-' + ((date_r.getDate() > 9) ? date_r.getDate() : ('0' + date_r.getDate())) 
        
                const data = {className: props.courseName, ...values, date: date_f, student: user.user_id}
                
                try {
                    const response = await requestSession(data)
                    handleNewTutoring(response.data)
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

                    <h4>Lugar tutoría:</h4>
                    {errors.place && touched.place ? (
                            <p>{errors.place}</p>
                    ): null}
                    <textarea rows="3" cols="80"
                        type="text" placeholder="Detalla tu lugar: Biblioteca, aula, salón... (max. 50 caracteres)" className="box"
                        name='place' onChange={handleChange} value={values.place}
                    />

                    
                    <h4>Tema tutoría:</h4>
                    {errors.topic && touched.topic ? (
                            <p>{errors.topic}</p>
                    ): null}
                    <textarea rows="3" cols="80"
                        type="text" placeholder="Detalla tu tema (max. 50 caracteres)" className="box"
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