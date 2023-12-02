import { Form, Formik } from "formik";
import { newUser } from "../api/register.api";
import { loginUser } from "../api/login.api";
import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Yup from "yup";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from '@radix-ui/react-tabs';
import md5 from "blueimp-md5";
import * as ScrollArea from "@radix-ui/react-scroll-area";


function LoginForm({ text }) {
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    // open dialog
    setOpen(!open);
  };

  const tutoringSchema = Yup.object().shape({
    user: Yup.string().email("Debes ingresar tu correo institucional")
      .required("Usuario requerido")
      .max(50, "Usa menos caracteres"),
    password: Yup.string()
      .required("Debes ingresar una contraseña")
      .max(20, "Usa menos caracteres"),
  });

  const registerSchema = Yup.object().shape({
    fullname: Yup.string().required("Nombre completo requerido")
      .min(5, "Tu nombre debe incluir más caracteres")
      .max(70, "Tu nombre debe tener menos de 70 caraceteres"),
    email: Yup.string()
      .required("Correo requerido")
      .max(50, "Usa menos caracteres"),
    classroom: Yup.string()
      .required("Curso requerido")
      .max(1, "Los cursos constan de una letra"),
    password: Yup.string()
      .required("Debes ingresar una contraseña")
      .min(6, "Mínimo 6 caracteres")
      .max(20, "Máximo 20 caracteres"),
    phone: Yup.string()
      .required("Telefono requerido")
      .max(9, "El número debe contener 9 dígitos. No incluyas el 0 inicial").min(9, "El número debe contener 9 dígitos.")
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button className="btn btn-asignaturas">{text}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="TutoDialog">
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                Ingresa
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Regístrate
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">


              <div className="tuto-form" id="">
                <Formik
                  initialValues={{
                    user: "",
                    password: "",
                  }}
                  validationSchema={tutoringSchema}
                  onSubmit={async (values) => {
                    const data = {
                      user: values.user,
                      password: md5(values.password)
                    };

                    try {
                      const response = await loginUser(data);
                      if (response.data.Status) {
                        window.location.reload();
                      }
                      else {
                        alert(response.data.message)
                      }
                    } catch (error) {
                      console.log(error);
                    }

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
                      <h4>Correo Institucional</h4>
                      {errors.user && touched.user ? <p style={{ color: "red" }}>{errors.user}</p> : null}
                      <input
                        type="text"
                        className="box"
                        name="user"
                        onChange={handleChange}
                        value={values.user}
                      ></input>
                      <h4>Contraseña OrientaYT</h4>
                      {errors.password && touched.password ? <p style={{ color: "red" }}>{errors.password}</p> : null}
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
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">

              <div className="tuto-form" id="">
                <Formik
                  initialValues={{
                    fullname: "",
                    email: "",
                    password: "",
                    classroom: "",
                    phone: "",
                  }}
                  validationSchema={registerSchema}
                  onSubmit={async (values, actions) => {
                    const data = {
                      name: values.fullname,
                      user: values.email,
                      password: md5(values.password),
                      classroom: values.classroom,
                      phone: `+593${values.phone}`
                    }

                    try {
                      const response = await newUser(data);
                      if (response.data.status) {
                        alert("Usuario creado correctamente");
                        setOpen(false);
                        actions.resetForm();
                      }
                      else {
                        alert(response.data.message)
                      }
                    } catch (error) {
                      console.log(error);
                    }

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

                          <h4>Nombre completo</h4>
                          {errors.fullname && touched.fullname ? <p style={{ color: "red" }}>{errors.fullname}</p> : null}
                          <input
                            type="text"
                            className="box"
                            name="fullname"
                            onChange={handleChange}
                            value={values.fullname}
                          ></input>
                          <h4>Correo Institucional</h4>
                          {errors.email && touched.email ? <p style={{ color: "red" }}>{errors.email}</p> : null}
                          <input
                            type="email"
                            className="box"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                          ></input>
                          <h4>Contraseña</h4>
                          {errors.password && touched.password ? <p style={{ color: "red" }}>{errors.password}</p> : null}
                          <input
                            type="password"
                            className="box"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                          ></input>
                          <h4>Paralelo</h4>
                          {errors.classroom && touched.classroom ? <p style={{ color: "red" }}>{errors.classroom}</p> : null}
                          <select
                            className="box"
                            name="classroom"
                            onChange={handleChange}
                            value={values.classroom}
                          >
                            <option value="" disabled>Elige tu paralelo</option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                            <option value="e">E</option>
                            <option value="f">F</option>
                            <option value="g">G</option>
                            <option value="h">H</option>
                            <option value="i">I</option>
                            <option value="j">J</option>
                            <option value="k">K</option>
                            <option value="l">L</option>
                            <option value="m">M</option>
                            <option value="n">N</option>
                            <option value="o">O</option>
                            <option value="p">P</option>
                          </select>

                          <h4>Celular (+593-XXXXXXXXX)</h4>
                          {errors.phone && touched.phone ? <p style={{ color: "red" }}>{errors.phone}</p> : null}
                          <input
                            type="text"
                            className="box"
                            name="phone"
                            onChange={handleChange}
                            value={values.phone}
                          ></input>
                          <label style={{ fontSize: "1.5rem" }}>*Será utilizado para enviar notificaciones automatizadas</label>
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



                      <button
                        type="submit"
                        className="btn"
                        value="Login"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registrándote" : "Regístrate"}
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

            </Tabs.Content>
          </Tabs.Root>

        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
    /*
     */
  );
}

export default LoginForm;
