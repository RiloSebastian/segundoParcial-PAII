const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const tipoSchema = new Schema({
  descripcion: String,
});

tipoSchema.set("toJSON", {
  transform: (document, tipoToJson) => {
    tipoToJson.id = tipoToJson._id.toString();
    delete tipoToJson._id;
    delete tipoToJson.__v;
  },
});

module.exports = model("tipo", tipoSchema);
