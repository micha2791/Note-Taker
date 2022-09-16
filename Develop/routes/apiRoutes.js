const router = require('express').Router();
const cuid = require('cuid');
const fs = require('fs');

//request
router.get('/notes', (req, res) => {
// use fs.ReadFile method to read the contents of the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
      // respond with the notes in json format, i.e. res.json(notesVariable)
});
//post
router.post('/notes', (req, res) => {
    req.body.id = cuid();
    const { title, text } = req.body;
    const newNote = { title, text, id: cuid() };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) throw err;
        const notesArray = JSON.parse(data);
        notesArray.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => {
            if(err) throw err;
            res.json(notesArray);
        });
    });
});

//delete
router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) throw err;
        const notesArray = JSON.parse(data);
        const filteredNotes = notesArray.filter((note) => note.id !== id);
        fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
            if(err) throw err;
            res.json(filteredNotes);
        });
    });
});

module.exports = router;
