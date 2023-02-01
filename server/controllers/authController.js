const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async(req, res) => {
    try{
        const {name,email, password} = req.body;
        
        if(!email || !password || !name){
            // return res.status(400).send("All feilds are required"); 
            return res.send(error(400, "All feilds are required")); 
        }

        const olduser = await User.findOne({email});

        if(olduser){
            // return res.status(409).send("User is already registered");
            return res.send(error(409, "User is already registered"));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email, 
            password: hashPassword
        })

        // return res.status(201).json({
        //     user,
        // });

        return res.send(success(201,"User created"));
    }catch(e){
        return res.send(error(500, e.message));
    }
}

const loginController = async(req, res) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            // return res.status(400).send("All feilds are required"); 
            return res.send(error(400, "All feilds are required"));
        }

        const user = await User.findOne({email}).select('+password');;

        if(!user){
            // return res.status(409).send("User is not registered");
            return res.send(error(409, "User is not registered"));
        }

        const matched = await bcrypt.compare(password, user.password);
        if(!matched){
            // return res.status(404).send("Incorrect Password");
            return res.send(error(404, "Incorrect Password"));
        }

        const accessToken = generateAccessToken({
            _id: user._id
        });

        const refreshToken = generateRefreshToken({
            _id: user._id
        });

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return res.send(success(200,{accessToken}));
    }catch(error){

    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
        })
        return res.send(success(200, 'user logged out'))
    } catch (e) {
        return res.send(error(500, e.message));
    }
}


//this api will check the refresh token validity and generate the new access token
const refreshAccessTokenController =async(req, res)=>{
    const cookies = req.cookies;
    if (!cookies.jwt) {
        // return res.status(401).send("Refresh token in cookie is required");
        return res.send(error(401, "Refresh token in cookie is required"));
    }

    const refreshToken = cookies.jwt;

    console.log('refressh', refreshToken);

    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id = decoded._id; 
        const accessToken = generateAccessToken({_id});

        return res.send(success(200,{accessToken}));;
    }catch(e){
        console.log(e); 
        // return res.status(401).send("Invalid refresh key");
        return res.send(error(401, "Invalid refresh key"));
    }
}

// internal functions
const generateAccessToken = (data) =>{
    try{
    const token =  jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY,{
        expiresIn:"1d"
    });
    console.log(token); 
    return token;
    }catch(e){
        console.log(e);
    }
}

const generateRefreshToken = (data) =>{
    try{
    const token =  jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY,{
        expiresIn:"1y"
    });
    console.log(token); 
    return token;
    }catch(e){
        console.log(e);
    }
}
module.exports ={signupController, loginController, refreshAccessTokenController, logoutController}