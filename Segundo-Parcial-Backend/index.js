require("./db/mongo");
const express = require("express");
const { PORT } = require("./utils/config");
const cors = require("cors");
const { handlerNotFound, handlerError } = require("./utils/middlewares");
const mascotasRouter = require("./routes/mascotasRouter");
const tiposRouter = require("./routes/tiposRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Servidor Mascotas</h1>");
});

app.use("/api/mascotas", mascotasRouter);
app.use("/api/tipos", tiposRouter);
app.use("/api/user", usersRouter);


app.use(handlerNotFound);

app.use(handlerError);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
