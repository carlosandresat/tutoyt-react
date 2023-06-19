import { createContext, useState, useContext } from "react";
import { getSessionsByStudent, getSessionsByTutor } from "../api/session.api";

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

    return (
        <TutoringContext.Provider value={{ studentTutorings, setStudentTutorings, tutorTutorings, setTutorTutorings, loadStudentTutorings, loadTutorTutorings }}>
            {children}
        </TutoringContext.Provider>
    )
}