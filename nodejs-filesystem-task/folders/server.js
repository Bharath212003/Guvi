const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Directory to store files
const folderPath = path.join(__dirname, 'folder');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// API Endpoint 1: Create a file with the current timestamp
app.post('/create-file', (req, res) => {
    const now = new Date();
    const timestamp = now.toISOString();
    const fileName = `${now.toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(folderPath, fileName);

    // Write the file with the timestamp as content
    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating file', error: err.message });
        }
        res.status(200).json({ message: 'File created successfully', fileName });
    });
});

// API Endpoint 2: Retrieve all files in the folder
app.get('/list-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving files', error: err.message });
        }
        res.status(200).json({ files });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
