const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.render("index");
})

Router.get("/result", (req, res) => {
  res.render("result");
})

Router.all("*", (req, res) => {
    res.end("404");
});

module.exports = Router;