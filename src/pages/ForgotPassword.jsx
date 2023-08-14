import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { forgotPassword, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import Spinner from '../components/Spinner'

function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isError, isSuccess, isLoading, message} = useSelector(state => state.auth)

  const[email, setEmail] = useState('')

  useEffect(()=>{
    if(isError) {
      toast.error(message)
      console.log(message)
    }

    if(isSuccess) {
      toast.success(message)
    }

    dispatch(reset())
  },[isError, isSuccess, message])

  function onChange(e){
    setEmail(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
    
    <div className='justify-center mx-auto w-full max-w-[1800px] lg:pt-16 lg:px-36 flex flex-col lg:space-y-10  lg:items-center'>
      <p className="hidden font-sans z-40 text-5xl self-start font-black text-darkBlueGreen hover:cursor-pointer lg:block" onClick={()=> navigate('/') }>chapters</p>

    <div className="h-screen py-10 px-5 lg:py-16 md:px-32 font-sans lg:h-auto lg:w-fit flex flex-col items-center justify-start space-y-5 bg-white lg:rounded-[50px]">
      <div className="pb-5 lg:hidden">
        <p className="font-sans text-5xl font-black text-darkBlueGreen hover:cursor-pointer lg:hidden" onClick={()=> navigate('/') }>chapters</p>
      </div>
      
      <div className="flex flex-col space-y-5 items-center justify-center text-darkBlueGreen">
        <p className=" text-4xl font-black">Forgot Password</p>
        <p className="font-light text-lg max-w-lg text-center">Enter your registered email and we’ll send you a link for resetting your password.</p>
      </div>
      
      <p className="font-light text-lg text-lighterOrange max-w-lg text-center">Look for the email on your spam folder.</p>

      <form className='space-y-10 w-full' onSubmit={onSubmit}>
        <input type="email" className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='email' value={email} onChange={onChange} placeholder='Email' />
        
        <div className="flex flex-col items-center justify-center space-y-5">
            <Button type={'submit'} size={'medium'} width={'full'}>Send Reset Link</Button>
            <p className="font-sans text-md text-darkBlueGreen font-light">back to <Link to='/login' className='font-bold hover:underline'>Log in</Link></p>
        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default ForgotPassword