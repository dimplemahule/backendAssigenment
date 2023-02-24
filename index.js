const express = require('express');
const cookise = require('cookie-parser')
var db = require('./routes/db-config')

const PORT = process.env.PORT || 5000 

const app = express();



app.use(express.urlencoded({ extended: false }));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookise());
app.use(express.json());

app.use("/", require("./routes/pages"))
app.use("/api", require("./controllers/auth"))

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Database connected')
    }
})

app.listen(PORT, () => {
    console.log('App listening on the port 5000');

})
