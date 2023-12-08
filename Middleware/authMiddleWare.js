const jsonwebtoken = require('jsonwebtoken');
const usermodel = require("../Models/userModel");

const protect = async (request , responnse , next) => {
    let token;

    if(
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = request.headers.authorization.split(" ")[1];

            const decode = jsonwebtoken.verify(token , process.env.JWT_SECRET);
            const user = await usermodel.findById(decode.id).select('-password');
            if(user.isLibrarian) {
                next();
            }
            else {
                return responnse.status(400).json({message : "You are not librarian"});
            }
        } catch (error) {
            return responnse.status(400).json({message : "server error"});
        }
    }

    if(!token) {
        return responnse.status(400).json({message : "user is not authorized"});
    }
}

module.exports = protect;