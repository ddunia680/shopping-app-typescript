import { motion } from 'framer-motion';
import { FaCartArrowDown } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ADDITEMTOCART } from '../../store/cart';
import { DELETEITEMFROMWISHLIST } from '../../store/wishList';
import axios from '../../../axios';

interface wishListItemType {
    id: string,
    image: string,
    name: string,
    price: number,
    previousPrice: number,
    goToCart: () => void,
}

export default function WishlistItem({ id, image, name, price, previousPrice, goToCart }: wishListItemType) {
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

    const addItemToRemoteCart = () => {
      const theData = new FormData();
      theData.append('itemId', id);
      theData.append('itemPrice', price.toString());
  
      axios.post('/addToCart/', theData, { headers: { Authorization: 'Bearer '+ token } })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }

    const removeItemFromRemoteWishList = () => {
      const theData = new FormData();
      theData.append('itemId', id);

      axios.post('/removeFromWishList/', theData, { headers: { Authorization: 'Bearer '+ token } })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }

    const AdditemToCart = () => {
      dispatch(DELETEITEMFROMWISHLIST(id));
      dispatch(ADDITEMTOCART({ id: id, name: name, image: image, price: price, previousPrice: previousPrice }));
      goToCart();
      addItemToRemoteCart();
      removeItemFromRemoteWishList();
    }

    const deleteItemFromList = () => {
        dispatch(DELETEITEMFROMWISHLIST(id));
        removeItemFromRemoteWishList();
    }

  return (
    <motion.div  variants={{ 
        hidden: { opacity: 0 }, 
        show: { opacity: 1 }, 
      }}
      className='min-h-[3rem] py-[0.7rem] md:py-[1rem] bg-blue-900 my-[0.5rem] w-[100%] flex justify-between items-center px-[0.5rem]'>
          <img src={image} alt="the image" className='w-[2rem] h-[2rem] rounded-lg bg-white object-contain'/>
          <h3 className='font-bold text-white'>{name}</h3>
          <div className='w-[4rem] md:w-[4rem] h-[100%] flex flex-row justify-between items-center'>
            <FaCartArrowDown size={20} title='Add item to cart?' className='text-gray-300 hover:scale-125 hover:duration-200 duration-200'
            onClick={() => AdditemToCart()} />
            <ImBin size={20} title='Delete from wishList?' className='text-red-400 hover:scale-125 hover:duration-200 duration-200'
            onClick={() => deleteItemFromList()}/>
          </div>
      </motion.div>
  )
}
