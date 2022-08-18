import React, { useState } from "react";
import { EmailComponent } from "../components/EmailComponent";
import { ContraseñaComponent } from "../components/ContraseñaComponent";
import { hashearContraseña } from "../utils/utils";

export const LoginComponent = (props) => {
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
        props.store.dispatch({ type: 'jwt/save', payload: body.jwt_token });
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
