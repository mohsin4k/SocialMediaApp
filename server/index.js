const express = require("express");
const dotenv = require('dotenv'); 
const connect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;

dotenv.config('./.env');


const app =express(); 
// app.use(express.urlencoded({limit: '50mb'}));
//middlewares
app.use(express.json({limit: '50mb'}));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin:'http://localhost:3000'
    })
);

app.use('/auth', authRouter);
app.use('/posts',postsRouter);
app.use('/user',userRouter);

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });
app.get("/", (req, res) => {
    console.log("api hitted")
    res.status(200).send(); 
});


const PORT = process.env.port || 4000; 

connect(); 
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
}); 