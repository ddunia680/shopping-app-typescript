import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../store/hooks';

interface enteredParam {
  openModal: () => void,
}

export const Header = ({ openModal }: enteredParam) => {
  const totalPrice = useAppSelector(state => state.cartOps.totalAmount);
  const inCartCount = useAppSelector(state => state.cartOps.nbrOfItems);
  
  return (
    <div className='h-[5.1rem] md:h-[7rem] bg-specialGray sticky top-0 left-0 w-[100%] md:flex justify-between items-center px-[0.5rem] md:px-[2rem] z-[9000] text-gray-200'>
            <p className='text-lg md:text-2xl font-bold'>AmsterDam.Co</p>
            <div className='flex flex-col justify-start items-end mt-[-20px]'>
                <p className='text-sm md:text-lg'>Total Items: <span className='text-yellow-500'>{inCartCount}</span></p>
                <p className='text-sm md:text-lg'>Total Price: <span className='text-blue-500'>${totalPrice.toFixed(2)}</span></p>
                <button className='h-[2rem] px-2 bg-gray-200 text-gray-800 self-end p-[0.2rem] border-[1px] border-specialGray rounded-md font-semibold
                  duration-100 hover:bg-specialBlue hover:text-white hover:duration-100 text-sm md:text-lg flex justify-between items-center 
                  space-x-1' onClick={() => openModal()} 
                >
                  <span>View Cart</span><ShoppingCartIcon className='w-[1rem]'/> 
                </button>
            </div>
    </div>
  )
}
