import { PropagateLoader } from 'react-spinners'

function Spinner() {
  return (
        <div className="flex flex-col space-y-7 items-center justify-center p-10 h-screen md:p-20 md:space-y-4">
        <PropagateLoader
        color='#0097A7'
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
  )
}

export default Spinner