import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Titulo from "./Titulo";

const Header = ({ user, setUser }) => {
  useEffect(() => {
    setFlagSesion(user);
  }, [user]);

  const history = useHistory();
  const [flagSesion, setFlagSesion] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(false);
    history.push("/iniciar-sesion");
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <Titulo>CRUD Mascotas</Titulo>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="navbarSupportedContent"
          className="collapse navbar-collapse ml-auto"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            {flagSesion ? (
              <li className="nav-link">
                <button
                  onClick={logOut}
                  style={{ background: "none", border: "none" }}
                >
                  Cerrar Sesion
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to={"/iniciar-sesion"}
                    className="nav-link"
                    aria-current="page"
                  >
                    Iniciar sesion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/registrarse"}
                    className="nav-link"
                    aria-current="page"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
