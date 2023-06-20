import React, { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import axios from "axios";
import "./style.css"; // Import the CSS file
import SearchBox from "./components/searchBox";
import NotesList from "./components/Notes/index";

import { endpoints } from "../../services/constants";
import  CreateNote  from "./components/createNote";
export default function Index() {
  const [notes, setNotes] = useState([]);
  const [tempNotes, setTempNotes] = useState([]);
  const [isEdit, setIsEdit] = useState({ check: false, index: null });
  const [isLoading, setIsLoading] = useState(false);

  const TOKEN = localStorage.getItem("loginToken");

  const [currentNote, setCurrentNote] = useState({
    title: "",
    description: "",
    createdDate: "",
    updatedDate: "",
    status: "UnDone",
  });

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(endpoints.GET_ALL_NOTES, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      setTempNotes(res.data.data);
      setNotes(res.data.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCurrentNote({
      ...currentNote,
      [e.target.name]: e.target.value,
    });
  };

  const addNoteApi = async () => {
    try {
      setIsLoading(true);
      var data = JSON.stringify({
        title: currentNote.title,
        description: currentNote.description,
        status: currentNote.status,
      });

      await axios.post(endpoints.CREATE_NOTE, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      getAllNotes();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const addNote = () => {
    if (currentNote.title === "" || currentNote.description === "") {
      return null;
    } else {
      const newNote = {
        ...currentNote,
        createdDate: isEdit?.check
          ? notes[isEdit?.index].updatedDate
          : new Date().toLocaleString(),
        updatedDate: new Date().toLocaleString(),
      };
      if (isEdit?.check) {
        let temp = notes;
        temp[isEdit?.index] = newNote;
        setNotes(temp);
        setTempNotes(temp);
        updateNote(temp[isEdit?.index].id);
      } else {
        addNoteApi();
        // setTempNotes([...notes, newNote]);
      }
      setCurrentNote({
        title: "",
        description: "",
        createdDate: "",
        updatedDate: "",
        status: "UnDone",
      });
      setIsEdit({ check: false, index: null });
    }
  };

  const editNote = (index) => {
    setIsEdit({ check: true, index: index });
    setCurrentNote(notes[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteNote = (index) => {
    var data = JSON.stringify({
      post_id: notes[index].id,
    });

    var config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: endpoints.DELETE_NOTE,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        getAllNotes();
      })
      .catch(function (error) {
        console.log(error);
      });
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setTempNotes(updatedNotes);
  };

  const FilterNotes = (str) => {
    let temp = tempNotes.filter(
      (i) =>
        i?.title?.toLowerCase()?.includes(str?.toLowerCase()) ||
        i?.updatedDate?.toLowerCase()?.includes(str?.toLowerCase()) ||
        i?.status?.toLowerCase() === str?.toLowerCase()
    );
    setNotes(temp);
  };

  const updateNote = (id) => {
    var data = JSON.stringify({
      title: currentNote.title,
      description: currentNote.description,
      status: currentNote.status,
      post_id: id,
    });

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: endpoints.UPDATE_NOTE,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    setIsLoading(true);
    axios(config)
      .then(function (response) {
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }
  return (
    <div className="notes-container">
      <h2 className="dashboard-heading">Welcome to Notes</h2>
      <div style={{ display: "grid" }}>
        <CreateNote
          currentNote={currentNote}
          handleInputChange={handleInputChange}
          isEdit={isEdit}
          addNote={addNote}
        />
        <div className="form-note">
          <SearchBox FilterNotes={FilterNotes} />
          <h3 className="note-list-heading">Notes</h3>
          <ul className="note-list">
            {notes?.length !== 0 ? (
              <NotesList
                notes={notes}
                editNote={editNote}
                deleteNote={deleteNote}
              />
            ) : (
              <div>No Notes found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
