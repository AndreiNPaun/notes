import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  note: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote(state, action) {
      state.note = action.payload;
    },
    removeNote(state, action) {
      state.note = state.note.filter((note) => note.id !== action.payload);
    },
    loading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
