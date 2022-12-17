import PropTypes from 'prop-types'

function Feature({image, title, description}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <img src={image} alt="Feature" className='w-[350px]' />
      <div className="flex flex-col space-y-2">
        <p className="font-sans font-black text-3xl text-center text-darkBlueGreen capitalize">{title}</p>
        <p className="font-sans text-darkBlueGreen text-center text-xl max-w-lg leading-[181.5%]">{description}</p>
      </div>
    </div>
  )
}

Feature.defaultProps = {
  image: '',
  title: 'title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab vitae quod sit nihil maiores magni doloribus sed inventore voluptate possimus.'
}

Feature.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Feature