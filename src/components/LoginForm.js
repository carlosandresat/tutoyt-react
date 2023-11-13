import { Form, Formik } from "formik";
import { loginUser } from "../api/login.api";
import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Yup from "yup";
import * as Dialog from "@radix-ui/react-dialog";
import md5 from "blueimp-md5";

function LoginForm({text}) {
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    // open dialog
    setOpen(!open);
  };

  const tutoringSchema = Yup.object().shape({
    user: Yup.string()
      .required("Tutor requerido")
      .max(30, "Usa menos caracteres"),
    password: Yup.string()
      .required("Debes ingresar un lugar")
      .max(20, "Usa menos caracteres"),
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button className="btn btn-asignaturas">{text}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="TutoDialog">
          <Dialog.Title className="DialogTitle">Login</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Ingresa a Orienta YT
          </Dialog.Description>

          <div className="tuto-form" id="">
            <Formik
              initialValues={{
                user: "",
                password: "",
              }}
              validationSchema={tutoringSchema}
              onSubmit={async (values, actions) => {
                const data = {
                    user: values.user,
                    password: md5(values.password)
                };

                try {
                  const response = await loginUser(data);
                  if(response.data.Status){
                    window.location.reload();
                  }
                  else {
                    alert(response.data.message)
                  }
                } catch (error) {
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
                  <h4>Usuario</h4>
                  {errors.user && touched.user ? <p>{errors.user}</p> : null}
                  <input
                    type="text"
                    className="box"
                    name="user"
                    onChange={handleChange}
                    value={values.user}
                  ></input>
                  <h4>Contraseña</h4>
                  {errors.password && touched.password ? <p>{errors.password}</p> : null}
                  <input
                    type="password"
                    className="box"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  ></input>
                  

                  <button
                    type="submit"
                    className="btn"
                    value="Login"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Entrando" : "Entrar"}
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

export default LoginForm;
