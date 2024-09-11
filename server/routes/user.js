const router = require("express").Router();
const passport = require("passport");
const User =require("../models/user")
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config
const KEY=process.env.KEY

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }), // Disable sessions for this route
    (req, res) => {
        // The req.user should contain the user and token object
        const { token } = req.user;

        // Redirect to frontend with the JWT token in the query parameter
        res.redirect(`${process.env.CLIENT_URL}/auth/${token}`);
    }
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});
router.post('/signin', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ success: true, msg: 'User registered successfully' });
    } catch (error) {
        console.log({error})
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
});

// Login Route (Authenticate user and issue JWT)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id ,name:user.firstName}, KEY, { expiresIn: '1h' });

        return res.json({ success: true, token });
    } catch (error) {
        console.log({error})
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
});

module.exports = router;
