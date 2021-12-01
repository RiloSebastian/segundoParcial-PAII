const express = require("express");
const tiposRouter = express.Router();
const Tipo = require("../models/tipo");
const {verifyToken} = require('../utils/middlewares');

//traer todos
tiposRouter.get("/", (req, res, next) => {
  Tipo.find({})
    .then((tipos) => {
      res.json(tipos);
    })
    .catch((err) => {
      next(err);
    });
});

//traer uno
tiposRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Tipo.findById(id)
    .then((tipo) => {
      if (tipo) {
        res.json(tipo);
      }
      res.status(400).end();
    })
    .catch((err) => {
      next(err);
    });
});

//borrar uno
tiposRouter.delete("/:id",verifyToken, (req, res, next) => {
  const id = req.params.id;
  Tipo.findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      }
      res.status(400).end();
    })
    .catch((err) => {
      next(err);
    });
});

//crear uno
tiposRouter.post("/",verifyToken, (req, res, next) => {
  const { descripcion } = req.body;
  console.log(req.body);
  if (descripcion) {
    const nuevatipo = new Tipo({
      descripcion
    });
    nuevatipo
      .save()
      .then((tipo) => {
        if (tipo) {
          res.status(201).json(tipo).end();
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
tiposRouter.put("/:id",verifyToken, (req, res, next) => {
  const id = req.params.id;
  const { descripcion } = req.body;
  const infotipo = { descripcion };
  Tipo.findByIdAndUpdate(id, infotipo, { new: true })
    .then((tipo) => {
      if (tipo) {
        res.json(tipo);
      }
      res.status(400).end();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = tiposRouter;
