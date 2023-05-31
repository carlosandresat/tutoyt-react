import { Fragment, useState, useEffect } from "react";
import StudentItem from "./StudentItem";
import { getSessionsByStudent } from "../api/session.api";

function StudentView({ user, tutoringList, setTutoringList }) {

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

    const handleRateTutoring = (tutoringId) => {
        setTutoringList((prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if(tutoring.id === tutoringId) {
                    return {...tutoring, status: 'done'}
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
                        <StudentItem {...tuto} onDelete={handleDeleteTutoring} onAccept={handleAcceptTutoring} onRate={handleRateTutoring}/>
                    ))}
                    {tutoringList.length === 0 && <div className="tuto-box"><h3>No tienes tutorías</h3></div>}
                </div>
                
            </section>
        </Fragment>
    );
}

export default StudentView;