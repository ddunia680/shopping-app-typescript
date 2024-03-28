
import { ItemsWrapper } from "./Components/itemsWrapper/itemsWrapper";
import { Footer } from "./Components/footer/footer";
import { useEffect, useState } from "react";
import Modal from "./Components/Modal/modal";
import { Header } from "./Components/header/header";

import { AnimatePresence } from "framer-motion";
import { AuthModal } from "./Components/Auth/authModal";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ISSUE_LOGOUT, RELOGIN_ON_RELOAD } from "./store/auth";


function App() {
  const dispatch = useAppDispatch();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [ showAuth, setShowAuth ] = useState<boolean>(false);
  const [showWishList, setShowWishList] = useState<boolean>(false);
  const token = useAppSelector(state => state.auth.token);
  const keptToken = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate')!;
  // console.log(showCart);

  useEffect(() => {
    if(new Date(expiryDate).getTime() <= new Date().getTime()) {
      dispatch(ISSUE_LOGOUT());
    }

    if(!token && keptToken) {
      const newTimeout = new Date(expiryDate).getTime() - new Date().getTime();
      dispatch(RELOGIN_ON_RELOAD());
      OperateLogout(newTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OperateLogout = (milliseconds: number) => {
    setTimeout(() => {
      dispatch(ISSUE_LOGOUT());
      console.log('we logged out');
    }, milliseconds);
  }

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const openWishList = () => setShowWishList(true);
  const closeWishList = () => setShowWishList(false);

  const openAuthModal = () => setShowAuth(true);
  const closeAuthModal = () => setShowAuth(false);

  document.title = 'The Store AMST';
  

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Header openModal={openCart} openAuthModal={openAuthModal} />
      <ItemsWrapper openWishList={openWishList} openCart={openCart} />
      <Footer/>
      <AnimatePresence
        initial={false}
        mode='wait'
      >
        { (showCart || showWishList) && <Modal cart={showCart} closeCart={closeCart} closeWishlist={closeWishList} /> }
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait">
        { showAuth && <AuthModal closeAuthModal={closeAuthModal} /> }
      </AnimatePresence>
      
    </div>
  )
}

export default App
