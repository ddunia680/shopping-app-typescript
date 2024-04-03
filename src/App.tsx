
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ISSUE_LOGOUT, RELOGIN_ON_RELOAD } from "./store/auth";
// import Home from "./pages/home";
import { Header } from "./Components/header/header";
import { Outlet } from "react-router";
import { Footer } from "./Components/footer/footer";
import { AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal/modal";
import { AuthModal } from "./Components/Auth/authModal";


function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const keptToken = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate')!;
  
  const showAuth = useAppSelector(state => state.auth.showAuth);
  const showCart = useAppSelector(state => state.cartOps.showCart);
  const showWishList = useAppSelector(state => state.wishList.showWishList);

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

  return (
    <div className="w-[100vw] h-[100%]">
      <Header />
      <Outlet/>
      <AnimatePresence
        initial={false}
        mode='wait'
      >
        { (showCart || showWishList) && <Modal /> }
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait">
        { showAuth && <AuthModal/> }
      </AnimatePresence> 
      <Footer/> 
    </div>
  )
}

export default App
