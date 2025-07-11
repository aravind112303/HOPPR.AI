import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from './context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from "./assets/ai.gif"
import userImg from "./assets/user.gif"
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

function Home() {
  const {userData,serverUrl,setUserData, getGeminiResponse} = useContext(userDataContext)
  const navigate = useNavigate()
  const [listening , setListening] = useState(false)
  const [userText,setUserText] = useState("")
  const [aiText,setAiText] = useState("")
  const isSpeakingRef=useRef(false)
  const isRecognitionRef = {value:false}
  const recognitionRef = useRef(null)
  const synth = window.speechSynthesis
  const [ham,setHam] = useState(false)

  const handleLogOut=async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/Signin")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  const startRecognition =() => {
    if(!isSpeakingRef.current && !isRecognitionRef.current) {
    try {
      recognitionRef.current?.start();
      console.log("Recognition requested to start");
    } catch (error) {
      if(!error.message.includes("start")) {
        console.error("Start error:", error);
      }
    }
  }
  };

  const speak=(text)=> {
    const utterence = new SpeechSynthesisUtterance(text)
    utterence.lang = 'te-IN'; // Telugu language code
    const voices = window.speechSynthesis.getVoices()
    const teluguVoice = voices.find(v => v.lang === 'te-IN');
    if (teluguVoice) {
        utterence.voice = teluguVoice;
    }

    isSpeakingRef.current=true
    utterence.onend=()=> {
      setAiText(" ")
      isSpeakingRef.current=false
    setTimeout(() => {
      startRecognition()
      },800);
    }
    synth.cancel()
    synth.speak(utterence)
  }

  const handleCommand=(data)=> {
    const {type, userInput , response} = data
    speak(response);

    if(type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');

    }

if (type === 'camera-open') {
    const query = encodeURIComponent('how to open camera in browser');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'settings-open') {
    const query = encodeURIComponent('how to open device settings');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'joke-tell') {
    const query = encodeURIComponent('random programming joke');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'quote-tell') {
    const query = encodeURIComponent('motivational quote');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'greeting') {
    const query = encodeURIComponent('how to greet someone politely');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'bye') {
    const query = encodeURIComponent('how to say goodbye professionally');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'thanks') {
    const query = encodeURIComponent('how to say thank you nicely');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'who-are-you') {
    const query = encodeURIComponent('who is Google Assistant');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'motivate-me') {
    const query = encodeURIComponent('motivational speech or video');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'reminder-set') {
    const query = encodeURIComponent('how to set reminders using browser');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'alarm-set') {
    const query = encodeURIComponent('how to set an alarm online');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'sms-send') {
    const query = encodeURIComponent('how to send SMS from PC or browser');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'call-contact') {
    const query = encodeURIComponent('how to make call from browser');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'battery-status') {
    const query = encodeURIComponent('check battery status JavaScript');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'device-info') {
    const query = encodeURIComponent('how to get device info in browser');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'fun-fact') {
    const query = encodeURIComponent('fun fact of the day');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'story-tell') {
    const query = encodeURIComponent('short story to read');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'riddle-tell') {
    const query = encodeURIComponent('fun riddle to solve');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'quiz-mode') {
    const query = encodeURIComponent('interactive quiz online');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'ask-me-question') {
    const query = encodeURIComponent('fun questions to answer');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'study-tip') {
    const query = encodeURIComponent('best study tips');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'career-advice') {
    const query = encodeURIComponent('career advice for students');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'portfolio-review') {
    const query = encodeURIComponent('how to get portfolio review online');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'interviewer-mode') {
    const query = encodeURIComponent('how to become an interviewer');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'mock-interview') {
    const query = encodeURIComponent('free mock interview practice online');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'todo-create') {
    const query = encodeURIComponent('create a to-do list online');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'focus-mode') {
    const query = encodeURIComponent('how to stay focused while studying');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'motivation-story') {
    const query = encodeURIComponent('real motivational story');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'bed-time-story') {
    const query = encodeURIComponent('short bedtime story for adults');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

if (type === 'instagram-open') {
    window.open('https://www.instagram.com', '_blank');
}

if (type === 'youtube-search') {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
}

if (type === 'youtube-play') {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
}

if (type === 'facebook-open') {
    window.open('https://www.facebook.com', '_blank');
}



  }

  useEffect(()=> {
    const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous=true,
    recognition.lang='en-US'
    recognition.interimResults = false;
    recognitionRef.current=recognition;

    let isMounted = true;

    const startTimeout = setTimeout(()=> {
      if(isMounted && !isSpeakingRef.current && !isRecognitionRef.current) {
        try {
          recognition.start();
          console.log("Recognition requested to start");
        } catch (e) {
          if(e.name !== "InvalidStateError") {
            console.error(e);
          }
        }
      }
    },1000)

    recognition.onstart = () => {
      isRecognitionRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognitionRef.current =false;
      setListening(false);
      if(isMounted && !isSpeakingRef.current) {
        setTimeout(()=> {
          if(isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted");
            } catch (e) {
              if (e.name !== "InvalidStateError")
                console.error(e);
            }
          }
        },1000);
      }
    };
     
    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognitionRef.current = false;
      setListening(false);
      if(event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
         if(isMounted) {
          try {
            recognition.start();
            console.log("Recognition restarted after error");
          } catch (error) {
            if(e.name !== "InvalidStateError")
              console.log(e);
          }
         }
        }, 1000);
      }
    }; 


    recognition.onresult=async (e)=> {
      const transcript=e.results[e.results.length-1][0].transcript.trim()
      console.log(transcript)

      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        
        setUserText(transcript)
        recognition.stop()
        isRecognitionRef.current=false
        setListening(false)
        const data= await getGeminiResponse(transcript)
        console.log(data)
        handleCommand(data)
        setAiText(data.response)
        setUserText(" ")
      }
    };

      const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
      greeting.lang = 'ta-IN';    
      window.speechSynthesis.speak(greeting);
   

    return ()=> {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognitionRef.current=false;
    }

  },[])

  return (  
    <div className='w-full h-[100vh] bg-gradient-to-t from-[#000000] to-[#010131] flex justify-center items-center flex-col p-[20px] gap-[20px] ' >
      <BiMenuAltRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(true)}/>
      <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000032] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform `} >
      <RxCross2 className=' text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(false)}/>
      <button className='min-w-[150px] h-[60px]  text-black font-semibold  bg-white rounded-full text-[19px] cursor-pointer ' onClick={handleLogOut}>Log Out</button>
      <button className='min-w-[150px] h-[60px]  text-black font-semibold  bg-white rounded-full text-[19px] px-[20px] py-[10px] cursor-pointer' onClick={()=>navigate("/Customize")}>Customize your Assistant</button>

      <div className='w-full h-[2px] bg-gray-400'></div>
      <h1 className='text-white font-semibold text-[19px]'>History</h1>
      <div className='w-full h-[400px] gap-[20px] overflow-auto flex flex-col'>
        {userData.history?.map((his)=> (
          <span className='text-gray-300 text-[18px] truncate'>{his}</span>
        ))
      }

      </div>
      </div>
      <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[20px] right-[20px] bg-white rounded-full text-[19px] cursor-pointer hidden lg:block' onClick={handleLogOut}>Log Out</button>
      <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[100px] right-[20px] bg-white rounded-full text-[19px] px-[20px] py-[10px] cursor-pointer hidden lg:block' onClick={()=>navigate("/Customize")}>Customize your Assistant</button>
        <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
          <img src={userData?. assistantImage} alt="" className='h-full object-cover' />
        </div>
        <h1 className='text-white text-[18px] font-semibold'>I'm {userData.assistantName}</h1>
        {!aiText && <img src={userImg} alt="" className='w-[200px]' /> }
        {aiText && <img src={aiImg} alt="" className='w-[200px]' /> }
        <h1 className='text-white text-[18px] font-semibold break-words'> {userText?userText:null} </h1>
        <h1 className='text-white text-[18px] font-semibold break-words mb-20px'> {aiText?aiText:null} </h1>

    </div>
  )
}

export default Home