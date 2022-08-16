import React, { useState } from "react";

export function ContraseñaComponent(props) {
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  function toggleContraseña() {
    setMostrarContraseña(!mostrarContraseña);
  }

  return (
    <div className="mb-3">
      <label
        htmlFor={
          props.es_confirmacion ? "confirmacion_contraseña" : "contraseña"
        }
        className="form-label"
      >
        {props.es_confirmacion ? "Confirmar contraseña" : "Contraseña"}
      </label>

      <div className="input-text">
        <input
          id={props.es_confirmacion ? "confirmacion_contraseña" : "contraseña"}
          className="form-control"
          type={mostrarContraseña ? "text" : "password"}
          onChange={(e) => props.updateContraseña(e.target.value)}
          value={props.value}
          name="password"
          style={{ display: "inline-block", width: "81%" }}
        />
        <button
          className="btn btn-outline-primary col-2"
          onClick={toggleContraseña}
          style={{ margin: "0 0 1% 2%" }}
          type="button"
        >
          {mostrarContraseña ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </button>
      </div>
    </div>
  );
}
