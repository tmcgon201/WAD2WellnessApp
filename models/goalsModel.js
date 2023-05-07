const nedb = require('nedb');
class GoalsModel {
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
            goal: 'Eat more veg',
            category: 'Nutrition',
            target: '2 Weeks',
            user: 'harry.ross',
            achieved: false
        });
        //for debugging
        //console.log('db entry harry inserted');
        this.db.insert({
            goal: "Run 5k every week",
            category: 'Fitness',
            target: '4 Weeks +',
            user: 'hannah.smith',
            achieved: false
        });
        //for debugging
        //console.log('db entry hannah inserted');
        this.db.insert({
            goal: "Sleep 7 hours a night",
            category: 'Healthy Lifestyle',
            target: '1 Week',
            user: 'harry.ross',
            achieved: false
        });
        //for later debugging
        //console.log('db entry harry inserted');
        }
    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
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
    //a function to add a goal into database
    addGoal(goal, category, target, user) {
      var newGoal = {
          goal: goal,
          category: category,
          target: target,
          user: user
      }
      console.log('new goal created', newGoal);
      this.db.insert(newGoal, function(err, doc) {
          if (err) {
              console.log('Error inserting goal', goal);
          } else { 
              console.log('goal inserted into the database', doc);
          } 
      }) 
    }
    //a function to return all goals by a specific user
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
    //a function to delete a goal from a user and apply to the database
    deleteGoal(id) {
      console.log("ID to remove from DB:", id);
      this.db.remove({_id: id}, {}, function(err, numRemoved){
        if(err){
          console.log(err)
        }
        else{
          console.log("Goal deleted")
        }
      })
    }
    //a function to update a goal once a user has edited it
    updateGoal(id, updatedGoal) {
      return new Promise((resolve, reject) => {
        this.db.update({ _id: id }, { $set: updatedGoal }, {}, function(err, numReplaced) {
          if (err) {
            reject(err);
          } else {
            resolve(numReplaced);
          }
        })
      })
    }
    //a function to retrieve goal infromation by the ID
    getGoalById(id) {
      return new Promise((resolve, reject) => {
        this.db.findOne({ _id: id }, function(err, goal) {
          if (err) {
            reject(err);
          } else {
            resolve(goal);
          }
        })
      })
    }
}

//make the module visible outside
module.exports = GoalsModel;