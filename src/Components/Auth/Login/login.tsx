import { ChangeEvent, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { RiEyeCloseFill } from 'react-icons/ri'
import {  motion } from 'framer-motion';
import { validateInput } from '../../../utility/validateInput';


type propsTypes = {
    closeAuthModal: () => void,
    signUp: () => void,
}

type inputValidationTypes = {
    event: ChangeEvent<HTMLInputElement>,
    type: string,
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

export default function Login({ closeAuthModal, signUp }: propsTypes) {
    const [seePassw, setSeePass] = useState<boolean>(false);
    const [windowWidth] = useState(window.innerWidth);

    const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);

    const [usernameIsTouched, setUsernameIsTouched] = useState<boolean>(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false);

    const formIsValid = usernameIsValid && passwordIsValid;

    const handleInputValidation = ({ event, type }: inputValidationTypes) => {
        const value = event.target.value
        switch(type) {
            case 'username': 
            setUsernameIsTouched(true);
            setUsernameIsValid(validateInput({value, type }) as boolean);
            break;

            case 'passw': 
            setPasswordIsTouched(true);
            setPasswordIsValid(validateInput({value, type}) as boolean);
            break;

            default: 
            break;
        }

    }


  return (
    <motion.div
     variants={animateAppearance}
     initial='hidden'
     animate='visible'
     exit='exit'
     className='w-full px-[1rem] flex flex-col justify-start items-center gap-[1rem] py-[1rem]'>
        <h3 className='text-xl font-bold tracking-wide py-[1rem]'>Login</h3>
        <div className='w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Username: </p>
            <input type='text' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', 
            !usernameIsValid && usernameIsTouched ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')} placeholder={ windowWidth < 670 ?
             'Your username' : ''} onChange={(e) => handleInputValidation({event: e, type: 'username'})}/>
        </div>
        <div className='w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Password: </p>
            <div className={['border-b-[2px] w-full md:w-[70%] h-[2rem] flex justify-between items-center px-[0.5rem]', !passwordIsValid && passwordIsTouched ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')}>
                <input type={seePassw ? 'text' : 'password'} className=' bg-transparent w-[90%] focus:outline-none ' 
                    placeholder={ windowWidth < 670 ? 'Password' : ''} onChange={(e) => handleInputValidation({event: e, type: 'passw'})}/>
                { !seePassw ? <RiEyeCloseFill className='cursor-pointer hover:scale-125'onClick={() => setSeePass(true)}/> :
                <FaEye className='cursor-pointer hover:scale-125' onClick={() => setSeePass(false)}/>}
            </div>
        </div>
        <button className='px-[1rem] py-[0.5rem] bg-emerald-500/85 shadow-lg shadow-black disabled:bg-gray-400 disabled:cursor-not-allowed'
         disabled={!formIsValid}>Login</button>
        <p>Don't yet have an account?  <span className='text-yellow-900 cursor-pointer hover:underline' onClick={() => signUp()}>Register</span></p>
        <div className='w-[70%] flex justify-between items-center'>
            <p className='text-emerald-900 cursor-pointer hover:underline'>Forgot password?</p>
            <p className='text-red-700 cursor-pointer hover:underline' onClick={() => closeAuthModal()}>Close?</p>
        </div>
    </motion.div>
  )
}
