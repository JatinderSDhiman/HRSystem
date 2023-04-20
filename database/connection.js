const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const MONGO_URI = process.env.DATABASE;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to Mongo Atlas.`))
  .catch((err) => {
    console.log(`Connection failed due to error. ${err}`);
  });
