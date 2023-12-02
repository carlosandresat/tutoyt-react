import { createContext, useState, useContext } from "react";
import {
    getSessionsByStudent,
    getSessionsByTutor,
    acceptSession,
    cancelSession,
    rateTutor,
    rateStudent,
    updateDate,
    updatePlace,
    updateTopic,
    updateDatePlace,
    updateDateTopic,
    updatePlaceTopic,
    updateAll,
    reportSession
} from "../api/session.api";

export const TutoringContext = createContext();

export const useTutorings = () => {
    const context = useContext(TutoringContext);
    if (!context) {
        throw new Error("useTutorings debe estar dentro del proveedor TutoringContext");
    }
    return context;
}

export const TutoringContextProvider = ({ children }) => {

    const [studentTutorings, setStudentTutorings] = useState([]);
    const [tutorTutorings, setTutorTutorings] = useState([]);

    const loadStudentTutorings = async (id) => {
        try {
            const response = await getSessionsByStudent(id);

            if (response.data.length > 0) {
                const studentData = response.data.map((session) => {
                    const sessionDate = new Date(session.date_raw)
                    return { ...session, date: sessionDate.toLocaleDateString("en-GB"), time: sessionDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) }
                })
                setStudentTutorings(studentData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadTutorTutorings = async (id) => {
        try {
            const response = await getSessionsByTutor(id);
            if (response.data.length > 0) {
                const tutorData = response.data.map((session) => {
                    const sessionDate = new Date(session.date_raw)
                    return { ...session, date: sessionDate.toLocaleDateString("en-GB"), time: sessionDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) }
                })
                setTutorTutorings(tutorData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const acceptTutoring = async (id, role) => {

        const callback = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if (tutoring.id === id) {
                    return { ...tutoring, status: 'accepted' }
                }
                return tutoring
            });
        }

        if (window.confirm("¿Estás seguro que quieres aceptar la tutoría?") === true) {
            await acceptSession(id)
            if (role === 'estudiante') setStudentTutorings(callback)
            else if (role === 'orientador') setTutorTutorings(callback)
        }
    }

    const changeTutoring = async (id, values) => {

        if (!values.changeTime && !values.changePlace && !values.changeTopic) {
            alert("No se ha seleccionado ningún cambio")
        } else {
            let response = null;
            let updatedDate = null;
            console.log("values.date: ", values.date)

            if (values.changeTime) {
                updatedDate = new Date()
                const hour = values.time.slice(0, 2)
                const minutes = values.time.slice(3, 5)
                const dateArray = values.date.split('-')
                updatedDate.setFullYear(dateArray[0], Number(dateArray[1])-1, dateArray[2])
                updatedDate.setHours(hour, minutes)
                console.log("updatedDate.toLocaleString(): ", updatedDate.toLocaleString())
            }


            if (values.changeTime && !values.changePlace && !values.changeTopic) {
                response = await updateDate(id, { date: updatedDate });
                console.log(updatedDate)
            } else if (!values.changeTime && values.changePlace && !values.changeTopic) {
                response = await updatePlace(id, { place: values.place });
            } else if (!values.changeTime && !values.changePlace && values.changeTopic) {
                response = await updateTopic(id, { topic: values.topic });
            } else if (values.changeTime && values.changePlace && !values.changeTopic) {
                response = await updateDatePlace(id, { date: updatedDate, place: values.place });
            } else if (values.changeTime && !values.changePlace && values.changeTopic) {
                response = await updateDateTopic(id, { date: updatedDate, topic: values.topic });
            } else if (!values.changeTime && values.changePlace && values.changeTopic) {
                response = await updatePlaceTopic(id, { place: values.place, topic: values.topic });
            } else if (values.changeTime && values.changePlace && values.changeTopic) {
                response = await updateAll(id, { date: updatedDate, place: values.place, topic: values.topic });
            } else if (!values.changeTime && !values.changePlace && !values.changeTopic) {
                alert("No se ha seleccionado ningún cambio")
            }

            setTutorTutorings((prevTutorings) => {
                return prevTutorings.map((tutoring) => {
                    if (tutoring.id === id) {
                        if (response.data.date) {
                            const sessionDate = new Date(response.data.date)
                            return { ...tutoring, ...response.data, date: sessionDate.toLocaleDateString("en-GB"), time: sessionDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }), status: 'changed' }
                        } else {
                            return { ...tutoring, ...response.data, status: 'changed' }

                        }
                    }
                    return tutoring
                });
            })
        }
    }


    const cancelTutoring = async (id, role) => {
        const callback = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if (tutoring.id === id) {
                    return { ...tutoring, status: 'canceled' }
                }
                return tutoring
            });
        }

        if (window.confirm("¿Estás seguro que quieres cancelar la tutoría?") === true) {
            await cancelSession(id)
            if (role === 'estudiante') setStudentTutorings(callback)
            else if (role === 'orientador') setTutorTutorings(callback)
        }
    }

    const submitTutorRate = async (id, data) => {
        const callback = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if (tutoring.id === id) {
                    return { ...tutoring, rate_tutor: data.rate }
                }
                return tutoring
            });
        }
        if (data.rate === 0) {
            if (window.confirm("¿Seguro que quieres calificar con 0 estrellas?") === true) {
                await rateTutor(id, data)
                setStudentTutorings(callback)
            }
        } else {
            await rateTutor(id, data)
            setStudentTutorings(callback)
        }
    }

    const submitStudentRate = async (id, data) => {
        const callback = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if (tutoring.id === id) {
                    return { ...tutoring, rate_student: data.rate }
                }
                return tutoring
            });
        }
        if (data.rate === 0) {
            if (window.confirm("¿Seguro que quieres calificar con 0 estrellas?") === true) {
                await rateStudent(id, data)
                setTutorTutorings(callback)
            }
        } else {
            await rateStudent(id, data)
            setTutorTutorings(callback)
        }
    }

    const submitReportSession = async (id_session, id_reporter, comment, role) => {
        const callbackTutor = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if (tutoring.id === id_session) {
                    return { ...tutoring, rate_student: 0 }
                }
                return tutoring
            });
        }
        const callbackStudent = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if (tutoring.id === id_session) {
                    return { ...tutoring, rate_tutor: 0 }
                }
                return tutoring
            });
        }

        if (window.confirm("¿Seguro que quieres reportar esta tutoría?") === true) {
            if (role === "orientador") {
                await rateStudent(id_session, { rate: 0, comment: "MSG AUTOMATICO: Tutoría reportada" })
                await reportSession({ id_session, id_reporter, comment })
                setTutorTutorings(callbackTutor)
            } else if (role === "estudiante") {
                await rateTutor(id_session, { rate: 0, comment: "MSG AUTOMATICO: Tutoría reportada" })
                await reportSession({ id_session, id_reporter, comment })
                setTutorTutorings(callbackStudent)
            }
        }
    }



    return (
        <TutoringContext.Provider value={{ studentTutorings, setStudentTutorings, tutorTutorings, setTutorTutorings, loadStudentTutorings, loadTutorTutorings, acceptTutoring, cancelTutoring, submitTutorRate, submitStudentRate, changeTutoring, submitReportSession }}>
            {children}
        </TutoringContext.Provider>
    )
}