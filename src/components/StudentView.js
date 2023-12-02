import { Fragment, useEffect } from "react";
import StudentItem from "./StudentItem";
import { authorizeUser } from "../api/login.api";
import { useTutorings } from "../context/TutoringContext";

function StudentView() {

    const { loadStudentTutorings, studentTutorings } = useTutorings();

    useEffect(() => {
        async function validate() {
            const response = await authorizeUser();
            if(response.data.Status){
                loadStudentTutorings(response.data.id)
            }
        }
        validate();
    }, []);

  

    return (
        <Fragment>
            <section className="student-view" id="student-view">
                <h1 className="heading"> Tus <span>tutorías (Estudiante)</span> </h1>
                <div className="box-container" id="assignments">
                    {studentTutorings.map(tuto => (
                        <StudentItem {...tuto}/>
                    ))}
                    {studentTutorings.length === 0 && <div className="tuto-box"><h3>No tienes tutorías</h3></div>}
                </div>
                
            </section>
        </Fragment>
    );
}

export default StudentView;