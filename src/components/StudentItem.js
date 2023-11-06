import { Fragment } from "react";
import { StarRating } from "./StarRating";
import { useState } from "react";
import { useTutorings } from "../context/TutoringContext";

function StudentItem({
  id,
  topic,
  place,
  status,
  date,
  time,
  name,
  tutor,
  changes,
  rate_tutor,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { acceptTutoring, cancelTutoring, submitTutorRate } = useTutorings();

  const today = new Date();

  const isTutoringDone = () => {
    const day = date.split("/")[0];
    const hour = time.split(":")[0];
    const minute = time.split(":")[1];

    const condition =
      (parseInt(day) === today.getDate() ||
        parseInt(day) === today.getDate() - 1) &&
      (parseInt(hour) < today.getHours() ||
        (parseInt(hour) === today.getHours() &&
          parseInt(minute) < today.getMinutes()) ||
        parseInt(day) === today.getDate() - 1);
    return condition;
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
              onClick={() => acceptTutoring(id, "student")}
            >
              Aceptar
            </button>
            <button
              className="btn"
              onClick={() => cancelTutoring(id, "student")}
            >
              Cancelar
            </button>
          </Fragment>
        )}
        {status === "accepted" && isTutoringDone() && rate_tutor === null ? (
          <Fragment>
            <StarRating
              rating={rating}
              hover={hover}
              setRating={setRating}
              setHover={setHover}
            />
            <button className="btn" onClick={() => submitTutorRate(id, rating)}>
              Calificar
            </button>
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
