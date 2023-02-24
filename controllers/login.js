const jwt = require('jsonwebtoken');
const db = require('../routes/db-config')
const bycrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "please enter your all fill" })
    else {
        db.query("SELECT * FROM users WHERE email = ?", [email], async (Err, result) => {
            if (Err) throw Err;
            if (!result.length || !await bycrypt.compare(password, result[0].password))
                return res.json(
                    {
                        status: "error", error: "encorrect Email or password"
                    }
                )
            else {
                const token = jwt.sign({ id: result[0].id }, process.env.SCERET_KEY, {
                    expiresIn: process.env.SCERET_EXPIRE,
                   

                })
                const cookiesOption = {
                    expiresIn: new Date(Date.now() + process.env.COOKIES_EXPIRE * 24 * 60 * 60 * 1000),
                    httpOnly: true

                }
                res.cookie("userRegistered", token, cookiesOption);
                return res.json({ status: "success", success: "User has been LoggedIn" })
            }
        })
    }
}

module.exports = login