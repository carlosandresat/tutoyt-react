import { useState, useEffect } from "react";
import { getAdminView } from "../api/session.api";
import { date } from "yup";

function AdminTable(props) {

    const [sessionData, setSessionData] = useState([])

    useEffect(() => {
        async function getData() {
            console.log("pruebaadmin")
            const response = await getAdminView();
            console.log(response)
            setSessionData(response.data)
        }
        getData();
    }, []);


    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Estudiante</th>
                    <th>Orientador</th>
                    <th>Clase</th>
                    <th>Status</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>tema</th>
                    <th>lugar</th>
                    <th>⌛</th>
                    <th>⭐E</th>
                    <th>⭐O</th>
                    <th>Cambios</th>
                    <th>comment_student</th>
                    <th>comment_tutor</th>
                </tr>
            </thead>
            <tbody>
                {
                    sessionData.map((session) =>{
                        const formattedDate = new Date(session.date)
                        const dateString = formattedDate.toLocaleDateString("en-GB")
                        const formattedTime = new Date(session.date)
                        const timeString = formattedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })


                        return(
                        <tr>
                            <td>{session.id}</td>
                            <td>{session.student}</td>
                            <td>{session.tutor}</td>
                            <td>{session.classname}</td>
                            <td>{session.status}</td>
                            <td>{dateString}</td>
                            <td>{timeString}</td>
                            <td>{session.topic}</td>
                            <td>{session.place}</td>
                            <td>{session.duration}</td>
                            <td>{session.rate_student}</td>
                            <td>{session.rate_tutor}</td>
                            <td>{session.changes}</td>
                            <td>{session.comment_student}</td>
                            <td>{session.comment_tutor}</td>
                        </tr>)
                                            }

                    )
                }
            </tbody>
        </table>
    );
}

export default AdminTable;


