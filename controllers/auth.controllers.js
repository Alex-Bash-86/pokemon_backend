import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secure = process.env.NODE_ENV !== 'development';

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.exists({ username });
    if (existingUser) {
      throw new Error ('Username already taken', { cause : 409 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(13);
    const hashedPW = await bcrypt.hash(password, salt);

    // Save user
    const user = (await User.create({ ...req.body, password: hashedPW })).toObject();
    delete user.password;

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_DAYS + 'd'});

    res.cookie('token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000),
    }); 
    
    res.json({ message: 'User registered successfully', data: user });
};

const login = async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user by username and include the password field
    const user = await User.findOne({ username }).select('+password').lean();
    if (!user) throw new Error('Invalid credentials', { cause: 401 });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials', { cause: 401 });
    
    // Remove the password field from the user object before sending the response
    delete user.password;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_DAYS + 'd'});

    res.cookie('token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000),
    });

    res.json({ message: 'Login successful', data: user });
};

const logout = (req, res) => {
    res.clearCookie('token', {  
    httpOnly: true,
    secure,
    sameSite: 'lax'
    });

    res.json({ message: 'Logout successful' });
};





export { registerUser, login, logout };
