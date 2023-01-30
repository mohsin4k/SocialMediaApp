const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async(req, res) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).send("All feilds are required"); 
        }

        const olduser = await User.findOne({email});

        if(olduser){
            return res.status(409).send("User is already registered");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email, 
            password: hashPassword
        })

        return res.status(201).json({
            user,
        });
    }catch(error){

    }
}

const loginController = async(req, res) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).send("All feilds are required"); 
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(409).send("User is not registered");
        }

        const matched = await bcrypt.compare(password, user.password);
        if(!matched){
            return res.status(404).send("Incorrect Password");
        }

        const accessToken = generateAccessToken({
            _id: user._id
        });

        const refreshToken = generateRefreshToken({
            _id: user._id
        });

        return res.json({accessToken, refreshToken});
    }catch(error){

    }
}

//this api will check the refresh token validity and generate the new access token
const refreshAccessTokenController =async(req, res)=>{
    const {refreshToken} = req.body; 

    if(!refreshToken){
        return res.status(401).send("Refresh token is required");
    }

    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id = decoded._id; 
        const accessToken = generateAccessToken({_id});

        return res.status(201).json({accessToken});
    }catch(error){
        console.log(error); 
        return res.status(401).send("Invalid refresh key");
    }
}

// internal functions
const generateAccessToken = (data) =>{
    try{
    const token =  jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY,{
        expiresIn:"15m"
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
module.exports ={signupController, loginController, refreshAccessTokenController}