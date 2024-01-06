const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index")
const {jwtSecretKey} = require("../config");
const jwt = require("jsonwebtoken")


// User Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

        // Check if the user already exists
        const existingAdmin = await User.findOne({ username: username });
        if (existingAdmin) {
            // If user already exists, send an error message
            return res.status(400).json({ msg: "User already exists" });
        }

        // If user does not exist, create a new admin
        await User.create({
            username: username,
            password: password 
        });

        res.json({ msg: "User created" });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const isValidated = await User.find({
        username: password,
        password : password
    })

    if (isValidated){
     const token = jwt.sign({
        username
     }, jwtSecretKey)
     res.json({
        token
     })
    } else{
        res.status(411).json({
            message : "couldnt find user"
        })
    }
});

router.get('/courses', async (req, res) => {
   const allCourses = await Course.find({});

   // Filter or map the courses to include only published ones
   const publishedCourses = allCourses.filter(course => course.isPublished).map(course => ({
       id: course._id,
       title: course.title,
       description: course.description,
       price: course.price,
       imageLink: course.imageLink
   }));

   res.json(publishedCourses)
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseId = req.params.courseId;
    
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router