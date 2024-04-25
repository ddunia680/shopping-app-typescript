import { ChangeEvent, useRef, useState } from 'react';
import { FcPicture } from 'react-icons/fc';
import { validateInput } from '../utility/validateInput';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import axios from '../../axios';
import { PageNotFound } from '../Components/PageNotFound/pageNotFound';
import PulseLoader from 'react-spinners/PulseLoader'
import { ADDAWATCH } from '../store/watches';
import { NOTIFY } from '../store/errorUI';
import { useNavigate } from 'react-router';

interface ValidateDataInputTypes {
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  type: string,
}

export default function AddNewProduct() { 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [windowWidth] = useState(window.innerWidth);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = useAppSelector(state => state.auth.token);
  const username = useAppSelector(state => state.auth.username);
  
  const [ productImage, setProductImage ] = useState<File | null>();
  const [ productTitle, setProductTitle ] = useState('');
  const [previousPrice, setPreviousPrice ] = useState('');
  const [ productPrice, setProductPrice ] = useState('');
  const [ productDescription, setProductDescription ] = useState('');

  const [ productTitleIsValid, setProductTitleIsValid ] = useState(false);
  const [ previousPriceIsValid, setPreviousPriceIsValid ] = useState(false);
  const [ productPriceIsValid, setProductPriceIsValid ] = useState(false);
  const [ productDescriptionIsValid, setProductDescriptionIsValid ] = useState(false);

  const [ productTitleIsTouched, setProductTitleIsTouched ] = useState(false);
  const [ previousPriceIsTouched, setPreviousPriceIsTouched ] = useState(false);
  const [ productPriceIsTouched, setProductPriceIsTouched ] = useState(false);
  const [ productDescriptionIsTouched, setProductDescriptionIsTouched ] = useState(false);

  const [ mainError, setMainError ] = useState(''); 
  const [ productPictureError, setProductPictureError ] = useState('');
  const [ productTitleError, setProductTitleError ] = useState('');
  const [ previousPriceError, setPreviousPriceError ] = useState('');
  const [ productPriceError, setProductPriceError ] = useState('');
  const [ productDescriptionError, setProductDescriptionError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const formIsValid = productImage && productTitleIsValid && previousPriceIsValid && productPriceIsValid && productDescriptionIsValid;


  const inputValidationHandler = ({ event, type }: ValidateDataInputTypes) => {
    const value = event.target.value;
    switch(type) {
      case 'productTitle':
        setProductTitleIsTouched(true);
        setProductTitleIsValid(validateInput({value, type}) as boolean);
        break;
      case 'previousPrice':
        setPreviousPriceIsTouched(true);
        setPreviousPriceIsValid(validateInput({value, type}) as boolean);
        break;
      case 'productPrice':
        setProductPriceIsTouched(true);
        setProductPriceIsValid(validateInput({value, type}) as boolean);
        break;
      case 'productDescription':
        setProductDescriptionIsTouched(true);
        setProductDescriptionIsValid(validateInput({value, type}) as boolean);
        break;
      default:
        break;
    } 
  }

  const addProductHandler = () => {
    setLoading(true);

    mainError && setMainError(''); productTitleError && setProductTitleError('');
    productPriceError && setProductPriceError(''); productDescriptionError && setProductDescriptionError(' ');

    const theData = new FormData();
    theData.append('photos', productImage as File);
    theData.append('name', productTitle);
    theData.append('price', productPrice);
    theData.append('previousPrice', previousPrice);
    theData.append('description', productDescription);

    axios.post('/admin/createItem', theData, { headers: { Authorization: 'Bearer '+ token } })
    .then(res => {
      setLoading(false);
      navigate(`/productDetail/${res.data.watch._id}`);

      dispatch(ADDAWATCH(res.data.watch));
      dispatch(NOTIFY({ message: res.data.message }));
    })
    .catch((err) => {
      setLoading(false);
      dispatch(NOTIFY({ message: err.response.data.message, isError: true }))
      console.log(err); 
      const theErr = err.response.data.message as string;
      if(theErr.includes('name')) {
        setProductTitleIsValid(false);
        setProductTitleError(theErr);
      } else if(theErr.includes('price')) {
        setProductPriceIsValid(false);
        setProductPriceError(theErr);
      } else if(theErr.includes('previousPrice')) {
        setPreviousPriceIsValid(false);
        setPreviousPriceError(theErr);
      } else if(theErr.includes('description')) {
        setProductDescriptionIsValid(false);
        setProductDescriptionError(theErr);
      } else if(theErr.includes('picture')) {
        setProductPictureError(theErr)
      } else {
        setMainError(theErr);
      }
    })
  }


  return (
    <>
    { !token && username !== 'Dunia Dunia' ? 
        <PageNotFound /> 
      :
      <div className="relativew-full h-[100%] pt-[5rem] md:pt-[7rem] flex flex-col justify-start items-center pb-[2rem] gap-[2rem]">
        <h2 className="text-lg md:text-xl font-bold text-specialGray py-[1rem]">Add a product</h2>
        <p className='absolute top-[8rem] md:top-[11rem] left-[40%] text-[12px] md:text-[13px] text-red-600'>{mainError}</p>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 px-[1rem]">
          <div className='flex flex-col justify-center items-center w-[90%] md:w-[30%]'>
            <input type='file' className='hidden' ref={fileInputRef} onChange={e => { e.target.files ? setProductImage(e.target.files[0]) : null}}/>
            <div className='border-[1px] border-gray-400 rounded-xl md:rounded-3xl hover:bg-gray-400 duration-200 hover:duration-200' title='click to add or change image an image'>
              { !productImage ? <FcPicture size={ windowWidth > 500 ? 200 : 100} onClick={() => fileInputRef.current ? fileInputRef.current.click() : null}/> :
              <div className='w-[10rem] h-[10rem] rounded-xl md:rounded-3xl shadow-md shadow-black overflow-hidden' 
                onClick={() => fileInputRef.current ? fileInputRef.current.click() : null}>
                  <img src={URL.createObjectURL(productImage)} alt='an image' className='w-[100%] h-[100%] object-contain' />
              </div>}
            </div>
            <p className={['text-[12px] md:text-[14px] text-center', productPictureError ? 'text-red-600' : 'text-black'].join(' ')}>
              { productPictureError ? productPictureError : "Click on the image icon to upload the product's image"}
            </p>
          </div>
          <div className='h-full w-[95%] md:w-[60%] xl:w-[40%] bg-orange-100 flex flex-col justify-start items-center space-y-[2rem] py-[2rem] 
          rounded-lg text-[12px] md:text-[14px]'>
              <div className='relative flex justify-between items-center w-[90%] gap-5'>
                    <p className='hidden md:block font-semibold'>Product name:</p>
                    <input type='text' className={['bg-transparent border-[1px] rounded-md w-[95%] md:w-[70%] h-[2rem] focus:outline-none px-[1rem] hover:bg-orange-200 hover:duration-200 duration-200', productTitleIsTouched && !productTitleIsValid ? 'bg-red-100 border-red-600' : 'border-gray-400'].join(' ')} 
                    placeholder={ windowWidth > 500 ? '' : 'New product name'} onChange={e => {
                      inputValidationHandler({event: e, type: 'productTitle'})
                      setProductTitle(e.target.value)
                    }}/>
                    <p className={['absolute text-[12px] left-3 md:left-[30%] bottom-[-1rem]', productTitleError ? 'text-red-600' : 'text-gray-400'].join(' ')}>{ productTitleError ? productTitleError : 'should start with an upper case'}</p>
              </div>

              <div className='relative flex justify-between items-center w-[90%] gap-5'>
                    <p className='hidden md:block font-semibold'>Previous price:</p>
                    <input type='text' className={['bg-transparent border-[1px] rounded-md w-[95%] md:w-[70%] h-[2rem] focus:outline-none px-[1rem] hover:bg-orange-200 hover:duration-200 duration-200', previousPriceIsTouched && !previousPriceIsValid ? 'bg-red-100 border-red-600' : 'border-gray-400'].join(' ')} 
                    placeholder={ windowWidth > 500 ? '' : 'Previous price'} onChange={e => {
                      inputValidationHandler({event: e, type: 'previousPrice'})
                      setPreviousPrice(e.target.value)
                    }}/>
                    <p className={['absolute text-[12px] left-3 md:left-[30%] bottom-[-1rem]', productPriceError ? 'text-red-600' : 'text-gray-400'].join(' ')}>{previousPriceError ? previousPriceError : "don't include the currency sign"}</p>
              </div>

              <div className='relative flex justify-between items-center w-[90%] gap-5'>
                    <p className='hidden md:block font-semibold'>Current price:</p>
                    <input type='text' className={['bg-transparent border-[1px] rounded-md w-[95%] md:w-[70%] h-[2rem] focus:outline-none px-[1rem] hover:bg-orange-200 hover:duration-200 duration-200', productPriceIsTouched && !productPriceIsValid ? 'bg-red-100 border-red-600' : 'border-gray-400'].join(' ')} 
                    placeholder={ windowWidth > 500 ? '' : 'Current price'} onChange={e => {
                      inputValidationHandler({event: e, type: 'productPrice'})
                      setProductPrice(e.target.value)
                    }}/>
                    <p className={['absolute text-[12px] left-3 md:left-[30%] bottom-[-1rem]', productPriceError ? 'text-red-600' : 'text-gray-400'].join(' ')}>{productPriceError ? productPriceError : "don't include the currency sign"}</p>
              </div>

              <div className='relative flex justify-between items-start w-[90%] gap-5'>
                    <p className='hidden md:block font-semibold'>Description:</p>
                    <textarea className={['bg-transparent border-[1px] rounded-md w-[95%] md:w-[70%] h-[7rem] focus:outline-none px-[1rem] box-border resize-y hover:bg-orange-200 hover:duration-200 duration-200', productDescriptionIsTouched && !productDescriptionIsValid ? 'bg-red-100 border-red-600' : 'border-gray-400'].join(' ')} 
                    placeholder={ windowWidth > 500 ? '' : 'New product description'} onChange={e => {
                      inputValidationHandler({event: e, type: 'productDescription'})
                      setProductDescription(e.target.value)
                      
                    }}></textarea>
                    <p className={['absolute text-[12px] left-3 md:left-[30%] bottom-[-1rem]', productDescriptionError ? 'text-red-600' : 'text-gray-400'].join(' ')}>{ productDescriptionError ? productDescriptionError : 'at least 200 digits long'}</p>
              </div>
          </div>
        </div>
        <button className='bg-orange-700 py-[0.5rem] px-[1rem] rounded-lg font-semibold text-white border-[1px] border-orange-700 
        hover:border-orange-900 hover:shadow-md hover:shadow-black disabled:bg-gray-300 disabled:text-gray-400 
        disabled:cursor-not-allowed text-[13px] md:text-[15px] flex justify-start items-end' 
        disabled={!formIsValid} onClick={() => addProductHandler()}>
          <span>Add Product</span>
            { loading && <PulseLoader 
                    color={"#042143"}
                    loading={true}
                    size={3}
            />}
        </button>
    </div>}
   </>
  )
}
