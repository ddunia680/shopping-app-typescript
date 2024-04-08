import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import { validateInput } from '../../../utility/validateInput';
import PulseLoader from 'react-spinners/PulseLoader';
import axios from '../../../../axios';
import { FaEye } from 'react-icons/fa'
import { RiEyeCloseFill } from 'react-icons/ri'
import { useAppDispatch } from '../../../store/hooks';
import { CLOSE_AUTH_MODAL } from '../../../store/auth';

type propsTypes = {
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

export default function ForgotPass({ signIn }: propsTypes) {
    const dispatch = useAppDispatch();
    const [windowWidth] = useState(window.innerWidth);
    const [ enteredOTP, setEnteredOTP ] = useState<string>('');
    const [emailAlreadyIn, setEmailIsAlreadyIn] = useState<boolean>(false);
    const [startNewPasswordInput, setStartNewPasswordInput] = useState<boolean>(false);
    const [mainError, setMainError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [emailIsTouched, setEmailIsTouched] = useState<boolean>(false);
    const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

    const [otpDelayValue, setOtpDelayValue] = useState(30);
    const [otpErrorMessage, setOtpErrorMessage] = useState('');
    const [OTPisValid, setOTPIsValid] = useState<boolean>(false);
    const [OTPisTouched, setOTPIsTouched] = useState<boolean>(false);
    const [counting, setCounting] = useState(false);

    const [seePassw, setSeePass] = useState<boolean>(false);
    const [seeConfPass, setSeeConfPass] = useState<boolean>(false);
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPassError, setConfPassError] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
    const [confPassIsValid, setConfPassIsValid] = useState<boolean>(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false);
    const [confPassIsTouched, setConfPassIsTouched] = useState<boolean>(false);

    const newPassFromIsValid = passwordIsValid && confPassIsValid;

    useEffect(() => {
        if(emailAlreadyIn) {
            setCounting(true);
            setInterval(() => {
                setOtpDelayValue(curr => curr - 1);
            }, 1000);
        }
    }, [emailAlreadyIn]);
  
    useEffect(() => {
        if(otpDelayValue === 0) {
            setCounting(false);
        }
    }, [otpDelayValue]);

    const handleInputValidation = ({ event, type }: inputValidationTypes) => {
        const value = event.target.value
        switch(type) {
            case 'email': 
            setEmailIsTouched(true);
            setEmailIsValid(validateInput({value, type }) as boolean);
            break;

            case 'otp': 
            setOTPIsTouched(true);
            setOTPIsValid(validateInput({value, type}) as boolean);
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

    const requestOTp = () => {
        emailError && setEmailError('');
        enteredOTP && setEnteredOTP('');
        setLoading(true);
  
        axios.post(`auth/requestOTp/${email}`)
        .then(res => {
          setLoading(false);
          setEmailIsAlreadyIn(true);
          console.log(res);
          
        })
        .catch(err => {
          setLoading(false);
          if(err.response.data.message.includes('email')) {
            setEmailIsValid(false);
            setEmailError(err.response.data.message);
          } else {
            setMainError(err.response.data.message);
          }
        })
    }

    const issueOTPVerification = () => {
        otpErrorMessage && setOtpErrorMessage('');
        setLoading(true);
  
        axios.post(`auth/verify/${email}/${enteredOTP}`)
        .then(res => {
          setLoading(false);
          console.log(res);
          setStartNewPasswordInput(true);
          setCounting(false);
          setEmailIsAlreadyIn(false);
        })
        .catch(err => {
          setLoading(false);
          setOTPIsValid(false);
          if(err.response.data.message.includes('otp')) {
            setOtpErrorMessage(err.response.data.message);
          } else {
            setMainError(err.response.data.message);
          }
          console.log(err);
          
        })
    }

    const issuePasswordReset = () => {
        setLoading(true);
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('confPass', confPass);

        axios.post('auth/updatePass', data)
        .then(res => {
            setLoading(false);
            console.log(res);
            
            signIn();
        })
        .catch(err => {
            setLoading(false);
            const theError = err.response.data.message;
            if(theError.includes('password')) {
                setPasswordIsValid(false);
                setPasswordError(theError);
            } else if( theError.includes('confirm') ) {
                setConfPassIsValid(false);
                setConfPassError(theError);
            } else {
                setMainError(theError);
            }
        })
    }
    
  return (
    <motion.div
     variants={animateAppearance}
     initial='hidden'
     animate='visible'
     exit='exit'
     className='w-full px-[1rem] flex flex-col justify-start items-center gap-[1rem] py-[1rem]'
    >
        { !startNewPasswordInput ? <>
            <h3 className='text-xl font-bold tracking-wide py-[1rem]'>Account verification</h3>

            { mainError && <p className='text-red-700 text-center text-sm'>{mainError}</p>}

            {!emailAlreadyIn && <p>Enter the email address associated with your account</p>}

            { emailAlreadyIn  ? <div className='flex flex-col justify-start items-center space-y-[3px]'>
                <p className='font-semibold text-gray-500'>{email}</p>
                <p>A verification code has been sent to your email address</p>
                </div> : null}

            { !emailAlreadyIn ? <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
                <p className='hidden md:block'>Email: </p>
                <input type='email' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', emailIsTouched && !emailIsValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')} 
                placeholder={ windowWidth < 670 ? 'Your email' : ''} onChange={e => {
                    handleInputValidation({ event: e, type: 'email' });
                    setEmail(e.target.value);
                }}/>
                <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{emailError}</p>
            </div> : null}

            { emailAlreadyIn ? <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
                <p className='hidden md:block'>Enter code: </p>
                <input type='text' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', OTPisTouched && !OTPisValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')} 
                placeholder={ windowWidth < 670 ? 'Enter code' : ''} onChange={e => {
                    handleInputValidation({ event: e, type: 'otp' });
                    setEnteredOTP(e.target.value);
                }}/>
                <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{otpErrorMessage}</p>
            </div> : null}

            <button className='px-[1rem] py-[0.5rem] bg-emerald-500/85 shadow-lg shadow-black disabled:bg-gray-300 
                disabled:cursor-not-allowed disabled:text-gray-400 flex justify-start items-end' disabled={!emailIsValid} 
                onClick={() => { !emailAlreadyIn ? requestOTp() : issueOTPVerification() }}>
                <span>{ emailAlreadyIn ? 'Verify' : 'Get OTP code'}</span>
                { loading && <PulseLoader 
                    color={"#042143"}
                    loading={true}
                    size={3}
                />}
            </button>
          </>
          :
          <>
            <h3 className='text-xl font-bold tracking-wide py-[1rem]'>Recover your account</h3>
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
            <button className='px-[1rem] py-[0.5rem] bg-purple-500/85 shadow-lg shadow-black disabled:bg-gray-300 
            disabled:cursor-not-allowed disabled:text-gray-400 flex justify-start items-end' 
            disabled={!newPassFromIsValid} onClick={() => issuePasswordReset()}>
                <p>Set Password</p>
                { loading && <PulseLoader 
                    color={"#042143"}
                    loading={true}
                    size={3}
                />}
            </button>
          </>
          }

        <div className='w-[70%] flex justify-between items-center'>
          <p className={['hover:underline', emailAlreadyIn && counting ? 'text-gray-400 cursor-not-allowed' : 
          'text-emerald-900 cursor-pointer'].join(' ')} onClick={() => { !emailAlreadyIn ? requestOTp() : {}}}>
            { emailAlreadyIn && counting ? `resend OTP in ${otpDelayValue}` : emailAlreadyIn && !counting ? 'resent OTP code' : ''}
          </p>
          <p className='text-red-700 cursor-pointer hover:underline' onClick={() => dispatch(CLOSE_AUTH_MODAL())}>Close?</p>
      </div>
    </motion.div>
  )
}
