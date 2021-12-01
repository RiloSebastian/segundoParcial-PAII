import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Tipo = () => {
  const { descripcion } = useParams();
  const [mascotas, setmascotas] = useState([]);
  const [flag, setflag] = useState(false);
  const URL = "http://localhost:5500/api/mascotas";

  useEffect(() => {
    const getMascotas = async (url) => {
      try {
        setflag(false);
        const res = await fetch(url);
        const data = await res.json();
        data.forEach((mascota) => {
          setmascotas((mascotas) => {
            return data.filter((mascota) => mascota.tipo === descripcion);
          });
        });
        setflag(true);
      } catch (err) {}
    };

    getMascotas(URL);
  }, []);

  const renderResults = () => {
    return mascotas.length ? (
      mascotas.map((mascota) => <Card key={mascota.id} mascota={mascota} />)
    ) : (
      <h1>No hay resultados</h1>
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{flexGrow: 2}}
    >
      {flag ? (
        <>
          {renderResults()}
          <Link to={`/`}>
            <button type="button" className="btn btn-primary" style={{margin: "50px", width: "300px", height:"60px"}}>Volver A Menu Principal</button>
          </Link>{" "}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Tipo;
