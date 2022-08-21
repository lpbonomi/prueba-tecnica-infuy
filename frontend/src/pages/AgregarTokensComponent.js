import React, { useState } from "react";
import { ethers } from "ethers";
import { ChainSelectorComponent } from "../components/ChainSelectorComponent";
import { getJwt } from "../reducers/auth";

export const AgregarTokensComponent = (props) => {
  const [address, setAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(18);
  const [chainId, setChainId] = useState(5); // GOERLI

  async function handleSubmit(event) {
    event.preventDefault();

    const es_address = ethers.utils.isAddress(address);
    if (!es_address) {
      alert("La dirección del Token no es válida.");
      return;
    }

    fetch("http://localhost:9000/tokens/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(props.store.getState()),
      },
      body: JSON.stringify({
        token: {
          chainId: chainId,
          address: address,
          symbol: symbol,
          decimals: decimals,
        },
      }),
    })
      .then(async function (response) {
        props.store.dispatch({
          type: "tokens/save",
          payload: {
            chainId: chainId,
            address: address,
            symbol: symbol,
            decimals: decimals,
          },
        });

        alert("Token creado con éxito.");
      })
      .catch(function (error) {
        console.log(error);
        alert("Error al guardar Token.");
      });
  }

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card ">
            <div className="card-body p-4">
              <h1 className="text-center">Agregar Token</h1>
              <form onSubmit={handleSubmit}>
                <ChainSelectorComponent
                  value={chainId}
                  setChainId={setChainId}
                />
                <label htmlFor="address" className="form-label">
                  Dirección del Token
                </label>
                <input
                  className="form-control mb-3"
                  id="address"
                  name="address"
                  required
                  maxLength="42"
                  minLength="42"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>

                <label htmlFor="symbol" className="form-label">
                  Símbolo
                </label>
                <input
                  className="form-control mb-3"
                  id="symbol"
                  name="symbol"
                  required
                  maxLength={11}
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                ></input>
                <label htmlFor="decimals" className="form-label">
                  Decimales
                </label>
                <input
                  className="form-control mb-3"
                  id="decimals"
                  name="decimals"
                  required
                  value={decimals}
                  onChange={(e) => setDecimals(e.target.value)}
                ></input>
                <div className="d-grid gap-2 ">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="enviar_tx"
                  >
                    Agregar Token
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
