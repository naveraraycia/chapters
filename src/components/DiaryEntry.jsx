
function DiaryEntry({data, timestamp}) {

  return (
    <div className='group flex flex-col space-y-2 items-center justify-center w-full p-10 sm:py-14 md:px-14 bg-white font-sans rounded-[50px] text-darkBlueGreen hover:bg-darkenedSkyBlue hover:cursor-pointer'>
      <div className="flex flex-col w-full justify-between font-bold text-md md:flex-row lg:text-xl">
        <p className='line-clamp-1'>{data.title}</p>
        <p>{timestamp}</p>
      </div>
     
      <p className="text-lightSkyBlue w-full font-semibold text-md lg:text-lg group-hover:text-[#5BBAC4] line-clamp-1">{data.text}</p>
    </div>
  )
}

export default DiaryEntry