import { Fragment, useState, useEffect } from "react";
import Tutoringform from "./Tutoringform";
import { getTutorsByClass } from "../api/tutors.api";
import { SERVER_URL } from "../config";
import { useAuth0 } from "@auth0/auth0-react";

function Asignaturas() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('xdd');
    const [tutorsList, setTutorsList] = useState([]);

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        fetch(`${SERVER_URL}/asignaturas`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(err => console.log(err));
    }, []);

    async function handleClickClass(id, name) {
        const response = await getTutorsByClass(id)
        if(response.data.message){
            alert("No hay tutores disponibles para esta asignatura")
        } else {
            setTutorsList(response.data)
            setSelectedCourse(name)
            document.getElementById('tutoringForm').classList.add('popup');
        }
    };

    return(
        <Fragment>
            {courses.map(course => (
                <div className="classBox">
                    <img src = {process.env.PUBLIC_URL + `/images/${course.code}.png`} alt="" />
                    <h3>{course.name}</h3>
                    {
                        isAuthenticated ?
                        <button className="btn" onClick={() => handleClickClass(course.id, course.name)}>Consigue tutoría</button>
                        :
                        <button className="btn" onClick={() => loginWithRedirect()}>Consigue tutoría</button>
                    }
                </div>
            ))}
            <Tutoringform tutors={tutorsList} courseName={selectedCourse} />
        </Fragment>
    );
}

export default Asignaturas;