import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { getTokens, getClavePrivada } from "../reducers/blockchain";
import { getPublicAddress } from "../utils/utils";
import { ethers } from "ethers";

const abi = require("../erc20_abi.json");
export function BalanceTokensComponent(props) {
  const [filas, setFilas] = useState([]);

  const clave_privada = getClavePrivada(props.store.getState());
  const address = getPublicAddress(clave_privada);
  const provider = ethers.providers.getDefaultProvider("goerli");

  var tokens = getTokens(props.store.getState(), 5); // GOERLI

  const getBalances = async (tokens) => {
    const eth = await provider.getBalance(address);
    setFilas((filas) => [
      ...filas,
      <tr>
        <td>ETH</td>
        <td>{ethers.utils.formatEther(eth)}</td>
      </tr>,
    ]);

    tokens.forEach(async (token) => {
      const contract = new Contract(token.address, abi, provider);
      const balance = await contract.balanceOf(address);
      setFilas((filas) => [
        ...filas,
        <tr>
          <td>{token.symbol}</td>
          <td>{balance.toString()}</td>
        </tr>,
      ]);
    });
  };

  useEffect(() => {
    setFilas(() => []);
    getBalances(tokens);
  }, []);

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card ">
            <div className="card-body p-4">
              <h1 className="text-center">Balances</h1>
              <table className="table" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th scope="col">Símbolo</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody>{filas}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
