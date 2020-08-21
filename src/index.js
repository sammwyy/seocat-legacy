process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* Settings */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/assets", express.static(__dirname + "/public"));

/* Routes */
app.use(require("./routes/craw.routes.js"));
app.use(require("./routes/pipe.routes.js"));
app.use(require("./routes/default.routes.js"));

/* Listener */
app.listen(process.env.PORT || 80);