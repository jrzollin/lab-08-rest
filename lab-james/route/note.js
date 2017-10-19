'use strict';

const Note = require('../model/NoteCon.js');
const router = require('../lib/router.js');

let notes = [];

let sendStatus = (res, status, text) => {
  res.writeHead(status);
  res.write(text);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {'content-type': 'application/json'});
  res.end(JSON.stringify(data));
};

router.get('/api/notes', (req, res) => {
  let id = req.url && req.url.query && req.url.query.id;

  if(id){
    let note = notes.filter(note => {
      return note.uuid === id;
    });

    if(note.length > 0){
      sendJSON(res, 200, note);
    } else {
      sendStatus(res, 404, 'Note not found');
    }
  } else {
    let allNotes = {allNotes: notes};
    sendJSON(res, 200, allNotes);
  }
});

router.post('/api/notes', (req, res) => {


  if(!req.body.content){
    return sendStatus(res, 400, 'Missing content');
  }

  if(!req.body.name){
    return sendStatus(res, 400, 'Missing name');
  }

  let note = new Note(req.body);
  notes.push(note);

  sendJSON(res, 200, note);
});

router.put('/api/notes', (req, res) => {
  let id = req.url && req.url.query && req.url.query.id;

  if(!req.body){
    return sendStatus(res, 400, 'Missing body');
  }

  if(!req.body.name){
    return sendStatus(res, 400, 'Missing name');
  }

  if(id){

    let note = notes.filter(note => {
      return note.uuid === id;
    });

    if(note.length > 0){
      note[0].name = req.body.name;
      note[0].content = req.body.content;
      sendJSON(res, 200, note);
    } else {
      sendStatus(res, 404, 'Note not found');
    }

  } else {
    sendStatus(res, 400, 'ID required');
  }
});

router.delete('/api/notes', (req, res) => {
  let id = req.url.query.id;

  if(id){
    let note = notes.filter(note => {
      return note.uuid === id;
    });

    if(note.length > 0){
      let name = note[0].name;
      notes.splice(notes.indexOf(note[0]), 1);
      sendStatus(res, 200, `${name} deleted`);
    } else {
      sendStatus(res, 400, 'Note not found');
    }

  } else {
    sendStatus(res, 400, 'ID required');
  }
});
