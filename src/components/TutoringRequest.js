import { Form, Formik } from "formik";
import { requestSession } from "../api/session.api";
import { useTutorings } from "../context/TutoringContext";
import { useState, useEffect } from "react";
import { authorizeUser } from "../api/login.api";
import { requestSessionNotification } from "../api/telegram.api";
import { getAvailableTimes } from "./AvailableTimes";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Yup from "yup";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";

function TutoringRequest(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    if (!open) {
      props.handleClick(props.courseId);
    }
    // open dialog
    setOpen(!open);
  };

  const [availableTimes, setAvailableTimes] = useState([]);

  const handleTimes = async (tutor_id, date) => {
    const updatedAvailableTimes = await getAvailableTimes(tutor_id, date);
    setAvailableTimes(updatedAvailableTimes);
  };

  const [userId, setUserId] = useState("")

  useEffect(() => {
    async function validate() {
      const response = await authorizeUser();
      if (response.data.Status) {
        setUserId(response.data.id)
      }
    }
    validate();
  }, []);

  const { setStudentTutorings } = useTutorings();


  const handleNewTutoring = (tutoring) => {
    const sessionDate = new Date(tutoring.date_raw)
    setStudentTutorings((prevTutorings) => [...prevTutorings, { ...tutoring, date: sessionDate.toLocaleDateString("en-GB"), time: sessionDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) }]);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tutoringSchema = Yup.object().shape({
    tutor: Yup.string().required("Orientador requerido"),
    date: Yup.date()
      .required()
      .min(today, "La fecha no puede ser anterior a hoy"),
    time: Yup.string()
      .required("Debes ingresar una hora")
      .when("date", (date, schema) => {
        if (date) {
          return schema.test({
            test: (time) => {
              const datetime = new Date(date[0]);
              const requestedtime = time.split(":");
              datetime.setHours(requestedtime[0], requestedtime[1], 0, 0);
              const datenow = new Date();
              const previousTime = 6 * 60 * 60 * 1000;
              return datetime.getTime() > datenow.getTime() + previousTime;
            },
            message: "La hora debe ser 6 horas posterior a la hora actual",
          });
        }
      }),
    place: Yup.string()
      .required("Debes ingresar un lugar")
      .max(50, "Usa menos caracteres"),
    topic: Yup.string()
      .required("Debes ingresar un tema")
      .min(4, "Describe mejor el tema")
      .max(50, "Usa menos caracteres"),
    duration: Yup.string().required("Debes ingresar una duración"),
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button className="btn btn-asignaturas">Consigue tutoría</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="TutoDialog">
          <Dialog.Title className="DialogTitle">
            {props.courseName}
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Llena el siguiente formulario
          </Dialog.Description>

          <div className="tuto-form" id="">
            <Formik
              initialValues={{
                tutor: "",
                date: "",
                time: "",
                place: "",
                topic: "",
                duration: "",
              }}
              validationSchema={tutoringSchema}
              onSubmit={async (values, actions) => {
                const hour = values.time.slice(0, 2)
                const minutes = values.time.slice(3, 5)
                const date_r = new Date(values.date);
                date_r.setHours(hour, minutes)
                const date_f =
                  date_r.getFullYear() +
                  "-" +
                  (date_r.getMonth() > 8
                    ? date_r.getMonth() + 1
                    : "0" + (date_r.getMonth() + 1)) +
                  "-" +
                  (date_r.getDate() > 9
                    ? date_r.getDate()
                    : "0" + date_r.getDate());

                const data = {
                  className: props.courseName,
                  ...values,
                  datetime: date_r,
                  student: userId,
                };

                const datetime = new Date([date_f, values.time]);
                const datenow = new Date();
                console.log("date_r", date_r)
                const formattedTutor = props.tutors.find(
                  (tutor) => tutor.id == values.tutor
                ).name.replaceAll(' ', '%20')

                try {

                  const response = await requestSession(data);
                  const newTutoring = {
                    ...response.data,
                    tutor: props.tutors.find(
                      (tutor) => tutor.id == response.data.tutor
                    ).name,
                  };
                  handleNewTutoring(newTutoring);
                } catch (error) {
                  console.log(error);
                }
                try {
                  await requestSessionNotification(formattedTutor)

                } catch(error) {
                  console.log(error);
                }

                setOpen(false);
                actions.resetForm();
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                isSubmitting,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <ScrollArea.Root className="ScrollAreaRoot">
                    <ScrollArea.Viewport className="ScrollAreaViewport">
                      <h4>Seleccione tutor</h4>
                      {errors.tutor && touched.tutor ? (
                        <p>{errors.tutor}</p>
                      ) : null}
                      <select
                        className="box"
                        name="tutor"
                        placeholder="Seleccione un tutor"
                        onChange={handleChange}
                        id="selectedTutor"
                        defaultValue={""}
                        value={values.tutor}
                        onInput={(e) =>
                          handleTimes(e.target.value, values.date)
                        }
                      >
                        <option value="" disabled>
                          Elige un tutor
                        </option>
                        {props.tutors.map((tutor) => (
                          <option value={tutor.id}>{tutor.name}</option>
                        ))}
                      </select>

                      <h4>Seleccione fecha y hora</h4>
                      {errors.date && touched.date ? (
                        <p>{errors.date}</p>
                      ) : null}
                      <input
                        type="date"
                        className="box"
                        name="date"
                        onChange={handleChange}
                        value={values.date}
                        onInput={(e) =>
                          handleTimes(values.tutor, e.target.value)
                        }
                      ></input>

                      {errors.time && touched.time ? (
                        <p>{errors.time}</p>
                      ) : null}
                      <select
                        className="box"
                        name="time"
                        placeholder="Seleccione una hora"
                        onChange={handleChange}
                        id="selectedTutor"
                        defaultValue={""}
                        value={values.time}
                      >
                        <option value="" disabled>
                          Elige una hora
                        </option>
                        {availableTimes.map((time) => (
                          <option value={time}>{time}</option>
                        ))}
                      </select>

                      <h4>Duración tutoría</h4>
                      {errors.duration && touched.duration ? (
                        <p>{errors.duration}</p>
                      ) : null}
                      <select
                        className="box"
                        name="duration"
                        placeholder="Seleccione una hora"
                        onChange={handleChange}
                        id="selectedTutor"
                        defaultValue={""}
                        value={values.duration}
                      >
                        <option value="" disabled>
                          Elige una duración
                        </option>
                        <option value="60">1 hora</option>
                        <option value="90">1 hora y media</option>
                        <option value="120">2 horas</option>
                        {/*<option value="150">2 horas y media</option>
                        <option value="180">3 horas</option>*/}
                      </select>

                      <h4>Lugar tutoría:</h4>
                      {errors.place && touched.place ? (
                        <p>{errors.place}</p>
                      ) : null}
                      <textarea
                        rows="3"
                        cols="80"
                        type="text"
                        placeholder="Biblioteca, aula, Zoom... (max. 50 caracteres)"
                        className="box"
                        name="place"
                        onChange={handleChange}
                        value={values.place}
                      />

                      <h4>Tema tutoría:</h4>
                      {errors.topic && touched.topic ? (
                        <p>{errors.topic}</p>
                      ) : null}
                      <textarea
                        rows="3"
                        cols="80"
                        type="text"
                        placeholder="Detalla tu tema (max. 50 caracteres)"
                        className="box"
                        name="topic"
                        onChange={handleChange}
                        value={values.topic}
                      />
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                      className="ScrollAreaScrollbar"
                      orientation="vertical"
                    >
                      <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar
                      className="ScrollAreaScrollbar"
                      orientation="horizontal"
                    >
                      <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner className="ScrollAreaCorner" />
                  </ScrollArea.Root>
                  <p>
                    Recuerda que tu tutor debe confirmar el horario solicitado
                  </p>
                  <button
                    type="submit"
                    className="btn"
                    value="Login"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Solicitando" : "Solicitar"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    /*
     */
  );
}

export default TutoringRequest;
