import { Fragment } from "react";
import { useTutorings } from "../context/TutoringContext";
import { useState } from "react";
import { StarRating } from "./StarRating";
import RatingSession from "./RatingSession";
import ReportProblem from "./ReportProblem";

function TutoringItem({
  id,
  topic,
  place,
  status,
  date_raw,
  date,
  time,
  duration,
  classname,
  student,
  loadEdit,
  rate_student,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { acceptTutoring, cancelTutoring, submitStudentRate } = useTutorings();

  const handleClickChanges = (event) => {
    loadEdit(id);
    document.getElementById("tutoringChangeForm").classList.add("popup");
  };

  const isTutoringDone = () => {
    const today = new Date();
    const sessionDate = new Date(date_raw)
    return today.getTime() > sessionDate.getTime();
  };

  return (
    <div className="tuto-box">
      <h3>{classname}</h3>
      <p>
        <i className="fas fa-user"></i> {student}
      </p>
      <p>
        <i className="fas fa-calendar"></i> {date}
      </p>
      <p>
        <i className="fas fa-clock"></i> {time}
      </p>
      <p>
        <i class="fas fa-hourglass"></i> {duration / 60} {duration === 60 ? "hora" : "horas"}
      </p>
      <p>
        <i class="fas fa-map-marker-alt"></i> {place}
      </p>

      <p>
        <i class="fas fa-book-reader"></i> {topic}
      </p>

      <div className="buttons">
        {status === "requested" && (
          <Fragment>
            <button
              className="btn"
              onClick={async () => await acceptTutoring(id, "orientador")}
            >
              Aceptar
            </button>
            <button className="btn" onClick={handleClickChanges}>
              Proponer cambios
            </button>
            <button className="btn" onClick={() => cancelTutoring(id, "orientador")}>
              Cancelar
            </button>
          </Fragment>
        )}
      </div>
      <div className="student-rate">
        {status === "accepted" && isTutoringDone() && rate_student === null ? (
          <Fragment>
            <ReportProblem role="orientador" sessionId={id}></ReportProblem>

            <RatingSession ratingTo="student" sessionId={id}></RatingSession>

          </Fragment>
        ) : null}
      </div>
      {rate_student != null && <h2>¡Gracias por usar TutoYT!</h2>}
      {status === "accepted" && !isTutoringDone() && <h2>Aceptada</h2>}
      {status === "canceled" && <h2>Cancelada</h2>}
      {status === "changed" && <h2>Esperando confirmación de los cambios</h2>}
    </div>
  );
}

export default TutoringItem;
