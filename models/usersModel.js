const Datastore = require("nedb");
const bcrypt = require("bcrypt"); // import bcrypt package
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename: dbFilePath,
            autoload: true });
        } else {
            //in memory
            this.db = new Datastore();
        }
    }
    init() {
        //populating default users
        this.db.insert({
            user: 'hannah.smith',
            password:
            '$2a$12$tDOFFvGg5OoN8Xn0Fw/3Ce6Z3xKs184IuArquwDDa0lFN9uIidx1u'
        });
        this.db.insert({
            user: 'harry.ross',
            password: '$2a$12$tDOFFvGg5OoN8Xn0Fw/3Ce6Z3xKs184IuArquwDDa0lFN9uIidx1u'
        });
        return this;
    }
    //function to find a user
    lookup(user, cb) {
        this.db.find({'user': user}, function (err, entries) {
        if (err) {
            return cb(null, null);
        } else {
            if (entries.length == 0) {
                return cb(null, null);
            }
                return cb(null, entries[0]);
            }
        });
    }
    //function to register a new user
    register(username, password, cb) {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                return cb(err);
            }
            this.db.insert({ user: username, password: hash }, function(err, newUser) {
                if (err) {
                    return cb(err);
                }
                return cb(null, newUser);
            });
        }.bind(this));
    }
}

//initalise the database of users on launch
const dao = new UserDAO();
dao.init();

module.exports = dao;