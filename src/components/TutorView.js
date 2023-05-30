import { Fragment, useState, useEffect } from "react";
import TutoringItem from "./TutoringItem";
import { getSessionsByTutor } from "../api/session.api";
import TutoringChanges from "./TutoringChanges";

function TutorView({ user }) {
    const [tutoringList, setTutoringList] = useState([]);
    const [selectedTutoring, setSelectedTutoring] = useState({});

    useEffect(() => {
        async function getTutorings() {
            const response = await getSessionsByTutor(user)
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

    const handleChangeTutoring = (tutoringId, changes) => {
        setTutoringList((prevTutorings) => {
            return prevTutorings.map((tutoring) => {
                if(tutoring.id === tutoringId) {
                    return {...tutoring, ...changes, status: 'changed'}
                }
                return tutoring
            });
        })
    }

    const handleOpenChanges = (tutoringId) => {
        const data = tutoringList.filter(
            (tutoring) => 
            tutoring.id === tutoringId
        )

        const date_r = new Date(data[0].date_raw)
        const date_f = date_r.getFullYear() + '-' + ((date_r.getMonth() > 8) ? (date_r.getMonth() + 1) : ('0' + (date_r.getMonth() + 1))) + '-' + ((date_r.getDate() > 9) ? date_r.getDate() : ('0' + date_r.getDate())) 

        const initialValues = {
            id: data[0].id,
            date: date_f,
            time: data[0].time,
            place: data[0].place,
            topic: data[0].topic
        }

        setSelectedTutoring(initialValues);
    }

    return (
        <Fragment>
            <section className="tutor-view" id="asignaturas">
                <h1 className="heading"> Tus <span>tutorías</span> </h1>
                <div className="box-container" id="assignments">
                    {tutoringList.map(tuto => (
                        <TutoringItem {...tuto} onDelete={handleDeleteTutoring} onAccept={handleAcceptTutoring} onEdit={handleOpenChanges}/>
                    ))}
                    {tutoringList.length === 0 && <div className="tuto-box"><h3>No tienes tutorías</h3></div>}
                </div>
                
            </section>
            <TutoringChanges requested={selectedTutoring} handleChangeTutoring={handleChangeTutoring}/>
        </Fragment>
    );
}

export default TutorView;