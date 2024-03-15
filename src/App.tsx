
import { ItemsWrapper } from "./Components/itemsWrapper/itemsWrapper";
import { Footer } from "./Components/footer/footer";
import { useState } from "react";
import Modal from "./Components/Modal/modal";
import { Header } from "./Components/header/header";

import { AnimatePresence } from "framer-motion";


function App() {
  const[showCart, setShowCart] = useState<boolean>(false);
  const [showWishList, setShowWishList] = useState<boolean>(false);
  // console.log(showCart);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const openWishList = () => setShowWishList(true);
  const closeWishList = () => setShowWishList(false);

  document.title = 'The Store AMST';
  

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Header openModal={openCart} />
      <ItemsWrapper openWishList={openWishList} openCart={openCart} />
      <Footer/>
      <AnimatePresence
        initial={false}
        mode='wait'
      >
        { (showCart || showWishList) && <Modal cart={showCart} closeCart={closeCart} closeWishlist={closeWishList} /> }
      </AnimatePresence>
      
    </div>
  )
}

export default App
