import React, { useState } from "react";
import { EmailComponent } from "../components/EmailComponent";
import { ContraseñaComponent } from "../components/ContraseñaComponent";
import { hashearContraseña, desencriptarString } from "../utils/utils";
import jwt from "jwt-decode";
import { getContraseña, getJwt } from "../reducers/auth";
import { useNavigate } from "react-router-dom";

export const LoginComponent = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

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
        //REDIRECCIONAR
        const body = await response.json();

        props.store.dispatch({ type: "jwt/save", payload: body.jwt_token });
        props.store.dispatch({ type: "contraseña/save", payload: contraseña });

        const clave_privada_encriptada = jwt(body.jwt_token).usuario.clave;
        const clave_privada = desencriptarString(
          clave_privada_encriptada,
          contraseña
        );

        props.store.dispatch({
          type: "clave_privada/save",
          payload: clave_privada,
        });

        navigate("/transacciones/historial");
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
              <div class="row mt-3">
                <div class="col-12 text-center">
                  <p class="text-muted">
                    ¿No tienes una cuenta?
                    <a href="registro" class="text-muted ms-1">
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
