import { response } from "express"
import uploadOnCloudinary from "../config/cloudinary.js"
import geminiResponse from "../gemini.js"
import User from "../models/user.model.js"
import moment from "moment/moment.js"

export const getCurrentUser=async (req ,res) => {
    try {
        const userId= req.userId
        const user = await User.findById(userId).select("-password")
        if(!user) {
            return res.status(400).json({message:"user not found"})
        }      
      return res.status(200).json({user})
    } catch (error) {
     return res.status(400).json({message:"get current user error"})   
    }
}

export const updateAssistant = async (req,res) => {
    try {
        const {assistantName,imageUrl} = req.body
        let assistantImage;
        if(req.file) {
            assistantImage= await uploadOnCloudinary(req.file.path)
        } else {
            assistantImage= imageUrl
        }
        const user= await User.findByIdAndUpdate(req.userId,{assistantName,assistantImage},{new:true}).select("-password")
        return res.status(200).json(user)
    } catch (error) {
             return res.status(400).json({message:"update assistant user error"})       
    }
}

export const askToAssistant = async (req,res)=> {
    try {
        const {command} = req.body
        const user=await User.findById(req.userId);
        user.history.push(command)
        user.save()
        const userName= user.name
        const assistantName= user.assistantName
        const assistantImage= user.assistantImage
        const result = await geminiResponse(command,assistantName,userName)

        const jsonMatch=result.match(/{[\s\S]*}/)
        if(!jsonMatch) {
            return res.status(400).json({response:"sorry, i can't understand"})
        }
        const gemResult= JSON.parse(jsonMatch[0])
        const type = gemResult.type

        switch(type) {
            case 'get-date': 
              return res.json({
                type,
                userInput : gemResult.userInput,
                response : `current date is ${moment().format("YYYY-MM-DD")}`
              });
            case 'get-time':
                return res.json({
                type,
                userInput : gemResult.userInput,
                response : `current time is ${moment().format("hh:mm:A")}`
              });
            case 'get-day':
                return res.json({
                type,
                userInput : gemResult.userInput,
                response : `today is ${moment().format("dddd")}`
              });
            case 'get-month':
                return res.json({
                type,
                userInput : gemResult.userInput,
                response : `today is ${moment().format("MMMM")}`
              });
    case 'general':
    case 'google-search':
    case 'youtube-search':
    case 'youtube-play':
    case 'get-time':
    case 'get-date':
    case 'get-day':
    case 'get-month':
    case 'calculator-open':
    case 'instagram-open':
    case 'facebook-open':
    case 'weather-show':
    case 'wikipedia-search':
    case 'unit-conversion':
    case 'currency-conversion':
    case 'whatsapp-open':
    case 'camera-open':
    case 'settings-open':
    case 'music-play':
    case 'joke-tell':
    case 'quote-tell':
    case 'news-headlines':
    case 'greeting':
    case 'bye':
    case 'thanks':
    case 'who-are-you':
    case 'motivate-me':
    case 'reminder-set':
    case 'alarm-set':
    case 'open-maps':
    case 'nearby-places':
    case 'email-open':
    case 'sms-send':
    case 'call-contact':
    case 'battery-status':
    case 'device-info':
    case 'fun-fact':
    case 'story-tell':
    case 'riddle-tell':
    case 'translate':
    case 'spell-check':
    case 'how-to':
    case 'recipe-search':
    case 'movie-recommend':
    case 'book-recommend':
    case 'game-suggest':
    case 'language-learn':
    case 'voice-change':
    case 'assistant-mode-change':
    case 'resume-help':
    case 'interview-questions':
    case 'interviewer-mode':
    case 'mock-interview':
    case 'exam-preparation':
    case 'ask-me-question':
    case 'study-tip':
    case 'career-advice':
    case 'portfolio-review':
    case 'email-draft':
    case 'cover-letter-help':
    case 'linkedin-profile-tip':
    case 'job-alert':
    case 'coding-practice':
    case 'quiz-mode':
    case 'explain-topic':
    case 'todo-create':
    case 'focus-mode':
    case 'motivation-story':
    case 'bed-time-story':
        return res.json({
            type,
            userInput:gemResult.userInput,
            response:gemResult.response,
        });
    
    default:
        return res.status(400).json({response:"I didn't understand that command."})

        }

    } catch (error) {
       return res.status(400).json({response:"Ask assistant error."}) 
    }
}