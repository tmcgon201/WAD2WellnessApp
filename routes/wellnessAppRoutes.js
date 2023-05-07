const express = require('express'); // import express package
const router = express.Router(); // import router
const controller = require('../controllers/wellbeingAppControllers.js'); // import controller functions to be called by most routes
const {login} = require('../auth/auth.js') // import auth functions
const {verify} = require('../auth/auth.js')

router.get('/', controller.show_splash) // launch index
router.get('/login', controller.login) // launch login
router.post('/login', login, controller.handle_login) // check user exists and log in
router.get('/home', verify, controller.homePage);
router.post('/home', verify, controller.handle_homePage);
router.get('/register', controller.register) // launch register
router.post('/register', controller.handle_register);

router.get('/createGoals', verify, controller.createGoals) // createGoals Page
router.post('/createGoals', verify, controller.handle_createGoals);
router.get('/recordNewAchievement', verify, controller.recordNewAchievement) // recordNewAchievement Page
router.post('/recordNewAchievement', verify, controller.handle_recordNewAchievement);
router.get('/allAchievements', verify, controller.allAchievements) // allAchievements Page
router.post('/allAchievements', verify, controller.handle_allAchievements);
router.get('/addGoal', verify, controller.addGoal) // addGoal Page
router.post('/addGoal', verify, controller.handle_addGoal);
router.get('/editGoals', verify, controller.editGoals) // editAchievements Page
router.post('/editGoals', verify, controller.handle_editGoals);
router.get('/deleteGoal', verify, controller.deleteGoal) // editAchievements Page
router.post('/deleteGoal', verify, controller.handle_deleteGoal);

router.get("/logout", controller.logout) // log out
router.post("/sendEmail", controller.send_email) // send contact form email

router.use(function(req, res) {
    // if page not found
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});
router.use(function(err, req, res, next) {
    //if error with code
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error: '+ err);
});

module.exports = router;