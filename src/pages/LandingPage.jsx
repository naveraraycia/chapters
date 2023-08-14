import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Button from "../components/Button"
import landingImg from '../assets/svg/landingPage.svg'

function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="py-5 px-5 sm:px-10 mx-auto w-full max-w-[1800px]">
        <div className="flex flex-col items-center xl:items-start justify-between space-y-10 xl:flex-row md:space-y-0 md:space-x-10">
          <div className="flex flex-col space-y-10 order-2 xl:order-1">
            <div className="flex flex-col space-y-5">
              <h1 className="font-sans text-4xl font-black text-darkBlueGreen text-center xl:text-left xl:text-6xl xl:max-w-xs xl:leading-[130.5%]">Capture life stories</h1>
              <p className="font-sans text-2xl text-center leading-[181.5%] text-darkBlueGreen max-w-2xl xl:text-left xl:leading-[181.5%]">Keep a journal of your thoughts, feelings, or anything else you need to remember. Make your stories alive!</p>
            </div>

            <div onClick={()=> navigate('/home')}>
              <Button size={'large'} rounded={true}>Create a chapter</Button>
            </div>
          </div>

          <img src={landingImg} alt="landing" className="order-1 w-[450px] xl:w-[650px] xl:order-2" />
        </div>
        
      </div>
    </>
  )
}

export default LandingPage