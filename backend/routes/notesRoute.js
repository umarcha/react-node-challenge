const express = require("express");
const noteCtrl = require("../controllers/notesControler");
const {auth} = require("../middelwares/auth");

const noteRouter = express.Router();

noteRouter.route("/createNote").post(auth, noteCtrl.CreateNote);
noteRouter.route("/getAllNotes").get(auth, noteCtrl.GetAllNotes);
noteRouter.route("/updateNote").put(auth, noteCtrl.UpdateNote);
noteRouter.route("/deleteNote").delete(noteCtrl.DeleteNote);

module.exports = noteRouter;
