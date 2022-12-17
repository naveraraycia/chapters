import Button from "../components/Button"
import { useNavigate, Link, useParams } from 'react-router-dom'
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"
import { fetchEntry, deleteEntry, updateEntry, reset } from "../features/firebase/entrySlice"
import { useDispatch, useSelector } from "react-redux"
import Spinner from '../components/Spinner'
import { toast } from "react-toastify"

function ChapterItem() {
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  const dispatch = useDispatch()

  const [isDisabled, setIsDisabled] = useState(true)

  const {isErrorEntry, isLoadingEntry, isSuccessEntry, messageEntry, entry} = useSelector((state) => state.chapterEntry)
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    entryId: params.entryId
  })

  const {title, text} = formData

  // Clear the state on unmount , this can be done under a single useEffect() or a separate one
  useEffect(()=> {
    return () => {
      if(isSuccessEntry) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccessEntry])

  useEffect(()=>{
    if(isErrorEntry){
      toast.error(messageEntry)
    }

      dispatch(fetchEntry(params.entryId))
  },[messageEntry, dispatch, isErrorEntry, fetchEntry])

  function onSubmit(e){
    e.preventDefault()

    if(isDisabled){
      dispatch(updateEntry(formData))
    } else {
      setFormData((prevState)=>({
        ...prevState,
        title: entry.title,
        text: entry.text
      }))
    }

  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  function onDelete(){
    if(window.confirm('Are you sure you want to delete this chapter?')) {
      dispatch(deleteEntry(params.entryId))
      navigate('/home')
    }
  }

  if(isLoadingEntry){
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
            <input type="text" maxLength={100} className=' flex-1 w-full text-md text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none bg-transparent' id='title' onChange={onChange} value={isDisabled ? entry.title : title} disabled={isDisabled} />
          </div>

          <div className="w-full flex-1 flex flex-row space-x-5 md:space-y-0">
            {isDisabled ? (
                <div onClick={()=> setIsDisabled((prevState)=> !prevState)}>
                  <Button width={'full'} color={'orange'} rounded={true} type={'submit'} size={'small'}>Edit</Button> 
                </div>
              ) : (
                <div onClick={()=> setIsDisabled((prevState)=> !prevState)}>
                  <Button width={'full'} color={'mint'} rounded={true} type={'submit'} onClick={()=> setIsDisabled((prevState)=> !prevState)} size={'small'}>Save</Button>
                  </div>
            )}
            <div onClick={onDelete}>
              <Button width={'full'} color={'red'} rounded={true} type={'button'} size={'small'}>Delete</Button>
            </div>
                
          </div>
        </div>

        <div className="flex flex-col py-6 px-12 lg:px-20 bg-white h-fit w-full rounded-[50px]">
          
          <p className="font-sans w-full text-right text-lg font-extrabold">{entry.timestamp}</p>
          <textarea name="message" id="text" cols="30" rows="13" className=' w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none bg-transparent' placeholder='Write today’s chapter here ...' onChange={onChange} value={isDisabled ? entry.text : text}  disabled={isDisabled}></textarea>
        </div>
      </form>

    </div>

      <Footer />
    </>
  )
}

export default ChapterItem