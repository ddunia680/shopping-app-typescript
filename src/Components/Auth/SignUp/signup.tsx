import { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { RiEyeCloseFill } from 'react-icons/ri'
import { motion } from 'framer-motion'


type propsTypes = {
    closeAuthModal: () => void,
    signIn: () => void,
}

const animateAppearance = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  }

export default function Signup({ closeAuthModal, signIn }: propsTypes) {
    const [seePassw, setSeePass] = useState<boolean>(false);
    const [windowWidth] = useState(window.innerWidth);


  return (
    <motion.div 
    variants={animateAppearance}
     initial='hidden'
     animate='visible'
     exit='exit'
    className='w-full px-[1rem] flex flex-col justify-start items-center gap-[1rem] py-[1rem] text-[300] md:text-[500]'>
        <h3 className='text-xl font-bold tracking-wide py-[1rem]'>SignUp</h3>
        <div className='w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Username: </p>
            <input type='text' className='bg-gray-300 border-b-[2px] border-emerald-700 px-[0.5rem] focus:outline-none w-full 
            md:w-[70%] h-[2rem]' placeholder={ windowWidth < 670 ? 'Your username' : ''}/>
        </div>
        <div className='w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Email: </p>
            <input type='email' className='bg-gray-300 border-b-[2px] border-emerald-700 px-[0.5rem] focus:outline-none w-full 
            md:w-[70%] h-[2rem]' placeholder={ windowWidth < 670 ? 'Your email' : ''}/>
        </div>
        <div className='w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Password: </p>
            <div className='bg-gray-300 border-b-[2px] border-emerald-700 w-full md:w-[70%] h-[2rem] flex justify-between items-center px-[0.5rem]'>
                <input type={seePassw ? 'text' : 'password'} className=' bg-transparent w-[90%] focus:outline-none' 
                    placeholder={ windowWidth < 670 ? 'Your password' : ''}/>
                { !seePassw ? <FaEye className='cursor-pointer hover:scale-125'onClick={() => setSeePass(true)}/> :
                <RiEyeCloseFill className='cursor-pointer hover:scale-125' onClick={() => setSeePass(false)}/>}
            </div>
        </div>
        <div className='w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Confirm Pass: </p>
            <div className='bg-gray-300 border-b-[2px] border-emerald-700 w-full md:w-[70%] h-[2rem] flex justify-between items-center px-[0.5rem]'>
                <input type={seePassw ? 'text' : 'password'} className=' bg-transparent w-[90%] focus:outline-none'  
                    placeholder={ windowWidth < 670 ? 'Confirm password' : ''}/>
                { !seePassw ? <FaEye className='cursor-pointer hover:scale-125'onClick={() => setSeePass(true)}/> :
                <RiEyeCloseFill className='cursor-pointer hover:scale-125' onClick={() => setSeePass(false)}/>}
            </div>
        </div>
        <button className='px-[1rem] py-[0.5rem] bg-purple-500/85 shadow-lg shadow-black'>Register</button>
        <p>Already have an account?  <span className='text-yellow-900 cursor-pointer hover:underline' onClick={() => signIn()}>Sign in</span></p>
        <div className='w-[70%] flex justify-between items-center'>
            <p className='text-emerald-900 cursor-pointer hover:underline'></p>
            <p className='text-red-700 cursor-pointer hover:underline' onClick={() => closeAuthModal()}>Close?</p>
        </div>
    </motion.div>
  )
}
