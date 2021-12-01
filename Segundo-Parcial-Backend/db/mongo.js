const { connect } = require("mongoose");
const { DB_URI } = require("../utils/config");

const connectarDb = async () => {
  connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

connectarDb()
  .then((result) => {
    console.log("DB Conectada");
  })
  .catch((err) => {
    console.log(err);
  });
