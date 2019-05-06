const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const bodyParser = require("body-parser");

const register = require("./controllers/register");
const signin = require("./controllers/signin");

//Database Setup
const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan("combined"));
app.use(cors("*"));
app.use(bodyParser.json());

app.post("/signin", signin.signinAuthentication(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});
