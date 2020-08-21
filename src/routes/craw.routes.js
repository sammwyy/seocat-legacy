const craw = require('craw');
const validator = require('validator');
const express = require('express');

const Router  = express.Router();

Router.post("/api/craw", async (req, res) => {
    let url = req.body.url || "";
    if (!validator.isURL(url)) {
        return res.json({ success: false, url, error: "URL_INVALID" });
    }
  
  console.log(url);

    let result = await craw(url);
    if (result != null) {
        return res.json({
            success: true,
            url,
            result
        })
    } else {
        return res.json({ success: false, url, error: "UNKNOWN_ERROR"})
    }
});

module.exports = Router;