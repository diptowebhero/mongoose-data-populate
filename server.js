//dependencies
const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routeHandler/usersRoute");

//app initialize
const app = express();

//middleware
app.use(express.json());
require("dotenv").config();
app.use("/user", usersRoute);

//connect mongoose
mongoose
  .connect(process.env.DB_CONNECTION_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running successfully");
    })
  )
  .catch((error) => console.log(error));
