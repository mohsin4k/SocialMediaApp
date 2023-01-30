const mongoose = require("mongoose");

module.exports = async () => {
    const mongoURI = "mongodb+srv://mohsin_k:qO9VBQHOlQOwaV7e@cluster0.bdsz15t.mongodb.net/?retryWrites=true&w=majority"
    try{
        const connect = await mongoose.connect(
            mongoURI,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
            }
            );
            console.log(`MongoDb connected: ${connect.connection.host}`);
    }catch(e){
        console.log(e);
        process.exit(1);  
    }
}