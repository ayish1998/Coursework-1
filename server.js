const express = require('express');
const NeDB = require('nedb');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // This handles file uploads

const app = express();
const port = 3000; // Change this to the desired port

// Create a NeDB database
const db = new NeDB({ filename: 'posts.db', autoload: true });

app.use(express.json());

// Serve your HTML, CSS, and JS files

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/community.html');
});

// Handle form submissions

app.post('/submit', upload.single('image'), (req, res) => {
    const { description } = req.body;
    const image = req.file ? req.file.path : null;

    // Store the post in NeDB
    db.insert({ description, image }, (err, newPost) => {
        if (err) {
            res.status(500).json({ message: 'Error storing post.' });
        } else {
            res.status(200).json(newPost);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
