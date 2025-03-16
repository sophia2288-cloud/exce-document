import { Button } from '@/components/ui/button';
import { useLoginModal } from '@/hooks/use-login-modal';
import { ArrowUpFromLine, Cloudy } from 'lucide-react';
import React from 'react';

const ExcelHeader = () => {
    const { onOpen } = useLoginModal()
    return (
        <div>
            {/* <Button>
                Excel
            </Button> */}
            <div className='w-full flex'>
                <div className='p-1 bg-black flex-grow flex items-center justify-end'>
                    <div className='flex items-center gap-x-4 text-white text-xs'>
                        <p className='cursor-pointer'>
                            Get Excel for your device
                        </p>
                        <p className='cursor-pointer mr-2'
                            onClick={() => onOpen()}
                        >
                            My account
                        </p>
                    </div>
                </div>
                <div className='p-2 bg-gray-100 flex-grow flex items-center justify-center text-center'>
                    <p className='cursor-pointer text-sm text-gray-500'
                        onClick={() => onOpen()}
                    >
                        Sign in
                    </p>
                </div>
            </div>
            <div className='bg-white p-2 px-4 flex items-end justify-end'>
                {/* <div className='flex items-center gap-x-2 text-gray-300 text-sm'>
                    <p>New in </p>
                    <Cloudy color='blue' fill='blue' className='size-3' />
                    <p>OneDrive </p>
                </div> */}
                <div className='flex items-center gap-x-2 text-gray-400 cursor-pointer'
                    onClick={() => onOpen()}
                >
                    <ArrowUpFromLine color='darkblue' fill='darkblue' className='size-3' />
                    <p className='text-sm font-normal'>Upload Workbook </p>
                </div>
            </div>
        </div>
    );
};

export default ExcelHeader;
