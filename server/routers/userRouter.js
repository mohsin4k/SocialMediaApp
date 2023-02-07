const requireUser = require('../middlewares/requireUser');
const UserController = require('../controllers/userController');
const router = require('express').Router();

router.post('/follow', requireUser, UserController.followOrUnfollowUserController);
router.get('/getFeedData', requireUser, UserController.getPostsOfFollowing);
router.get('/getMyPost', requireUser, UserController.getMyPosts);
router.get('/getUserPost', requireUser, UserController.getUserPosts);
router.delete('/deleteUser', requireUser, UserController.deleteMyProfile);
router.get('/getMyInfo', requireUser, UserController.getMyInfo);

router.put('/', requireUser, UserController.updateUserProfile);
router.post('/getUserProfile', requireUser, UserController.getUserProfile);

module.exports = router;