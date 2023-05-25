import { noteActions } from '../slice/note';
import { createAsyncThunk } from '@reduxjs/toolkit';

import useHttp from '../../hooks/useHttp';

export const fetchNotes = createAsyncThunk(
  'note/fetchNotes',
  async ({ token }, { dispatch }) => {
    dispatch(noteActions.loading(true));

    try {
      const loadedNotes = [];

      const response = await useHttp({
        url: 'http://localhost:8000/api/notes/',
        token,
      });

      const data = response.response;

      for (const key in data) {
        loadedNotes.push({
          id: data[key]._id,
          note: data[key].note,
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
      const data = await useHttp({
        method: 'post',
        url: 'http://localhost:8000/api/notes/write',
        values: { note },
        token,
      });

      const noteData = {
        note: data.note.note,
        id: data.note._id,
      };
      dispatch(noteActions.addNote(noteData));
    } catch (error) {
      console.error('Error:', error);
      dispatch(noteActions.setError(error.message));
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async ({ token, noteId }, { dispatch }) => {
    try {
      await useHttp({
        method: 'post',
        url: `http://localhost:8000/api/notes/delete`,
        values: { id: noteId },
        token,
      });

      dispatch(noteActions.removeNote(noteId));
    } catch (error) {
      dispatch(noteActions.setError(error.message));
    }
  }
);
