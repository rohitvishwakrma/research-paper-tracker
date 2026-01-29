const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', {
		expiresIn: '7d',
	});
};

exports.register = async (req, res) => {
       try {
	       const { email, password } = req.body;
	       if (!email || !password) {
		       console.error('Register error: Missing email or password');
		       return res.status(400).json({ message: 'Email and password are required' });
	       }
	       const existing = await User.findOne({ email });
	       if (existing) {
		       console.error('Register error: User already exists');
		       return res.status(409).json({ message: 'User already exists' });
	       }
	       const user = await User.create({ email, password });
	       const token = generateToken(user);
	       res.status(201).json({ token, user: { email: user.email, id: user._id } });
       } catch (err) {
	       console.error('Register error:', err);
	       res.status(500).json({ message: err.message });
       }
};

exports.login = async (req, res) => {
       try {
	       const { email, password } = req.body;
	       if (!email || !password) {
		       console.error('Login error: Missing email or password');
		       return res.status(400).json({ message: 'Email and password are required' });
	       }
	       const user = await User.findOne({ email });
	       if (!user) {
		       console.error('Login error: User not found');
		       return res.status(401).json({ message: 'Invalid credentials' });
	       }
	       const isMatch = await user.comparePassword(password);
	       if (!isMatch) {
		       console.error('Login error: Password mismatch');
		       return res.status(401).json({ message: 'Invalid credentials' });
	       }
	       const token = generateToken(user);
	       res.json({ token, user: { email: user.email, id: user._id } });
       } catch (err) {
	       console.error('Login error:', err);
	       res.status(500).json({ message: err.message });
       }
};
