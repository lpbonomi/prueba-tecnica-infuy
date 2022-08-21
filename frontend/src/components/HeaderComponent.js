import React from "react";
export const HeaderComponent = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/transacciones/historial">
              Historial de Transacciones
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/transacciones/crear">
              Crear Transacción
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/usuarios/respaldo-clave">
              Respaldar Clave Privada{" "}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/usuarios/logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
