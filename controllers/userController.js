const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Signup
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // creating new user instance with username, email and password
        const user = new User({ username, email, password });
        await user.save();
        // Using status code 201 for User Signup
        res.status(201).json({ message: "User created successfully.", user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // we will find the user from the database using email.
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            // if there is no user or incorrect password, return 401 status code.
            return res.status(401).json({ status: false, message: "Invalid username or password" });
        }

        // We will be using jwt token with the help of user id and secret key
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login successful.", jwt_token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
