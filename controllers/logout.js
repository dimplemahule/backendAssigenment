
const logout = (req, res) => {
    res.cookie("userRegistered");
    res.redirect("/")
}
module.exports = logout