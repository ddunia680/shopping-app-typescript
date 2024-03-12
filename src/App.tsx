
import { ItemsWrapper } from "./Containers/itemsWrapper/itemsWrapper";
import { Footer } from "./Containers/footer/footer";
import { useState } from "react";
import { Cart } from "./Containers/cart/cart";
import { Header } from "./Containers/header/header";

import { AnimatePresence } from "framer-motion";


function App() {
  const[showCart, setShowCart] = useState<boolean>(false);
  // console.log(showCart);

  const openModal = () => setShowCart(true);
  const closeModal = () => setShowCart(false);

  document.title = 'The Store AMST';
  

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Header openModal={openModal} />
      <ItemsWrapper openModal={openModal} />
      <Footer/>
      <AnimatePresence
        initial={false}
        mode='wait'
      >
        { showCart && <Cart closeModal={closeModal} /> }
      </AnimatePresence>
      
    </div>
  )
}

export default App
