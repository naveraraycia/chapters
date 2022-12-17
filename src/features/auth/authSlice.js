import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'


const user = JSON.parse(localStorage.getItem('user'))

const auth = getAuth()

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register / Sign Up Action
export const register = createAsyncThunk('auth/register', async(userData, thunkAPI)=>{
  try{
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    const user = userCredential.user
    updateProfile(auth.currentUser, {
        displayName: userData.name
    })

    const userDataCopy = userData

    delete userDataCopy.password
    delete userDataCopy.password2
    
    await setDoc(doc(db, 'users', user.uid), userDataCopy)

    const createdUser = {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      profileImg: userData.profileImg
    }

    localStorage.setItem('user', JSON.stringify(createdUser))

    return createdUser
    
  } catch (error) {
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////
// Login Action
export const login = createAsyncThunk('auth/login', async(userData, thunkAPI)=>{
  try{
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, userData.email, userData.password)

      const docRef = doc(db, 'users', auth.currentUser.uid)
      const docSnap = await getDoc(docRef)
  
      const dataCopy = {
        name: docSnap.data().name,
        email: docSnap.data().email,
        profileImg: docSnap.data().profileImg,
      }
      localStorage.setItem('user', JSON.stringify(dataCopy))
  
      return dataCopy
    
  } catch(error) {
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////
// Logout Action
export const logout = createAsyncThunk('auth/logout', async(thunkAPI)=>{
  localStorage.removeItem('user')
  localStorage.removeItem('boredAPI')
  localStorage.removeItem('quoteAPI')
  localStorage.removeItem('uid')
  auth.signOut()

})


////////////////////////////////////////////////////////////////////////////////////////
// Forget Password Action
export const forgotPassword = createAsyncThunk('auth/forgot-password', async(userEmail, thunkAPI)=>{
  try {
    const auth = getAuth()
    await sendPasswordResetEmail(auth, userEmail)

    const successMessage = 'Your password reset email has been sent!'
    return successMessage
  } catch (error) {
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////
// Update Profile Action
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

    localStorage.setItem('user', JSON.stringify(dataCopy))

    return dataCopy
  }catch(error){
    const e = error.message.replace('Firebase: ', '')
    return thunkAPI.rejectWithValue(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      //  don't reset the user field
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state)=> {
      state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    .addCase(login.pending, (state)=> {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action)=> {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    .addCase(login.rejected, (state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    .addCase(forgotPassword.pending, (state)=> {
      state.isLoading = true
    })
    .addCase(forgotPassword.fulfilled, (state, action)=> {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload
    })
    .addCase(forgotPassword.rejected, (state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(updateProfileData.pending, (state) => {
      state.isLoading = true
    })
    .addCase(updateProfileData.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
      state.message = ''
    })
    .addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null
      state.message = ''
    })
  }
})

export const {reset, resetMessage} = authSlice.actions

export default authSlice.reducer
