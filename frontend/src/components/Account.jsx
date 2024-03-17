import React, { useEffect, useState } from 'react'
import { Appbar } from '../basic/Appbar'
import { Balance } from '../basic/Balance'
import { Users } from '../basic/Users'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Account() {
    const [balance, setBalance] = useState(0);
    const [firstname, setFirstname] = useState("");

    useEffect(() => {
        const  fetchUser= async () => {
            const { data } = await axios.get("http://localhost:3000/api/v1/user/info",{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            });
            setFirstname(data.firstname)
        }

        fetchUser();
    }, [firstname])

    useEffect(() => {
        const  fetchUser= async () => {
            const { data } = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            });
            setBalance(data.balance)
        }

        fetchUser();
    }, [balance])
  return (
    <div className='bg-gray-900 h-screen'>
        <Appbar username={firstname}/>
        <Balance balance = {balance}/>
        <Users balance = {balance}/>
    </div>
  )
}

export default Account