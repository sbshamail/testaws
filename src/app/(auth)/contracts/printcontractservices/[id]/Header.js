import React from 'react'
import Image from 'next/image'
const Header = ({data}) => {
    return (
        <div className='w-full flex justify-between items-center'>
            <div className='flex items-center gap-5'>
                <Image src={data.customer.DealerLogo} width={200} height={50} alt='dealer logo' />
                <div>
                    <div>Customer Name:
                        <span className='ml-5 font-bold'>
                        {data.customer.CustomerFName}
                        {" "}
                        {data.customer.CustomerLName}
                        </span>
                    </div>
                    <div>Contract Number:
                        <span className='ml-5 font-bold'>
                        {data.customer.ContractNo}
                        </span>
                    </div>
                </div>
            </div>
            <Image src="/images/procarmalogo2.png" width={50} height={50} alt='dealer logo' />
            
        </div>
    );
}

export default Header