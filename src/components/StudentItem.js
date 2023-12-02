import { Fragment } from "react";
import { StarRating } from "./StarRating";
import { useState } from "react";
import { useTutorings } from "../context/TutoringContext";
import RatingSession from "./RatingSession";
import ReportProblem from "./ReportProblem";

function StudentItem({
  id,
  topic,
  place,
  status,
  date_raw,
  date,
  time,
  duration,
  name,
  tutor,
  changes,
  rate_tutor,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { acceptTutoring, cancelTutoring, submitTutorRate } = useTutorings();

  const isTutoringDone = () => {
    const today = new Date();
    const sessionDate = new Date(date_raw)
    return today.getTime() > sessionDate.getTime();
  };

  return (
    <div className="tuto-box">
      <h3>{name}</h3>
      <p>
        <i className="fas fa-user"></i> {tutor}
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
        <i className="fas fa-map-marker-alt"></i> {place}
      </p>

      <p>
        <i class="fas fa-book-reader"></i> {topic}
      </p>

      <div className="buttons">
        {status === "changed" && (
          <Fragment>
            <button
              className="btn"
              onClick={() => acceptTutoring(id, "estudiante")}
            >
              Aceptar
            </button>
            <button
              className="btn"
              onClick={() => cancelTutoring(id, "estudiante")}
            >
              Cancelar
            </button>
          </Fragment>
        )}
        {status === "accepted" && isTutoringDone() && rate_tutor === null ? (
          <Fragment>
            <ReportProblem role="estudiante" sessionId={id}></ReportProblem>
            <RatingSession ratingTo="tutor" sessionId={id}></RatingSession>

          </Fragment>
        ) : null}
      </div>

      {status === "accepted" && !isTutoringDone() && <h2>Aceptada</h2>}
      {rate_tutor != null && <h2>¡Gracias por usar TutoYT!</h2>}
      {status === "canceled" && <h2>Cancelada</h2>}
      {status === "changed" && (
        <Fragment>
          <h2>Tu tutor ha hecho cambios en:</h2>
          <h3>{changes}</h3>
        </Fragment>
      )}
      {status === "requested" && <h2>Esperando confirmación del tutor</h2>}
    </div>
  );
}

export default StudentItem;
