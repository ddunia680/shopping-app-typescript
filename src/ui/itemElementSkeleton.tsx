import { IoMdImage } from "react-icons/io"

export const ItemElementSkeleton = () => {
  return (
    <div className='min-w-[89%] md:min-w-[30rem] w-[90%] md:w-[30rem] h-[20rem] bg-gray-100 md:h-[30rem] px-[1rem] py-[0.5rem] flex flex-col 
    justify-evenly items-start rounded-xl'>
        {/* title */}
        <p className='w-[6rem] md:w-[10rem] h-[1.5rem] md:h-[2rem] rounded-full bg-gray-300 animate-pulse'></p>
        {/* Image wrapper */}
        <div className='w-[90%] h-[70%] md:h-[75%] flex justify-center items-center rounded-xl relative bg-gray-300 animate-pulse'>
            {/* Image */}
            <IoMdImage size={40} className='text-white'/>
            {/* add to wishlist button */}
            <div className='absolute top-[-1rem] right-2 bg-gray-300 shadow-md shadow-gray-400 rounded-full w-[2rem] h-[2rem] animate-pulse'></div>
        </div>
        <div className='py-3 md:py-0 w-full flex flex-row justify-evenly items-center md:flex-col md:justify-start md:items-start'>
            <p className="w-[5rem] h-[1.2rem] bg-gray-300 rounded-full my-[0.5rem] animate-pulse"></p>
            <button className='bg-gray-300 w-[7rem] h-[1.5rem] rounded-full duration-150 hover:bg-gray-700 animate-pulse'></button>
        </div>
    </div>
  )
}
