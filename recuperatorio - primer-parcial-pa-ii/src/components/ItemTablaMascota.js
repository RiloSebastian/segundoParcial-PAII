import React from "react";
import { Link } from "react-router-dom";

const ItemTablaMascota = ({ mascota, setmascotaEdit, deleteMascota }) => {
  const { id, nombre, edad, tipo, vacunado, observaciones } = mascota;

  const handleEdit = () => {
    setmascotaEdit(mascota);
  };

  const handleBorrar = () => {
    deleteMascota(id);
  };

  return (
    <tr className="item-tabla">
      <th scope="row">{id}</th>
      <td>{nombre}</td>
      <td>{tipo}</td>
      <td>{edad}</td>
      {vacunado ? <td>Si</td> : <td>No</td>}
      <td>{observaciones}</td>
      <td>
        <div className="btn-group">
          <Link to={`/mascotas/${id}`}>
            <button className="btn btn-primary">
              Detalles
            </button>
          </Link>
          <button className="btn btn-warning" onClick={handleEdit}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={handleBorrar}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTablaMascota;
