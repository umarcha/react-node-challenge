const BASE_URL = "http://localhost:8080/";

export const endpoints = {
 LOGIN: `${BASE_URL}api/v1/login`,
 REGISTER: `${BASE_URL}api/v1/register`,
 GET_ALL_NOTES: `${BASE_URL}api/v1/note/getAllNotes`,
 CREATE_NOTE: `${BASE_URL}api/v1/note/createNote`,
 DELETE_NOTE: `${BASE_URL}api/v1/note/deleteNote`,
 UPDATE_NOTE: `${BASE_URL}api/v1/note/updateNote`,
 UPDATE_PROFILE: `${BASE_URL}api/v1/update`,
};
