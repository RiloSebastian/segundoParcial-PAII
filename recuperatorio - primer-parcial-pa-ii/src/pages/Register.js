import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Register = () => {
  const history = useHistory();
  const URL = "http://localhost:5500/api/user/registro";
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
    registerUsuario();
  };

  const registerUsuario = () => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 401) {
            throw new Error();
          } else {
            return res.json();
          }  
      })
      .then((data) => {
        console.console.log(data);
        history.push("/iniciar-sesion");
      }).catch(err =>{
          alert("Ha ocurrido un error. cambie el nombre de usuario")
      });
  };

  return (
    <div className="col-6 m-auto">
      <form>
        <h1 className="h3 mb-3 text-center fw-normal">Registrarse</h1>
        <div className="p-2">
          <label htmlFor="floatingInput">nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
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
            className="mt-3 btn btn-lg btn-success w-100"
            onClick={handleSubmit}
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
