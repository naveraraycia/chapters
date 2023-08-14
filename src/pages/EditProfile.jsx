import Navbar from "../components/Navbar"
import Button from "../components/Button"
import editImg from '../assets/svg/editProfilePage.svg'
import Spinner from "../components/Spinner"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore'
import { db } from "../firebase.config"
import { logout, updateProfileData } from "../features/auth/authSlice"


function EditProfile() {
  const dispatch = useDispatch()
  const auth = getAuth()
  const navigate = useNavigate()


  const {user, isLoading, isError, message} = useSelector((state)=> state.auth)
  
  
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name
  })
  
  const {email, name} = formData

  useEffect(()=>{
    if(isError){
      if (message === 'Error (auth/invalid-email).'){
        toast.error('Please enter a valid email')
      } else if (message === 'Error (auth/network-request-failed).'){
        toast.error('Please check your internet connection')
      } else if(message === 'Error (auth/email-already-in-use).'){
        toast.error('This email is already in use')
      } else if(message === 'Error (auth/requires-recent-login).'){
        toast.error('For security purposes please reauthenticate by signing in again before updating your email.', {autoClose: 6000})
        dispatch(logout())
        navigate('/login')
      }
      console.log(message);
    }
    

  },[message, isError])

  async function onSubmit(e){
    e.preventDefault()
    dispatch(updateProfileData(formData))
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  async function onFileUpload(e){
    if(e.target.files[0]){
      const storage = getStorage()
      const fileRef = ref(storage, 'images/' + auth.currentUser.uid)
      uploadBytes(fileRef, e.target.files[0]).then(()=> {
        getDownloadURL(fileRef).then((url)=>{

            const userRef = doc(db, 'users', auth.currentUser.uid)
            updateDoc(userRef, {
              profileImg: url
            })

            dispatch(updateProfileData(formData))
            
          }).catch(error => {
            console.log(error);
          })
        }).catch(error => {
          console.log(error)
        })
        
        toast.success('Photo uploading', {autoClose: 2500})
      }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className='flex flex-col justify-between min-h-screen'> 
    <div>
      <Navbar />
      <div className='flex flex-col items-center justify-center mx-auto w-full max-w-[1800px]  space-y-20 px-5 pt-0 pb-10 sm:px-10 md:pb-16'>
        <div className="bg-white p-10 md:py-12 md:px-20 rounded-[50px] font-sans text-darkBlueGreen flex flex-col justify-center items-center space-y-5 w-full xl:justify-center lg:flex-row xl:space-x-5 xl:space-y-0">
            
            <div className="flex flex-col space-y-5 order-2 lg:order-1">
              <div className="flex flex-col space-y-1">
                <h1 className="text-4xl font-black text-center lg:text-left">Edit your Profile</h1>
                <p className="text-md leading-[181.5%] text-center lg:text-left xl:text-lg">We suggest you add a profile picture to complete setting up your account.</p>
              </div>

              <p className="text-md leading-[181.5%] text-center w-fit font-bold hover:cursor-pointer hover:underline lg:text-left xl:text-lg"><Link to='/home'>back to Home</Link></p>

            </div>

            <img src={editImg} alt="Home" className='flex w-[250px] order-1 lg:order-2 xl:w-[350px]' />
        </div>

        <div className="flex flex-col space-y-10 justify-center items-center lg:flex-row xl:space-y-0 xl:space-x-20">
          <div className="flex flex-col items-center justify-center space-y-5">
            <img src={user.profileImg} alt="Profile Pic" className="w-[200px] h-[200px] object-cover rounded-full border-white border-[4px]" />
            <div className="flex flex-col items-center justify-center space-y-3">
              <label>
                <input type="file" className="inline text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold file:font-sans
                file:bg-white file:text-darkBlueGreen
                hover:file:bg-darkenedSkyBlue hover:cursor-pointer
                " accept='.jpg,.png,.jpeg' onChange={onFileUpload}/>
              </label>
            
            </div>
          </div>

          <form className='space-y-10' onSubmit={onSubmit}>
            <div className='space-y-5'>

              <input type="text" className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen bg-transparent" id='name' placeholder='Name' required value={name} onChange={onChange} />

              <input type="email" className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen bg-transparent" id='email' placeholder='Email' required value={email} onChange={onChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="appleseed@email.com" />
              
            </div>

              <Button type={'submit'} size={'medium'} width={'full'}>Save Changes</Button>        
          </form>
        </div>

      </div>
      </div>

      <Footer />
    </div>
  )
}

export default EditProfile