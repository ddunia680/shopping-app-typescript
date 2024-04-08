import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import logo from '../../assets/o_logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { ISSUE_LOGOUT, OPEN_AUTH_MODAL, OPEN_AUTH_THROUGH_CART } from '../../store/auth';
import { SHOW_CART } from '../../store/cart';
import { Link } from 'react-router-dom';

export const Header = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(state => state.cartOps.totalAmount);
  const inCartCount = useAppSelector(state => state.cartOps.nbrOfItems);
  const token = useAppSelector(state => state.auth.token);
  const username = useAppSelector(state => state.auth.username);
  const [showLogoutB, setShowLogoutB] = useState(false);

  const authThroughCart = () => {
    dispatch(OPEN_AUTH_THROUGH_CART())
    dispatch(OPEN_AUTH_MODAL());
  }
  
  return (
    <div className='h-[5.1rem] md:h-[7rem] bg-specialGray fixed top-0 left-0 w-[100%] flex justify-between items-center px-[0.5rem] 
    md:px-[2rem] z-[9000] text-gray-200'>
          <Link to='/' >
            <p className='text-lg md:text-2xl font-bold flex justify-start items-center'><img src={logo} className='w-[3rem] h-[3rem] 
            object-contain' alt='the logo' /><span className='hidden md:block'>OnlineStore.Co</span></p>
          </Link>
            <div className='h-full w-[15rem] md:w-[18rem] flex justify-between items-center px-2'>
              <div className='relative w-[10rem] min-w-[3rem] h-full flex flex-col justify-center items-center' onClick={() => { 
                !token ? dispatch(OPEN_AUTH_MODAL()) : null}} onMouseEnter={() => token && setShowLogoutB(true)} onMouseLeave={() => token && showLogoutB && setShowLogoutB(false)}>
                <FaUserCircle title={ token ? `${username}` : 'Click to log in'} size={40} className='rounded-full p-[3px] hover:bg-gray-700 hover:duration-200 
                duration-200' />
                { username && <p className='text-[12px] text-white'>{username.substring(0, 10).concat('...')}</p>}
                { token && showLogoutB ? 
                  <div className='absolute bg-gray-700 top-[3rem] md:top-[5rem] right-1 rounded-lg cursor-pointer flex flex-col 
                  justify-start items-center z-[1000] border-[1px] border-gray-400 p-1' 
                  >
                      <Link to='/AddItem' className='text-[12px] md:text-[15px] text-center flex justify-center items-center gap-1 
                      hover:bg-white hover:text-black px-1' onClick={() => showLogoutB && setShowLogoutB(false)}> <span>New</span> <span>product?</span></Link>
                      <p className='text-[12px] md:text-[15px] hover:bg-red-600 w-full text-center' title='Logout?' 
                        onClick={() => token && dispatch(ISSUE_LOGOUT())}>Logout?</p>
                  </div> 
                  : null}
              </div>
              <div className='flex flex-col justify-start items-end w-[16rem]'>
                  <p className='text-sm md:text-lg'>Total Items: <span className='text-yellow-500'>{inCartCount}</span></p>
                  <p className='text-sm md:text-lg'>Total Price: <span className='text-blue-500'>${totalPrice.toFixed(2)}</span></p>
                  <button className='h-[2rem] px-2 bg-gray-200 text-gray-800 self-end p-[0.2rem] border-[1px] border-specialGray 
                  rounded-md font-semibold duration-100 hover:bg-specialBlue hover:text-white hover:duration-100 text-sm md:text-lg flex 
                  justify-between items-center space-x-1' onClick={() => { !token ? authThroughCart() : dispatch(SHOW_CART())}} 
                  >
                    <span>View Cart</span><ShoppingCartIcon className='w-[1rem]'/>
                  </button>
              </div>
            </div>
    </div>
  )
}
