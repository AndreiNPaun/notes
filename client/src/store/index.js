import { configureStore } from '@reduxjs/toolkit';

import tokenSlice from './slice/token';
import noteSlice from './slice/note';

const store = configureStore({
  reducer: { token: tokenSlice.reducer, note: noteSlice.reducer },
});

export default store;
