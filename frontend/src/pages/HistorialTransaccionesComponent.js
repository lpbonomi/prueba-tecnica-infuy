import { getPublicAddress } from "../utils/utils";
import { getClavePrivada } from "../reducers/blockchain";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function HistorialTransaccionesComponent(props) {
  const [filas, setFilas] = useState([]);
  const [itemsPaginator, setItemsPaginator] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const clave_privada = getClavePrivada(props.store.getState());
  const address = getPublicAddress(clave_privada);

  const etherscanProvider = new ethers.providers.EtherscanProvider(
    "goerli",
    process.env.REACT_APP_ETHERSCAN_API_KEY
  );

  var history = [];
  var pages = 0;
  useEffect(() => {
    async function getHistory() {
      history = await etherscanProvider.getHistory(address);
      console.log(history);
      const pagina = searchParams.get("page");
      populateTableAndPaginator(pagina ? pagina : 1);
    }
    getHistory();
  }, []);

  function populateTableAndPaginator(pagina) {
    const transacciones_por_pagina = 10;
    const cantidad_de_transacciones = history.length;
    const cantidad_de_paginas = Math.ceil(
      cantidad_de_transacciones / transacciones_por_pagina
    );

    const filas_de_pagina_actual = history.slice(
      (pagina - 1) * transacciones_por_pagina,
      pagina * transacciones_por_pagina
    );

    populateTable(filas_de_pagina_actual);
    populatePaginator(pagina, cantidad_de_paginas);
  }
  function populateTable(filas_de_pagina_actual) {
    setFilas(
      filas_de_pagina_actual.map((tx) => (
        <tr>
          <td
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <a>{tx.hash}</a>
          </td>
          <td
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {tx.blockNumber}
          </td>
          {/* <td>{tx.timestamp}</td> */}
          <td
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {tx.from}
          </td>
          <td
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {tx.to}
          </td>
          <td
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {tx.value.toString()}
          </td>
          {/* <td>{tx.hash}</td> */}
        </tr>
      ))
    );
  }

  function populatePaginator(currentPage, numberOfPages) {
    var items = [];
    for (var i = 1; i <= numberOfPages; i++) {
      if (i == currentPage) {
        items.push(
          <li className="page-item active">
            <a className="page-link" href={"?page=" + i}>
              {i} <span className="sr-only">(current)</span>
            </a>
          </li>
        );
      } else {
        items.push(
          <li className="page-item">
            <a className="page-link" href={"?page=" + i}>
              {i} <span className="sr-only"></span>
            </a>
          </li>
        );
      }
    }
    setItemsPaginator(items);
  }
  //   console.log(history);
  //   const number_of_transactions = history.length;

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div className="row justify-content-center">
        <div className="col-11">
          <div className="card ">
            <div className="card-body p-4">
              <h1 className="text-center">Historial de Transacciones</h1>
              <table className="table" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th scope="col">Txn Hash</th>
                    <th scope="col">Block</th>
                    {/* <th scope="col">Age</th> */}
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Value</th>
                    {/* <th scope="col">Txn Fee</th> */}
                  </tr>
                </thead>
                <tbody>{filas}</tbody>
              </table>

              <nav aria-label="...">
                <ul className="pagination justify-content-center">
                  {itemsPaginator}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
