import { ChangeEvent, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { RiEyeCloseFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { validateInput } from '../../../utility/validateInput'
import PulseLoader from 'react-spinners/PulseLoader'
import axios from '../../../../axios'


type propsTypes = {
    closeAuthModal: () => void,
    signIn: () => void,
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

export default function Signup({ closeAuthModal, signIn }: propsTypes) {
    const [seePassw, setSeePass] = useState<boolean>(false);
    const [seeConfPass, setSeeConfPass] = useState<boolean>(false);
    const [windowWidth] = useState(window.innerWidth);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPassError, setConfPassError] = useState('');

    const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
    const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
    const [confPassIsValid, setConfPassIsValid] = useState<boolean>(false);

    const [usernameIsTouched, setUsernameIsTouched] = useState<boolean>(false);
    const [emailIsTouched, setEmailIsTouched] = useState<boolean>(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false);
    const [confPassIsTouched, setConfPassIsTouched] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);

    const formIsValid = usernameIsValid && emailIsValid && passwordIsValid && confPassIsValid;

    const handleInputValidation = ({ event, type }: inputValidationTypes) => {
        const value = event.target.value
        switch(type) {
            case 'username': 
            setUsernameIsTouched(true);
            setUsernameIsValid(validateInput({value, type }) as boolean);
            break;

            case 'email': 
            setEmailIsTouched(true);
            setEmailIsValid(validateInput({value, type }) as boolean);
            break;

            case 'passw': 
            setPasswordIsTouched(true);
            setPasswordIsValid(validateInput({value, type}) as boolean);
            break;

            case 'ConfPassw': 
            setConfPassIsTouched(true);
            setConfPassIsValid(validateInput({value, type}) as boolean);
            break;

            default: 
            break;
        }
    }

    const issueSignup = async () => {
        setLoading(true);
        const data = new FormData();
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('confPass', confPass);

        axios.post('auth/signup', data)
        .then(response => {
            setLoading(false);
            console.log(response);
            signIn();
        }).catch(err => {
            setLoading(false);
            console.log(err.response?.data?.message);
            if(err.response?.data?.message.includes('username')) {
                setUsernameIsValid(false);
                setUsernameError(err.response.data.message);
            } else if(err.response?.data?.message.includes('email')) {
                setEmailIsValid(false);
                setEmailError(err.response.data.message);
            } else if(err.response?.data?.message.includes('password')) {
                setPasswordIsValid(false);
                setPasswordError(err.response.data.message);
            } else if(err.response?.data?.message.includes('confirm')) {
                setConfPassIsValid(false);
                setConfPassError(err.response.data.message);
            }
        })
    }


  return (
    <motion.div 
    variants={animateAppearance}
     initial='hidden'
     animate='visible'
     exit='exit'
    className='w-full px-[1rem] flex flex-col justify-start items-center gap-[1rem] py-[1rem] text-[300] md:text-[500]'>
        <h3 className='text-xl font-bold tracking-wide py-[1rem]'>SignUp</h3>
        <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Username: </p>
            <input type='text' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', usernameIsTouched && !usernameIsValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300' ].join(' ')} 
            placeholder={ windowWidth < 670 ? 'Your username' : ''} onChange={e => {
                handleInputValidation({event: e, type: 'username'});
                setUsername(e.target.value);
            }}/>
            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{usernameError}</p>
        </div>
        <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Email: </p>
            <input type='email' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', emailIsTouched && !emailIsValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')} 
            placeholder={ windowWidth < 670 ? 'Your email' : ''} onChange={e => {
                handleInputValidation({ event: e, type: 'email' });
                setEmail(e.target.value);
            }}/>
            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{emailError}</p>
        </div>
        <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Password: </p>
            <div className={['border-b-[2px] w-full md:w-[70%] h-[2rem] flex justify-between items-center px-[0.5rem]', passwordIsTouched && !passwordIsValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')}>
                <input type={seePassw ? 'text' : 'password'} className=' bg-transparent w-[90%] focus:outline-none' 
                    placeholder={ windowWidth < 670 ? 'Your password' : ''} onChange={e => {
                        handleInputValidation({ event: e, type: 'passw' });
                        setPassword(e.target.value);
                    }}/>
                { !seePassw ? <RiEyeCloseFill className='cursor-pointer hover:scale-125'onClick={() => setSeePass(true)}/> :
                <FaEye className='cursor-pointer hover:scale-125' onClick={() => setSeePass(false)}/>}
            </div>
            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{passwordError}</p>
        </div>
        <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Confirm Pass: </p>
            <div className={['border-b-[2px] w-full md:w-[70%] h-[2rem] flex justify-between items-center px-[0.5rem]', confPassIsTouched && !confPassIsValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')}>
                <input type={seeConfPass ? 'text' : 'password'} className=' bg-transparent w-[90%] focus:outline-none'  
                    placeholder={ windowWidth < 670 ? 'Confirm password' : ''} onChange={e => {
                        handleInputValidation({ event: e, type: 'ConfPassw' });
                        setConfPass(e.target.value);
                    }}/>
                { !seeConfPass ? <RiEyeCloseFill className='cursor-pointer hover:scale-125'onClick={() => setSeeConfPass(true)}/> :
                <FaEye className='cursor-pointer hover:scale-125' onClick={() => setSeeConfPass(false)}/>}
            </div>
            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{confPassError}</p>
        </div>
        <button className='px-[1rem] py-[0.5rem] bg-purple-500/85 shadow-lg shadow-black disabled:bg-gray-400 
        disabled:cursor-not-allowed flex justify-start items-end' 
        disabled={!formIsValid} onClick={() => issueSignup()}>
            <p>Register</p>
            { loading && <PulseLoader 
                color={"#042143"}
                loading={true}
                size={3}
                aria-label="About section"
                data-testid="loader"
            />}
        </button>
        <p>Already have an account?  <span className='text-yellow-900 cursor-pointer hover:underline' onClick={() => signIn()}>Sign in</span></p>
        <div className='w-[70%] flex justify-between items-center'>
            <p className='text-emerald-900 cursor-pointer hover:underline'></p>
            <p className='text-red-700 cursor-pointer hover:underline' onClick={() => closeAuthModal()}>Close?</p>
        </div>
    </motion.div>
  )
}
