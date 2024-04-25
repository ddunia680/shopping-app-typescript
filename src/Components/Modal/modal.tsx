// import React from 'react'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import PulseLoader from 'react-spinners/PulseLoader';
import { CartItem } from '../cartItem/cartItem';
import Backdrop from '../Backdrop/backdrop';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CLEARCART, HIDE_CART } from '../../store/cart';
import { useEffect, useState } from 'react';
import WishlistItem from '../WishlistItem/wishlistItem';
import { CLEANWISHLIST, HIDE_WISHLIST } from '../../store/wishList';
import axios from '../../../axios';
import { NOTIFY } from '../../store/errorUI';
import { DISPLAY_ORDER } from '../../store/order';

const slideInOut = {
    hidden: {
      x: '100vw',
      opacity: 0
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 30,
        stiffness: 500
      },
    },
    exit: {
      x: '100vw',
      opacity: 0
    },
}

const gridContainervariants = {
  hidden: 
      { opacity: 0 },
  show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
  },
}

const Modal = () => {
  const [ loading, setLoading ] = useState(false); 
  const cartItems = useAppSelector(state => state.cartOps.cartItems);
  const wishListItems = useAppSelector(state => state.wishList.wishListItems);
  const totalPrice = useAppSelector(state => state.cartOps.totalAmount);
  const showCart = useAppSelector(state => state.cartOps.showCart);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  const [ inWishlist, setInWishlist ] = useState<boolean>(false);
  // console.log(wishListItems);
  

  useEffect(() => {
    if(!showCart) {
      setInWishlist(true);
    }
  }, [showCart]);

  const emptyRemoteCart = () => {
    axios.post('dropTheCart/', null,  { headers: { Authorization: 'Bearer '+ token }})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const emptyRemoteWishlist = () => {
    axios.post('dropwishlist/', null, { headers: { Authorization: 'Bearer '+ token }})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const emptyUIHandler = () => {
    if(inWishlist) {
      dispatch(CLEANWISHLIST());
      emptyRemoteWishlist();
    } else {
      dispatch(CLEARCART());
      emptyRemoteCart();
    }

    if(showCart) {
      dispatch(HIDE_CART())
    } else {
      dispatch(HIDE_WISHLIST())
    }
    // inWishlist ? dispatch(CLEANWISHLIST()) : dispatch(CLEARCART());
    // showCart ? dispatch(HIDE_CART()) : dispatch(HIDE_WISHLIST());
  }

  const closeModal = () => {
    if(showCart) {
      dispatch(HIDE_CART())
    } else {
      dispatch(HIDE_WISHLIST())
    }
  }

  const goToCart = () => setInWishlist(false);

  const makeAnOrder = () => {
    setLoading(true);
    axios.get('issueOrder/', { headers: { Authorization: 'Bearer '+ token }})
    .then(res => {
      setLoading(false);
      dispatch(CLEARCART());
      closeModal();
      console.log(res.data.order);
      const thePulledOrder = res.data.order;
      dispatch(DISPLAY_ORDER({
        showOrder: true, orderId: thePulledOrder._id, customerName: thePulledOrder.customer.username,
        items: thePulledOrder.items, totalAmount: thePulledOrder.totalAmount,
        orderSelected: ''
      }));
      
    })
    .catch(err => {
      setLoading(false);
      dispatch(NOTIFY({ message: err.response?.data.message, isError: true }))
      closeModal();
      console.log(err);
      
    })
  }

  return (
    <Backdrop onClick={() => closeModal()}>
      <motion.div 
        className={['absolute right-1 top-0 z-100 w-[100vw] md:w-[25rem] h-[100vh] border-l-[2px] border-pink-950 flex flex-col justify-between items-start border-r-[2px]', inWishlist ? 'bg-slate-200' : 'bg-purple-200'].join(' ')} onClick={e => e.stopPropagation()}
        variants={slideInOut}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
          <div className='flex flex-row justify-between items-center px-[0.5rem] py-[1rem] w-[100%]'>
              <ArrowLeftIcon title='back?' className='w-[1rem] text-blue-900 font-extrabold' onClick={() => {closeModal()}}/>
              <h2 className='font-extrabold text-lg text-purple-950'>{inWishlist ? 'Wishlist' : 'My Cart'}</h2>
              { inWishlist ?
              wishListItems.length ? 
                <TrashIcon title={inWishlist ? 'Empty the wishList?': 'Empty the cart?'} className='w-[1.5rem] text-red-900 font-extrabold hover:border-[1px] 
              hover:border-slate-400 rounded-md duration-150 hover:duration-150' onClick={() => emptyUIHandler()}/>
              : 
               <p className='text-blue-200'>.</p>
              :
               cartItems.length ? 
                <TrashIcon title={inWishlist ? 'Empty the wishList?': 'Empty the cart?'} className='w-[1.5rem] text-red-900 font-extrabold hover:border-[1px] 
               hover:border-slate-400 rounded-md duration-150 hover:duration-150' onClick={() => emptyUIHandler()}/>
              : 
                <p className='text-blue-200'>.</p>}
          </div>
          <motion.div 
            variants={gridContainervariants}
            initial="hidden"
            animate="show"
            className={[' w-[90%] mx-auto h-[60%] rounded-2xl flex flex-col justify-start items-start overflow-hidden p-[0.5rem] overflow-y-auto', inWishlist ? 'bg-slate-300' : 'bg-purple-300' ].join(' ')}
          >
            { inWishlist ? 
            !wishListItems.length ?
              <p className='mx-auto'>No Items in the WishList</p>
            :
              wishListItems.map(wishItem => (
                <WishlistItem key={wishItem.id} id={wishItem.id} name={wishItem.name} image={wishItem.image} price={wishItem.price} previousPrice={wishItem.previousPrice} goToCart={goToCart} />
              ))
            :
            !cartItems.length ?
              <p className='mx-auto'>No Items in the cart</p> 
            : 
              cartItems.map(itm => (
                <CartItem image={itm.image} key={itm.id} id={itm.id} name={itm.name} price={itm.price} pieces={itm.count} />
              ))}  
          </motion.div>
          { inWishlist ?
            <motion.p className='mx-auto font-semibold hover:underline cursor-pointer' onClick={() => setInWishlist(false)}> Go To Modal? </motion.p>
          :
            <motion.p className='mx-auto font-semibold hover:underline cursor-pointer' onClick={() =>  setInWishlist(true)}> Go To Wishlist? </motion.p>
          }
          <div className='h-[15%] w-[100%] bg-pink-950 rounded-tl-3xl rounded-tr-3xl px-[1rem] flex flex-row justify-evenly items-center 
          '>
            <h2 className='text-white text-lg font-semibold'>Total Amount: <span className='text-orange-200'>$ {totalPrice.toFixed(2)}
            </span></h2>
            <button className='px-[1rem] py-[0.5rem] bg-gradient-to-br from-emerald-400 to-emerald-700  border-[2px] text-white 
            rounded-xl hover:from-pink-950 hover:border-emerald-700 flex justify-start items-end disabled:cursor-not-allowed 
            disabled:from-gray-400' disabled={cartItems.length ? false : true} onClick={() => makeAnOrder()}>
              <span>Order Now</span>
              { loading && <PulseLoader 
                  color={"#ffff"}
                  loading={true}
                  size={3}
              />}
            </button>
          </div>

      </motion.div>
    </Backdrop>
  )
}

export default Modal;
