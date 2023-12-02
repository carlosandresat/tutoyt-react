import { Form, Formik } from "formik";
import { requestSession } from "../api/session.api";
import { useTutorings } from "../context/TutoringContext";
import { useState, useEffect } from "react";
import { authorizeUser } from "../api/login.api";
import { getAvailableTimes } from "./AvailableTimes";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Yup from "yup";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { StarRating } from "./StarRating";
import { rateStudent, rateTutor } from "../api/session.api";

function RatingSession(props) {
    const [open, setOpen] = useState(false);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleOpen = async () => {
        // open dialog
        setOpen(!open);
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

    const { setStudentTutorings, setTutorTutorings, submitStudentRate, submitTutorRate } = useTutorings();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tutoringSchema = Yup.object().shape({
        comment: Yup.string().max(100, "El comentario debe contener menos de 100 caracteres"),
    });

    return (
        <Dialog.Root open={open} onOpenChange={handleOpen}>
            <Dialog.Trigger asChild>
                <button className="btn btn-asignaturas">Calificar tutoría</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="TutoDialog">
                    <Dialog.Title className="DialogTitle">
                        Calificar tutoría
                    </Dialog.Title>

                    <div className="tuto-form" id="">
                        <Formik
                            initialValues={{
                                comment: "",
                            }}
                            validationSchema={tutoringSchema}
                            onSubmit={async (values, actions) => {
                                if(props.ratingTo === "tutor"){
                                    await submitTutorRate(props.sessionId ,{
                                        comment: values.comment,
                                        rate: rating
                                    })
                                } else if(props.ratingTo === "student"){
                                    await submitStudentRate(props.sessionId ,{
                                        comment: values.comment,
                                        rate: rating
                                    })
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
                                    <h4>Añade una puntuación de 1 a 5 ⭐ para tu {props.ratingTo === "tutor" ? "orientador" : "estudiante"}:</h4>

                                    <StarRating
                                        rating={rating}
                                        hover={hover}
                                        setRating={setRating}
                                        setHover={setHover}
                                    />
                                    <h4>Añade un comentario para tu {props.ratingTo === "tutor" ? "orientador" : "estudiante"} (Opcional):</h4>
                                    {errors.comment && touched.comment ? (
                                        <p>{errors.comment}</p>
                                    ) : null}
                                    <textarea
                                        rows="3"
                                        cols="80"
                                        type="text"
                                        placeholder={`Deja un comentario a tu ${props.ratingTo === "tutor" ? "orientador" : "estudiante"}`}
                                        className="box"
                                        name="comment"
                                        onChange={handleChange}
                                        value={values.comment}
                                    />

                                    <p>
                                        Tu sinceridad ayuda a mejorar las tutorías.
                                    </p>
                                    <button
                                        type="submit"
                                        className="btn"
                                        value="Login"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Calificando" : "Calificar"}
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

export default RatingSession;
