const request = require('request');
const validator = require('validator');
const express = require('express');

const Router  = express.Router();

Router.get("/api/pipe", async (req, res) => {
  let url = req.query.url || "";
  if (!validator.isURL(url)) {
    return res.end();
  }
  request.get(url).pipe(res);
});

module.exports = Router;