import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";

const Login = ({ setUser }) => {
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
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Este usuario no existe");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data));
        setUser(true);
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setform({ username: "", password: "" });
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
            placeholder="usuario1"
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
            placeholder="1234"
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
