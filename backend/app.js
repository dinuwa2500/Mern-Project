const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/DeliveryRoutes");

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
app.use("/deliveries", router);


mongoose
  .connect("mongodb+srv://admin:1234@cluster0.zqpqa.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
