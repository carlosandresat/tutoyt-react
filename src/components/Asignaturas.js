import { Fragment, useState, useEffect } from "react";
import { getTutorsByClass } from "../api/tutors.api";
import { SERVER_URL } from "../config";
import LoginForm from "./LoginForm";
import TutoringRequest from "./TutoringRequest";
import { authorizeUser } from "../api/login.api";

function Asignaturas() {
    const [courses, setCourses] = useState([]);
    const [tutorsList, setTutorsList] = useState([]);


    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        async function validate() {
            const response = await authorizeUser();
            if(response.data.Status){
                setIsLogged(true)
            }
        }
        validate();
    }, []);


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
                        isLogged ?

                        <TutoringRequest tutors={tutorsList} courseName={course.name} courseId={course.id} handleClick={handleClickClass} />
                        :
                        <LoginForm text="Consigue tutoría"></LoginForm>
                    }
                </div>
            ))}
        </Fragment>
    );
}

export default Asignaturas;