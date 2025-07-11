import axios from "axios";
const geminiResponse=async (command,assistantName,userName) => {
   try {
    const apiUrl=process.env.GEMINI_API_URL

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
    You are not Google. You will now behave like a voice-enabled assistant.
    Your task is to understand the user's natural language input and respond with a JSON
    object like this:
    
    {
      "type": "general" | "google-search" | "youtube-search" | "youtube-play" | 
"get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | 
"instagram-open" | "facebook-open" | "weather-show" | "wikipedia-search" | 
"unit-conversion" | "currency-conversion" | "whatsapp-open" | "camera-open" | 
"settings-open" | "music-play" | "joke-tell" | "quote-tell" | "news-headlines" | 
"greeting" | "bye" | "thanks" | "who-are-you" | "motivate-me" | "reminder-set" | 
"alarm-set" | "open-maps" | "nearby-places" | "email-open" | "sms-send" | 
"call-contact" | "battery-status" | "device-info" | "fun-fact" | 
"story-tell" | "riddle-tell" | "translate" | "spell-check" | "how-to" | 
"recipe-search" | "movie-recommend" | "book-recommend" | "game-suggest" | 
"language-learn" | "voice-change" | "assistant-mode-change" | 
"resume-help" | "interview-questions" | "interviewer-mode" | 
"mock-interview" | "exam-preparation" | "ask-me-question" | 
"study-tip" | "career-advice" | "portfolio-review" | 
"email-draft" | "cover-letter-help" | "linkedin-profile-tip" | 
"job-alert" | "coding-practice" | "quiz-mode" | "explain-topic" | 
"todo-create" | "focus-mode" | "motivation-story" | "bed-time-story",
"userInput": "<original user input> {only remove your name from userinput if exists} and okavela evaraina google lekapote youtube lo emiaina search cheyyamani antaru ante, userInput lo only a search cheyyamana text matrame veyyali,
"response": "<a short spoken response to read out loud to the users>"
   }
Instructions:
- "type": determine the intent of the user.
- "userInput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question. If any question is asked and you know it's answer then keep that question in general category
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to open a calculator.
- "instagram-open": if user wants to open instagram.
- "facebook-open": if user wants to open facebook.
- "weather-show": if user wants to know weather
- "get-time": if user asks for current time. 
- "get-date": if user asks for today's date.

Important:
- Use ${userName} Okavela ninnu evaru tayarichesaru ani adigite
- Only respond with the JSON object, nothing else.

now your userInput- ${command}

`;

    const result = await axios.post(apiUrl,{
         "contents": [{
        "parts": [{ "text":prompt }]
      }]
    })
    return result.data.candidates[0].content.parts[0].text
   } catch (error) {
    console.log(error)
   }
}

export default geminiResponse