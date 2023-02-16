const jwt = require('jsonwebtoken');
const db = require('../routes/db-config')
const bycrypt = require('bcryptjs');

const login = async(req,res) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.json({ status: "error", error: "please enter your all fill" })
    else{
       db.query("SELECT email FROM emplyee.emp_info WHERE email = ?",[email], async (Err, result) => {
            if (Err) throw Err;
            if(!result.length || !await bycrypt.compare(password, result[0].password)) return res.json(
                {
                    status:"error", error:"encorrect Email or password"
                }
            )
            else{
                const token = jwt.sign({id:result.id}, "SCERET_KEY", {
                    expiresIn: "2d",
                    httpOnly : true  
                })
                const cookiesOption = {
                    expiresIn: "2d",
                    httpOnly : true 
                }
                res.cookies("userRegistered", token, cookiesOption);
                return res.json({status:"success", success:"User has been LoggedIn"})
            }
       })
    }
}

module.exports = login