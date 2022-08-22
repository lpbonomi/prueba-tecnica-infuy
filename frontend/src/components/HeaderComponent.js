import React from "react";
export const HeaderComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/transacciones/historial">
              Historial de Transacciones
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/transacciones/crear">
              Crear Transacción
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/usuarios/respaldo-clave">
              Respaldar Clave Privada{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/tokens/agregar">
              Agregar Token
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/usuarios/login">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
