import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";

const Login = () => {
  const history = useHistory();
  const URL = "http://localhost:5500/api/user/login";
  const [form, setform] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const handleChange = ({ target }) => {
    setform(() => {
      return { ...form, [target.name]: target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Faltan Datos");
      return;
    }
    loginUsuario();
  };

  const loginUsuario = () => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data));
        history.push("/");
      });
  };

  return (
    <div className="col-6 m-auto">
      <form>
        <h1 className="h3 mb-3 text-center fw-normal">Iniciar Sesion</h1>
        <div className="p-2">
          <label htmlFor="floatingInput">nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="usuario1_ejemplo"
            name="username"
            autoComplete="off"
            onChange={handleChange}
            value={username}
          />
        </div>
        <div className="p-2">
          <label htmlFor="floatingPassword">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Contraseña"
            autoComplete="off"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div className="p-2">
          <button
            className="mt-3 btn btn-lg btn-primary w-100"
            onClick={handleSubmit}
          >
            Iniciar Sesion
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
