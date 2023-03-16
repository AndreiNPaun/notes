import axios from 'axios';
import { noteActions } from '../slice/note';

export const fetchNotes = (token) => {
  return async (dispatch) => {
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
    }

    dispatch(noteActions.loading(false));
  };
};

export const deleteNote = (token, noteId) => {
  return async (dispatch) => {
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

      noteActions.removeNote(noteId);
    } catch (error) {
      dispatch(noteActions.error(error.message));
    }
  };
};
