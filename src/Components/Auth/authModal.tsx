import React, { useState } from 'react'
import Backdrop from '../Backdrop/backdrop'
import { motion } from 'framer-motion'
import Login from './Login/login'
import Signup from './SignUp/signup'

type propsTypes = {
  closeAuthModal: () => void,
}

const slideInOut = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 30,
      stiffness: 500
    },
  },
  exit: {
    y: '100vw',
    opacity: 0
  },
}

export const AuthModal = ({closeAuthModal}: propsTypes) => {
  const [ loginIn, setLoginIn ] = useState<boolean>(true);

  const signUp = () => {
    setLoginIn(false);
  }

  const signIn = () => {
    setLoginIn(true);
  }

  return (
    <Backdrop onClick={() => closeAuthModal()}>
        <motion.div 
        variants={slideInOut}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='bg-white z-100 w-[90%] md:w-[40rem] flex justify-center items-center' onClick={(e) => e.stopPropagation()}>
          { loginIn ? <Login signUp={signUp} closeAuthModal={closeAuthModal}/> : <Signup signIn={signIn} closeAuthModal={closeAuthModal} /> }
        </motion.div>
    </Backdrop>
  )
}
