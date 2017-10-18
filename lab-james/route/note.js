'use strict';

const Note = require('../model/NoteCon.js');
const router = require('../lib/router.js');

let notes = [];

let sendStatus = (res, status) => {
  res.writeHead(status);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {'content-type': 'application/json'});
  res.end(JSON.stringify(data));
};

router.get('/api/notes', (req, res) => {
  let id = req.url && req.url.query && req.url.query.id;
  console.log(req.url);
  console.log(req.url.query);
  console.log(req.url.query.id);
  console.log(id);
  if(id){
    let note = notes.filter(note => {
      return note.uuid === id;
    });

    if(note){
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


  if(!req.body){
    return sendStatus(res, 400, 'Missing body');
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

    if(note){
      console.log('reached');
      note.name = req.body.name;
      note.content = req.body;
      sendJSON(res, 200, note);
    } else {
      sendStatus(res, 404, 'Note not found');
    }

  } else {
    sendStatus(res, 400, 'ID required');
  }
});
