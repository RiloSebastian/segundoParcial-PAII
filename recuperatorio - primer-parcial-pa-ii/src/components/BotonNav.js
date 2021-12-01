import React from "react";
import { Link } from "react-router-dom";

const BotonNav = ({ tipo }) => {
  const { descripcion } = tipo;
  return (
    <Link to={`tipos/${descripcion}`}>
      <button className="btn btn-primary btn-lg">{descripcion}</button>
    </Link>
  );
};

export default BotonNav;
