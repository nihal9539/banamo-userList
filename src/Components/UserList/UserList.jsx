import axios from 'axios'
import React, { useEffect, useState } from 'react'
import User from '../User/User'
import { FadeLoader, PuffLoader } from 'react-spinners'
import { BiErrorCircle } from "react-icons/bi";



const UserList = () => {
    const [userData, setUserData] = useState([])
    const [user, setuser] = useState([])
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: "" })

    useEffect(() => {
        setLoading(true)
        axios("https://602e7c2c4410730017c50b9d.mockapi.io/users").then((res) => {
            setUserData(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err);
            setLoading(false)
            setError({ status: true, message: err.message })

        })
    }, [])
    console.log(userData);
    const handleClick = (e) => {
        setuser(e)

    }
    if (Loading) {
        return (
            <div className='d-flex flex-column gap-2 justify-content-center vh-100 align-items-center'>
                <FadeLoader color="#4066ff" />
                <span> loading...</span>
            </div>
        )
    }
    if (error.status) {
        return (
            <div className='d-flex flex-column gap-2 justify-content-center vh-100 align-items-center'>
                <BiErrorCircle color="#4066ff" size={60} />
                <span>{error.message}</span>
            </div>
        )
    }
    console.log(user);
    // 0070BB
    return (
        <div className=' d-flex flex-row'>
            <div className='w-25 overflow-scroll vh-100 border'>
                {userData.map((users) => (
                    <div style={{background:`${user == users ? "#0070FF" : ""}`}} className='rounded-2' onClick={() => handleClick(users)}>
                        <User key={users.id} data={users} />

                    </div>
                ))}
            </div>
            <di class="vr "></di>
            {user.length !== 0 ?
                <div className='w-75 d-flex flex-row gap-5 p-5  align-items-center' style={{background:"#E5E4E2"}}>
                    <div className='border h-50 w-25 border-black p-2    '><img src={user.avatar} className='rounded w-100 h-100' alt="No image" /></div>
                    <div className=' d-flex fs-5 flex-column gap-4'>
                        <div className='fs-4 fw-bold'>
                            <label >Name: </label>
                            <span className=''> {user?.profile?.firstName} {user?.profile?.lastName}</span>
                        </div>
                        <div>
                            <label className='fw-semibold'>Username: </label>

                            <span> {user?.profile?.name}</span>
                        </div>
                        <div>
                            <label className='fw-semibold'>Bio: </label>

                            <span> {user?.Bio}</span>
                        </div>
                        <div>
                            <label className='fw-semibold'>Job Title: </label>

                            <span> {user?.jobTitle}</span>
                        </div>
                        <div>
                            <label className='fw-semibold'>Email:</label>
                            <span className=''> {user?.profile?.email}</span>
                        </div>
                    </div>

                </div>
                : <div className='d-flex justify-content-center w-75 vh-100 align-items-center'>
                    <span>Select one profile</span>
                </div>}

        </div>
    )
}

export default UserList
