import { IoMdImage } from "react-icons/io"

const cardSkeleton = (
    <div className="w-[8rem] flex flex-col justify-start items-start shadow-sm shadow-gray-400 rounded-md p-[0.5rem] space-y-1 animate-pulse">
        <h5 className="w-[80%] h-[1rem] bg-gray-300 rounded-full"></h5>
        <div className="w-[95%] h-[6rem] rounded-lg bg-gray-300 flex justify-center items-center">
            <IoMdImage size={20} className='text-white'/>
        </div>
        <p className=" bg-gray-300 rounded-full w-[70%] h-[0.6rem]"></p>
        <p className=" bg-gray-300 rounded-full w-[90%] h-[1rem]"></p>
    </div>
)

export const  ProductDetailsSkeleton = () => {

  return (
    <div className="px-[1rem] pt-[6rem] md:pt-[8rem] py-[1rem] flex flex-col justify-start items-start md:space-x-[1rem] space-y-[1rem]">
      <div id="details wrapper" className="w-full flex flex-col md:flex-row justify-center items-start gap-[2rem]">
        <div id="Image container" className=" w-[90%] h-[18rem] md:w-[17rem] md:h-[17rem] bg-gray-300 shadow rounded-lg flex justify-center items-center animate-pulse">
            <IoMdImage size={40} className='text-gray-100'/>
        </div>
        <div id="details container" className="relative w-[95%] md:w-[50%] flex flex-col justify-start items-start space-y-[2rem]">
          <p className="w-[15rem] h-[2rem] bg-gray-300 rounded-full animate-pulse"></p>
          <p className="absolute top-[0.3rem] pl-1 h-[0.8rem] w-[10rem] bg-gray-300 rounded-full animate-pulse" ></p>
          <h4 className="bg-gray-300 h-[2rem] w-[10rem] rounded-full animate-pulse"></h4>
          <div className="flex flex-col justify-start items-start space-y-1 w-full animate-pulse">
            <p className=" bg-gray-300 rounded-full h-[1rem] w-full"></p>
            <p className=" bg-gray-300 rounded-full h-[1rem] w-full"></p>
            <p className=" bg-gray-300 rounded-full h-[1rem] w-full"></p>
            <p className=" bg-gray-300 rounded-full h-[1rem] w-full"></p>
            <p className=" bg-gray-300 rounded-full h-[1rem] w-full"></p>
            <p className=" bg-gray-300 rounded-full h-[1rem] w-full"></p>
            <p className=" bg-gray-300 rounded-full h-[1rem] w-full"></p>
          </div>
          
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-[1rem] md:gap-[2rem] animate-pulse">
        <button className="h-[2.5rem] w-[7rem] bg-gray-300 rounded-full shadow-md"></button>
        <button className="h-[2.5rem] w-[7rem] bg-gray-300 rounded-full shadow-md"></button>
      </div>
      <div className="w-full md:w-[85%] flex flex-col justify-start items-start space-y-2 animate-pulse">
        <h4 className="w-full h-[1rem] bg-gray-300 px-[1rem]"></h4>
        <div className="w-full flex justify-start items-center gap-[1rem] px-[1rem]">
          { cardSkeleton } { cardSkeleton } { cardSkeleton }
        </div>
      </div>
    </div>
  )
}
