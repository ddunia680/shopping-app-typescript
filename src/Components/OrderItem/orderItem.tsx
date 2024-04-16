import { GoDotFill } from "react-icons/go";
import { motion } from 'framer-motion';

type orderItemTypes = {
    name: string,
    price: number,
    count: number,
    imageURL: string,
}

export default function OrderItem({ name, imageURL, price, count }: orderItemTypes) {
  return (
    <motion.div variants={{ 
        hidden: { opacity: 0 }, 
        show: { opacity: 1 }, 
      }} className="w-full border-[1px] border-[#6484b1] flex justify-between items-center p-1 rounded-lg text-blue-200">
        <p className="flex justify-start items-center gap-1" title={name}>
            <img src={imageURL} alt="the pic" className="w-[1rem] h-[1rem] rounded-full object-contain bg-white" />
            <span className="font-semibold">
                {name.substring(0, 15).concat('...')}
            </span>
        </p>
        <GoDotFill size={10} className="text-[#6484b1]" />
        <p className="text-sm text-[#6484b1]">{count} pieces</p>
        <GoDotFill size={10} className="text-[#6484b1]"/>
        <p className="text-sm text-[#6484b1]">{price * count}$</p>
    </motion.div>
  )
}
