import React from 'react'
import { Grip, Cloudy } from 'lucide-react'

const Sidebar = () => {

    return (
        <div className="p-4 md:flex hidden w-96 border-[1px] border-gray-200 h-screen shadow-lg bg-[#248b53] z-10">
            <div className='flex flex-col justify-between'>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center gap-x-8'>
                        <Grip color='white' className='size-7' />
                        {/* <h1 className='text-white font-semibold text-lg'>Excel Online</h1> */}
                        <h1 className='text-white font-semibold text-lg'>Excel 在线</h1>
                    </div>
                    <div className='mt-10'>
                        <h4 className='text-white text-lg'>Recent</h4>
                        <p className='text-xs mt-8 text-white font-medium'>Next time you come back here you'll see  your list of recently opened documents</p>
                    </div>
                </div>
                <div className='flex gap-x-4 border-b-[1px]'>
                    <Cloudy color='white' fill='white' className='size-6' />
                    <p className='text-white mb-2 text-md font-medium'>Open from OneDrive</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar