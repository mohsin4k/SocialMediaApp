

const getAllPostsController = async (req, res) =>{
    console.log(req._id);
    return res.send("These all are posts");
}

module.exports = {getAllPostsController};