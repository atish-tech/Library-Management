const generateToken = require("../Config/generateToken");
const userModel = require("../Models/userModel");
const bcryptjs = require('bcryptjs');

// Register (member & librarian)
const registerController = async (request, response) => {
    const { userName, password, isLibrarian } = request.body;

    // empty fields 
    if (!userName || !password) {
        return response.status(400).json({ message: "All fields are complsary" });
    }
    
    // check username is exist or not
    if (await userModel.findOne({ userName: userName })) {
        return response.status(400).json({ message: "username already exist" });
    }

    // hash the password
    const hash = await bcryptjs.hash(password, 10);

    // Create new entry in db
    const newUser = await userModel.create({
        userName: userName,
        password: hash,
        isLibrarian: isLibrarian
    });

    if (newUser) {
        return response.status(201).json({
            id: newUser._id,
            userName: newUser.userName,
            token: generateToken(newUser._id)
        });
    }
    else {
        return response.status(400).json({ message: "server error" });
    }
}

// Login as (member & librarian)
const loginController = async (request, response) => {
    const { userName, password } = request.body;

    // get user data from db
    const tempUser = await userModel.findOne({ userName: userName });

    if (tempUser) {
        // check password
        if (await bcryptjs.compare(password, tempUser.password)) {
            return response.status(200).json({
                userName: tempUser.userName,
                token: await generateToken(tempUser._id)
            });
        }
        else {
            return response.status(400).json({ message: "Wrong Password" });
        }
    }
    else {
        return response.status(400).json({ message: "UserName Not Found" });
    }

}

// delete user account
const deleteAccount = async (request, response) => {
    if(await userModel.findByIdAndDelete(request.body.id)){
        return response.status(200).json({message : "Account delete successfull"});
    }

    else {
        return response.status(400).json({message : "Server Error"});
    }
}

module.exports = { registerController, loginController , deleteAccount };