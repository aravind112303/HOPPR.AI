import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

function Card({image}) {
     const {serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage} = useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#30326] border-2 border-[#0a0a49] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-gray-700 hover:border-white cursor-pointer ${selectedImage==image?"border-4 border-white shadow-2xl shadow-gray-700":null}`} onClick={()=>{setSelectedImage(image),setBackendImage(null),setFrontendImage(null)}}>
        <img src={image} className="h-full object-cover"/>
    </div>
  )
}

export default Card