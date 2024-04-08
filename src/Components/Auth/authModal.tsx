import { useState } from 'react'
import Backdrop from '../Backdrop/backdrop'
import { motion } from 'framer-motion'
import Login from './Login/login'
import Signup from './SignUp/signup'
import ForgotPass from './ForgotPassword/forgotPass'
import { useAppDispatch } from '../../store/hooks'
import { CLOSE_AUTH_MODAL } from '../../store/auth'

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

export const AuthModal = () => {
  const dispatch = useAppDispatch();
  const [ loginIn, setLoginIn ] = useState<boolean>(true);
  const [ forgotPass, setForgotPass ] = useState<boolean>(false);

  const signUp = () => {
    setLoginIn(false);
  }

  const signIn = () => {
    setLoginIn(true);
  }

  const forgotP = () => {
    setForgotPass(true);
    setLoginIn(false);
  }

  return (
    <Backdrop onClick={() => dispatch(CLOSE_AUTH_MODAL())}>
        <motion.div 
        variants={slideInOut}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='bg-white z-100 w-[90%] md:w-[40rem] flex justify-center items-center' onClick={(e) => e.stopPropagation()}>
          { loginIn ? 
            <Login signUp={signUp} forgotPass={forgotP}/> : 
          forgotPass ? 
            <ForgotPass signIn={signIn}  /> : 
            <Signup signIn={signIn} /> }
        </motion.div>
    </Backdrop>
  )
}
