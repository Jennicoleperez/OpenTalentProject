const express = require('express');
const bodyParser = require('body-parser');
const { register, login, authenticate } = require('./auth');

const app = express();
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await register(username, password);
        res.json(result);
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await login(username, password);
        res.json(result);
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.get('/api/authenticate', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const result = await authenticate(token);
        res.json(result);
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
