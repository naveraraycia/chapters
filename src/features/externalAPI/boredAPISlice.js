import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const data = JSON.parse(localStorage.getItem('boredAPI'))

const initialState = {
  data: data ? data : '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const boredAPI = createAsyncThunk('externalAPI/boredAPI', async(thunkAPI)=> {
  try {
    const response = await axios.get('http://www.boredapi.com/api/activity?type=recreational')
    
    localStorage.setItem('boredAPI', JSON.stringify(response.data))

    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }

})

export const apiSlice = createSlice({
  name: 'externalAPI',
  initialState,
  reducers: {
    reset: (state) => {
      state.data = null
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(boredAPI.pending, (state)=> {
      state.isLoading = true
    })
    .addCase(boredAPI.fulfilled, (state, action)=> {
      state.isLoading = false
      state.isSuccess = true
      state.data = action.payload
    })
    .addCase(boredAPI.rejected, (state, action)=> {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.data = null
    })
  }
})

export const {reset} = apiSlice.actions

export default apiSlice.reducer