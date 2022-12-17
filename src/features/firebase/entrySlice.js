import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getAuth } from 'firebase/auth'
import { collection, getDocs, doc, getDoc, query, where, orderBy, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../../firebase.config";

const auth = getAuth()

const initialState = {
  entries: [],
  entry: {},
  isErrorEntry: false,
  isLoadingEntry: false,
  isSuccessEntry: false,
  messageEntry: ''
}

export const fetchEntries = createAsyncThunk('entries/fetchEntries', async(thunkAPI)=> {
  try{
    const entriesRef = collection(db, 'entries')
    const q = query(entriesRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
    const querySnap = await getDocs(q)

    let entries = []

    querySnap.forEach((docItem)=>{
      const dataDate = docItem.data().timestamp
      let actualDate = new Date(dataDate.seconds * 1000 + dataDate.nanoseconds/1000000)

      let month, day, year, fullDate

      month = actualDate.getMonth() + 1
      day = actualDate.getDate()
      year = actualDate.getFullYear()
      fullDate = `${month}-${day}-${year}`

      const dataCopy = {
        userRef: docItem.data().userRef,
        title: docItem.data().title,
        text: docItem.data().text
      }

      return entries.push({
          id: docItem.id,
          data: dataCopy,
          timestamp: fullDate
      })

    })
    
    return entries
  } catch(error) {
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

// ////////////////////////////////////////
export const fetchEntry = createAsyncThunk('entries/fetchEntry', async(entryId, thunkAPI)=>{
  try {
    const docRef = doc(db, 'entries', entryId)
    const docSnap = await getDoc(docRef)
    const dataDate = docSnap.data().timestamp
      let actualDate = new Date(dataDate.seconds * 1000 + dataDate.nanoseconds/1000000)

      let month, day, year, fullDate

      month = actualDate.getMonth() + 1
      day = actualDate.getDate()
      year = actualDate.getFullYear()
      fullDate = `${month}-${day}-${year}`

    const dataCopy = {
      title: docSnap.data().title,
      text: docSnap.data().text,
      timestamp: fullDate,
    }
   
    return dataCopy
  } catch(error) {
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

// ////////////////////////////////////////
export const deleteEntry = createAsyncThunk('entries/deleteEntry', async(entryId, thunkAPI)=> {
  try {
    await deleteDoc(doc(db, 'entries', entryId))
    const message = 'Chapter successfully deleted!'
    return message
  } catch(error) {
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

// ////////////////////////////////////////
export const updateEntry = createAsyncThunk('entries/updateEntry', async(entryData, thunkAPI)=>{
  try {
    const docRef = doc(db, 'entries', entryData.entryId)
    await updateDoc(docRef, {
      title: entryData.title,
      text: entryData.text,
      timestamp: serverTimestamp()
    })
    
      // Fetch data again to update redux state with new data from above
      const docRef2 = doc(db, 'entries', entryData.entryId)
      const docSnap = await getDoc(docRef2)
  
      const dataDate = docSnap.data().timestamp
      let actualDate = new Date(dataDate.seconds * 1000 + dataDate.nanoseconds/1000000)

      let month, day, year, fullDate

      month = actualDate.getMonth() + 1
      day = actualDate.getDate()
      year = actualDate.getFullYear()
      fullDate = `${month}-${day}-${year}`

      const dataCopy = {
        title: docSnap.data().title,
        text: docSnap.data().text,
        timestamp: fullDate,
      }
      return dataCopy
  } catch(error) {
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }

})


export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchEntries.pending, (state) => {
      state.isLoadingEntry = true
    })
    .addCase(fetchEntries.fulfilled, (state, action) => {
      state.isLoadingEntry = false
      state.isSuccessEntry = true
      state.entries = action.payload
    })
    .addCase(fetchEntries.rejected, (state, action) => {
      state.isLoadingEntry = false
      state.isErrorEntry = true
      state.messageEntry = action.payload
    })
    .addCase(fetchEntry.pending, (state)=>{
      state.isLoadingEntry = true
    })
    .addCase(fetchEntry.fulfilled, (state, action)=>{
      state.isLoadingEntry = false
      state.isSuccessEntry = true
      state.entry = action.payload
    })
    .addCase(fetchEntry.rejected, (state, action)=>{
      state.isLoadingEntry = false
      state.isErrorEntry = true
      state.messageEntry = action.payload
    })
    .addCase(deleteEntry.pending, (state)=>{
      state.isLoadingEntry = true
    })
    .addCase(deleteEntry.fulfilled, (state,action)=>{
      state.isLoadingEntry = false
      state.isSuccessEntry = true
      state.messageEntry = action.payload
    })
    .addCase(deleteEntry.rejected, (state,action)=>{
      state.isLoadingEntry = false
      state.isErrorEntry = true
      state.messageEntry = action.payload
    })
    .addCase(updateEntry.pending, (state)=>{
      state.isLoadingEntry = true
    })
    .addCase(updateEntry.fulfilled, (state,action)=>{
      state.isLoadingEntry = false
      state.isSuccessEntry = true
      state.entry = action.payload
    })
    .addCase(updateEntry.rejected, (state,action)=>{
      state.isLoadingEntry = false
      state.isErrorEntry = true
      state.messageEntry = action.payload
    })
  }
})

export const {reset} = entrySlice.actions
export default entrySlice.reducer