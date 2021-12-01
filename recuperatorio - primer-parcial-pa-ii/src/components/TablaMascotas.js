import React from "react";
import ItemTablaMascota from "./ItemTablaMascota";

const TablaMascotas = ({mascotas, setmascotaEdit, deleteMascota}) => {
  return (
    <div className="col-10 mx-auto mt-3">
      <h1>Mascotas</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Edad</th>
            <th scope="col">Vacunado</th>
            <th scope="col">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <ItemTablaMascota key={mascota.id} mascota={mascota} setmascotaEdit={setmascotaEdit} deleteMascota={deleteMascota}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMascotas;
