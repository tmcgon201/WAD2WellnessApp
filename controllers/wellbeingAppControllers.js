const nodemailer = require('nodemailer'); // import nodemailer package
const userDao = require("../models/usersModel"); // import and initialise users db
const goalsDAO = require('../models/goalsModel'); // import and initialise goals Model
const db = new goalsDAO();
const achievementsDAO = require('../models/achievementsModel') // import and initialise achievements Model
const achievementsDB = new achievementsDAO();


db.init(); // initalise the goals database
achievementsDB.init(); //initalise the achievements database


// '/' screen GET request
exports.show_splash = function (req, res) {
  res.render("index", {
    title: "Think Wellness Home"
  });
};

// /login GET request
exports.login = function (req, res) {
  // render login page
  res.render("login", {
    title: "Memeber Login"
  });
};

// /register GET request
exports.register = function(req, res) {
  // render register page
  res.render("register", {
    title: "Memeber Register Page"
  });
};

exports.setUser = function(req, res, next) {
  // check if there is a user session
  if (req.session && req.session.passport && req.session.passport.user) {
    // set req.user to the user object from the session
    req.user = req.session.passport.user;
  }
  // call the next middleware function
  next();
}

// /createGoals GET request
exports.createGoals = function (req, res) {
  let loggedInUser = req.user.username;
  db.getEntriesByUser(loggedInUser).then(
    (entries) => {
      res.render('createGoals', {
        'title': 'createGoals',
        'goals': entries,
        user: req.user
      });
    }).catch((err) => {
      console.log('error handling users posts', err);
    });
}

// /recordNewAcheivement GET request
exports.recordNewAchievement = function(req, res) {
  // render recordNewAchievement page
  res.render("recordNewAchievement", {
    title: "Memeber create new achievement",
    user: "user"
  });
};

// /allAchievements GET request
exports.allAchievements = function(req, res) {
  let loggedInUser = req.user.username;
  achievementsDB.getEntriesByUser(loggedInUser).then(
    (entries) => {
      res.render('allAchievements', {
        'title': 'All Achievements',
        'goals': entries,
        user: req.user
      });
    }).catch((err) => {
      console.log('Error handling users posts:', err);
      res.sendStatus(500);
    });
}

// /addGoal GET request
exports.addGoal = function(req, res) {
  // render add Goal page
  res.render("addGoal", {
    title: "Memebers add new goal"
  });
};

// /editGoals GET request
exports.editGoals = function(req, res) {
  console.log(req.user);
  let loggedInUser = req.user.username;
  db.getEntriesByUser(loggedInUser).then(
    (entries) => {
      res.render('editGoals', {
        'title': 'Edit User Goals',
        'goals': entries,
        user: req.user
      });
    }).catch((err) => {
      console.log('error handling users posts', err);
    });
}

// /deleteGoal GET request
exports.deleteGoal = function(req, res) {
  console.log(req.user);
  let loggedInUser = req.user.username;
  console.log(`filtering users name ${loggedInUser}`);
  db.getEntriesByUser(loggedInUser).then(
    (entries) => {
      res.render('deleteGoal', {
        'title': 'Delete User Goal',
        'goals': entries,
        user: req.user
      });
    }).catch((err) => {
      console.log('error handling users posts', err);
    });
}

// /home GET request
exports.homePage = function(req, res) {
  res.render("homePage", {
    title: "Memeber login home page",
    user: req.user
  });
}

// /homePage POST request
exports.handle_homePage = function(req, res) {
  // process the POST request and redirect to the /new page
  res.render("homePage", {
    title: "Memeber Home Page",
  });
};

// send message from contact form
exports.send_email = function (req, res){
  res.redirect('/')
}

// /login POST request
exports.handle_login = function (req, res) {
  res.redirect('/home')
};

// /register POST request
exports.handle_register = function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  
  userDao.lookup(username, function (err, user) {
    if (user) {
      console.log("User already exists");
      return res.redirect("/register");
    } else {
      userDao.register(username, password, function(err, newUser) {
        if (err) {
          console.log("Error registering user", err);
          return res.redirect("/register");
        }
        console.log("New user registered:", newUser);
        return res.redirect("/login");
      });
    }
  });
};

// /createGoals POST request
exports.handle_createGoals = async function (req, res) {
  let achievedGoalId = req.body.achievedGoals;
  console.log('achievedGoal', achievedGoalId);
  const id = achievedGoalId;
  console.log("ID:", id);
  console.log("Request Body:", req.body.achievedGoals);
  console.log("ID:", id);


  try {
    // Fetch the goal entry with the achievedGoal id
    const goal = await db.getGoalById(achievedGoalId);
    console.log('Fetched goal:', goal);

    // Store the attributes in separate variables
    const { goal: achievedGoal, category, target } = goal;

    console.log('achievedGoal', achievedGoal);
    console.log('category', category);
    console.log('target', target);

    achievementsDB.addAchievement(achievedGoal, category, target, goal.user);
    db.deleteGoal(id)

    res.redirect('/createGoals')
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// /recordNewAchevement POST request
exports.handle_recordNewAchievement = function (req, res) {
  res.redirect('/recordNewAchievement')
}

// /allAchievements POST request
exports.handle_allAchievements = function (req, res) {
  console.log('processing post-addAchivement');
  if (!req.body.goal || !req.body.category || !req.body.target || !req.body.achieved ) {
    res.status(400).send('Entries must have a goal, a category, a target, and a date achieved.');
    return;
  }
  const users = req.user.username;
  const newAchievement = {
    goal: req.body.goal,
    category: req.body.category,
    target: req.body.target,
    user: users,
    achieved: req.body.achieved,
  };
  console.log('newAchievement', newAchievement);
  achievementsDB.addAchievement(newAchievement.goal, newAchievement.category, newAchievement.target, newAchievement.user, newAchievement.achieved);
  res.redirect('/allAchievements');
};

// /addGoal POST request
exports.handle_addGoal = function (req, res) {
  //console.log('processing post-addGoal');
  if (!req.body.goal || !req.body.category || !req.body.target) {
    res.status(400).send('Entries must have a goal, a category, and a target.');
    return;
  }
  const users = req.user.username;
  const newGoal = {
    goal: req.body.goal,
    category: req.body.category,
    target: req.body.target,
    user: users,
  };
  db.addGoal(newGoal.goal, newGoal.category, newGoal.target, newGoal.user);
  res.redirect('/createGoals');
};

// /editGoals POST request
exports.handle_editGoals = async function(req, res) {
  const users = req.user.username;
  const newGoals = [];

  // Loop through each key in the request body
  for (const key in req.body) {
    // Check if the key is an id
    if (key.endsWith('-id')) {
      const id = req.body[key];
      const description = req.body[`${id}-description`];
      const category = req.body[`${id}-category`];
      const target = req.body[`${id}-target`];
      // Create a new goal object and add it to the newGoals array
      newGoals.push({
        id: id,
        description: description,
        category: category,
        target: target,
        user: users,
      });
    }
  }

  // Update each goal in the database
  const updatePromises = newGoals.map((goal) => {
    return db.updateGoal(goal.id, {description: goal.description, category: goal.category, target: goal.target, user: goal.user});
  });
  await Promise.all(updatePromises);

  // Redirect to the goals page
  res.redirect('/createGoals');
}

// /deleteGoal POST request
exports.handle_deleteGoal = function (req, res) {
  const id = req.body.goalToDelete;
  db.deleteGoal(id, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to delete goal' });
    } else {
      goalsModel.getEntriesByUser(req.session.loggedInUser, function(err, entriesByUser) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Failed to get entries by user' });
        } else {
          res.redirect('/createGoals'); // Redirect to createGoals page
        }
      });
    }
  });
  res.redirect('/createGoals');
}

// /homePage POST request
exports.home_landingPage = function (req, res) {
  res.render("homePage", {
    title: "Think Wellness Home Page",
    user: "user"
  });
};

exports.logout = function (req, res) {
  // clear access token
  res.clearCookie("jwt").status(200).redirect("/");
};