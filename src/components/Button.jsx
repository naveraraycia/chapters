import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function Button({ width, children, isDisabled, rounded, type, color, size, redirect }) {
  const navigate = useNavigate()
  return (
    <button className={`${rounded && 'rounded-full'} ${color === 'mint' ? 'bg-mint text-darkMint hover:bg-darkerMint' : color === 'orange' ? 'bg-lightOrange text-darkOrange hover:bg-darkerOrange' : color === 'red' ? 'bg-dangerRed text-white hover:bg-darkDangerRed' : color === 'skyBlue' ? 'bg-skyBlue text-darkBlueGreen hover:bg-darkenedSkyBlue hover:cursor-pointer' : 'bg-darkBlueGreen text-white hover:bg-lightBlueGreen' } ${size === 'large' ? 'text-2xl px-10 py-5 w-full xl:w-fit xl:px-16 xl:py-6' : size === 'medium' ? 'text-xl px-10 py-4' : 'text-lg px-8 py-3'} ${width === 'full' && 'w-full'}
     font-sans font-bold hover:cursor-pointer`} onClick={()=> navigate(`${redirect}`)} disabled={isDisabled} type={type}>{children}</button>
  )
}

Button.defaultProps = {
  width: 'fit',
  isDisabled: false,
  rounded: false,
  type: 'button',
  color: 'darkBlueGreen',
  size: 'regular',
  redirect: '#'
}

Button.propTypes ={
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  rounded: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  redirect: PropTypes.string
}

export default Button