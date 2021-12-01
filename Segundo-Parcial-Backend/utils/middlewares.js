const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const handlerNotFound = (req, res) => {
  res.status(200).json({ ok: false, message: "No existe esa pagina" }).end();
};

const handlerError = (error, req, res, next) => {
  console.log(error.name + "\n" + error.message);
  if (error.name === "CastError") {
    res.status(400).json({ error: "ID Invalido" });
  } else if (error.name === "SyntaxError") {
    res.status(400).json({ error: "Error de sintaxis" });
  } else if (error.name === "ReferenceError") {
    res.status(401).json({ error: error.name, message: error.message });
  } else if (error.name === "MongoError") {
    res.status(401).json({ error: error.name, message: error.message });
  } else if (error.name === "ValidationError") {
    res.status(400).json({ error: error.name, message: error.message });
  } else if (error.name === "ErrorToken") {
    res.status(401).json({ error: error.name, message: error.message });
  } else if (error.name === "JsonWebTokenError") {
    res.status(400).json({ error: error.name, message: error.message });
  } else if (error.name === "TokenExpiredError") {
    res.status(400).json({ error: error.name, message: error.message });
  } else if (error.name === "MongoServerError") {
    res
      .status(400)
      .json({ error: error.name, message: "este usuario ya existe" });
  } else {
    res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  console.log(req.headers);
  if (typeof bearerToken !== "undefined") {
    req.token = bearerToken.split(" ")[1];
    try {
      const data = await jwt.verify(req.token, SECRET);
      console.log(data);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({ name: "ErrorToken", message: "No Token" });
  }
};

module.exports = {
  handlerNotFound,
  handlerError,
  verifyToken,
};
