# WAD2WellnessApp
This is a website that has been crated for the practical assessment for Web Application Development 2. This coursework utilises templating and the MVC architecture.

# Coursework specification
You are tasked with developing a web application which will enable users to find information about
wellbeing and set themselves goals to help enhance their sense of wellbeing.

The application should allow the users to do the following:
  * Anyone should be able to browse to the site and view an About Us page with information about
    the application
  * Individuals should be able to register for the application
  * Registered users should be able to login and
  * view information about nutrition, fitness and a healthy lifestyle
  * define a series of personal goals in each category (nutrition, fitness, healthy lifestyle)
  * add, remove and modify their own personal goals for several weeks ahead
  * record the achievement of their own personal goals when they occur. e.g. goals can be
    ticked off or actual times or number of repetitions can be recorded
  * review a history of their own personal achievements

# Data Structure Changes
Originally I had planned to have 3 data structures for users, goals and achievements which I have kept in place by having 3 models that represent these.

During development circumsttances had changed due to time contraints and troubles during implementation so altering the data strucure could allow me to have more features implemented while taking out some unneccesary added features that were included during the planning phase. The structure still consists of the main requirments of the project and I have updated them below:
```
 Goals: { 
   goal: string,
   category: [string]
   target: [string]
   user: string,
   achieved: Boolean
} 
```
```
Users: {
   email: string,
   username: string,
   password: string
}
```
```
Achievements: {
    goal: string,
    category: [string],
    target: [string],
    user: string,
    achieved: Date()
}
```

# Design Changes
On the splash screen when a user is not logged in, I decided to add some interactive images that reveal text when hovered over, this ultimately was to make new users to the website feel engaged and want to sign up for an account. This has helped make the website more welcoming as the inital design was bland and too much text without being very interesting.

On the homescreen once a user logs in, I have added a bit more of an appealing screen which gives an introduction and services that are included along with two buttons that access the achievements and goal pages. The tool bar also highlights the log out button so it is easier for users to navigate. In the original design I had implemented 3 tabs for each pieces of information but through development found challenges with this which resulted in a lot of time contraints so to by pass this I have just displayed all the information in the one page but spaced out so a user can read it clearly.

The goals page I edited to make a bit more sense. A table displaying all the users goals kept things simple and allows the user to understand what is happening clearly. I decided to move the add new goal, edit goal and remove goal to above the table to be more clear as if a user has many goals they would have had to scroll down and it wouldnt have been obvious. The view achievements page has been moved to the tool bar so it can be accessed at any point when a user is logged in. To complete a goal all users have to do is select the goal they have completed and confirm by clicking "check acieved" button, this will remove the entry from the goals page and add it as an achievement to the achieveembnts page. I decided to remove the progress bar since it was complicating the process and users may not want to see progress and instead 

I followed a similar approach whern implementing to the achivements page by having a table. Users can add achievements but cant edit or remove acievements once they have been made as we want our users to be able to keep track of all goals they have achieved.


# Templating Change
Instead of implementing mustache, embedded javascript (EJS) was used instead due to being familar with the language and its capabilities.



# Deployed version of the website
The website can be found at:
https://thinkwellness.herokuapp.com/

There has been two default users created with some goals and achievements pre set. These can be access using the credentials below or create your own account!

**Account 1:**
* username: harry.ross
* password: password

**Account 2:**
* username: hannah.smith
* password: password


# How to locally setup the website
You can retrieve the github repository though this link:
https://github.com/tmcgon201/WAD2WellnessApp.git

You can do "git clone https://github.com/tmcgon201/WAD2WellnessApp.git" to locally bring down the data.

**Initalise**
  * Run "npm install" from terminal to install packages
  * Run "node index.js" to start the application on local server
      * Alternatively is nodemon is installed it can be done through this
  * Website should be viewable on localhost:3000
  * You can access the application contents through either creating a new user or viewing the already setup default users (credientials noted above)
  * Log in token will expire before 10minutes and will require you to re-log in
  
  
  
# Created By
Tara McGonigle - S1933316
