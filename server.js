"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var cors_1 = __importDefault(require("cors"));
var express = require("express");
var body_parser_1 = require("body-parser");
var routes_1 = __importDefault(require("./routes"));
// Create a new express app instance
var app = express();
// Enable CORS
app.use(cors_1.default());
// Parses incoming requests as JSON if parsable
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
// Associate router with application
app.use("/", routes_1.default);
var database = require("./database.js");
module.exports = app;
