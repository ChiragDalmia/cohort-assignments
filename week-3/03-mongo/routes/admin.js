const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index")
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

        // Check if the user already exists
        const existingAdmin = await Admin.findOne({ username: username });
        if (existingAdmin) {
            // If user already exists, send an error message
            return res.status(400).json({ msg: "Admin already exists" });
        }

        // If user does not exist, create a new admin
        await Admin.create({
            username: username,
            password: password 
        });

        res.json({ msg: "Admin created" });

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const isPublished = req.body.isPublished;
    // use zod to do input validation
    const newCourse = await Course.create({
        title: title,
        description: description,
        price : price,
        imageLink: imageLink,
        isPublished: isPublished
    });
    res.json({
        message : 'course created successfully', 
        courseId: newCourse._id,
        isPublished: newCourse.isPublished
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })
});

module.exports = router;