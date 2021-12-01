import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
const Detalle = () => {
  const [mascota, setmascota] = useState({});
  const [flag, setflag] = useState(false);
  const URL = "http://localhost:5500/api/mascotas";
  const { id } = useParams();

  useEffect(() => {
    const getMascotas = async (url) => {
      try {
        setflag(false);
        const res = await fetch(`${url}/${id}`);
        const data = await res.json();
        setmascota(data);
        setflag(true);
      } catch (err) {}
    };

    getMascotas(URL);
  }, [id]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center p-3"
      style={{ flexGrow: 2 }}
    >
      {flag ? (
        <>
          <Card mascota={mascota} />
          <Link to={`/`}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ margin: "50px", width: "300px", height: "60px" }}
            >
              Volver A Menu Principal
            </button>
          </Link>{" "}
        </>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Detalle;
