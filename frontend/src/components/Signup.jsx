import React, { useState } from 'react'
import Heading from '../basic/Heading'
import SubHeading from '../basic/SubHeading'
import InputBox from '../basic/InputBox'
import { Button } from '../basic/Button'
import { BottomWarning } from '../basic/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
   <div className='bg-gray-900 h-screen flex justify-center'>
    <div className='flex flex-col justify-center'>
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label = {"Sign up"}/>
            <SubHeading label={"Enter your credentials.."}/>
            <InputBox label={"Username"} placeholder={"ankit@gmail.com"} onChange={(e) => setUsername(e.target.value)}/>
            <InputBox label={"First Name"} placeholder={"Ankit"} onChange={(e) => setFirstname(e.target.value)}/>
            <InputBox label={"Last Name"} placeholder={"Pal"} onChange={(e) => setLastname(e.target.value)}/>
            <InputBox label={"Password"} placeholder={"123456"} onChange={(e) => setPassword(e.target.value)}/>
            <div className='py-3'>
                <Button label={"Sign up"} onClick={ async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                      username,
                      firstname,
                      lastname,
                      password
                    });
                    localStorage.setItem("token", response.data.token);
                    
                    navigate('/account', {state: {username}});
                  }
                }/>
            </div>
            <BottomWarning label={"Already have an Account?"} buttonText={"Sign in"} to={'/signin'}/>
        </div> 
    </div> 
   </div> 
   
  )
}

export default Signup