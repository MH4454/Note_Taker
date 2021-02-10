const path = require("path");
const fs = require("fs");
const router = require("express").Router();

// Sends the user to the notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Sends the user to the index page for anything other than notes
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
