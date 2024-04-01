// import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ADDITEMTOCART, SHOW_CART } from '../../store/cart';

import { BsBalloonHeartFill } from 'react-icons/bs'
import { ADDTOWISHLIST, DELETEITEMFROMWISHLIST, SHOW_WISHLIST } from '../../store/wishList';
import { useEffect, useState } from 'react';
import { OPEN_AUTH_MODAL } from '../../store/auth';

type itemProps = {
    id: number,
    name: string,
    pic: string,
    price: number,
}

export const ItemElement = ({ id, name, pic, price }: itemProps) => {
  const token = useAppSelector(state => state.auth.token);
  const [ isInCart, setIsInCart ] = useState(false);
  const cartItems = useAppSelector(state => state.cartOps.cartItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const index = cartItems.findIndex(el => el.id === id);
    if(index >= 0) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [id, cartItems]);

  const addItemToCartHandler = () => {
    dispatch(SHOW_CART());
    dispatch(DELETEITEMFROMWISHLIST(id));
    dispatch(ADDITEMTOCART({ id: id, name: name, image: pic, price: price })); 
  }

  const addToWishList = () => {
    dispatch(SHOW_WISHLIST());
    dispatch(ADDTOWISHLIST({ id: id, name: name, image: pic, price: price }));
  }

  return (
    <motion.div variants={{ 
      hidden: { opacity: 0 }, 
      show: { opacity: 1 }, 
    }} 
    className='min-w-[89%] md:min-w-[30rem] w-[90%] md:w-[30rem] h-[20rem] md:h-[30rem] px-[1rem] bg-gray-200 hover:bg-slate-300 py-[0.5rem] flex 
    flex-col justify-evenly items-start rounded-xl duration-150 hover:duration-150'>
        <h2 className='font-bold my-[1rem]'>{name}</h2>
        <div className='bg-transparent w-[90%] h-[75%] rounded-xl relative'>
            <img src={pic} className='w-[100%] h-[100%] object-contain rounded-xl bg-white' alt="the product" />
            { !isInCart ? <BsBalloonHeartFill size={40} className='absolute top-[-1rem] right-2 bg-white text-red-700 rounded-full shadow-sm shadow-red-700 
            p-1 hover:scale-125 hover:duration-150 duration-150' title='Add To Wish List?' onClick={() => { token ? addToWishList() : 
            dispatch(OPEN_AUTH_MODAL()) }}/> : null}
        </div>
        <div className=''>
            <p>{price}</p>
            <button className='bg-gray-400 px-3 rounded-md font-semibold duration-150 hover:bg-gray-700 hover:text-white 
            hover:duration-150' title='Add' onClick={() => { token ? addItemToCartHandler() : dispatch(OPEN_AUTH_MODAL())}}>Add To Cart</button>
        </div>
        
    </motion.div>
  )
}
