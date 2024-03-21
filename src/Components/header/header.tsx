import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../store/hooks';
import logo from '../../assets/o_logo.png';
import { FaUserCircle } from 'react-icons/fa';

interface enteredParam {
  openModal: () => void,
  openAuthModal: () => void,
}

export const Header = ({ openModal, openAuthModal }: enteredParam) => {
  const totalPrice = useAppSelector(state => state.cartOps.totalAmount);
  const inCartCount = useAppSelector(state => state.cartOps.nbrOfItems);
  
  return (
    <div className='h-[5.1rem] md:h-[7rem] bg-specialGray fixed top-0 left-0 w-[100%] flex justify-between items-center px-[0.5rem] 
    md:px-[2rem] z-[9000] text-gray-200'>
            <p className='text-lg md:text-2xl font-bold flex justify-start items-center'><img src={logo} className='w-[3rem] h-[3rem] 
            object-contain' alt='the logo' /><span className='hidden md:block'>OnlineStore.Co</span></p>
            
            <div className='h-full w-[13rem] flex justify-between items-center px-2'>
              <div className='w-[3rem] min-w-[3rem] h-[3rem] rounded-full flex justify-center items-center hover:bg-gray-700 hover:duration-200 
              duration-200' onClick={() => openAuthModal()}>
                <FaUserCircle title='No user logged in' size={ window.innerWidth < 500 ? 30 : 40} />
              </div>
              <div className='flex flex-col justify-start items-end w-[16rem]'>
                  <p className='text-sm md:text-lg'>Total Items: <span className='text-yellow-500'>{inCartCount}</span></p>
                  <p className='text-sm md:text-lg'>Total Price: <span className='text-blue-500'>${totalPrice.toFixed(2)}</span></p>
                  <button className='h-[2rem] px-2 bg-gray-200 text-gray-800 self-end p-[0.2rem] border-[1px] border-specialGray 
                  rounded-md font-semibold duration-100 hover:bg-specialBlue hover:text-white hover:duration-100 text-sm md:text-lg flex 
                  justify-between items-center space-x-1' onClick={() => openModal()} 
                  >
                    <span>View Cart</span><ShoppingCartIcon className='w-[1rem]'/>
                  </button>
              </div>
            </div>
    </div>
  )
}
