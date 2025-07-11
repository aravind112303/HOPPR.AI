import React, { useContext, useRef, useState } from 'react'
import Card from "../components/Card.jsx"
import image1 from "../assets/image-1.jpg"
import image2 from "../assets/image-2.png"
import image3 from "../assets/image-3.png"
import image5 from "../assets/backgroundimage.png"
import { FiUpload } from "react-icons/fi";
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";


function Customize() {
  const Navigate= useNavigate()
   const {serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage} = useContext(userDataContext)
    const inputImage=useRef()

    const handleImage=(e)=> {
        const file=e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[#000000] to-[#010131]  flex justify-center items-center flex-col p-[20px] gap-[20px]'>
            <IoMdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=> Navigate("/")}/>
        <h1 className='text-white mb-[30px] text-[30px] text-center'>Select your <span className='text-blue-400'>Hoppr Assistant </span>Image</h1>
       <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
         <Card image={image2}/>
          <Card image={image1}/>
           <Card image={image3}/>       
             <Card image={image5}/>
             <div
  className={`
    w-[70px] h-[140px] 
    lg:w-[150px] lg:h-[250px] 
    bg-[#30326] 
    border-2 border-[#0a0a49] 
    rounded-2xl overflow-hidden 
    hover:shadow-2xl hover:shadow-gray-700 hover:border-white 
    cursor-pointer 
    flex items-center justify-center 
    ${selectedImage === "input" ? "border-4 border-white shadow-2xl shadow-gray-700" : ""}
  `}
  onClick={() => {
    inputImage.current.click();
    setSelectedImage("input");
  }}
>
  {!frontendImage && (
    <FiUpload className="text-white w-[30px] h-[30px]" />
  )}
  {frontendImage && (
    <img src={frontendImage} className="h-full object-cover" />
  )}
</div>

    <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
        </div>
          {selectedImage && <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer ' onClick={()=>Navigate("/customize2")}>Continue</button>  }
        </div>
  )
}
export default Customize