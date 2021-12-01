const express = require("express");
const mascotasRouter = express.Router();
const Mascota = require("../models/mascota");
const { verifyToken } = require("../utils/middlewares");

//traer todos
mascotasRouter.get("/", (req, res, next) => {
  Mascota.find({})
    .then((mascotas) => {
      res.json(mascotas);
    })
    .catch((err) => {
      next(err);
    });
});

//traer uno
mascotasRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Mascota.findById(id)
    .then((mascota) => {
      if (mascota) {
        res.status(200).json(mascota);
      }
      res.status(400).end();
    })
    .catch((err) => {
      next(err);
    });
});

//borrar uno
mascotasRouter.delete("/:id", verifyToken, (req, res, next) => {
  const id = req.params.id;
  Mascota.findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result).end();
      }
      res.status(400).end();
    })
    .catch((err) => {
      next(err);
    });
});

//crear uno
mascotasRouter.post("/", verifyToken, (req, res, next) => {
  const { nombre, edad, tipo, observaciones, vacunado } = req.body;
  console.log(req.body);
  if (nombre && edad && tipo && observaciones && vacunado != undefined) {
    const nuevamascota = new Mascota({
      nombre,
      edad,
      tipo,
      vacunado,
      observaciones,
    });
    nuevamascota
      .save()
      .then((mascota) => {
        if (mascota) {
          res.status(200).json(mascota).end();
        }
        res.status(400).end();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(400).json({ ok: false, error: "Parametros invalidos" });
  }
});

//modificar uno
mascotasRouter.put("/:id", verifyToken, (req, res, next) => {
  const id = req.params.id;
  const { nombre, edad, observaciones, tipo, vacunado } = req.body;
  const infomascota = { nombre, edad, tipo, vacunado, observaciones };
  Mascota.findByIdAndUpdate(id, infomascota, { new: true })
    .then((mascota) => {
      if (mascota) {
        res.status(200).json(mascota);
      }
      res.status(400).end();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = mascotasRouter;
