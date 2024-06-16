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

const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) return res.status(200).send({success: false, message: "Invalid username or password"});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(200).send({success: false, message: "Invalid username or password"});
        user.password = undefined;
        return res.status(200).send({success: true, message: "Login successful", user});
    }
    catch(err){
        return res.status(500).send({success: false, message: err.message});
    }
}

const setAvatarImage = async (req, res) => {
    try{
        const {id} = req.params;
        const {image} = req.body;
        const user = await User.findById(id);
        if(!user) return res.status(200).send({success: false, message: "User not found"});
        user.avatarImage = image;
        user.isAvatarImageSet = true;
        await user.save();
        return res.status(200).send({success: true, message: "Avatar image set successfully", isSet:true,image:user.avatarImage});
    }catch(err){
        return res.status(500).send({success: false, message: err.message});
    }
}

export {register,login,setAvatarImage};