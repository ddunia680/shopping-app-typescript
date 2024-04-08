import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import axios from '../../axios';
import { watchType } from "../store/watches";
import { useDispatch } from "react-redux";
import { NOTIFY } from "../store/errorUI";
import Card from "../Components/card/card";
import { ProductDetailsSkeleton } from "../ui/productDetailsSkeleton";
import { ADDITEMTOCART, SHOW_CART } from "../store/cart";
import { ADDTOWISHLIST, DELETEITEMFROMWISHLIST, SHOW_WISHLIST } from "../store/wishList";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const itemId = useParams().itemId;
  const [loading, setLoading ] = useState(true);
  const [productDetails, setProductDetails] = useState<watchType>();
  const [ youMightLikeList, setYouMightLikeList ] = useState<watchType[]>([]);
  const ref = useRef<HTMLImageElement>(null)
  

  useEffect(() => {
    ref.current?.scrollIntoView();
    axios.get(`pullAWatch/${itemId}`)
    .then(res => {
      setLoading(false);
      setProductDetails(res.data.watch);
      setYouMightLikeList(res.data.youMightLike);
    })
    .catch(err => {
      console.log(err);
      dispatch(NOTIFY({ message: err.response.data.message, isError: true }))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  
  const addItemToCartHandler = () => {
    dispatch(SHOW_CART());
    if(productDetails) {
      dispatch(DELETEITEMFROMWISHLIST(productDetails?._id));
      dispatch(ADDITEMTOCART({ 
        id: productDetails?._id, 
        name: productDetails?.name, 
        image: productDetails?.imageURL, 
        price: productDetails?.price, 
        previousPrice: productDetails?.previousPrice })); 
    }
    
  }

  const addToWishList = () => {
    dispatch(SHOW_WISHLIST());
    if(productDetails) {
      dispatch(ADDTOWISHLIST({ 
        id: productDetails?._id, 
        name: productDetails?.name, 
        image: productDetails?.imageURL, 
        price: productDetails?.price, 
        previousPrice: productDetails?.previousPrice }));
    }
    
  }
  
  return (
    <>
    { loading ? 
    < ProductDetailsSkeleton /> : 
    <div className="px-[1rem] pt-[6rem] md:pt-[8rem] py-[1rem] flex flex-col justify-start items-start md:space-x-[1rem] space-y-[1rem]">
      <div id="details wrapper" className="w-full flex flex-col md:flex-row justify-center items-start gap-[2rem]">
        <div id="Image container" className=" w-[90%] h-[18rem] md:w-[17rem] md:h-[17rem] bg-[#fff] shadow rounded-lg flex justify-center items-center">
          <img src={productDetails?.imageURL} alt={productDetails?.name} className="w-[95%] h-[95%] object-contain" ref={ref}/>
        </div>
        <div id="details container" className="relative w-[95%] md:w-[50%] flex flex-col justify-start items-start space-y-[2rem]">
          <h3 className="text-[22px] font-bold">{productDetails?.name}</h3>
          <p className="absolute text-sm text-gray-600 top-[-0.3rem] pl-1" >{ productDetails?.name.includes('Smart' || 'smart') ? 'An intelligent gadget' : 'A fine specy'}</p>
          <h4 className="text-[18px] font-semibold">Net Price:  <span className="text-[13px] italic line-through text-red-600">
            {productDetails?.previousPrice}$</span> <span className="text-blue-800 font-extrabold text-[20px]">{productDetails?.price}$</span>
          </h4>

          <p className="text-[14px] md:text-[15px] tracking-wide">{productDetails?.description}</p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-[1rem] md:gap-[2rem]">
        <button className="py-[0.5rem] px-[1rem] bg-gradient-to-r from-blue-950 via-blue-950 to-blue-700 text-white shadow-md 
        shadow-blue-950 hover:bg-gradient-to-r hover:from-blue-950 hover:via-blue-700 hover:to-blue-950 rounded-lg duration-200 
        hover:duration-200" onClick={() => addItemToCartHandler()}>Add to cart</button>
        <button className="py-[0.5rem] px-[1rem] bg-gradient-to-r from-pink-950 via-pink-950 to-pink-700 text-white shadow-md 
        shadow-pink-950 hover:bg-gradient-to-r hover:from-pink-950 hover:via-pink-700 hover:to-pink-950 rounded-lg duration-200 
        hover:duration-200" onClick={() => addToWishList()}>Add to wishList</button>
      </div>
      <div className="w-full md:w-[85%] flex flex-col justify-start items-start space-y-2">
        <h4 className="font-semibold w-full bg-gray-300 px-[1rem] rounded-md">You might also like</h4>
        { youMightLikeList.length ? <div className="w-full flex justify-start items-center gap-[1rem] px-[1rem] flex-wrap">
          { youMightLikeList.map(youMLike => (
            <Card key={youMLike._id} _id={youMLike._id} name={youMLike.name} imageURL={youMLike.imageURL} previousPrice={youMLike.previousPrice} 
            price={youMLike.price} description={youMLike.description} />
          )) }
        </div> : <p className="text-[13px] ml-[1rem]">No items to see</p>}
      </div>
    </div>}
    </>
  )
}
// Start building this ui