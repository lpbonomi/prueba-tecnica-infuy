import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

export const ChainSelectorComponent = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor="chainId" className="form-label">
        Chain Id
      </label>
      <CreatableSelect
        id="chain_selector"
        isClearable
        onChange={(eleccion) => {
          props.setChainId(eleccion.value);
          props.handleChainChange(eleccion.value);
        }}
        options={[
          { value: 1, label: "mainnet" },
          { value: 3, label: "ropsten" },
          { value: 4, label: "rinkeby" },
          { value: 5, label: "goerli" },
          { value: 11155111, label: "sepolia" },
          { value: 2018, label: "dev" },
          { value: 61, label: "classic" },
          { value: 63, label: "mordor" },
          { value: 6, label: "kotti" },
          { value: 212, label: "astor" },
        ]}
        placeholder="Para utilizar otra red sólo escriba su id"
      />
    </div>
  );
};
