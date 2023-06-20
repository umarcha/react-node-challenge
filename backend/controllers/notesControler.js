var db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

var Note = db.note;
const CreateNote = async (req, res) => {
  const { id } = req.user;
  try {
    let params = {
      ...req?.body,
      userId: id,
    };

    let notes = await Note.create(params);
    let obj = {
      status: 200,
      data: notes,
      message: `Note successfully created! against this user id: ${id}`,
    };
    res.status(200).json(obj);
  } catch (e) {
    let obj = {
      status: 500,
      message: e?.message,
    };
    res.status(500).json(obj);
  }
};

const GetAllNotes = async (req, res) => {
  const { id } = req.user;
  try {
    let allNotes = await Note.findAll({
      where: {
        userId: id,
      },
    });

    let obj = {
      status: 200,
      data: allNotes,
      message: `all notes`,
    };
    res.status(200).json(obj);
  } catch (e) {
    let obj = {
      status: 500,
      message: e?.message,
    };
    res.status(500).json(obj);
  }
};

const UpdateNote = async (req, res) => {
  const { post_id, title, description, status } = req?.body;
  try {
    let note = await Note.findOne({
      where: {
        id: post_id,
      },
    });
    let params = {
      title: title,
      description: description,
      status: status,
    };
    await note.update(params);
    await note.save();

    let obj = {
      status: 200,
      data: note,
      message: `note is update`,
    };
    res.status(200).json(obj);
  } catch (e) {
    let obj = {
      status: 500,
      message: e?.message,
    };
    res.status(500).json(obj);
  }
};

const DeleteNote = async (req, res) => {
  const { post_id } = req?.body;

  try {
    const note = await Note.findByPk(post_id);
    await note.destroy();
    let obj = {
      status: 200,
      data: note,
      message: `note is deleted`,
    };
    res.status(200).json(obj);
  } catch (e) {
    let obj = {
      status: 500,
      message: e?.message,
    };
    res.status(500).json(obj);
  }
};

module.exports = {
  CreateNote,
  GetAllNotes,
  UpdateNote,
  DeleteNote,
};
