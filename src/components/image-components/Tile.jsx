import React from 'react'
import Image from 'next/image'
import tile from '../../../public/tile.png'
import card from '../../../public/list.png'
const Tile = ({view, setView}) => {
  return (
    <div className={`${view==="TILE" ? "bg-gray-200 " : ""}p-4 rounded-full `}  onClick={()=> setView("TILE")}>
        <Image src={tile} width={25} alt='tile' className='cursor-pointer' />
    </div>
  )
}

export default Tile