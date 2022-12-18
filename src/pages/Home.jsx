import { Link } from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { boredAPI } from '../features/externalAPI/boredAPISlice'
import { quoteAPI } from '../features/externalAPI/quoteSlice'
import { fetchEntries, reset } from '../features/firebase/entrySlice'
import Navbar from '../components/Navbar'
import homeImg from '../assets/svg/homePage.svg'
import Button from '../components/Button'
import DiaryEntry from '../components/DiaryEntry'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'


function Home() {
  const { user, isLoading: isLoadingUser, isError: isErrorUser, message: userMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const {data, isError, isSuccess, isLoading, message} = useSelector((state)=> state.externalAPI)

  const {dataQuote, isErrorQuote, isLoadingQuote, isSuccessQuote, messageQuote} = useSelector(state => state.quoteAPI)

  const {entries, isErrorEntry, isLoadingEntry, isSuccessEntry, messageEntry} = useSelector((state)=>state.chapterEntry)

   // Clear the state on unmount , this can be done under a single useEffect() or a separate one
   useEffect(()=> {
    return () => {
      if(isSuccessEntry) {
        dispatch(reset())

      }

    }
  }, [dispatch, isSuccessEntry])

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isErrorQuote){
      toast.error(messageQuote)
    }

   if(isSuccessEntry && messageEntry === 'Chapter successfully deleted!'){
    toast.success(messageEntry)
   }
    
    if(isErrorEntry){
      toast.error(messageEntry)
    }
    
    dispatch(fetchEntries())
    dispatch(boredAPI())
    dispatch(quoteAPI())
    

  },[isError, message, userMessage, isErrorQuote, isSuccessEntry, messageQuote, isErrorEntry, isErrorUser, messageEntry, dispatch])


  if(isLoading || isLoadingQuote || isLoadingUser || isLoadingEntry){
    return <Spinner />
  }

  return (
    <>
      <Navbar />

      <div className='flex flex-col items-center justify-center space-y-10 px-5 pt-0 pb-10 md:pb-16 md:px-36'>
        <div className="bg-white p-10 md:py-12 md:px-20 rounded-[50px] font-sans text-darkBlueGreen flex flex-col justify-center items-center space-y-5 w-full xl:justify-center lg:flex-row xl:space-x-5 xl:space-y-0">
          <img src={homeImg} alt="Home" className='flex w-[250px] xl:w-[350px]' />

          <div className="flex flex-col space-y-5 max-w-lg ">
            <div className="flex flex-col space-y-3">
              
              <h1 className="text-2xl font-semibold text-left">Hello, <span className='font-black'>{user.name}</span>
              </h1>

              <p className="text-md leading-[181.5%] text-left xl:text-lg">Hope you had a wonderful day to share. In case you are bored, <span className='font-bold'>chapters suggest:</span></p>

            </div>
            {isSuccess ? (
              <p className="font-black text-md text-left xl:text-center xl:text-lg">{data.activity}</p>
            ) : (
              <p className="font-black text-md text-left xl:text-center xl:text-lg">Go shopping</p>
            )}

                <div className='lg:max-w-[250px]'>
                  <Button type={'button'} width={'full'} size='small' redirect={'/chapter'} color='skyBlue'>Add chapter</Button>
                </div>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-10 justify-between xl:space-x-10 xl:space-y-0 xl:flex-row">

          <div className="flex-1 flex-col items-center w-full justify-between space-y-10 md:space-y-0 md:space-x-10 md:flex-row xl:w-1/2 ">
            <div className="bg-darkenedSkyBlue rounded-[50px] h-full w-full p-10 flex flex-col space-y-5 items-center justify-center md:flex-row md:space-x-10 md:space-y-0">
              <div className='flex-none'>
                  {user ? (
                    <img src={user.profileImg} alt="Display Photo" className='rounded-full border-[4px] border-white w-[150px] h-[150px] object-cover' />
                  ) : (
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="Display Photo" className='rounded-full border-[4px] border-white w-[150px]' />
                  )}
                    
              </div>

              <div className="font-sans w-full text-darkBlueGreen flex flex-col space-y-5 md:w-fit">
                <div className="flex flex-col space-y-2">

                  <p className="text-2xl font-extrabold capitalize text-center md:text-left">{user.name}</p>
                  <p className='text-center md:text-left'>{user.email}</p>
                </div>
                
      
                <Button size='small' width={'full'} type={'button'} redirect='/edit-profile'>Edit profile</Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex-col w-full h-auto xl:w-1/2 ">
            <div className="bg-darkenedSkyBlue rounded-[50px] p-10 flex flex-col space-y-5 h-full  font-extrabold text-darkBlueGreen font-sans items-center justify-center">
             
             <p className="text-xl text-center">Total Number of chapter entries</p>
             <div className="flex w-full items-center justify-center text-7xl text-center ">{entries.length}</div>

            </div>
          </div>

        </div>

        <div className="flex flex-col space-y-2 items-center justify-center w-full py-14 px-10 bg-darkBlueGreen font-sans text-white rounded-[50px] md:px-16">
          <p className="text-3xl text-center font-extrabold xl:text-3xl">Random Quote</p>
          {isSuccessQuote ? (
            <p className="font-semibold text-md text-center leading-[181.5%] md:text-xl">{dataQuote ? dataQuote.text : ''}</p>
          ): (
            <p className="font-semibold text-lg text-center leading-[181.5%] md:text-xl">Never be afraid to trust an unknown future to a known God.</p>
          )}
        </div>

        <section id='chapter-entries' className='w-full'>
          <div className="flex flex-col mt-20 space-y-10">
            <p className="font-black text-darkBlueGreen text-3xl text-center sm:text-left md:text-4xl">Your chapter entries</p>
            
            {entries && entries.length > 0 ? (
              <div className='flex flex-col space-y-10'>
                {entries.map((entryItem)=>(
                    <Link key={entryItem.id} to={`/chapter/${entryItem.id}`}>
                    <DiaryEntry key={entryItem.id} data={entryItem.data} timestamp={entryItem.timestamp} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="font-semibold text-center text-xl text-darkBlueGreen sm:text-left">No chapter entries yet</p>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Home