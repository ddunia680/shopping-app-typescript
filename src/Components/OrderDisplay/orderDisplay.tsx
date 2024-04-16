import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";
import OrderItem from "../OrderItem/orderItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import PDFFile from "../../utility/newPDF";
import theLogo from '../../assets/o_logo.png';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CLOSE_ORDER } from "../../store/order";

const slideInOut = {
  hidden: {
    y: '100vh',
    opacity: 0
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.2,
      // type: 'spring',
      // damping: 30,
      // stiffness: 500
    },
  },
  exit: {
    y: '100vh',
    opacity: 0
  },
}

const gridContainervariants = {
  hidden: 
      { opacity: 0 },
  show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
  },
}

export default function OrderDisplay() {
  const orderId = useAppSelector(state => state.order.orderId);
  const customerName = useAppSelector(state => state.order.customerName);
  const items = useAppSelector(state => state.order.items);
  const totalAmount = useAppSelector(state => state.order.totalAmount);
  const dispatch = useAppDispatch();


  return (
    <motion.div variants={slideInOut}
    initial='hidden'
    animate='visible'
    exit='exit' className='absolute w-[90%] h-[30rem] md:w-[20rem] shadow-lg shadow-black bottom-1 md:right-1 right-[5%] bg-[#0d1117]/90 
    z-99999 rounded-lg flex flex-col justify-center items-center py-1 gap-[1rem] backdrop-blur-sm'>
      <p className="text-md font-semibold text-white w-[70%] flex justify-between items-center">
        <span>Your Order</span> 
        <GoDotFill size={10} className="text-[#6484b1]" />
        <span className="text-sm text-[#6484b1]">{customerName.substring(0, 15).concat('...')}</span>
        </p>
        <p className='text-sm text-gray-500'>{orderId}</p>
      <motion.div 
      variants={gridContainervariants}
      initial="hidden"
      animate="show" className="border-l-[1px] border-[#6484b1] w-[90%] h-[40%] flex flex-col justify-start items-start overflow-y-auto gap-[1rem] 
      text-md rounded-lg">
        {items.map(itm => (
          <OrderItem key={itm.watch._id} name={itm.watch.name} price={itm.watch.price} count={itm.count} imageURL={itm.watch.imageURL} />
        ))}
      </motion.div>
      <p className="text-white">Total Amount: <span className="text-lg font-semibold text-blue-500">{totalAmount} $</span></p>
      <p className="text-sm px-[1rem] text-blue-200">This receipt is to be handed to the cashier at our store and he/she will serve you and request for payment from you</p>
      <PDFDownloadLink className="w-full flex justify-center items-center"
        fileName={`${orderId}`} 
        document={<PDFFile mainImage={theLogo} orderId={orderId} customerName={customerName} items={items} totalAmount={totalAmount} />}
        >
          {({loading}) => (!loading ? 
            <button className="w-[90%] py-[0.5rem] mx-auto bg-[#6484b1] hover:bg-[#273446] hover:text-white 
            rounded-lg shadow-md shadow-black font-semibold" onClick={() => dispatch(CLOSE_ORDER())}>Get Receipt</button> : 
            <button className="w-[90%] py-[0.5rem] bg-gray-400 
            text-gray-500 rounded-lg cursor-not-allowed font-semibold mx-auto">Loading...</button>)}
          
      </PDFDownloadLink>
    </motion.div>
  )
}
