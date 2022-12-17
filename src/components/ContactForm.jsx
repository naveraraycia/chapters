import { useState } from 'react'
import emailImg from '../assets/svg/contactForm.svg'
import Button from './Button'

function ContactForm() {
  const [formData, setformData] = useState({
    subject: '',
    message: ''
  })

  const {subject, message} = formData


  function onChange(e){
    setformData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))

  }

  return (
    <div className="flex flex-col xl:flex-row xl:space-x-52 items-center justify-center">
      <img src={emailImg} alt="Email" className='hidden w-[450px] xl:block' />

      <div className="flex flex-col space-y-10 items-center justify-center xl:items-start xl:justify-start">
        <div className="flex flex-col space-y-3 text-darkBlueGreen">
          <h1 className="font-sans font-black text-4xl text-center xl:text-left xl:max-w-[300px]">We'd love to hear from you.</h1>
          <p className="font-sans text-xl max-w-2xl text-center xl:text-left">We’ll appreciate your suggestions for the app.</p>
        </div>

        <form className='space-y-10'>
          <div className='space-y-5'>

            <input type="text" className="py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen" id='subject' placeholder='Subject' onChange={onChange} />

            <textarea name="message" id="message" cols="30" rows="1" className='py-3 w-full text-lg text-darkBlueGreen font-sans placeholder:text-lg placeholder:font-sans placeholder:text-[rgba(0,151,167,.54)] focus:outline-none border-b-2 border-b-darkBlueGreen' placeholder='Message' onChange={onChange}></textarea>
          </div>

          <div className="xl:max-w-[280px]">
            <a href={`mailto:support@chapters.com?Subject=${subject}&body=${message}`}>
              <Button type={'button'} size={'medium'} width={'full'}>Send</Button>
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm