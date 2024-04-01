// import React from 'react'
import { ItemElement } from '../../Components/itemElement/itemElement';
import appleWatch from '../../assets/pic1.png'
import montBlanc from '../../assets/pic2.png';
import applebra from '../../assets/pic3.png';
import cartietBlue from '../../assets/cartier-blue.avif';
import cartierGold from '../../assets/cartier-gold.webp';
import casio from '../../assets/casio.jpg';
import rolex from '../../assets/rolex.png';
import { motion } from 'framer-motion';

enum WATCH_IDS {
    APPLEWATCH,
    MONTBLANC,
    APPLEBRA,
    CARTIERBLUE,
    CARTIERGOLD,
    CASIO,
    ROLEX,
}

const gridContainervariants = {
  hidden: 
      { opacity: 0 },
  show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
  },
}

const theProducts = [
    { name: 'Apple Smart Watch', pic: appleWatch, price: 99.99, id: WATCH_IDS.APPLEWATCH }, 
    { name: 'Smart MontBlanc', pic: montBlanc, price: 39.99, id: WATCH_IDS.MONTBLANC  }, 
    { name: 'Apple Smart Pink', pic: applebra, price: 299.99, id: WATCH_IDS.APPLEBRA  },
    { name: 'Cartier Square', pic: cartietBlue, price: 299.99, id: WATCH_IDS.CARTIERBLUE  },
    { name: 'Cartier Gold', pic: cartierGold, price: 299.99, id: WATCH_IDS.CARTIERGOLD  },
    { name: 'Edifice Casio', pic: casio, price: 299.99, id: WATCH_IDS.CASIO  },
    { name: 'Black Rolex', pic: rolex, price: 299.99, id: WATCH_IDS.ROLEX  },
]

export const ItemsWrapper = () => {

  return (
    <motion.div variants={ gridContainervariants } 
    initial="hidden"
    animate="show"
    className='px-[1rem] pt-[6rem] md:pt-[8rem] py-[1rem] flex flex-col md:flex-row justify-start items-center overflow-auto md:space-x-[1rem]'>
            { theProducts.map(itm => {
                return <ItemElement name={itm.name} pic={itm.pic} price={itm.price} key={itm.id} id={itm.id} />
            }) }
    </motion.div>
  )
}
