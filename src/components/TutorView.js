import { Fragment, useState, useEffect } from "react";
import TutoringItem from "./TutoringItem";
import TutoringChanges from "./TutoringChanges";
import SelectAsigaturas from "./SelectAsignaturas";
import { useAuth0 } from "@auth0/auth0-react";
import { useTutorings } from "../context/TutoringContext";

function TutorView() {
    const [selectedTutoring, setSelectedTutoring] = useState({});

    const { user, isAuthenticated } = useAuth0();
    const { loadTutorTutorings, tutorTutorings } = useTutorings();

    useEffect(() => {
      if (isAuthenticated) {
        loadTutorTutorings(user.user_id);
      }
    }, [])

    const handleOpenChanges = (tutoringId) => {
        const data = tutorTutorings.filter(
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
            <section className="tutor-view" id="tutor-view">
                <h1 className="heading"> Tus <span>tutorías (Tutor)</span> </h1>
                <SelectAsigaturas/>

                <div className="box-container" id="assignments">
                    {tutorTutorings.map(tuto => (
                        <TutoringItem {...tuto} loadEdit={handleOpenChanges}/>
                    ))}
                    {tutorTutorings.length === 0 && <div className="tuto-box"><h3>No tienes tutorías</h3></div>}
                </div>
                
            </section>
            <TutoringChanges requested={selectedTutoring}/>
        </Fragment>
    );
}

export default TutorView;