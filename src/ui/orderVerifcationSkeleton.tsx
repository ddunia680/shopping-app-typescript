import React from 'react'
import { PiImageSquareFill } from "react-icons/pi";

export default function OrderVerifcationSkeleton() {
  return (
    <div className='w-[95%] md:w-[70%] bg-white flex flex-col md:flex-row justify-start items-start md:items-center p-[1rem] z-[-100]'>
                <div className='flex justify-between items-center w-full md:w-[60%] xl:w-[50%] border-[1px] border-gray-300 rounded-lg pr-[1rem]'>
                    <div className='relative w-[60%] flex justify-between items-center'>
                        <div className='w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] rounded-full bg-gray-300 border-[5px] border-white 
                        z-[1000] overflow-hidden flex justify-center items-center'>
                            <PiImageSquareFill className='w-[1rem] h-[1rem] md:w-[2rem] md:h-[2rem] text-white' />
                        </div>
                        <div className='absolute w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] rounded-full bg-gray-300 border-[5px] 
                        border-white left-[3rem] md:left-[5rem] z-[100] overflow-hidden flex justify-center items-center'>
                            <PiImageSquareFill className='w-[1rem] h-[1rem] md:w-[2rem] md:h-[2rem] text-white' />
                        </div>
                        <div className='absolute w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] rounded-full bg-gray-300 border-[5px] 
                        border-white left-[6rem] md:left-[10rem] z-[10] overflow-hidden flex justify-center items-center' >
                            <PiImageSquareFill className='w-[1rem] h-[1rem] md:w-[2rem] md:h-[2rem] text-white' />
                        </div>
                    </div>
                    <p className='h-[1.5rem] w-[5rem] rounded-full bg-gray-300'></p>
                </div>
                <div className='flex flex-col justify-start items-center gap-[1rem] p-[1rem] w-full md:w-[40%] xl:w-[50%]'>
                    <h3 className='bg-gray-300 h-[2rem] md:h-[2.5rem] rounded-full w-[100%]'></h3>
                    <p className='bg-gray-300 h-[1.2rem] md:h-[1.3rem] w-[85%] rounded-full'></p>
                    <div className='flex justify-start items-center'>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[7rem]'></p>
                        <hr className='w-[1rem] bg-gray-300 h-[3px]'/>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[4rem]'></p>
                        <hr className='w-[1rem] bg-gray-300 h-[3px]'/>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[3.5rem]'></p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[7rem]'></p>
                        <hr className='w-[1rem] bg-gray-300 h-[3px]'/>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[4rem]'></p>
                        <hr className='w-[1rem] bg-gray-300 h-[3px]'/>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[3.5rem]'></p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[7rem]'></p>
                        <hr className='w-[1rem] bg-gray-300 h-[3px]'/>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[4rem]'></p>
                        <hr className='w-[1rem] bg-gray-300 h-[3px]'/>
                        <p className='bg-gray-300 rounded-md h-[1.5rem] w-[3.5rem]'></p>
                    </div>
                    <div className='w-full flex justify-center items-center gap-[2rem]'>
                        <h3 className='bg-gray-300 h-[1.7rem] w-[9rem] rounded-full'></h3>
                        <p className='bg-gray-300 h-[1.7rem] w-[6rem] rounded-full'></p>
                    </div>
                    <button className='bg-gray-300 h-[2rem] w-[100%] md:w-[70%] rounded-full'></button>
                </div>
        </div>
  )
}
