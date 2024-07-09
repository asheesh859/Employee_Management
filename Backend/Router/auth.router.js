const {Router} = require('express')
const router = Router();
const {UserController} = require('../controllers/user.controller')

router.post('/signUp', UserController.singUp);
router.post('/login' , UserController.Login);
router.post('/logout' , UserController.logout);

module.exports = router;