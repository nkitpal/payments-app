import React, { useState } from 'react'
import Heading from '../basic/Heading'
import SubHeading from '../basic/SubHeading'
import InputBox from '../basic/InputBox'
import {Button} from '../basic/Button'
import { BottomWarning } from '../basic/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
   <div className='bg-gray-900 h-screen flex justify-center'>
    <div className='flex flex-col justify-center'>
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label = {"Sign in"}/>
            <SubHeading label={"Enter your credentials.."}/>
            <InputBox label={"Username"} placeholder={"ankit@gmail.com"} onChange={(e) => setUsername(e.target.value)}/>
            <InputBox label={"Password"} placeholder={"123456"} onChange={(e) => setPassword(e.target.value)}/>
            <div className='py-3'>
                <Button label={"Sign in"} onClick={ async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                      username,
                      password
                    });
                    localStorage.setItem("token", response.data.token);
                    navigate('/account', {state: {username}});
                  }
                }/>
            </div>
            <BottomWarning label={"Don't have an Account?"} buttonText={"Sign Up"} to={'/signup'}/>
        </div> 
    </div> 
   </div> 
   
  )
}

export default Signin