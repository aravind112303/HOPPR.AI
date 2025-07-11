import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

function Customize2() {
      const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
      const [Assistantname,setAssistantName] =useState(userData?.Assistantname || "")
      const navigate = useNavigate()

      const handleUpdateAssistant = async ()=> {
        try {
          let formData= new FormData()
          formData.append("assistantName", Assistantname)
          if(backendImage) {
            formData.append("assistantImage",backendImage)
          } else {
            formData.append("imageUrl",selectedImage)
          }
          const result=await axios.post(`${serverUrl}/api/user/update`,formData, {withCredentials:true})
          console.log(result.data)
          setUserData(result.data)
          navigate("/")
        } catch (error) {
          console.log(error) 
        }
      }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[#000000] to-[#010131]  flex justify-center items-center flex-col p-[20px] gap-[20px] relative'>
      <IoMdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=> navigate ("/customize") }/>
      <h1 className='text-white mb-[30px] text-[30px] text-center'>Enter your <span className='text-blue-400'>Hoppr Assistant </span>Name</h1>
        <input type="text" placeholder='eg. Hoppr' className='w-full max-w-[500px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]' required onChange={(e)=>setAssistantName(e.target.value)} value={Assistantname} />
        {Assistantname && <button className='min-w-[200px] h-[60px] mt-[30px]
         text-black font-semibold bg-white rounded-full text-[19px] 
         cursor-pointer ' 
         onClick={()=> { 
          handleUpdateAssistant()}
      } 
        >Create Assistant</button>
}
    </div>
  )
}

export default Customize2