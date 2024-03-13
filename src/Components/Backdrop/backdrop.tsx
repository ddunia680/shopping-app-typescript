import React from 'react'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Parameters {
  children: ReactNode,
  onClick: () => void,
}

const Backdrop: React.FC<Parameters> = ({ children, onClick }) => {
  return (
    <motion.div 
      className='absolute top-0 left-0 h-[100vh] w-[100vw] bg-[#000000e9] flex justify-center items-center z-[100000]'
      onClick={onClick}
      initial={{ opacity: 0}} //at the beginning
      animate={{ opacity: 1 }} //when the animation begins
      exit={{ opacity: 0 }} //when we exit
    >
      {children}
    </motion.div>
  )
}

export default Backdrop;
