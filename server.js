const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint for Preview
app.get('/preview', (req, res) => {
    const folderPath = req.query.path;

    if (!fs.existsSync(folderPath)) {
        return res.json({ error: 'Folder not found!' });
    }

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.json({ error: 'Error reading folder!' });
        }

        res.json(files);
    });
});

// API Endpoint for Renaming Files
app.post('/rename', (req, res) => {
    const { path, oldSubstring, newSubstring } = req.body;

    if (!fs.existsSync(path)) {
        return res.json({ error: 'Folder not found!' });
    }

    fs.readdir(path, (err, files) => {
        if (err) {
            return res.json({ error: 'Error reading folder!' });
        }

        files.forEach(file => {
            const oldFilePath = path + '/' + file;
            const newFileName = file.replace(oldSubstring, newSubstring);
            const newFilePath = path + '/' + newFileName;

            fs.rename(oldFilePath, newFilePath, err => {
                if (err) {
                    console.error('Error renaming file:', file, err);
                }
            });
        });

        res.json({ message: 'Files renamed successfully!' });
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
