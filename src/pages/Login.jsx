import  { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Button from '../components/Button'
import loginSvg from '../assets/svg/loginPage.svg'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData
  
  useEffect(()=>{
    if(isError) {
      if (message === 'Error (auth/network-request-failed).'){
        toast.error('Please check your internet connection')
      } else if (message === 'Error (auth/invalid-email).'){
        toast.error('Please enter a valid email')
      } else if (message === 'Error (auth/wrong-password).'){
        toast.error('Incorrect password')
      } else if (message === 'Error (auth/user-not-found).'){
        toast.error('This user does not exist')
      } 
    }

    if(isSuccess) {
      navigate('/home')
    }

    dispatch(reset())
  
  },[isError, isSuccess, user, message, navigate, dispatch])

   function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value

    }))
  }

  function onSubmit(e){
    e.preventDefault()
    const userData = {...formData}
    dispatch(login(userData))

  }

  if(isLoading) {
    return <Spinner />
  }

  return (
  
      <div className="flex items-center justify-between">
       
        <div className="hidden lg:flex lg:flex-col items-center justify-center w-1/2 p-10">
        <p className="font-sans z-40 text-3xl font-black text-darkBlueGreen hover:cursor-pointer lg:text-5xl" onClick={()=> navigate('/') }>chapters</p>
          <img src={loginSvg} alt="Login" className='w-[500px]' />
        </div>
        
        
        <div className="flex flex-col space-y-5 w-full bg-white min-h-screen items-center justify-center lg:justify-center p-5 md:px-24 md:py-16 lg:w-1/2">

            <div className="flex flex-col space-y-4 items-center justify-center text-darkBlueGreen">
              <h1 className="font-sans font-black text-4xl text-center xl:text-5xl">Welcome Back</h1>
              <p className="font-sans text-xl max-w-2xl text-center">Log in to start making memories</p>
            </div>

          <form className='space-y-10 w-full' onSubmit={onSubmit}>
            <div className='space-y-5'>

              <input type="email" className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='email' placeholder='Email' value={email} onChange={onChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="appleseed@email.com" />

              <div className="relative flex items-center justify-end">
              <div className='absolute top-5 right-5 hover:cursor-pointer' onClick={()=> setShowPassword((prevState) => !prevState)}>
                {showPassword ? (
                  <FaRegEyeSlash color='#0097A7' size={22} />
                  ) : (
                  <FaRegEye color='#0097A7' size={22} />
                )}
            </div>
                <input type={showPassword ? 'text' : 'password'} className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='password' placeholder='Password' value={password} onChange={onChange} />
              </div>
              
            </div>

            <div className="flex flex-col space-y-5">

              <Button type={'submit'} size={'medium'} width={'full'}>Send</Button>

              <div className="flex flex-col space-y-4">
                <p className="font-sans text-md  w-fit text-darkOrange hover:underline font-bold">
                  <Link to='/forgot-password'>Forgot password?</Link>
                </p>
                <p className="font-sans text-md text-darkBlueGreen font-light">Don't have an account? 
                <Link to='/sign-up' className='font-bold ml-4 hover:underline'>Click here</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login