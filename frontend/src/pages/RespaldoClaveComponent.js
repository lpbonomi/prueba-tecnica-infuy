import React, { useState } from "react";
import { esClaveValida, enciptarClave } from "../utils/utils";
import { getJwt } from "../reducers/auth";

export const RespaldoClaveComponent = (props) => {
  const [clave, setClave] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!esClaveValida(clave)) {
      alert("La clave no es válida");
      return;
    }

    const clave_encriptada = enciptarClave(clave);

    fetch("http://localhost:9000/usuarios", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(props.store.getState()),
      },
      body: JSON.stringify({
        usuario: {
          clave: clave_encriptada,
        },
      }),
    })
      .then(function (response) {
        //REDIRECCIONAR
        console.log(response);
      })
      .catch(function (error) {
        alert("Error al guardar clave.");
        console.log(error);
      });
  }

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card ">
            <div className="card-body p-4">
              <h1 className="text-center">Guardar Clave Privada</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="clave" className="form-label">
                  Clave
                </label>
                <input
                  className="form-control mb-3"
                  id="clave"
                  name="clave"
                  required
                  onChange={(e) => setClave(e.target.value)}
                ></input>
                <div className="d-grid gap-2 ">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="registro"
                  >
                    Guardar
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
