const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const loginController = require('../controllers/loginController');
const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentControlller');
const logoutController = require('../controllers/logoutController');

const { Authorize } = require('../middleware/auth');


router.get('/fetchdata', Authorize([1]), (req, res) => {
    return res.status(200).send({ status: true, message: 'Hello World!' })
})

//Create Account
router.post('/createaccount', accountController.createAccount);
router.get('/accountdetails', Authorize([1, 2]), accountController.accountDetails)

//Login
router.post('/login', loginController.login);

//Blog
router.post('/createblog', Authorize([1]), blogController.createBlog);
router.post('/uploadimage', Authorize([1]), blogController.uploadImage)
router.get('/bloglist', Authorize([1]), blogController.blogList)
router.get('/allblogs', Authorize([1, 2]), blogController.allBlogs)
router.get('/blogdetails/:blogId', Authorize([1, 2]), blogController.blogDetails);
router.put('/editblog', Authorize([1]), blogController.editBlog);
router.delete('/deleteblog/:blogId', Authorize([1]), blogController.deleteBlog);

//Comment
router.post('/createcomment', Authorize([1, 2]), commentController.createComment)

//Logout
router.post('/logout', Authorize([1, 2]), logoutController.logout)









module.exports = router;