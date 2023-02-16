
const express = require('express');
const loggedIn = require('../controllers/loggedIn')
const router = express.Router();

router.get('/', (req,res) =>{
    if(req.emplyee){
        res.render("index", {status:"LoggedIn", emplyee:req.emplyee})

    }else{
        res.render("index", {status:"no", emplyee:"nothing"})
    }
   
})

router.get('/register', (req,res) =>{
    res.sendFile("register.html",{root:"./public"})
})
router.get('/login', (req,res) =>{
    res.sendFile('login.html',{root:"./public"})
})

// app.get('/', (req, res) => {
//     let sql = "SELECT * FROM emplyee.emp_info";
//     connection.query(sql, function (err,result) {
//         if (err)
//             throw err;
//         res.send(result)

//     })

// })

module.exports = router;