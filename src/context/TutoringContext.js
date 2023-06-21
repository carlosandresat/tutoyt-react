import { createContext, useState, useContext } from "react";
import { 
    getSessionsByStudent, 
    getSessionsByTutor, 
    acceptSession,
    cancelSession,
    rateSession,
    updateDate,
    updatePlace,
    updateTopic,
    updateDatePlace,
    updateDateTopic,
    updatePlaceTopic,
    updateAll
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
            setStudentTutorings(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const loadTutorTutorings = async (id) => {
        try {
            const response = await getSessionsByTutor(id);
            setTutorTutorings(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const acceptTutoring = async (id, role) => {

        const callback = (prevTutorings) => {   
            return prevTutorings.map((tutoring) => {
                if(tutoring.id === id) {
                    return {...tutoring, status: 'accepted'}
                }
                return tutoring
            });
        }

        if (window.confirm("¿Estás seguro que quieres aceptar la tutoría?") === true){
            await acceptSession(id)
            if(role === 'student') setStudentTutorings(callback)
            else if(role === 'tutor') setTutorTutorings(callback)
        }
    }

    const changeTutoring = async (id, values) => {

        if(!values.changeTime && !values.changePlace && !values.changeTopic) {
            alert("No se ha seleccionado ningún cambio")
        } else {
            let response = null;

            if (values.changeTime && !values.changePlace && !values.changeTopic) {
                response = await updateDate(id, { date: values.date, time: values.time });
            } else if (!values.changeTime && values.changePlace && !values.changeTopic) {
                response = await updatePlace(id, { place: values.place });
            } else if (!values.changeTime && !values.changePlace && values.changeTopic) {
                response = await updateTopic(id, { topic: values.topic });
            } else if (values.changeTime && values.changePlace && !values.changeTopic) {
                response = await updateDatePlace(id, { date: values.date, time: values.time, place: values.place });
            } else if (values.changeTime && !values.changePlace && values.changeTopic) {
                response = await updateDateTopic(id, { date: values.date, time: values.time, topic: values.topic });
            } else if (!values.changeTime && values.changePlace && values.changeTopic) {
                response = await updatePlaceTopic(id, { place: values.place, topic: values.topic });
            } else if (values.changeTime && values.changePlace && values.changeTopic) {
                response = await updateAll(id, { date: values.date, time: values.time, place: values.place, topic: values.topic });
            } else if(!values.changeTime && !values.changePlace && !values.changeTopic) {
                alert("No se ha seleccionado ningún cambio")
            }
    
            setTutorTutorings((prevTutorings) => {
                return prevTutorings.map((tutoring) => {
                    if(tutoring.id === id) {
                        return {...tutoring, ...response.data, status: 'changed'}
                    }
                    return tutoring
                });
            })
        }  
    }


    const cancelTutoring = async (id, role) => {
        const callback = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if(tutoring.id === id) {
                    return {...tutoring, status: 'canceled'}
                }
                return tutoring
            });
        }

        if (window.confirm("¿Estás seguro que quieres cancelar la tutoría?") === true){
            await cancelSession(id)
            if(role === 'student') setStudentTutorings(callback)
            else if(role === 'tutor') setTutorTutorings(callback)
        }
    }

    const rateTutoring = async (id, rate) => {
        const callback = (prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if(tutoring.id === id) {
                    return {...tutoring, status: 'done'}
                }
                return tutoring
            });
        }
        if (rate === 0) {
            if (window.confirm("¿Seguro que quieres calificar con 0 estrellas?") === true) {
                await rateSession(id, { rate })
                setStudentTutorings(callback)
            }
        } else {
            await rateSession(id, { rate })
            setStudentTutorings(callback)
        }
    }





    return (
        <TutoringContext.Provider value={{ studentTutorings, setStudentTutorings, tutorTutorings, setTutorTutorings, loadStudentTutorings, loadTutorTutorings, acceptTutoring, cancelTutoring, rateTutoring, changeTutoring }}>
            {children}
        </TutoringContext.Provider>
    )
}