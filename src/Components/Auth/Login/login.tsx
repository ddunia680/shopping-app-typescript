import { ChangeEvent, useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { RiEyeCloseFill } from 'react-icons/ri'
import PulseLoader from 'react-spinners/PulseLoader'
import {  motion } from 'framer-motion';
import { validateInput } from '../../../utility/validateInput';
import axios from '../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { CLOSE_AUTH_MODAL, LOGIN } from '../../../store/auth';
import { SHOW_CART } from '../../../store/cart';


type propsTypes = {
    signUp: () => void,
    forgotPass: () => void,
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

export default function Login({ signUp, forgotPass }: propsTypes) {
  const dispatch = useAppDispatch();
    const authThroughCart = useAppSelector(state => state.auth.authThroughCart);
    const [seePassw, setSeePass] = useState<boolean>(false);
    const [windowWidth] = useState(window.innerWidth);
    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ enteredOTP, setEnteredOTP ] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [verifyingAcc, setVerifyingAcc] = useState(false);
    const [verificationStarted, setVerificationStated] = useState<boolean>(false);
    const [emailAlreadyIn, setEmailIsAlreadyIn] = useState<boolean>(false);

    const [mainError, setMainError] = useState<string>('');
    const [counting, setCounting] = useState(false);
    const [otpDelayValue, setOtpDelayValue] = useState(30);
    // console.log(otpDelayValue);
    

    const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
    const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
    const [OTPisValid, setOTPIsValid] = useState<boolean>(false);

    const [usernameIsTouched, setUsernameIsTouched] = useState<boolean>(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false);
    const [emailIsTouched, setEmailIsTouched] = useState<boolean>(false);
    const [OTPisTouched, setOTPIsTouched] = useState<boolean>(false);

    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [otpErrorMessage, setOtpErrorMessage] = useState('');

    const formIsValid = usernameIsValid && passwordIsValid;

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
            case 'username': 
            setUsernameIsTouched(true);
            setUsernameIsValid(validateInput({value, type }) as boolean);
            break;

            case 'passw': 
            setPasswordIsTouched(true);
            setPasswordIsValid(validateInput({value, type}) as boolean);
            break;

            case 'email': 
            setEmailIsTouched(true);
            setEmailIsValid(validateInput({value, type }) as boolean);
            break;

            case 'otp': 
            setOTPIsTouched(true);
            setOTPIsValid(validateInput({value, type}) as boolean);
            break;

            default: 
            break;
        }
    }

    const issueLogin = () => {
      setEmailError(''); setPasswordError('');
      setLoading(true);
      const thedata = new FormData();
      thedata.append('username', username);
      thedata.append('password', password);

      axios.post('auth/login', thedata)
      .then(res => {
        setLoading(false);
        const theAuthData = res.data!;
        console.log(res);
        dispatch(LOGIN({
          token: theAuthData.token, _id: theAuthData._id, username: theAuthData.username, email: theAuthData.email}))
        dispatch(CLOSE_AUTH_MODAL())
        authThroughCart && dispatch(SHOW_CART());
      })
      .catch(err => {
        setLoading(false);
        if(err.response.data.message === 'account not yet verified!') {
          setVerifyingAcc(true);
        } else if(err.response?.data?.message.includes('username')) {
          setUsernameIsValid(false);
          setUsernameError(err.response.data.message);
      } else if(err.response?.data?.message.includes('password')) {
          setPasswordIsValid(false);
          setPasswordError(err.response.data.message);
      } else {
        setMainError(err.response.data.message);
      }
        console.log(err);  
      })
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
          setVerifyingAcc(false);
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

    const delayNextOTPResendRequest = () => {
      setOtpDelayValue(60);
        setCounting(true);
    }


  return (
    <motion.div
     variants={animateAppearance}
     initial='hidden'
     animate='visible'
     exit='exit'
     className='w-full px-[1rem] flex flex-col justify-start items-center gap-[1rem] py-[1rem]'>
      { !verifyingAcc ? <><h3 className='text-xl font-bold tracking-wide py-[1rem]'>Login</h3>
        { mainError && <p className='text-red-700 text-center text-sm'>{mainError}</p>}
        <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Username: </p>
            <input type='text' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', 
            !usernameIsValid && usernameIsTouched ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')} placeholder={ windowWidth < 670 ?
             'Your username' : ''} onChange={(e) => {
                handleInputValidation({event: e, type: 'username'});
                setUsername(e.target.value);
             }}/>

            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{usernameError}</p>
        </div>
        <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Password: </p>
            <div className={['border-b-[2px] w-full md:w-[70%] h-[2rem] flex justify-between items-center px-[0.5rem]', !passwordIsValid && passwordIsTouched ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')}>
                <input type={seePassw ? 'text' : 'password'} className=' bg-transparent w-[90%] focus:outline-none ' 
                    placeholder={ windowWidth < 670 ? 'Password' : ''} onChange={(e) => {
                        handleInputValidation({event: e, type: 'passw'});
                        setPassword(e.target.value);
                    }}/>

                { !seePassw ? <RiEyeCloseFill className='cursor-pointer hover:scale-125'onClick={() => setSeePass(true)}/> :
                <FaEye className='cursor-pointer hover:scale-125' onClick={() => setSeePass(false)}/>}

            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{passwordError}</p>
            </div>
        </div>
        <button className='px-[1rem] py-[0.5rem] bg-emerald-500/85 shadow-lg shadow-black disabled:bg-gray-300 
        disabled:cursor-not-allowed disabled:text-gray-400 flex justify-start items-end' disabled={!formIsValid} onClick={() => issueLogin()}>
          <span>Login</span>
          { loading && <PulseLoader 
                color={"#042143"}
                loading={true}
                size={3}
            />}
        </button>

        <p>Don't yet have an account?  <span className='text-yellow-900 cursor-pointer hover:underline' onClick={() => signUp()}>Register</span></p>
      </>
      : 
      <>
        <h3 className='text-xl font-bold tracking-wide py-[1rem] text-center'>This Account is not yet verified!</h3>
        { mainError && <p className='text-red-700 text-center text-sm'>{mainError}</p>}
        { !verificationStarted ? <button className='w-[80%] md:w-[70%] py-[0.5rem] bg-emerald-500/85 hover:bg-emerald-600 shadow-lg shadow-black rounded-lg' 
        onClick={() => {setVerificationStated(true)}}>Verify</button> : null}

          { verificationStarted && !emailAlreadyIn ? <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Email: </p>
            <input type='email' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', emailIsTouched && !emailIsValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')} 
            placeholder={ windowWidth < 670 ? 'Your email' : ''} onChange={e => {
                handleInputValidation({ event: e, type: 'email' });
                setEmail(e.target.value);
            }}/>
            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{emailError}</p>
          </div> : null}
            { verificationStarted && emailAlreadyIn  ? <div className='flex flex-col justify-start items-center space-y-[3px]'>
              <p className='font-semibold text-gray-500'>{email}</p>
              <p>A verification code has been sent to your email address</p>
            </div> : null}

          { verificationStarted && emailAlreadyIn ? <div className='relative w-full md:w-[80%] flex justify-between items-center gap-[0.5rem] md:gap-[2rem]'>
            <p className='hidden md:block'>Enter code: </p>
            <input type='text' className={['border-b-[2px] px-[0.5rem] focus:outline-none w-full md:w-[70%] h-[2rem]', OTPisTouched && !OTPisValid ? 'border-red-700 text-red-700 bg-red-200' : 'border-emerald-700 bg-gray-300'].join(' ')} 
            placeholder={ windowWidth < 670 ? 'Enter code' : ''} onChange={e => {
                handleInputValidation({ event: e, type: 'otp' });
                setEnteredOTP(e.target.value);
            }}/>
            <p className='text-sm absolute bottom-[-0.9rem] left-2 md:left-[10rem] text-red-700'>{otpErrorMessage}</p>
          </div> : null}

            { verificationStarted ? 
            <button className='px-[1rem] py-[0.5rem] bg-emerald-500/85 shadow-lg shadow-black disabled:bg-gray-300 
            disabled:cursor-not-allowed disabled:text-gray-400 flex justify-start items-end' disabled={!emailIsValid} 
            onClick={() => { !emailAlreadyIn ? requestOTp() : issueOTPVerification() }}>
            <span>{ emailAlreadyIn ? 'Verify' : 'Get OTP code'}</span>
            { loading && <PulseLoader 
                  color={"#042143"}
                  loading={true}
                  size={3}
              />}
          </button> : null}
      </>}
      <div className='w-[70%] flex justify-between items-center'>
          <p className={['hover:underline', emailAlreadyIn && counting ? 'text-gray-400 cursor-not-allowed' : 
          'text-emerald-900 cursor-pointer'].join(' ')} onClick={() => { !verifyingAcc ? forgotPass() : requestOTp(); delayNextOTPResendRequest();}}>
            { !verifyingAcc ? 'Forgot password?' : verificationStarted && emailAlreadyIn && counting ? `resend OTP in ${otpDelayValue}` : 
            verificationStarted && emailAlreadyIn && !counting ? 'resent OTP code' : ''}
          </p>
          <p className='text-red-700 cursor-pointer hover:underline' onClick={() => dispatch(CLOSE_AUTH_MODAL())}>Close?</p>
      </div>
    </motion.div>
  )
}
