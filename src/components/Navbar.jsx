import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { logout } from '../features/auth/authSlice'
import { reset as boredReset } from '../features/externalAPI/boredAPISlice'
import { reset as quoteReset } from '../features/externalAPI/quoteSlice'
import { reset as profileImgReset } from '../features/firebase/profileImgSlice'
import Button from './Button'
import { getAuth } from 'firebase/auth'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const auth = getAuth()

  const {user} = useSelector((state)=> state.auth)

  useEffect(()=>{

  },[])

  // Active class function
  function pathMatchRoute(route) {
    if(route === location.pathname){
      return true
    }
  }

  function onLogout(){
    auth.signOut()
    dispatch(logout())
    dispatch(boredReset())
    dispatch(quoteReset())
    dispatch(profileImgReset())
    navigate('/')
  }

  // Toggle menu function (hamburger menu)
  function toggleMenu() {
    const hamburgerIcon = document.getElementById('menu-btn')
    const mobileMenu = document.getElementById('menu')
    hamburgerIcon.classList.toggle('open')
    mobileMenu.classList.toggle('flex')
    mobileMenu.classList.toggle('hidden')
  }

  return (
    <>
    <nav className='flex items-center justify-between px-5 py-10 md:py-16 md:px-36'>
      <p className="font-sans z-40 text-5xl font-black text-darkBlueGreen hover:cursor-pointer" onClick={()=> navigate('/') }>chapters</p>

      <ul className='hidden h-10 font-sans text-2xl font-bold lg:flex lg:items-center lg:space-x-8 '>
        
        {user ? (
          <>   
            <li onClick={onLogout}>
              <Button size={'medium'} rounded={true}>Log Out</Button>
            </li>

            <li onClick={()=> navigate('/home')}>
              <p className={`text-darkBlueGreen ${pathMatchRoute('/home') && 'font-black border-b-2 border-b-darkBlueGreen'} text-lg hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen`}>Home</p>
          </li>
          </>
        ) : (
          <>         
            <li onClick={()=> navigate('/login')}>
              <Button size={'medium'} rounded={true}>Log In</Button>
            </li>

            <li onClick={()=> navigate('/sign-up')}>
              <p className={`text-darkBlueGreen ${pathMatchRoute('/sign-up') && 'font-black border-b-2 border-b-darkBlueGreen'} text-lg hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen`}>Sign Up</p>
            </li>
          </>
        )}
        

        <li onClick={()=> navigate('/about')}>
          <p className={`text-darkBlueGreen ${pathMatchRoute('/about') && 'font-black border-b-2 border-b-darkBlueGreen'} text-lg hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen`}>About app</p>
        </li>
      </ul>

      {/* Hamburger icon */}
      <div className="lg:hidden">
          <button id="menu-btn" onClick={toggleMenu} type="button" className="z-40 block hamburger lg:hidden focus:outline-none">
            <span className='hamburger-top bg-darkBlueGreen'></span>
            <span className='hamburger-middle bg-darkBlueGreen'></span>
            <span className='hamburger-bottom bg-darkBlueGreen'></span>
          </button>
        </div>
    </nav>

    {/* Mobile Menu */}
    <ul id="menu" className="absolute top-0 bottom-0 left-0 hidden flex-col items-center w-full min-h-screen font-sans font-bold text-2xl px-5 md:px-36 pt-40 space-y-10 mobile-overlay">

    {user ? (
      <>
          <li onClick={onLogout} className='w-full'>
            <Button width={'full'} size={'medium'} rounded={true}>Log Out</Button>
          </li>

          <li onClick={()=> navigate('/home')}>
            <p className={`text-darkBlueGreen w-fit ${pathMatchRoute('/home') && 'font-black border-b-2 border-b-darkBlueGreen'} hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen text-center`}>Home</p>
          </li>
      </>
          
        ) : (
          <>         
            <li onClick={()=> navigate('/login')} className='w-full'>
              <Button width={'full'} size={'medium'} rounded={true}>Log In</Button>
            </li>

            <li onClick={()=> navigate('/sign-up')}>
              <p className={`text-darkBlueGreen w-fit ${pathMatchRoute('/sign-up') && 'font-black border-b-2 border-b-darkBlueGreen'} hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen text-center`}>Sign Up</p>
            </li>
          </>
        )}

        <li onClick={()=> navigate('/about')}>
          <p className={`text-darkBlueGreen w-fit ${pathMatchRoute('/about') && 'font-black border-b-2 border-b-darkBlueGreen'} hover:cursor-pointer hover:border-b-2 hover:border-b-darkBlueGreen text-center`}>About app</p>
        </li>

        
    </ul>
    </>
  )
}

export default Navbar