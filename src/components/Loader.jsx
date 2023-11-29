import React from 'react'
import Image from 'next/image'
import loader from '../../public/Spinner-3.gif'
const Loader = () => {
  return (
    <div>
        <Image src={loader} width={50} alt="loader" className='mx-auto'   /> 
    </div>
  )
}

export default Loader