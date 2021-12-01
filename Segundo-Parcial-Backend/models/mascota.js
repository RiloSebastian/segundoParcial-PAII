const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const mascotaSchema = new Schema({
  nombre: String,
  edad: Number,
  tipo: String,
  vacunado: Boolean,
  observaciones: String,
});

mascotaSchema.set("toJSON", {
  transform: (document, mascotaToJson) => {
    mascotaToJson.id = mascotaToJson._id.toString();
    delete mascotaToJson._id;
    delete mascotaToJson.__v;
  },
});

module.exports = model("mascota", mascotaSchema);
