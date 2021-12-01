import React from "react";
import BotonNav from "./BotonNav";

const Navegador = ({ tipos }) => {
  return (
    <div className="col-10 bg-dark m-3 p-4 mx-auto d-flex justify-content-evenly rounded">
      {tipos.map((tipo) => {
        return <BotonNav key={tipo.id} tipo={tipo} />;
      })}
    </div>
  );
};

export default Navegador;
