// import React from 'react'
import { ItemElement } from '../../Components/itemElement/itemElement';
import appleWatch from '../../assets/pic1.png'
import montBlanc from '../../assets/pic2.png';
import applebra from '../../assets/pic3.png';
import { motion } from 'framer-motion';

enum WATCH_IDS {
    APPLEWATCH,
    MONTBLANC,
    APPLEBRA
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

type compPropType = {
  openModal: () => void,
}

const theProducts = [
    { name: 'Apple Smart Watch', pic: appleWatch, price: 99.99, id: WATCH_IDS.APPLEWATCH }, 
    { name: 'Smart MontBlanc', pic: montBlanc, price: 39.99, id: WATCH_IDS.MONTBLANC  }, 
    { name: 'Apple Smart Pink', pic: applebra, price: 299.99, id: WATCH_IDS.APPLEBRA  },
]

export const ItemsWrapper = ({ openModal }: compPropType) => {

  return (
    <motion.div variants={ gridContainervariants } 
    initial="hidden"
    animate="show"
    className='px-[1rem] py-[1rem] flex flex-col md:flex-row justify-start items-center overflow-auto md:space-x-[1rem]'>
            { theProducts.map(itm => {
                return <ItemElement name={itm.name} pic={itm.pic} price={itm.price} key={itm.id} id={itm.id} openModal={openModal} />
            }) }
    </motion.div>
  )
}
