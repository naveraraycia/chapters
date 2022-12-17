import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAuth, onAuthStateChanged, updateEmail, updateProfile} from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../../firebase.config";

const data = JSON.parse(localStorage.getItem('profileImg'))

const auth = getAuth()

const initialState = {
  profileData: data ? data : {},
  isErrorProfileImg: false,
  isLoadingProfileImg: false,
  isSuccessProfileImg: false,
  messageProfile: ''
}

export const fetchProfileData = createAsyncThunk('firebase/profileDataFetch', async(thunkAPI)=>{
    const auth = getAuth()
    const docRef = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(docRef)

    const dataCopy = {
      name: docSnap.data().name,
      email: docSnap.data().email,
      profileImg: docSnap.data().profileImg,
    }
    localStorage.setItem('profileImg', JSON.stringify(dataCopy))

    return dataCopy
})

export const updateProfileData = createAsyncThunk('firebase/updateProfile', async(userData, thunkAPI)=>{
  try{
    await updateProfile(auth.currentUser, {
      displayName: userData.name
    })

    await updateEmail(auth.currentUser, userData.email)

    const userRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userRef, {
      name: userData.name,
      email: userData.email
    })

    // Fetch data again to update redux state with new data from above
    const docRef = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(docRef)

    const dataCopy = {
      name: docSnap.data().name,
      email: docSnap.data().email,
      profileImg: docSnap.data().profileImg,
    }
    localStorage.setItem('profileImg', JSON.stringify(dataCopy))

    localStorage.setItem('user', JSON.stringify(dataCopy))

    return dataCopy
  }catch(error){
    return thunkAPI.rejectWithValue(error)
  }
})


export const profileSlice = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {
    reset: (state) =>  {
      state.isErrorProfileImg = false
      state.profileData = null
      state.isLoadingProfileImg = false
      state.isSuccessProfileImg = false
      state.messageProfile = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProfileData.pending, (state) => {
      state.isLoadingProfileImg = true
    })
    .addCase(fetchProfileData.fulfilled, (state, action) => {
      state.isLoadingProfileImg = false
      state.isSuccessProfileImg = true
      state.profileData = action.payload
    })
    .addCase(fetchProfileData.rejected, (state, action) => {
      state.isLoadingProfileImg = false
      state.isErrorProfileImg = true
    })
    .addCase(updateProfileData.pending, (state) => {
      state.isLoadingProfileImg = true
    })
    .addCase(updateProfileData.fulfilled, (state, action) => {
      state.isLoadingProfileImg = false
      state.isSuccessProfileImg = true
      state.profileData = action.payload
    })
    .addCase(updateProfileData.rejected, (state, action) => {
      state.isLoadingProfileImg = false
      state.isErrorProfileImg = true
      state.messageProfile = action.payload
    })
 
  }
})

export const {reset} = profileSlice.actions
export default profileSlice.reducer