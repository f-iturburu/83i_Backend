import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Logo from "../assets/logo.png";
import { ShowPasswordButton } from "../components/ShowPasswordButton";
import axios from "axios";
import { setToken } from "../helpers/setToken";
import { emailRegex } from "../helpers/emailRegex";
import { passwordRegex } from "../helpers/passwordRegex";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState, watch} = useForm()
  const {errors} = formState

  const onSubmit = async (formData) => {
    setLoading(true);
     console.log(formData);
    try {
      const res = await axios.post(`${BASE_URL}/user`, formData);
      const data = res.data;
      setToken("auth-token", data.token);
      // setToken("key", data.key);
      alert("Te has registrado exitosamente")
      navigate("/");
      
    } catch (error) {
      console.log(error);

      if (error.code == "ERR_NETWORK") {
        alert("Error de red, compruebe si esta conectado a internet");
      }

      if (error?.response.status == 400) {
        let errorMessage = "";
        error.response.data.errors.map((i) => (errorMessage += `${i.msg} \n`));
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container vh-100 mt-5 w-100 d-flex justify-content-center">
        <Form noValidate style={{ maxWidth: "494px" }} onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center d-flex align-items-center my-3 pb-3 border border-light border-0 border-bottom">
            <img src={Logo} className="img-fluid w-25" alt="" />
            <div className="ms-4 text-start">
              <h1 className="display-5 fw-semibold">Rolling Store</h1>
              <h4>Sign Up</h4>
            </div>
          </div>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control className={errors.email?.message ? "is-invalid" : ""} type="email" placeholder="Email" {...register("email",{
             required:{
              value: true,
              message: "Ingrese un email"
             },
             pattern: {
              value: emailRegex,
              message: "Ingrese un email valido"
             }
            })}/>
            <Form.Control.Feedback type="invalid">
              {/* Message */}
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label>Contraseña</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              name="password"
              aria-describedby="passwordHelpBlock"
              type={showPassword ? "text" : "password"}
              placeholder="Password" 
              className={errors.password?.message ? "is-invalid" : ""}

              {...register("password",{
                required:{
                 value: true,
                 message: "Ingrese una contraseña"
                },
                pattern: {
                 value: passwordRegex,
                 message: "Ingrese una contraseña valida"
                }
               })}
            />
            <ShowPasswordButton
              state={showPassword}
              setState={setShowPassword}
            />

            <Form.Control.Feedback
              type="invalid"
              style={{ textAlign: "justify" }}
            >
              {/* Message */}
              {`${errors.password?.message}. Su contraseña debe estar conformada por un minimo de 8 caracteres, un maximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales`}
            </Form.Control.Feedback>
          </InputGroup>

          <Form.Label>Confirmar Contraseña</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              name="password"
              onPaste={(e) => e.preventDefault()}
              type="password"
              placeholder="Password"
              className={errors.repeatPassword?.message ? "is-invalid" : ""}
              {...register("repeatPassword",{
                required:{
                 value: true,
                 message: "Ingrese una contraseña"
                },
                validate: (value) =>{
                  if (value === watch("password")) {
                    return true
                  }
                  return "Las contraseñas no coinciden"
                }
               })}
            />
            <Form.Control.Feedback type="invalid">
              {/* Message */}
             {errors.repeatPassword?.message }
            </Form.Control.Feedback>
          </InputGroup>

          <Button variant="primary" type="submit">
            {loading ? <Spinner size="sm" /> : "Registrarme"}
          </Button>
        </Form>
      </section>
    </>
  );
};
