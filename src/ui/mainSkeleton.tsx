import { ItemElementSkeleton } from './itemElementSkeleton';

export const MainSkeleton = () => {
  return (
    <div className='px-[1rem] pt-[6rem] md:pt-[8rem] py-[1rem] flex flex-col md:flex-row justify-start items-center overflow-auto 
    md:space-x-[1rem] space-y-[1rem] md:space-y-0'>
        <ItemElementSkeleton />
        <ItemElementSkeleton />
        <ItemElementSkeleton />
    </div>
  )
}