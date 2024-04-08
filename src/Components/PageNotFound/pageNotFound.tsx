import { useNavigate } from "react-router"
import { RiArrowLeftCircleFill } from "react-icons/ri";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[36rem] pt-[7rem] flex flex-col justify-center items-center ">
        <RiArrowLeftCircleFill size={35} className="absolute top-[8rem] left-1 text-gray-900 hover:text-gray-700 hover:duration-200 
        duration-200" title="Go back" onClick={() => navigate('/')}/>
        <h2 className="w-full text-center text-xl font-semibold">Page Not Found🫠</h2>
        <p className="text-[12px] md:text-[15px]">The page you are trying to access does not exit...</p>
    </div>
  )
}
