// import React from 'react'
import { ItemElement } from '../../Components/itemElement/itemElement';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';

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

export const ItemsWrapper = () => {
  const watches = useAppSelector(state => state.watches.watches);

  return (
    <motion.div variants={ gridContainervariants } 
    initial="hidden"
    animate="show"
    className='px-[1rem] pt-[6rem] md:pt-[8rem] py-[1rem] flex flex-col md:flex-row justify-start items-center overflow-auto 
    md:space-x-[1rem] space-y-[1rem] md:space-y-0'>
            { watches.map(itm => {
                return <ItemElement name={itm.name} pic={itm.imageURL} previousPrice={itm.previousPrice} price={itm.price} key={itm._id} id={itm._id} />
            }) }
    </motion.div>
  )
}
