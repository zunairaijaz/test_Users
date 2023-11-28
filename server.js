const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let users = [
    { id: 1, name: 'Zunaira', email: 'Zunaira@example.com', role: 'user' },
    { id: 2, name: 'Ijaz', email: 'Ijaz@example.com', role: 'admin' },
];

// Get users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Add a new user
app.post('/api/users', (req, res) => {
    const { name, email, role } = req.body;

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const newUser = { id: users.length + 1, name, email, role };
    users.push(newUser);

    // Log the validated user data
    console.log('New User:', newUser);

    res.json(newUser);
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        console.log('Deleted User:', deletedUser);
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
