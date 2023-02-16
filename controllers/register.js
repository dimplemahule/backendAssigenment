const db = require('../routes/db-config');
const bycrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, password: Npassword } = req.body;
    if (!email || !Npassword ) {
        return res.json({ status: "error", error: "please enter your all fill" })
    } else {
        console.log(email)
        db.query("SELECT email FROM emplyee.emp_info WHERE email=?",[email], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "Email has already been exist" })
            else {
                console.log(password)
                const password = await bycrypt.hash(Npassword, 8) //
                db.query("INSERT INTO emplyee.emp_info SET ? ", { email: email, password: password }, (error,results) =>{
                    if (error) throw error;
                    return res.json({status:"success", success:"User has been registered"})
                })
            }
        })
    }

}
module.exports = register;