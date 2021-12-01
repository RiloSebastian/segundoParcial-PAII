import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Detalle from "./pages/Detalle";
import Tipo from "./pages/Tipo";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

function App() {
  useEffect(() => {
    localStorage.getItem("token") !== null ? setuser(true) : setuser(false);
  }, []);

  const [user, setuser] = useState(false);

  return (
    <Router>
      <Header user={user} setUser={setuser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mascotas/:id" component={Detalle} />
        <Route path="/tipos/:descripcion" component={Tipo} />
        <Route
          path="/iniciar-sesion"
          render={() => <Login setUser={setuser} />}
        />
        <Route path="/registrarse" component={Register} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
