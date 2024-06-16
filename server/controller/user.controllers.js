import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const isUsernameExist = await User.findOne({username});
        if(isUsernameExist) return res.status(200).send({success: false, message: "Username is already taken"});
        const isEmailExist = await User.findOne({email});
        // console.log(isEmailExist)
        if(isEmailExist) return res.status(200).send({success: false, message: "Email is already taken"});
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        newUser.password = undefined;
        return res.status(201).send({success: true, message: "User created successfully", user: newUser});
    }catch(err){
        return res.status(500).send({success: false, message: err.message})
    }
}

export {register};