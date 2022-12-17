import Button from "../components/Button"
import {useNavigate, Link, useLocation} from 'react-router-dom'
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"
import { reset, createEntry } from '../features/firebase/createEntrySlice'
import { useDispatch, useSelector } from "react-redux"
import Spinner from '../components/Spinner'
import { toast } from "react-toastify"

function Chapter() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = getAuth()
  const dispatch = useDispatch()
  const {isError: isErrorCreate, isLoading: isLoadingCreate, isSuccess: isSuccessCreate, message: messageCreate} = useSelector(state => state.createEntry)
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    userRef: auth.currentUser.uid
  })

  useEffect(()=>{
    
    if(isErrorCreate){
      toast.error(messageCreate)
    }
    
    if(isSuccessCreate){
      toast.success(messageCreate)
      navigate('/home')
      dispatch(reset())
    }
  
  },[messageCreate, isErrorCreate, dispatch, navigate, messageCreate])

  function onSubmit(e){
    e.preventDefault()
    dispatch(createEntry(formData))
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  if(isLoadingCreate){
    return <Spinner />
  }

  return (
    <> 
    <div id="entry" className='flex flex-col space-y-10 px-5 py-10 md:py-16 md:px-36 font-sans text-darkBlueGreen'>

      <div className='flex flex-col space-y-3 items-center justify-between font-sans text-darkBlueGreen sm:flex-row sm:space-y-0'>
          <p className=" z-40 text-5xl font-black hover:cursor-pointer" onClick={()=> navigate('/') }>chapters</p>
          <p className="text-md sm:text-xl font-semibold w-fit hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen"><Link to='/home'>Back to entries</Link></p>
      </div>

      <form onSubmit={onSubmit} className='flex flex-col space-y-10'>
        <div className="flex flex-col space-y-5 items-center justify-between sm:space-y-0 sm:flex-row sm:space-x-5">
          <div className="flex items-center space-x-3 justify-center font-sans w-full text-darkBlueGreen px-8 py-3 bg-darkenedSkyBlue rounded-[50px] md:flex-row">
            <p className="text-lg font-black">Title:</p>
            <input type="text" maxLength={100} className=' flex-1 w-full text-md text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none bg-transparent' id='title' onChange={onChange} />
          </div>

          <div className="w-full flex-1 flex flex-row space-x-5 md:space-y-0">
            <Button width={'full'} color={'mint'} rounded={true} type={'submit'} size={'small'}>Save</Button>
          </div>
        </div>

        <div className="flex flex-col py-6 px-12 lg:px-20 bg-white h-fit w-full rounded-[50px]">
          
          <p className="font-sans w-full text-right text-lg font-extrabold">12-18-22</p>
          <textarea name="message" id="text" cols="30" rows="13" className=' w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none bg-transparent' placeholder='Write today’s chapter here ...' onChange={onChange}></textarea>
        </div>
      </form>

    </div>

      <Footer />
    </>
  )
}

export default Chapter