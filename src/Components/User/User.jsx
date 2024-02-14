import React from 'react'

const User = ({ data }) => {
    return (
        <div className=' p-2 overflow-hidden text-break'>
            <div className='d-flex flex-row gap-4 justify-content-start'>
                <div className=''>
                    <img className='rounded-5' width={70} height={70} src={data.avatar} alt="img.." /></div>
                <div>
                    <div className='fs-5 fw-bold'>
                        <span className=''>{data?.profile?.firstName} {data?.profile?.lastName}</span>
                    </div>
                    <span className=''>{data?.jobTitle}</span>
                    <span className=''>{data?.profile?.email}</span>
                </div>
            </div>

        </div>
    )
}

export default User
