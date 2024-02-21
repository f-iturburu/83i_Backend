import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Logo from "../assets/logo.png";
import { ShowPasswordButton } from "../components/ShowPasswordButton";
import { emailRegex } from "../helpers/emailRegex";
import axios from "axios";
import { setToken } from "../helpers/setToken";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Login = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState()
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);
      const data = res.data;
      setToken(data);
    } catch (error) {
      console.log(error);

      if (error.code == "ERR_NETWORK") {
        alert("Error de red, compruebe si esta conectado a internet");
      }

      if (error?.response?.status == 401) {
         alert(error.response?.data?.message);
      }

      if (error?.response.status == 400) {
        let errorMessage = "";
        error.response.data.errors.map((i) => (errorMessage += `${i.msg} \n`));
        alert(errorMessage);
      }

    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <section className="container vh-100 mt-5 w-100 d-flex justify-content-center">
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center d-flex align-items-center my-3 pb-3 border border-light border-0 border-bottom">
            <img src={Logo} className="img-fluid w-25" alt="" />
            <div className="ms-4 text-start">
              <h1 className="display-5 fw-semibold">Rolling Store</h1>
              <h4>Login</h4>
            </div>
          </div>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={errors.email?.message ? "is-invalid" : ""}
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Ingrese un email",
                },
                pattern: {
                  value: emailRegex,
                  message: "Ingrese un email valido",
                },
              })}
              placeholder="Email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label>Contraseña</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              name="password"
              type={showPassword ? "text" : "password"}
              className={errors.password?.message ? "is-invalid" : ""}
              placeholder="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Ingrese una contraseña",
                },
              })}
            />
            <ShowPasswordButton
              state={showPassword}
              setState={setShowPassword}
            />
            <Form.Control.Feedback type="invalid">
            {errors.password?.message}
            </Form.Control.Feedback>
          </InputGroup>
          <Button variant="primary" type="submit" disabled={loading} >
           {loading? <Spinner size="sm"/> :"Ingresar"}
          </Button>
        </Form>
      </section>
    </>
  );
};
