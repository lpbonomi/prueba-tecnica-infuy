import React, { useState } from "react";
import { ethers, Wallet } from "ethers";
import { getClavePrivada } from "../reducers/blockchain";
import { getNonce } from "../reducers/blockchain";
import { ChainSelectorComponent } from "../components/ChainSelectorComponent";

export const SignSendTransactionComponent = (props) => {
  const [gasPrice, setGasPrice] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const from = "asdads"; //get PUBLIC address
  const [recipient, setRecipient] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState("0"); //despues
  const [chainId, setChainId] = useState(5); // GOERLI

  async function handleChainChange(chainId) {
    console.log(chainId);
    const provider = new ethers.providers.getDefaultProvider("goerli");
    setGasPrice(await provider.getGasPrice());
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const es_address = ethers.utils.isAddress(recipient);
    if (!es_address) {
      alert("La dirección del destinatario no es válida.");
      return;
    }

    const provider = new ethers.providers.getDefaultProvider("goerli");

    setGasPrice(await provider.getGasPrice());
    const clave_privada = getClavePrivada(props.store.getState());
    const signer = new ethers.Wallet(clave_privada, provider);

    var nonce = getNonce(props.store.getState(), chainId);

    if (!nonce) {
      nonce = await provider.getTransactionCount(signer.address);
    }

    //   ethers.utils.hexlify()    puede ser util
    const tx = {
      from: signer.address,
      to: recipient,
      value: ethers.utils.parseUnits("0.001", "ether"), //wei
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      nonce: nonce,
    };

    const transaction = await signer.sendTransaction(tx);

    if (true) {
      props.store.dispatch({
        type: "nonce/save",
        payload: { network: chainId, nonce: nonce + 1 },
      });
    }

    console.log(transaction);
  }

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card ">
            <div className="card-body p-4">
              <h1 className="text-center">Crear Transacción</h1>
              <form onSubmit={handleSubmit}>
                <ChainSelectorComponent
                  value={chainId}
                  setChainId={setChainId}
                  handleChainChange={handleChainChange}
                  setGasPrice={setGasPrice}
                />
                <label htmlFor="destinatario" className="form-label">
                  Destinatario
                </label>
                <input
                  className="form-control mb-3"
                  id="destinatario"
                  name="destinatario"
                  required
                  maxLength="42"
                  minLength="42"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                ></input>

                <label htmlFor="value" className="form-label">
                  Value
                </label>
                <input
                  className="form-control mb-3"
                  id="value"
                  name="value"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                ></input>
                <label htmlFor="gas_price" className="form-label">
                  Precio del Gas
                </label>
                <input
                  className="form-control mb-3"
                  id="gas_price"
                  name="gas_price"
                  required
                  value={gasPrice}
                  onChange={(e) => setGasPrice(e.target.value)}
                ></input>

                <label htmlFor="gas_limit" className="form-label">
                  Límite de Gas
                </label>
                <input
                  className="form-control mb-3"
                  id="gas_limit"
                  name="gas_limit"
                  required
                  value={gasLimit}
                  onChange={(e) => setGasLimit(e.target.value)}
                ></input>
                <div className="d-grid gap-2 ">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="enviar_tx"
                  >
                    Firmar y Enviar
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
