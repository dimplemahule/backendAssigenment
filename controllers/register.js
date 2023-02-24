const db = require('../routes/db-config');
const bycrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, password: Npassword } = req.body;
    if (!email || !Npassword ) {
        return res.json({ status: "error", error: "please enter your all fill" })
    } else {
        console.log(email);
        db.query("SELECT email from users WHERE email = ?",[email], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "Email has already been exist" })
            else {
                const password = await bycrypt.hash(Npassword, 8) //
                console.log(password);
                db.query("INSERT INTO users SET ? ", { email: email, password: password }, (error,results) =>{
                    if (error) throw error;
                    return res.json({status:"success", success:"User has been registered"})
                })
            }
        })
    }

}
module.exports = register;