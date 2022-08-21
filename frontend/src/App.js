import "./App.css";
import { RegistroComponent } from "./pages/RegistroComponent";
import { LoginComponent } from "./pages/LoginComponent";
import { RespaldoClaveComponent } from "./pages/RespaldoClaveComponent";
import { SignSendTransactionComponent } from "./pages/SignSendTransactionComponent";
import { HistorialTransaccionesComponent } from "./pages/HistorialTransaccionesComponent";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { LayoutComponent } from "./components/LayoutComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="usuarios">
              <Route path="login" element={<LoginComponent store={store} />} />
              <Route path="registro" element={<RegistroComponent />} />
              <Route
                path="respaldo-clave"
                element={
                  <LayoutComponent>
                    <RespaldoClaveComponent store={store} />
                  </LayoutComponent>
                }
              />
            </Route>
            <Route path="transacciones">
              <Route
                path="crear"
                element={
                  <LayoutComponent>
                    <SignSendTransactionComponent store={store} />
                  </LayoutComponent>
                }
              />
              <Route
                path="historial"
                element={
                  <LayoutComponent>
                    <HistorialTransaccionesComponent store={store} />
                  </LayoutComponent>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Página no encontrada!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
