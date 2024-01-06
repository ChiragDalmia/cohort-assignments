const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

const {User, Course} = require('../db/index')
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    // Check if the user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        // If user already exists, send an error message
        return res.status(400).json({ msg: "User already exists" });
    }

    // If user does not exist, create a new user
    await User.create({
        username: username,
        password: password 
    });

    res.json({ msg: "User created" });
    
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
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

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

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

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        // Fetch the user based on the username provided in the request headers
        const user = await User.findOne({
            username: req.headers.username // Make sure the header name matches the client's request
        });

        // If the user is not found, send an appropriate response
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Fetch the courses that the user has purchased
        const courses = await Course.find({
            _id: { $in: user.purchasedCourses } // Use $in operator to find courses whose IDs are in the purchasedCourses array
        });

        // Send the courses in the response
        res.json({ courses: courses });
    } catch (err) {
        // Handle any errors that occur in the process
        res.status(500).json({ msg: 'Error fetching purchased courses' });
    }
});


module.exports = router