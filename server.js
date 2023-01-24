import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import usersRoutes from "./routes/products.js";

//Data
const port = 4004;
const app = express();

//using middler wares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/product", usersRoutes);
app.use(express.static("./public"));

//Connecting to the MongoDB
const name = "sameer";
const password = "Dragon";
const dataBase = "products";
const url = `mongodb+srv://${name}:${password}@cluster0.trfqbgz.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

//the starting the server
app.listen(port, () => {
  console.log("The server is started running.");
});
