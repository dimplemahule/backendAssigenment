const db = require('../routes/db-config')
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    if (!req.cookies.userRegistered) return next();
    try{
        const decoded = jwt.verify(req.cookies.userRegistered, "SCRETE-KEY");
        db.query("SELECT * FROM emplyee.emp_info WHERE id=?", [decoded.id], (err,result) =>{
            if(err) return next();
            req.emplyee = result[0];
            return next();
        }   )

    }catch(err){
        if(err) return next()
    }
        
}

module.exports = isLoggedIn