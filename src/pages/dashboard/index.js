import React, {useEffect, useState} from "react";
import "./style.css";
import Spinner from "../../components/spinner";
import axios from "axios";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {endpoints} from "../../services/constants";

const Dashboard = ({onLogout}) => {
 const navigate = useNavigate();

 const [isLoading, setIsLoading] = useState(false);
 const [notes, setNotes] = useState([]);
 const [tempNotes, setTempNotes] = useState([]);
 const [isEdit, setIsEdit] = useState({check: false, index: null});

 const userData = JSON.parse(localStorage.getItem("userData"));

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
  setIsLoading(true);
  let res = await axios.get(endpoints.GET_ALL_NOTES, {
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData?.authToken}`,
   },
  });

  if (res.status == 200) {
   setTempNotes(res.data.data);
   setNotes(res.data.data);
  }
  setIsLoading(false);
 };

 const handleInputChange = (e) => {
  setCurrentNote({
   ...currentNote,
   [e.target.name]: e.target.value,
  });
 };

 const addNoteApi = async () => {
  setIsLoading(true);
  var data = JSON.stringify({
   title: currentNote.title,
   description: currentNote.description,
   status: currentNote.status,
  });

  let res = await axios.post(endpoints.CREATE_NOTE, data, {
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData?.authToken}`,
   },
  });

  if (res.status === 200) {
   getAllNotes();
  }
  setIsLoading(false);
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
   setIsEdit({check: false, index: null});
  }
 };

 const editNote = (index) => {
  setIsEdit({check: true, index: index});
  setCurrentNote(notes[index]);
  window.scrollTo({top: 0, behavior: "smooth"});
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

 const logout = () => {
  localStorage.setItem("loginToken", false);
  setIsLoading(true);
  // Simulating a logout process with a timeout
  setTimeout(() => {
   // Perform any necessary logout logic
   setIsLoading(false);
   onLogout();
  }, 2000);
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
    Authorization: `Bearer ${userData?.authToken}`,
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

 return (
  <div className='dashboard-container'>
   <Spinner loading={isLoading} />
   <h2 className='dashboard-heading'>Dashboard</h2>
   <button onClick={() => navigate("profile")} type='btn'>
    Profile Update
   </button>

   <div className='search-container'>
    <label htmlFor='search'>Search by Title:</label>
    <input
     type='text'
     id='search'
     onChange={(e) => {
      FilterNotes(e.target.value);
     }}
    />
   </div>

   <div className='note-form'>
    <p>Please fill required fields for add the note</p>
    <label htmlFor='title'>Title:</label>
    <input
     type='text'
     id='title'
     name='title'
     value={currentNote.title}
     onChange={handleInputChange}
     required
    />
    <label htmlFor='description'>Description:</label>
    <textarea
     id='description'
     name='description'
     value={currentNote.description}
     onChange={handleInputChange}></textarea>
    <label htmlFor='status'>Status:</label>
    <input
     type='text'
     id='status'
     name='status'
     value={currentNote.status}
     onChange={handleInputChange}
    />
    <button onClick={addNote} type='btn'>
     {isEdit?.check ? "Update Note" : "Add Note"}
    </button>
   </div>
   <h3 className='note-list-heading'>Notes</h3>
   <ul className='note-list'>
    {notes?.length !== 0 ? (
     <>
      {notes.map((note, index) => (
       <li key={index} className='note-item'>
        <h4>{note.title}</h4>
        <p>{note.description}</p>
        <p>Created: {moment(note.createdDate).format("DD-MM-YYYY")}</p>
        <p>Updated: {moment(note.updatedDate).format("DD-MM-YYYY")}</p>
        <p>Id: {note.id}</p>
        <p>Status: {note.status}</p>
        <div className='note-actions'>
         <button onClick={() => editNote(index)} type='btn'>
          Edit
         </button>
         <button onClick={() => deleteNote(index)} type='btn'>
          Delete
         </button>
        </div>
       </li>
      ))}
     </>
    ) : (
     <div>No Notes found</div>
    )}
   </ul>

   <button onClick={logout}>Logout</button>
  </div>
 );
};

export default Dashboard;
