import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"

export const userDataContext=createContext()

function UserContext({children}) {
    const serverUrl = "http://localhost:8000"
    const [userData,setUserData] = useState(null)
    const [frontendImage,setFrontendImage]=useState(null)
    const [backendImage,setBackendImage]=useState(null)
    const [selectedImage,setSelectedImage]=useState(null)

    const handleCurrentUser = async () => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/current`, {
      withCredentials: true
    })
    setUserData(result.data.user) // or result.data depending on your API response
  } catch (error) {
    // 🔒 User is not logged in or token is invalid — this is OK
    setUserData(null)
    console.warn("Not logged in yet:", error.response?.data?.message || error.message)
  } 
}


    const getGeminiResponse = async (command) => {
      try {
        const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
        return result.data
      } catch (error) {
        console.log(err)
      }
    }

    useEffect(()=> {
      handleCurrentUser()
    },[])
    const value = {
        serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
    }
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext