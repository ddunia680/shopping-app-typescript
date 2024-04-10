import { useState } from 'react';
import { useAppSelector } from '../../store/hooks'
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

export const Footer = () => {
  const [windowWidth] = useState(window.innerWidth);
  const totalPrice = useAppSelector(state => state.cartOps.totalAmount);
  const inCartCount = useAppSelector(state => state.cartOps.nbrOfItems);

  return (
    <div className='static xl:absolute md:bottom-0 md:left-0 w-full flex flex-col justify-start items-start px-[1rem] bg-[#e4dfdf] border-t-[1px] border-gray-400'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-col justify-start items-start text-[13px] md:text-[15px]'>
            <p className='font-semibold'>Total Items {inCartCount}</p>
            <p className='font-semibold'>Total Price ${totalPrice.toFixed(2)}</p>
          </div>
          <div className='flex justify-start items-center gap-3'>
            <FaFacebook size={ windowWidth > 500 ? 25 : 20} className='text-[#106bff]'/>
            <FaInstagramSquare size={ windowWidth > 500 ? 25 :20} className='text-[#fc09cc]' />
            <FaSquareTwitter size={ windowWidth > 500 ? 25 :20} className='text-[#24a3f1]'/>
          </div>
        </div>
        <p className='w-[100%] text-center text-[12px] md:text-sm'>Online shop &copy; 2024, All rights reserved</p>
    </div>
  )
}
