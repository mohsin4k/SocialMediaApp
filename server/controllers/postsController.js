const { success } = require("../../utils/responseWrapper");


const getAllPostsController = async (req, res) =>{
    console.log(req._id);
    return res.send(success(201,"These all are posts"));
}

module.exports = {getAllPostsController};