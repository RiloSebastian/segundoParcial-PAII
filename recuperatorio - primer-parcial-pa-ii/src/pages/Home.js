import React from "react";
import Crud from "../components/Crud";
import "../App.css";

const Home = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{flexGrow: 2}}>
      <Crud />
    </div>
  );
};

export default Home;
