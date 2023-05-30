import { Fragment, useState, useEffect } from "react";
import TutoringItem from "./TutoringItem";
import StudentItem from "./StudentItem";
import { getSessionsByStudent } from "../api/session.api";

function StudentView({ user }) {
    const [tutoringList, setTutoringList] = useState([]);
    const [selectedTutoring, setSelectedTutoring] = useState({});

    useEffect(() => {
        async function getTutorings() {
            const response = await getSessionsByStudent(user)
            setTutoringList(response.data)
        }
        getTutorings()
    }, [])

    const handleDeleteTutoring = (tutoringId) => {
        setTutoringList((prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if(tutoring.id === tutoringId) {
                    return {...tutoring, status: 'canceled'}
                }
                return tutoring
            });
        })
    }

    const handleAcceptTutoring = (tutoringId) => {
        setTutoringList((prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if(tutoring.id === tutoringId) {
                    return {...tutoring, status: 'accepted'}
                }
                return tutoring
            });
        })
    }

    return (
        <Fragment>
            <section className="student-view" id="student-view">
                <h1 className="heading"> Tus <span>tutorías (Estudiante)</span> </h1>
                <div className="box-container" id="assignments">
                    {tutoringList.map(tuto => (
                        <StudentItem {...tuto} onDelete={handleDeleteTutoring} onAccept={handleAcceptTutoring}/>
                    ))}
                    {tutoringList.length === 0 && <div className="tuto-box"><h3>No tienes tutorías</h3></div>}
                </div>
                
            </section>
        </Fragment>
    );
}

export default StudentView;