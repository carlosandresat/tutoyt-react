import { Fragment, useState, useEffect } from "react";
import Tutoringform from "./Tutoringform";
import { getTutorsByClass } from "../api/tutors.api";
import { SERVER_URL } from "../config";
import { useAuth0 } from "@auth0/auth0-react";
import TutoringRequest from "./TutoringRequest";

function Asignaturas() {
    const [courses, setCourses] = useState([]);
    const [tutorsList, setTutorsList] = useState([]);

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        fetch(`${SERVER_URL}/asignaturas`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(err => console.log(err));
    }, []);

    async function handleClickClass(id) {
        const response = await getTutorsByClass(id)
        if(response.data.message){
            alert("No hay tutores disponibles para esta asignatura")
            setTutorsList([])
        } else {
            setTutorsList(response.data)
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

                        <TutoringRequest tutors={tutorsList} courseName={course.name} courseId={course.id} handleClick={handleClickClass} />
                        :
                        <button className="btn" onClick={() => loginWithRedirect()}>Consigue tutoría</button>
                    }
                </div>
            ))}
        </Fragment>
    );
}

export default Asignaturas;