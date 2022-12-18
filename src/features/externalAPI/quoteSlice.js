import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const data = JSON.parse(localStorage.getItem('quoteAPI'))

const initialState = {
  dataQuote: data ? data : '',
  isErrorQuote: false,
  isLoadingQuote: false,
  isSuccessQuote: false,
  messageQuote: ''
}

export const quoteAPI = createAsyncThunk('externalAPI/quoteAPI', async(thunkAPI)=> {
  try {

      const response = await axios.get('https://type.fit/api/quotes')
      const randomQuote = Math.floor(Math.random()* response.data.length)
      const quote = response.data[randomQuote]
      localStorage.setItem('quoteAPI', JSON.stringify(quote))

      return quote
  } catch(error){
    return thunkAPI.rejectWithValue(error)

  }
})

export const quoteSlice = createSlice({
  name: 'quoteExternalAPI',
  initialState,
  reducers: {
    reset: (state) => {
      state.dataQuote = null
      state.isLoadingQuote = false
      state.isErrorQuote = false
      state.isSuccessQuote = false
      state.messageQuote = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(quoteAPI.pending, (state) => {
      state.isLoadingQuote = true
    })
    .addCase(quoteAPI.fulfilled, (state, action) => {
      state.isLoadingQuote = false
      state.isSuccessQuote = true
      state.dataQuote = action.payload
    })
    .addCase(quoteAPI.rejected, (state, action) => {
      state.isLoadingQuote = false
      state.isErrorQuote = true
      state.messageQuote = action.payload
      state.dataQuote = null
    })
  }
})

export const {reset} = quoteSlice.actions
export default quoteSlice.reducer