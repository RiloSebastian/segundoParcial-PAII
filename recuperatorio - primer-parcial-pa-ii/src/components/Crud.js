import React, { useEffect, useState } from "react";
import TablaMascotas from "./TablaMascotas";
import SelectTipos from "./SelectTipos";
import FormularioCrud from "./FormularioCrud";
import Spinner from "../components/Spinner";
import Navegador from "./Navegador";

const Crud = () => {
  const [mascotas, setmascota] = useState([]);
  const [mascotaEdit, setmascotaEdit] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [flag, setflag] = useState(false);
  const URL = "http://localhost:5500/api/mascotas";
  const URLTIPOS = "http://localhost:5500/api/tipos";

  useEffect(() => {
    const getMascotas = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        data.forEach((mascota) => {
          setmascota((mascotas) => {
            return [...mascotas, mascota];
          });
        });
        setflag(true);
      } catch (err) {}
    };

    const getTipos = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        data.forEach((tipo) => {
          setTipos((tipos) => {
            return [...tipos, tipo];
          });
        });
      } catch (err) {}
    };

    getMascotas(URL);
    getTipos(URLTIPOS);
  }, []);

  const createMascota = (nuevaMascota) => {
    console.log(nuevaMascota);
    setflag(false);
    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaMascota),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then((nuevaMascota) => {
        setmascota((mascotas) => [...mascotas, nuevaMascota]);
      })
      .catch((err) => {
        solicitarLogin();
      })
      .finally(() => setflag(true));
  };

  const updateMascota = (mascotaEditada) => {
    setflag(false);
    fetch(`${URL}/${mascotaEditada.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mascotaEditada),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then((mascotaEditada) => {
        console.log(mascotaEditada);
        setmascota((mascotas) => {
          return mascotas.map((mascota) =>
            mascota.id === mascotaEditada.id ? mascotaEditada : mascota
          );
        });
      })
      .catch(() => {
        solicitarLogin();
      })
      .finally(() => setflag(true));
  };

  const deleteMascota = (idMascota) => {
    if (
      window.confirm(
        "Confirma la eliminacion de la mascota '" + idMascota + "'?"
      )
    )
      setflag(false);
    fetch(`${URL}/${idMascota}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then((mascotaEditada) => {
        setmascota((mascotas) => {
          return mascotas.filter((mascota) => mascota.id !== idMascota);
        });
      })
      .catch(() => {
        solicitarLogin();
      })
      .finally(() => setflag(true));
  };

  const solicitarLogin = () => {
    alert("Debes estar logueado para realizar esta accion");
  };

  return (
    <div>
      <div className="p-3">
        <FormularioCrud
          tipos={tipos}
          createMascota={createMascota}
          updateMascota={updateMascota}
          mascotaEdit={mascotaEdit}
          setmascotaEdit={setmascotaEdit}
        ></FormularioCrud>
      </div>
      {flag ? (
        <>
          <div>
            <SelectTipos tipos={tipos} />
            <Navegador tipos={tipos} />
          </div>
          <div>
            <TablaMascotas
              mascotas={mascotas}
              setmascotaEdit={setmascotaEdit}
              deleteMascota={deleteMascota}
            />
          </div>
        </>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Crud;
