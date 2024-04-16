import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';
import { TiWarning } from "react-icons/ti";

const slideInOut = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 30,
      stiffness: 500
    },
  },
  exit: {
    x: '100vw',
    opacity: 0
  },
}

export default function Notification() {
  const notificationText = useAppSelector(state => state.errorUI.notificationText);
  const isError = useAppSelector(state => state.errorUI.isError);
  
  return (
    <motion.div 
      variants={slideInOut}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={["absolute bottom-[2rem] md:bottom-[5rem] right-1 z-1000 shadow rounded-md p-[0.5rem] flex flex-col justify-start items-start", isError ? 'bg-red-200 shadow-red-500' : 'bg-gray-200 shadow-gray-500'].join(' ')}>
      <h2 className="font-semibold text-[15px] md:text-[17px] flex justify-start items-center gap-1">Notification { isError && <TiWarning size={30} className='text-red-600' />}</h2>
      <p className="text-[12px] text-gray-600 font-thin">{notificationText}</p>
    </motion.div>
  )
}
