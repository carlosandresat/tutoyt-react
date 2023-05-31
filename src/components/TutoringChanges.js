import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import { Fragment } from 'react';
import { 
    updateDate,
    updatePlace,
    updateTopic,
    updateDatePlace,
    updateDateTopic,
    updatePlaceTopic,
    updateAll
} from '../api/session.api';


function TutoringChanges({requested, handleChangeTutoring}) {

    const handleClickCloseUser = event => {
        document.getElementById('tutoringChangeForm').classList.remove('popup');
    };

    const loginSchema = Yup.object().shape({
        changeTime: Yup.boolean(),
        changePlace: Yup.boolean(),
        changeTopic: Yup.boolean(),
        date: Yup.string().when("changeTime", {
            is: true,
            then: Yup.string().required("Ingresa una fecha")
        }),
        time: Yup.string().when("changeTime", {
            is: true,
            then: Yup.string().required("Ingresa una hora")
        })
    })


 
    return (
        <div className="login-form" id="tutoringChangeForm">
            <Formik
            initialValues={
                {          
                    changeTime: false,
                    changePlace: false,
                    changeTopic: false,
                    date: "",
                    time: "",
                    place: "",
                    topic: ""
                }
            }
            //validationSchema={loginSchema}
                onSubmit={async (values, actions) => {
                    const response = values.changeTime === true && values.changePlace === false && values.changeTopic === false
                    ? await updateDate(requested.id, { date: values.date, time: values.time })
                    : values.changeTime === false && values.changePlace === true && values.changeTopic === false
                    ? await updatePlace(requested.id, { place: values.place })
                    : values.changeTime === false && values.changePlace === false && values.changeTopic === true
                    ? await updateTopic(requested.id, { topic: values.topic })
                    : values.changeTime === true && values.changePlace === true && values.changeTopic === false
                    ? await updateDatePlace(requested.id, { date: values.date, time: values.time, place: values.place })
                    : values.changeTime === true && values.changePlace === false && values.changeTopic === true
                    ? await updateDateTopic(requested.id, { date: values.date, time: values.time, topic: values.topic })
                    : values.changeTime === false && values.changePlace === true && values.changeTopic === true
                    ? await updatePlaceTopic(requested.id, { place: values.place, topic: values.topic })
                    : values.changeTime === true && values.changePlace === true && values.changeTopic === true
                    ? await updateAll(requested.id, { date: values.date, time: values.time, place: values.place, topic: values.topic })
                    : null
                    handleChangeTutoring(requested.id, response.data)
                    document.getElementById('tutoringChangeForm').classList.remove('popup');
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <h3>Registra tus cambios</h3>
                        <div className="box">
                        <input type="checkbox" name="changeTime" onChange={handleChange} checked={values.changeTime} />
                        <label>Proponer fecha/hora:</label>
                        </div>
                        {
                            true && 
                            <Fragment>
                                {errors.date && touched.date ? (
                                    <p>{errors.date}</p>
                                ) : null}
                                <input
                                    type="date" className="box" name='date' onChange={handleChange}
                                    value={values.changeTime ? values.date : requested.date}
                                    disabled={!values.changeTime}>
                                </input>
                                <input
                                    type="time" className="box" name="time" onChange={handleChange}
                                    value={values.changeTime ? values.time : requested.time}
                                    disabled={!values.changeTime}>
                                    
                                </input>
                            </Fragment>
                        }

                        <div className="box">
                        <input type="checkbox" name="changePlace" onChange={handleChange} checked={values.changePlace} />
                            <label>Proponer lugar:</label>
                        </div>
                        {
                            true && <Fragment>
                                {errors.place && touched.place ? (
                                    <p>{errors.place}</p>
                                ) : null}
                                <input
                                    type="text" placeholder="Tu propuesta de lugar" className="box"
                                    name='place' onChange={handleChange} value={values.changePlace ? values.place : requested.place}
                                    disabled={!values.changePlace}
                                />
                            </Fragment>
                        }
                        <div className="box">
                        <input type="checkbox" name="changeTopic" onChange={handleChange} checked={values.changeTopic} />
                            <label>Rectificar tema:</label>
                        </div>
                        {
                            true && <Fragment>
                                {errors.topic && touched.topic ? (
                                    <p>{errors.topic}</p>
                                ) : null}
                                <textarea rows="3" cols="80"
                        type="text" placeholder="Rectifica el tema (max. 50 caracteres)" className="box"
                        name='topic' onChange={handleChange} value={values.changeTopic ? values.topic : requested.topic}
                        disabled={!values.changeTopic}
                    />
                            </Fragment>
                        }
                        
                        
                        <p>El estudiante deberá aceptar o rechazar los cambios</p>
                        <button type="submit" className="btn" value="Login" disabled={isSubmitting}>
                        {isSubmitting ? "Cargando..." : "Proponer"}
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

export default TutoringChanges;