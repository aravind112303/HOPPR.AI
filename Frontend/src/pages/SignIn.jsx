import React, { useContext, useState } from 'react'
import nbg from "../assets/nbg.png"
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function SignIn() {
    const [showPassword,setShowPassword]=useState(false)
    const {serverUrl,userData,setUserData} =useContext(userDataContext)
    const navigate = useNavigate()
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [err,seterr]=useState("")

    const handleSignIn = async(e) => {
        e.preventDefault()
        seterr("")
        try {
            let result= await axios.post(`${serverUrl}/api/auth/signin`,{email,password},{withCredentials:true})
            setUserData(result.data)
            navigate("/")
        } catch (error) {
            setUserData(null)
            seterr(error.response.data.message)
        }
    }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url( ${nbg})`}}>
    <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000023] backdrop-blur shadow-lg shadow-black-200 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignIn}>
    <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Sign In to <span className='text-blue-700'>HOPPR</span>.AI</h1>
    <input type="email" placeholder='Enter email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]'required onChange={(e)=>setemail(e.target.value)} value={email}/>
    <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
        <input type={showPassword?"text":"password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e)=>setpassword(e.target.value)} value={password} />
        {!showPassword && <IoIosEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=> setShowPassword(true)}/>}       
        {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=> setShowPassword(false)}/>}       
    </div>
    {err.length>0 && <p className='text-red-500 text-[17px]'>
        *{err}
        </p>}
    <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px] '>Sign In</button>
    <p className='text-white text-[18px] cursor-pointer'>Create an account ? <span className='text-blue-700 hover:text-cyan-400' onClick={()=>navigate("/Signup")}>Sign Up</span></p>
    </form>
        
    </div>
  )
}

export default SignIn