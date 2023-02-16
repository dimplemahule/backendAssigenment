const express = require('express');
const mysql = require('mysql');
const cookise = require('cookie-parser')
const app = express();
var db = require('./routes/db-config')
app.use(cookise());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/js",express.static(__dirname + "./public/js"));
app.use("/css",express.static(__dirname + "./public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/pages"))
app.use("/api", require("./controllers/auth"))

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Database connected')
    }
})

app.listen(3000, () => {
    console.log('App listening on the port 3000');
    
})
