require("dotenv").config();
import cors from "cors";
import express = require("express");
import { json, urlencoded } from "body-parser";
import router from "./routes";

// Create a new express app instance
const app: express.Application = express();

// Enable CORS
app.use(cors());

// Parses incoming requests as JSON if parsable
app.use(json());
app.use(urlencoded({ extended: true }));

// Associate router with application
app.use("/", router);

const database = require("./database.js");

module.exports = app;
