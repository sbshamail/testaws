import React from 'react'

const Details = ({data}) => {
    return (
        <div className='w-full flex flex-col gap-5'>
            <div className='w-full h-10 bg-gray-200 flex justify-center items-center text-xl text-gray-500'>
                Customer Plan Details
            </div>
            <div className='flex flex-row flex-wrap gap-10'>
                {data.coupons.map((coupon, i) => (
                    <div key={coupon.CouponID} className='w-1/3'>{ coupon.CouponTitle}</div>
                ))}
            </div>
        </div>
    );
}

export default Details