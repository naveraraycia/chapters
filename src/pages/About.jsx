import Navbar from "../components/Navbar"
import Feature from "../components/Feature"
import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"
import bottomWave from '../assets/svg/whiteBottomWave.svg'
import securityImg from '../assets/svg/noteSecurity.svg'
import storageImg from '../assets/svg/storage.svg'

function About() {
  return (
    <>
      <Navbar />

      <section id='description' className="px-5 py-10 my-32 md:px-36">
        <div className="flex flex-col items-start space-y-10">
          <div className="flex flex-col space-y-5">
            <h1 className="font-sans text-4xl font-black text-darkBlueGreen text-center xl:text-left xl:text-5xl xl:leading-[130.5%]">What is chapters?</h1>
            <p className="font-sans text-2xl text-center leading-[181.5%] text-darkBlueGreen max-w-6xl xl:text-left xl:leading-[181.5%] xl:text-2xl">Chapters is a life-long journal that goes with you wherever you go. It is developed for its users to capture notable moments and experiences in their life in a safe and secure web space where only you could access.</p>
          </div>
        </div>
      </section>

      <section id='app-features' className="">
        <div className="px-5 py-10 mt-56 mb-10 md:px-36">
          <h1 className="font-sans text-4xl font-black text-darkBlueGreen text-center xl:text-5xl xl:leading-[130.5%]">What the app offers?</h1>

          <div className="flex flex-col my-20 space-y-32 items-center justify-center lg:flex-row lg:space-y-0 lg:space-x-48">
            <Feature image={storageImg} title={'Note Storage'} description={'Save your moments on the cloud. Chapters is accessible wherever you are as long as you are connected to the internet.'} />

            <Feature image={securityImg} title={'Security'} description={'The app ensures safety of your journal content. No one can access your account and entries but you.'} />
          </div>
        </div>
        <img src={bottomWave} className='w-full' />
      </section>

      <section id="contact-form" className="px-5 bg-white pb-36 pt-28 xl:pt-10 md:px-36">
        <ContactForm />
      </section>

      <Footer />
    </>
  )
}

export default About