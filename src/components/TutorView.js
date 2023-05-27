import { Fragment, useState, useEffect } from "react";
import TutoringItem from "./TutoringItem";
import { getSessionsByTutor } from "../api/session.api";

function TutorView({ user }) {
    const [tutoringList, setTutoringList] = useState([]);

    useEffect(() => {
        async function getTutorings() {
            const response = await getSessionsByTutor(user)
            setTutoringList(response.data)
        }
        getTutorings()
    }, [])


    return (
        <Fragment>
            <section className="tutor-view" id="asignaturas">
                <h1 className="heading"> Tus <span>tutorías</span> </h1>
                <div className="box-container" id="assignments">
                    {tutoringList.map(tuto => (
                        <TutoringItem {...tuto} />
                    ))}

                </div>
            </section>

        </Fragment>
    );
}

export default TutorView;