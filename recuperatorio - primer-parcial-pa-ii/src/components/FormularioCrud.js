import React, { useEffect, useState } from "react";

const initialForm = {
  id: "",
  nombre: "",
  edad: 0,
  observaciones: "",
  tipo: "",
  vacunado: false,
};

const FormularioCrud = ({
  tipos,
  createMascota,
  updateMascota,
  mascotaEdit,
  setmascotaEdit,
}) => {
  const [form, setform] = useState(initialForm);

  const { id, nombre, edad, tipo, vacunado, observaciones } = form;

  useEffect(() => {
    if (mascotaEdit) {
      setform(mascotaEdit);
    }
  }, [mascotaEdit]);

  const handleChange = (e) => {
    setform((form) => {
      let x = e.target.value;
      if (e.target.name === "vacunado" || e.target.name === "edad") {
        x = JSON.parse(e.target.value);
      }
      return { ...form, [e.target.name]: x };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !edad || !observaciones || !tipo) {
      alert("faltan Datos");
      return;
    }
    if (id) {
      updateMascota(form);
    } else {
      createMascota(form);
    }
    handleReset();
  };

  const handleReset = () => {
    setform(initialForm);
    setmascotaEdit(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-10 p-2 mx-auto bg-light rounded"
    >
      <div className="p-1">
        <input
          className="form-control"
          type="text"
          name="nombre"
          placeholder="Nombre"
          autoComplete="off"
          onChange={handleChange}
          value={nombre}
        />
      </div>
      <div className="p-1">
        <input
          className="form-control"
          type="number"
          name="edad"
          min={1}
          max={20}
          placeholder="Edad"
          autoComplete="off"
          onChange={handleChange}
          value={edad}
        />
      </div>
      <div className="p-1">
        <select
          className="form-select"
          name="tipo"
          placeholder="Tipo"
          onChange={handleChange}
          value={tipo}
        >
          <option key={-1} disabled value="">
            Tipo
          </option>
          {tipos.map((tipo) => {
            return (
              <option key={tipo.id} value={tipo.descripcion}>
                {tipo.descripcion}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-6 p-1 text-start">
        <label className="me-3">Vacunado</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            id="radioVacunado1"
            type="radio"
            name="vacunado"
            value={true}
            onChange={handleChange}
            checked={vacunado === true}
          />
          <label className="form-check-label" htmlFor="radioVacunado1">
            Si
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            id="radioVacunado2"
            type="radio"
            name="vacunado"
            value={false}
            checked={vacunado === false}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="radioVacunado2">
            No
          </label>
        </div>
      </div>
      <div className="p-1">
        <input
          className="form-control"
          type="text"
          name="observaciones"
          placeholder="Observaciones"
          autoComplete="off"
          onChange={handleChange}
          value={observaciones}
        />
      </div>
      <div className="p-1 d-grid gap-2">
        <input type="submit" className="btn btn-success" value="Enviar" />
        <input
          type="reset"
          className="btn btn-danger"
          onClick={handleReset}
          value="Limpiar"
        />
      </div>
    </form>
  );
};

export default FormularioCrud;
