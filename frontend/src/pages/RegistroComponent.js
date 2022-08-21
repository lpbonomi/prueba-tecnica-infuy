import React, { useState } from "react";
import { EmailComponent } from "../components/EmailComponent";
import { ContraseñaComponent } from "../components/ContraseñaComponent";
import PasswordChecklist from "react-password-checklist";
import { hashearContraseña } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export function RegistroComponent() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmacion_contraseña, setConfirmacionContraseña] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const contraseña_hasheada = hashearContraseña(contraseña);

    fetch("http://localhost:9000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: {
          nombre: nombre,
          email: email,
          contraseña: contraseña_hasheada,
        },
      }),
    })
      .then(function (response) {
        //REDIRECCIONAR
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        alert("Error al crear usuario.");
        console.log(error);
      });
  }

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card ">
            <div className="card-body p-4">
              <h1 className="text-center">Registro</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  className="form-control mb-3"
                  id="nombre"
                  name="nombre"
                  required
                  maxLength="50"
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
                <EmailComponent value={email} setEmail={setEmail} />
                <ContraseñaComponent
                  es_confirmacion={false}
                  value={contraseña}
                  updateContraseña={setContraseña}
                />
                <ContraseñaComponent
                  es_confirmacion={true}
                  value={confirmacion_contraseña}
                  updateContraseña={setConfirmacionContraseña}
                />
                <PasswordChecklist
                  rules={["minLength", "match"]}
                  minLength={8}
                  value={contraseña}
                  valueAgain={confirmacion_contraseña}
                  onChange={(isValid) => {}}
                  messages={{
                    minLength: "La contraseña tiene más de 8 caracteres.",
                    match: "Las contraseñas coinciden.",
                  }}
                />
                <br></br>
                <div className="d-grid gap-2 ">
                  <button className="btn btn-primary" type="submit">
                    Registrar
                  </button>
                </div>
              </form>
              <div class="row mt-3">
                <div class="col-12 text-center">
                  <p class="text-muted">
                    ¿Ya tienes una cuenta?
                    <a href="login" class="text-muted ms-1">
                      <b>Iniciar sesión</b>
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
}
