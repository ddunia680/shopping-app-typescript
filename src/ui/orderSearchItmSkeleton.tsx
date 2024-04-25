export default function OrderSearchItmSkeleton() {
  return (
    <div className='relative w-full h-[2rem] md:h-[2.5rem] border-b-[1px] border-gray-300 flex justify-between items-center pl-1 
        pr-[3rem] animate-pulse'>
            <div className='w-[1.5rem] h-[1.5rem] flex justify-center items-center bg-gray-200 rounded-md'></div>
            <p className='w-[40%] h-[70%] rounded-full bg-gray-200'></p>
            <p className='w-[40%] h-[70%] rounded-full bg-gray-200'></p>
            <p className='absolute bottom-0 right-1 rounded-full h-[6px] w-[5rem] bg-gray-200'></p>

    </div>
  )
}
