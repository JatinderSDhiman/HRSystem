const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");

// Instantiating the app
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// connecting to Mongo Database
require("./database/connection");

// Middleware
app.use(cors());
app.use(express.json());

// Adding Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Starting the Server
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}...`);
});
