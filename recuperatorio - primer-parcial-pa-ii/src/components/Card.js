import React from "react";

const Card = ({ mascota }) => {
  const { nombre, edad, tipo, vacunado, observaciones } = mascota;
  return (
    <div className="card bg-dark text-white rounded shadow mx-auto mt-5 col-10">
      <div className="card-body p-3 fs-1 text-center">
        <p> Nombre: {nombre}</p>
        <p>Tipo: {tipo}</p>
        <p>Edad: {edad} </p>
        <p>Vacunado: {vacunado ? <i>Si</i> : <i>No</i>} </p>
        <p className="card-text">Observaciones: {observaciones}</p>
      </div>
    </div>
  );
};

export default Card;
