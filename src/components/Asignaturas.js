import { Fragment, useState, useEffect } from "react";
import Tutoringform from "./Tutoringform";
import { getTutorsByClass } from "../api/tutors.api";
import { SERVER } from "../config";

function Asignaturas(props) {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('xdd');
    const [tutorsList, setTutorsList] = useState([]);

    useEffect(() => {
        fetch(`${SERVER}/asignaturas`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(err => console.log(err));
    }, []);

    async function handleClickClass(id, name) {
        const response = await getTutorsByClass(id)
        setTutorsList(response.data)
        setSelectedCourse(name)
        document.getElementById('tutoringForm').classList.add('popup');
    };

    return(
        <Fragment>
            {courses.map(course => (
                <div className="classBox">
                    <img src = {process.env.PUBLIC_URL + `/images/${course.code}.png`} alt="" />
                    <h3>{course.name}</h3>
                    {
                        props.auth ?
                        <button className="btn" onClick={() => handleClickClass(course.id, course.name)}>Consigue tutoría</button>
                        :
                        <button className="btn" onClick={() => document.getElementById('theLogin').classList.add('popup')}>Consigue tutoría</button>
                    }
                </div>
            ))}
            <Tutoringform tutors={tutorsList} courseName={selectedCourse} user={props.user}></Tutoringform>
        </Fragment>
    );
}

export default Asignaturas;