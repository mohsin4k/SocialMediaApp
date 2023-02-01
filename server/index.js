const express = require("express");
const dotenv = require('dotenv'); 
const connect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config('./.env');

const app =express(); 

//middlewares
app.use(express.json());
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

app.get("/", (req, res) => {
    console.log("api hitted")
    res.status(200).send(); 
});


const PORT = process.env.port || 4000; 

connect(); 
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
}); 