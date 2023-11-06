import {Form, Formik} from 'formik'
import { requestSession } from "../api/session.api"
import { useAuth0 } from "@auth0/auth0-react";
import { useTutorings } from '../context/TutoringContext';
import { useEffect, useState } from 'react';
import { getAvailableTimes} from "./AvailableTimes"
import { getTutorSessionsByDate } from "../api/session.api";
import * as Yup from 'yup'
import * as Dialog from '@radix-ui/react-dialog';


function Tutoringform(props) {

    const [availableTimes, setAvailableTimes] = useState([]);

    const handleTimes = async (tutor_id, date) => {
        const updatedAvailableTimes = await getAvailableTimes(tutor_id, date);
        setAvailableTimes(updatedAvailableTimes);
    }

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
        date: Yup.date().required().min(today, 'La fecha no puede ser anterior a hoy'),
        time: Yup.string().required('Debes ingresar una hora').when('date', (date, schema) => {
            if (date) {
                return schema.test({
                    test: (time) => {
                        const datetime = new Date(date[0])
                        const requestedtime = time.split(':')
                        datetime.setHours(requestedtime[0], requestedtime[1], 0, 0)
                        const datenow = new Date()
                        console.log(datetime)
                        return datetime > datenow
                    },
                    message: 'La hora debe ser 6 horas posterior a la hora actual'
                })
            }
        }),
        place: Yup.string().required('Debes ingresar un lugar').max(50, 'Usa menos caracteres'),
        topic: Yup.string().required('Debes ingresar un tema').min(4, 'Describe mejor el tema').max(50, 'Usa menos caracteres'),
        duration: Yup.string().required('Debes ingresar una duración')
    })

 
    return (
        <div className="login-form" id="tutoringForm">
        <Formik
            initialValues={{
                tutor: "",
                date:"",
                time: "",
                place: "",
                topic: "",
                duration: ""
            }}
            validationSchema={tutoringSchema}
            onSubmit={async (values, actions) => {
                const date_r = new Date(values.date)
                const date_f = date_r.getFullYear() + '-' + ((date_r.getMonth() > 8) ? (date_r.getMonth() + 1) : ('0' + (date_r.getMonth() + 1))) + '-' + ((date_r.getDate() > 9) ? date_r.getDate() : ('0' + date_r.getDate())) 
        
                const data = {className: props.courseName, ...values, date: date_f, student: user.user_id}

                const datetime = new Date([date_f, values.time])
                const datenow = new Date()
                
                try {
                    console.log(data)
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
                    id="selectedTutor" defaultValue={''} value={values.tutor} onInput={(e) => handleTimes(e.target.value, values.date)}
                    >
                        <option value="" disabled>Elige un tutor</option>
                        {props.tutors.map(tutor =>(
                            <option value={tutor.id}>{tutor.name}</option>
                        ))}
                    </select>
                    
                    <h4>Seleccione fecha y hora</h4>
                    {errors.date && touched.date ? (
                        <p>{errors.date}</p>
                    ): null}
                    <input 
                    type="date" className="box" name='date' onChange={handleChange}
                    value={values.date} onInput={(e) => handleTimes(values.tutor, e.target.value)}>    
                    </input>
                    

                    {errors.time && touched.time ? (
                        <p>{errors.time}</p>
                    ): null}
                    <select 
                    className="box" name='time' 
                    placeholder='Seleccione una hora' onChange={handleChange} 
                    id="selectedTutor" defaultValue={''} value={values.time}
                    >
                        <option value="" disabled>Elige una hora</option>
                        {
                            availableTimes.map(time => (
                                <option value={time}>{time}</option>
                            ))
                        }
                    </select>

                    <h4>Duración tutoría</h4>
                    {errors.duration && touched.duration ? (
                        <p>{errors.duration}</p>
                    ): null}
                    <select 
                    className="box" name='duration' 
                    placeholder='Seleccione una hora' onChange={handleChange} 
                    id="selectedTutor" defaultValue={''} value={values.duration}
                    >
                        <option value="" disabled>Elige una duración</option>
                        <option value="60">1 hora</option>
                        <option value="90">1 hora y media</option>
                        <option value="120">2 horas</option>
                        <option value="150">2 horas y media</option>
                        <option value="180">3 horas</option>
                    </select>

                    <h4>Lugar tutoría:</h4>
                    {errors.place && touched.place ? (
                            <p>{errors.place}</p>
                    ): null}
                    <textarea rows="3" cols="80"
                        type="text" placeholder="Biblioteca, aula, Zoom... (max. 50 caracteres)" className="box"
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