import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serverTimestamp } from 'firebase/firestore'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import signUpSvg from '../assets/svg/signUpPage.svg'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth)

  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    name: '',
    profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  })

  const {email, name, password, password2} = formData

  useEffect(()=>{
    if(isError) {
      if(message === 'Password should be at least 6 characters (auth/weak-password).'){
        toast.error('Password should be at least 6 characters')
      } else if (message === 'Error (auth/email-already-in-use).'){
        toast.error('This email is already registered')
      } else if (message === 'Error (auth/network-request-failed).'){
        toast.error('Please check your internet connection')
      } else if (message === 'Error (auth/invalid-email).'){
        toast.error('Please enter a valid email')
      } else {
        toast.error(message)
      }
    }

    if(isSuccess) {
      navigate('/home')
    }
    
    dispatch(reset())
  },[isError, isSuccess, user, message, navigate, dispatch])

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  async function onSubmit(e){
    e.preventDefault()
 
      if(password !== password2){
        toast.error('Your passwords do not match!')
      } else {
        
        const userData = {...formData}

        userData.timestamp = serverTimestamp()
      
        console.log(userData)
        dispatch(register(userData))
    }
   
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex items-center justify-between">
       
          <div className="flex flex-col space-y-5 w-full bg-white min-h-screen items-center justify-center p-5 md:px-24 md:py-16 lg:w-1/2">

        <div className="flex flex-col space-y-4 items-center justify-center text-darkBlueGreen">
          <h1 className="font-sans font-black text-4xl text-center xl:text-5xl">Sign Up</h1>
          <p className="font-sans text-xl max-w-sm text-center leading-[141.5%]">Create an account to write anytime, anywhere</p>
        </div>

      <form className='space-y-10 w-full' onSubmit={onSubmit}>
        <div className='space-y-5'>

          <input type="text" className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='name' placeholder='Name' value={name} onChange={onChange} required />
          
          <input type="email" className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='email' placeholder='Email' value={email} onChange={onChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="appleseed@email.com" />

          <div className="relative flex items-center justify-end">
            <div className='absolute top-5 right-5 hover:cursor-pointer' onClick={()=> setShowPassword1((prevState) => !prevState)}>
                {showPassword1 ? (
                  <FaRegEyeSlash color='#0097A7' size={22} />
                  ) : (
                  <FaRegEye color='#0097A7' size={22} />
                )}
            </div>
            <input type={showPassword1 ? 'text' : 'password'} className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='password' placeholder='Password' value={password} onChange={onChange} required />
          </div>

          <div className="relative flex items-center justify-end">
            <div className='absolute top-5 right-5 hover:cursor-pointer' onClick={()=> setShowPassword2((prevState) => !prevState)}>
                {showPassword2 ? (
                  <FaRegEyeSlash color='#0097A7' size={22} />
                  ) : (
                  <FaRegEye color='#0097A7' size={22} />
                )}
            </div>
            <input type={showPassword2 ? 'text' : 'password'} className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='password2' placeholder='Confirm Password' value={password2} onChange={onChange} required />
          </div>

        </div>

        <div className="flex flex-col space-y-5">

          <Button type={'submit'} size={'medium'} width={'full'}>Send</Button>
            <p className="font-sans text-md text-darkBlueGreen font-light"> 
            <Link to='/login' className='font-bold hover:underline'>Log in</Link> instead
            </p>
        </div>
      </form>
      </div>

      <div className="hidden lg:flex lg:flex-col items-center justify-center w-1/2 p-10">
        <p className="font-sans z-40 text-3xl font-black text-darkBlueGreen hover:cursor-pointer lg:text-5xl" onClick={()=> navigate('/') }>chapters</p>
        <img src={signUpSvg} alt="Login" className='w-[500px]' />
    </div>
  </div>
  )
}

export default SignUp