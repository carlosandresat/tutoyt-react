import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Fragment } from 'react';
import { useTutorings } from "../context/TutoringContext";


function TutoringChanges({ requested }) {

    const { changeTutoring } = useTutorings();

    const handleClickCloseUser = event => {
        document.getElementById('tutoringChangeForm').classList.remove('popup');
    };

    const loginSchema = Yup.object().shape({
        changeTime: Yup.boolean(),
        date: Yup.date().when("changeTime", {
            is: true,
            then: Yup.date().required("Tienes que ingresar una fecha")
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
                    console.log("Prueba")
                    console.log("values.date CHANGES", values)
                    await changeTutoring(requested.id, values)
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
                                <textarea rows="3" cols="80" maxLength="100"
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
    );
}

export default TutoringChanges;