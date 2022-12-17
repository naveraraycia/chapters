import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../../firebase.config";

const initialState = {
  entry: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}


/////////////////////////////////////////////////////////////
export const createEntry = createAsyncThunk('entries/createEntry', async(formData, thunkAPI)=>{
  try{
    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'entries'), formDataCopy)
    const message = 'Chapter successfully saved!'
    return message
  }catch(error){
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

////////////////////////////////////////////////////////////


export const createEntrySlice = createSlice({
  name: 'createEntry',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(createEntry.pending, (state)=> {
      state.isLoading = true
    })
    .addCase(createEntry.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload
    })
    .addCase(createEntry.rejected, (state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
})

export const {reset} = createEntrySlice.actions
export default createEntrySlice.reducer