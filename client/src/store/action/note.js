import axios from 'axios';
import { noteActions } from '../slice/note';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotes = createAsyncThunk(
  'note/fetchNotes',
  async ({ token }, { dispatch }) => {
    dispatch(noteActions.loading(true));

    try {
      const response = await axios.get('http://localhost:8000/api/notes/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;
      const loadedNotes = [];
      const resp = data.response;

      for (const key in resp) {
        loadedNotes.push({
          id: resp[key]._id,
          note: resp[key].note,
        });
      }

      dispatch(noteActions.addNote(loadedNotes));
    } catch (error) {
      dispatch(noteActions.setError(error.message));
      return false;
    }

    dispatch(noteActions.loading(false));
  }
);

export const submitNote = createAsyncThunk(
  'note/addNote',
  async ({ note, token }, { dispatch }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/notes/write',
        { note },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
      const noteData = {
        note: data.note.note,
        id: data.note._id,
      };
      dispatch(noteActions.addNote(noteData));
    } catch (error) {
      console.error('Error:', error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async ({ token, noteId }, { dispatch }) => {
    try {
      await axios.post(
        `http://localhost:8000/api/notes/delete`,
        { id: noteId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(noteActions.removeNote(noteId));
    } catch (error) {
      dispatch(noteActions.setError(error.message));
    }
  }
);
