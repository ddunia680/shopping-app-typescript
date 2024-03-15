// import React from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '../../store/hooks';
import { DECREMENTITEM, INCREMENTITEM } from '../../store/cart';
import { motion } from 'framer-motion';

interface cartItemType {
    id: number,
    image: string,
    name: string,
    pieces: number,
}


export const CartItem = ({ id, image, name, pieces }: cartItemType) => {
  const dispatch = useAppDispatch();
  
  return (
    <motion.div  variants={{ 
      hidden: { opacity: 0 }, 
      show: { opacity: 1 }, 
    }}
    className='min-h-[3rem] py-[0.7rem] md:py-[1rem] bg-gray-700 my-[0.5rem] w-[100%] flex justify-between items-center px-[0.5rem]'>
        <img src={image} alt="the image" className='w-[2rem] h-[2rem] rounded-lg bg-white object-contain'/>
        <h3 className='font-bold text-white'>{name}</h3>
        <div className='w-[4rem] md:w-[5rem] h-[100%] flex flex-row justify-between items-center'>
            <div className='p-[0.2rem] md:p-[0.3rem] rounded-lg border-[1px] border-gray-700 hover:border-white hover:text-white' 
            title='Add' onClick={() => dispatch(INCREMENTITEM(id))}>
              <PlusIcon className='w-[0.6rem] md:w-[0.7rem]'/>
            </div>
            <label className='font-bold text-white text-sm md:text-md'>{pieces}</label>
            <div className='p-[0.2rem] md:p-[0.3rem] rounded-lg border-[1px] border-gray-700 hover:border-white hover:text-white' 
            title='Reduce' onClick={() => dispatch(DECREMENTITEM(id))}>
              <MinusIcon className='w-[0.6rem] md:w-[0.7rem]'/>
            </div>
        </div>
    </motion.div>
  )
}
