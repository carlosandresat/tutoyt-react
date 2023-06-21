import { Fragment, useEffect } from "react";
import StudentItem from "./StudentItem";
import { useAuth0 } from "@auth0/auth0-react";
import { useTutorings } from "../context/TutoringContext";

function StudentView() {

    const { user, isAuthenticated } = useAuth0();
    const { loadStudentTutorings, studentTutorings } = useTutorings();

    useEffect(() => {
      if (isAuthenticated) {
        loadStudentTutorings(user.user_id);
        console.log("loadStudentTutorings")
      }
    }, [])
  

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