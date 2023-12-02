import { Fragment, useState, useEffect } from "react";
import TutoringItem from "./TutoringItem";
import TutoringChanges from "./TutoringChanges";
import SelectAsigaturas from "./SelectAsignaturas";
import { useTutorings } from "../context/TutoringContext";
import { authorizeUser } from "../api/login.api";
import { getAdminView } from "../api/session.api";
import AdminTable from "./AdminTable";

function AdminView() {
    const [selectedTutoring, setSelectedTutoring] = useState({});

    const { loadTutorTutorings, tutorTutorings } = useTutorings();

    



    return (
        <Fragment>
            <section className="tutor-view" id="admin-view">
                <h1 className="heading"> Admin <span>Panel</span> </h1>
                <AdminTable/>

                
            </section>
            <TutoringChanges requested={selectedTutoring}/>
        </Fragment>
    );
}

export default AdminView;