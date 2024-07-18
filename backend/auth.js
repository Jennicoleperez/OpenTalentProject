const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const canisterActor = require('./canisterConfig');
require('dotenv').config();

const users = {}; // Simulating a user database

const SECRET_KEY = process.env.SECRET_KEY;

async function register(username, password) {
    if (users[username]) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    const result = await canisterActor.registerUser(username, hashedPassword);
    if (result) {
        return { success: true, message: 'User registered successfully' };
    } else {
        throw new Error('Registration failed');
    }
}

async function login(username, password) {
    const user = users[username];
    if (!user) {
        throw new Error('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return { success: true, token };
}

async function authenticate(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return { success: true, user: decoded.username };
    } catch (error) {
        return { success: false, message: 'Authentication failed' };
    }
}

module.exports = { register, login, authenticate };

