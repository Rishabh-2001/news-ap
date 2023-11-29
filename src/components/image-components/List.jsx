import React from 'react'
import Image from 'next/image'
import tile from '../../../public/tile.png'
import card from '../../../public/list.png'
const List = ({view, setView}) => {
  return (
    <div  className={`${view==="LIST" ? "bg-gray-200" : ""} p-4 rounded-full `} onClick={()=> setView("LIST")} >
        <Image src={card} width={25} alt='card' className='cursor-pointer' />
    </div>
  )
}

export default List;