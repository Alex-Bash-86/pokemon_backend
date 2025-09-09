import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

import cors from "cors";
import mongoose from "mongoose";
import path from "path";

connectDB();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
//express version greater than v4.16
/* sets up the middleware to parse incoming JSON data in the request body. This is necessary for handling POST, PUT, or PATCH requests that send JSON data */
app.use(express.json());
/*sets up the middleware to parse incoming URL-encoded data in the request body with the querystring library ( extended:false)*/
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cookieParser());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port port!`);
});
