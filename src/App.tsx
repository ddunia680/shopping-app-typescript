
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ISSUE_LOGOUT, RELOGIN_ON_RELOAD } from "./store/auth";
import { Header } from "./Components/header/header";
import { Outlet } from "react-router";
import { Footer } from "./Components/footer/footer";
import { AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal/modal";
import { AuthModal } from "./Components/Auth/authModal";
import axios from '../axios';
import { PULLWATCHES, STARTPULLING } from "./store/watches";
import { watchType } from "./store/watches";
import Notification from "./ui/notification";
import { END_NOTIFICATION } from "./store/errorUI";
import { SETCART } from "./store/cart";
import { SETWISHLIST } from "./store/wishList";
import OrderDisplay from "./Components/OrderDisplay/orderDisplay";


function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const keptToken = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate')!;
  
  const showAuth = useAppSelector(state => state.auth.showAuth);
  const showCart = useAppSelector(state => state.cartOps.showCart);
  const showWishList = useAppSelector(state => state.wishList.showWishList);
  const showOrder = useAppSelector(state => state.order.showOrder);
  const notify = useAppSelector(state => state.errorUI.notify);

  useEffect(() => {
    dispatch(STARTPULLING());
    if(new Date(expiryDate).getTime() <= new Date().getTime()) {
      dispatch(ISSUE_LOGOUT());
    }

    if(!token && keptToken) {
      const newTimeout = new Date(expiryDate).getTime() - new Date().getTime();
      dispatch(RELOGIN_ON_RELOAD());
      OperateLogout(newTimeout);
    }

    axios.get('/pullWatches/?page=1&limit=5')
    .then(res => {      
      dispatch(PULLWATCHES({watches: res.data.watches as watchType[], nbrOfPages: res.data.nbrOfPages}));
    })
    .catch(err => {
      console.log(err);
      
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(notify) {
      setTimeout(() => {
        dispatch(END_NOTIFICATION());
      }, 5000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notify])

  useEffect(() => {
    if(token) {
      axios.get('/pullACart/', { headers: { Authorization: 'Bearer '+ token }})
      .then(res => {
          if(res.data.cart.cartItems.length) {
            dispatch(SETCART(res.data.cart));
          }    
      })
      .catch(err => {
        console.log(err);
      });

      axios.get('/pullAWishList/', { headers: { Authorization: 'Bearer '+ token }})
      .then(res => {
        if(res.data.wishList.wishItems.length) {
          dispatch(SETWISHLIST(res.data.wishList)); 
        }              
      })
      .catch(err => {
        console.log(err);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
      <AnimatePresence initial={false} mode="wait">
        { notify && <Notification /> }
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait">
        { showOrder && <OrderDisplay /> }
      </AnimatePresence>
      <Footer/> 
    </div>
  )
}

export default App
