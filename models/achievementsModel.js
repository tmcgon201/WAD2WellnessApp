const nedb = require('nedb');

class Achievements {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    init() {
        this.db.insert({
            goal: 'Run a 10k',
            category: 'Fitness',
            target: '1 Week',
            user: 'harry.ross',
            achieved: '2023-06-10',
        });
        //for debugging
        //console.log('achievement db entry harry inserted');
        this.db.insert({
            goal: "Sleep 7 hours a night",
            category: 'Healthy Lifestyle',
            target: '4 Weeks +',
            user: 'hannah.smith',
            achieved: '2023-06-10',
        });
        //for debugging
        //console.log('achievement db entry hannah inserted');
        this.db.insert({
            goal: "Eat 5 a day once a week",
            category: 'Healthy Lifestyle',
            target: '3 Weeks',
            user: 'harry.ross',
            achieved: '2022-10-10',
        });
        //for debugging
        //console.log('achievement db entry harry inserted');
        }

    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }  
    //a function to add an achievement entry into the database
    addAchievement(goal, category, target, user) {
        var newGoal = {
            goal: goal,
            category: category,
            target: target,
            user: user,
            achieved: new Date().toISOString().split('T')[0] 
        }
        console.log('new goal created', newGoal);
        this.db.insert(newGoal, function(err, doc) {
            if (err) {
                console.log('Error inserting achievement', goal);
            } else { 
                console.log('Achievement inserted into the database', doc);
            } 
        }) 
      }
    //a function gather the achivements earned by an individual
    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
        this.db.find({ 'user': authorName }, function(err, entries) {
            if (err) {
                reject(err);
            } 
            else {
            resolve(entries);
            }
        })
        })
    }
}

//make the module visible outside
module.exports = Achievements;