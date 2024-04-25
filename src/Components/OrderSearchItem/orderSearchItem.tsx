import { useAppDispatch } from "../../store/hooks";
import { DEFINE_SELECTED_ORDER } from "../../store/order";

const yearMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

type orderItmPropsTypes = {
    id: string,
    pic: string,
    username: string,
    delivered: boolean,
    date: Date
}

export default function OrderSearchItem({id, pic, username, delivered, date}: orderItmPropsTypes) {
    const dispatch = useAppDispatch();

  return (
    <div className='relative w-full h-[2rem] md:h-[2.5rem] border-b-[1px] border-gray-300 flex justify-between items-center pl-1 pr-[3rem] 
    cursor-pointer hover:bg-blue-200 duration-200 hover:duration-200' onClick={() => dispatch(DEFINE_SELECTED_ORDER(id))}>
        <div className='w-[1.5rem] h-[1.5rem] flex justify-center items-center border-[1px] border-gray-400 rounded-md'>
            <img src={pic} alt='An image' className='object-contain w-[95%] h-[95%]' />
        </div>
        <p className='font-semibold text-[11px] md:text-[13px]  '>For: <span className='font-bold'>{username}</span></p>
        <p className={['font-semibold text-[11px] md:text-[13px] px-[0.5rem]', delivered ? 'bg-yellow-400' : 'bg-red-400'].join(' ')}>{ delivered ? 'Delivered' : 'Not yet Delivered'}</p>
        <p className='absolute text-[7px] md:text-[9px] bottom-0 right-1'>{new Date(date).getDate()}/{yearMonths[new Date(date).getMonth()]}/{new Date(date).getFullYear()}</p>
    </div>
  )
}
