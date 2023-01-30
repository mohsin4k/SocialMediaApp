const express = require("express");
const dotenv = require('dotenv'); 
const connect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const morgan = require("morgan");

dotenv.config('./.env');

const app =express(); 

//middlewares
app.use(express.json());
app.use(morgan("common"));

app.use('/auth', authRouter);
app.use('/posts',postsRouter);
app.get("/", (req, res) => {
    console.log("api hitted")
    res.status(200).send(); 
});


const PORT = process.env.port || 4000; 

connect(); 
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
}); 