import { useAppSelector } from '../../store/hooks'

export const Footer = () => {
  const totalPrice = useAppSelector(state => state.cartOps.totalAmount);
  const inCartCount = useAppSelector(state => state.cartOps.nbrOfItems);

  return (
    <div className='flex flex-col justify-start items-start'>
        <p className='font-semibold'>Total Items {inCartCount}</p>
        <p className='font-semibold'>Total Price ${totalPrice.toFixed(2)}</p>
        <p className='w-[100%] text-center text-sm'>Online shop &copy; 2024, All rights reserved</p>
    </div>
  )
}
