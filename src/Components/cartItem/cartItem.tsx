// import React from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DECREMENTITEM, INCREMENTITEM, REMOVEFROMCART } from '../../store/cart';
import { motion } from 'framer-motion';
import axios from '../../../axios';

interface cartItemType {
    id: string,
    image: string,
    name: string,
    price: number,
    pieces: number,
}


export const CartItem = ({ id, image, name, price, pieces }: cartItemType) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  const removeItemFromRemoteCart = () => {
    const theData = new FormData();
    theData.append('itemId', id);
    theData.append('itemPrice', price.toString());


    axios.post('/removeFromCart/', theData, { headers: { Authorization: 'Bearer '+ token }})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err); 
    })
  }

  const issueDecrement = () => {
    if(pieces > 1) {
      const theData = new FormData();
      theData.append('itemId', id);
      theData.append('itemPrice', price.toString());

      dispatch(DECREMENTITEM(id));
      axios.post('/decrementCartItem/', theData, { headers: { Authorization: 'Bearer '+ token }})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

    } else {
      dispatch(REMOVEFROMCART(id));
      removeItemFromRemoteCart()
    }
  }

  const issueIncrement = () => {
    const theData = new FormData();
    theData.append('itemId', id);
    theData.append('itemPrice', price.toString());

    dispatch(INCREMENTITEM(id));
    axios.post('/incrementCartItem/', theData, { headers: { Authorization: 'Bearer '+ token }})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  return (
    <motion.div  variants={{ 
      hidden: { opacity: 0 }, 
      show: { opacity: 1 }, 
    }}
    className='min-h-[3rem] py-[0.7rem] md:py-[1rem] bg-gray-700 my-[0.5rem] w-[100%] flex justify-between items-center px-[0.5rem]'>
        <img src={image} alt="the image" className='w-[2rem] h-[2rem] rounded-lg bg-white object-contain'/>
        <h3 className='font-bold text-white'>{name.substring(0, 15).concat('...')}</h3>
        <div className='w-[4rem] md:w-[5rem] h-[100%] flex flex-row justify-between items-center'>
            <div className='p-[0.2rem] md:p-[0.3rem] rounded-lg border-[1px] border-gray-700 hover:border-white hover:text-white' 
            title='Add' onClick={() => issueIncrement()}>
              <PlusIcon className='w-[0.6rem] md:w-[0.7rem]'/>
            </div>
            <label className='font-bold text-white text-sm md:text-md'>{pieces}</label>
            <div className='p-[0.2rem] md:p-[0.3rem] rounded-lg border-[1px] border-gray-700 hover:border-white hover:text-white' 
            title='Reduce' onClick={() => issueDecrement()}>
              <MinusIcon className='w-[0.6rem] md:w-[0.7rem]'/>
            </div>
        </div>
    </motion.div>
  )
}
