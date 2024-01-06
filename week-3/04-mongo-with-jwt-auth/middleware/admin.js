const {Admin} = require("../db/index")
const jwt = require('jsonwebtoken');
const {jwtSecretKey} = require('../config')

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization; // bearer token
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token
    try {
        const decodedValue = jwt.verify(jwtToken, jwtSecretKey);
        if (decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
    
}
module.exports = adminMiddleware;