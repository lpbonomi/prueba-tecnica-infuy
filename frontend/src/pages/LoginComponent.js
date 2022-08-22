import React, { useState } from "react";
import { EmailComponent } from "../components/EmailComponent";
import { ContraseñaComponent } from "../components/ContraseñaComponent";
import { hashearContraseña, desencriptarString } from "../utils/utils";
import jwt from "jwt-decode";
import { getContraseña, getJwt } from "../reducers/auth";
import { useNavigate } from "react-router-dom";
import { resetStore } from "../redux/store";

export const LoginComponent = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  resetStore();

  function handleSubmit(event) {
    event.preventDefault();

    const contraseña_hasheada = hashearContraseña(contraseña);
    fetch("http://localhost:9000/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: {
          email: email,
          contraseña: contraseña_hasheada,
        },
      }),
    })
      .then(async function (response) {
        const body = await response.json();

        props.store.dispatch({ type: "jwt/save", payload: body.jwt_token });
        props.store.dispatch({ type: "contraseña/save", payload: contraseña });

        const clave_privada_encriptada = jwt(body.jwt_token).usuario.clave;

        if (clave_privada_encriptada) {
          const clave_privada = desencriptarString(
            clave_privada_encriptada,
            contraseña
          );

          props.store.dispatch({
            type: "clave_privada/save",
            payload: clave_privada,
          });

          navigate("/transacciones/historial");
        }

        navigate("/usuarios/respaldo-clave");
      })
      .catch(function (error) {
        alert("Error al loguear usuario.");
        console.log(error);
      });
  }

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card ">
            <div className="card-body p-4">
              <h1 className="text-center">Login</h1>
              <form onSubmit={handleSubmit}>
                <EmailComponent value={email} setEmail={setEmail} />
                <ContraseñaComponent
                  es_confirmacion={false}
                  value={contraseña}
                  updateContraseña={setContraseña}
                />
                <div className="d-grid gap-2 ">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="registro"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">
                    ¿No tienes una cuenta?
                    <a href="registro" className="text-muted ms-1">
                      <b>Regístrate</b>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
