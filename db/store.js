const fs = require("fs");
const notesDB = require("../db/db.json");
const util = require("util");
// This package generates unique ids.
const { v4: uuidv4 } = require("uuid");

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Store {
  readNote() {
    return readFileAsync(__dirname + "/db.json", "utf8");
  }
  writeNote(newArray) {
    return writeFileAsync(__dirname + "/db.json", JSON.stringify(newArray));
  }

  addNote(req) {
    const { title, text } = req;

    // Structure for a new note
    const newNote = {
      title,
      text,
      id: uuidv4(), // Creates random id
    };

    return this.getNote()
      .then((notesArray) => [...notesArray, newNote])
      .then((newNoteArray) => this.writeNote(newNoteArray))
      .then(() => this.getNote())
      .catch((err) => console.error("Error adding Note!", err));
  }
  getNote() {
    return this.readNote().then((notes) => {
      let notesParsed = JSON.parse(notes);
      let noteArray = [...notesParsed];
      return noteArray;
    });
  }
  removeNote(id) {
    return this.getNote()
      .then((noteArray) => noteArray.filter((note) => note.id !== id)) // filters id from note from the array
      .then((newNoteArray) => this.writeNote(newNoteArray));
  }
}

module.exports = new Store();
