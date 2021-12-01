import React from "react";
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
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mascotas/:id" component={Detalle} />
        <Route path="/tipos/:descripcion" component={Tipo} />
        <Route path="/iniciar-sesion" component={Login} />
        <Route path="/registrarse" component={Register} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
