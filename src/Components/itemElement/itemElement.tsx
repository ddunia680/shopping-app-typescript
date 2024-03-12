// import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store/hooks';
import { ADDITEMTOCART } from '../../store/cart';

type itemProps = {
    id: number,
    name: string,
    pic: string,
    price: number,
    openModal: () => void,
}

export const ItemElement = ({ id, name, pic, price, openModal }: itemProps) => {
  const dispatch = useAppDispatch();

  const addItemToCartHandler = () => {
    openModal();
    dispatch(ADDITEMTOCART({ id: id, name: name, image: pic, price: price })); 
  }

  return (
    <motion.div variants={{ 
      hidden: { opacity: 0 }, 
      show: { opacity: 1 }, 
    }} 
    className='min-w-[89%] md:min-w-[30rem] w-[90%] md:w-[30rem] h-[20rem] md:h-[30rem] px-[1rem] hover:bg-slate-300 py-[0.5rem] flex 
    flex-col justify-evenly items-start rounded-xl duration-150 hover:duration-150'>
        <h2 className='font-bold my-[1rem]'>{name}</h2>
        <div className='bg-transparent w-[90%] h-[75%] rounded-xl overflow-hidden'>
            <img src={pic} className='w-[100%] h-[100%] object-contain rounded-xl bg-white' alt="the product" />
        </div>
        <div className=''>
            <p>{price}</p>
            <button className='bg-gray-400 px-3 rounded-md font-semibold duration-150 hover:bg-gray-700 hover:text-white 
            hover:duration-150' title='Add' onClick={() => addItemToCartHandler()}>Add To Cart</button>
        </div>
        
    </motion.div>
  )
}
