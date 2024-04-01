import { ItemsWrapper } from '../Components/itemsWrapper/itemsWrapper';
import { Footer } from '../Components/footer/footer';
import Modal from '../Components/Modal/modal';
import { Header } from '../Components/header/header';

import { AnimatePresence } from "framer-motion";
import { AuthModal } from '../Components/Auth/authModal';
import { useAppSelector } from '../store/hooks';

export default function Home() {

    const showAuth = useAppSelector(state => state.auth.showAuth);
    const showCart = useAppSelector(state => state.cartOps.showCart);
    const showWishList = useAppSelector(state => state.wishList.showWishList);
  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Header />
      <ItemsWrapper />
      <Footer/>
      <AnimatePresence
        initial={false}
        mode='wait'
      >
        { (showCart || showWishList) && <Modal /> }
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait">
        { showAuth && <AuthModal/> }
      </AnimatePresence>
      
    </div>
  )
}
