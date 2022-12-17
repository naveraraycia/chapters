import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import externalReducer from '../features/externalAPI/boredAPISlice'
import quoteReducer from '../features/externalAPI/quoteSlice'
import entryReducer from '../features/firebase/entrySlice'
import createEntryReducer from '../features/firebase/createEntrySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    externalAPI: externalReducer,
    quoteAPI: quoteReducer,
    chapterEntry: entryReducer,
    createEntry: createEntryReducer
  },
});
