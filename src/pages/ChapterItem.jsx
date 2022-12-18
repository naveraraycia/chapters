import Button from "../components/Button"
import { useNavigate, Link, useParams } from 'react-router-dom'
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import { fetchEntry, deleteEntry, updateEntry, reset } from "../features/firebase/entrySlice"
import { useDispatch, useSelector } from "react-redux"
import Spinner from '../components/Spinner'
import { toast } from "react-toastify"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


function ChapterItem() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const [isDisabled, setIsDisabled] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)


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

  function openModal(){
    setModalIsOpen(true)
  }

  function closeModal(){
    setModalIsOpen(false)
  }

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
      dispatch(deleteEntry(params.entryId))
      navigate('/home')
  }

  if(isLoadingEntry){
    return <Spinner />
  }

  return (
    <div className='flex flex-col justify-between min-h-screen'> 
    <div id="entry" className='flex flex-col space-y-10 px-5 py-10 font-sans text-darkBlueGreen sm:px-10 md:py-16 xl:px-36'>

      <div className='flex flex-col space-y-3 items-center justify-between font-sans text-darkBlueGreen sm:flex-row sm:space-y-0'>
          <p className=" z-40 text-5xl font-black hover:cursor-pointer" onClick={()=> navigate('/') }>chapters</p>
          <p className="text-md sm:text-xl font-semibold w-fit hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen"><Link to='/home'>Back to entries</Link></p>
      </div>

      <form onSubmit={onSubmit} className='flex flex-col space-y-10'>
        <div className="flex flex-col space-y-5 items-center justify-between sm:space-y-0 sm:flex-row sm:space-x-5">
          <div className="flex items-center space-x-3 justify-center font-sans w-full text-darkBlueGreen px-8 py-3 bg-darkenedSkyBlue rounded-[50px] md:flex-row">
            <p className="text-lg font-black">Title:</p>
            <input type="text" maxLength={100} className={`${isDisabled && 'hover:cursor-default'} flex-1 w-full text-md text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none bg-transparent`} id='title' onChange={onChange} value={isDisabled ? entry.title : title} readOnly={isDisabled} />
          </div>

          <div className="w-full flex-1 flex flex-row space-x-3 items-center justify-center md:space-y-0">
            {isDisabled ? (
                <div onClick={()=> setIsDisabled((prevState)=> !prevState)}>
                  <Button width={'full'} color={'orange'} rounded={true} type={'submit'} size={'small'}>Edit</Button> 
                </div>
              ) : (
                <div onClick={()=> setIsDisabled((prevState)=> !prevState)} className=''>
                  <Button width={'full'} color={'mint'} rounded={true} type={'submit'} onClick={()=> setIsDisabled((prevState)=> !prevState)} size={'small'}>Save</Button>
                  </div>
            )}

            <Modal open={modalIsOpen} onClose={closeModal} center >
              <div className="flex flex-col items-center justify-center space-y-5 py-5 px-1 md:p-10 md:space-y-10">
                <p className="font-sans text-xl text-center text-darkBlueGreen font-bold md:text-2xl">Are you sure you want to delete this chapter?</p>
                <div className="w-full flex items-center justify-center space-x-1 sm:space-x-5">
                  <div onClick={closeModal}>
                    <Button rounded={true} color={'red'} size={'small'}>Cancel</Button>
                  </div>

                  <div onClick={onDelete}>
                    <Button rounded={true} color={'mint'} size={'small'}>Delete</Button>
                  </div>
                </div>
              </div>
            </Modal>
            <div onClick={openModal}>
              <Button width={'full'} color={'red'} rounded={true} type={'button'} size={'small'}>Delete</Button>
            </div>
                
          </div>
        </div>

        <div className="flex flex-col py-6 px-8 lg:px-10 bg-white h-fit w-full rounded-[50px]">
          
          <p className="font-sans w-full text-right text-lg font-extrabold">{entry.timestamp}</p>
          <textarea name="message" id="text" cols="30" rows="13" className={`${isDisabled && 'hover:cursor-default'} w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none bg-transparent`} placeholder='Write today’s chapter here ...' onChange={onChange} value={isDisabled ? entry.text : text}  readOnly={isDisabled}></textarea>
        </div>
      </form>

    </div>

      <Footer />
    </div>
  )
}

export default ChapterItem