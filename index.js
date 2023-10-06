const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.post('/api/notes', (req, res) => {
    console.log('post, req.body= ', req.body)
    let exsistingNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let note = req.body;
    let newId = exsistingNotes.length.toString();
    note.id = newId;
    exsistingNotes.push(note);

    fs.writeFileSync('./db/db.json', JSON.stringify(exsistingNotes));
    res.json(exsistingNotes);
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);