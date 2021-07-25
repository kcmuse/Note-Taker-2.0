const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

notes.get('/notes', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// notes.get('/notes/note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/notes.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             const result = json.filter((note) => note.note_id === noteId);
//             return result.length > 0 ?
//                 res.json(result) :
//                 res.json('No not with that id');
//         });
// });

// notes.delete('/notes/note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/notes.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             const result = json.filter((note) => note.note_id !== noteId);
//             writeToFile('./db/note.json', result);
//             res.json(`Note has been deleted FOREVER!!!!`);
//         });
// });

notes.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(console.log(`note added`));
    }
});

module.exports = notes;