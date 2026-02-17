import React, { useState, useRef, useEffect } from "react";

function SimpleTimer() {
 
  
  // STEP 1 do states banayi ek userInput aur ek time ke liye
  const [userInput, setUserInput] = useState("")
  const [time, setTime] = useState(0);

  // STEP 2 useRef se time refrence ke liye variable banayenge initialize karenge null se
  const timeRef = useRef(null)

  // STEP 3A start timer ka code
  function startTimer(){
    // return kar do agar timeRef mai koi value hai ya time 0 ke baraber hai, iska matlab timer chal raha hai abhi bhi
    if(timeRef.current || time <=0) return;

    timeRef.current = setInterval(() => {
      setTime((prev) =>{
        if(prev < 1){
          clearInterval(timeRef.current)
          timeRef.current = null
          return 0;
        }
        return prev -1
      })
    }, 1000)
  }

  // STEP 3B ye pause karne ke liye hai 
  function pauseTimer(){
    clearInterval(timeRef.current) // clear karo 
    timeRef.current = null // null karo
  }

  // STEP 3C ye reset le liye hai
  function resetTimer(){ 
    pauseTimer(); // pehele pause 
    setTime(0) // state reset 
    setUserInput("") // state reset
  }

  // STEP 3D handler jo input ko int mai convert karege
  function handleSetTime(){
    pauseTimer() // pehele pause karo
    const seconds = parseInt(userInput) // input ko int mai badlo seconds 
    if(!isNaN(seconds) && seconds>0){ // user ne koi bekar ka input jaise + - ya xyx to nahi diya ye check uske liye hai aur definitly 0 se bada time hoga tabhi chalega
      setTime(seconds)
    }
  }


  // STEP 3E garbage cleaning
  useEffect(() => {
    return () => clearInterval(timeRef.current)
  }, [])

  return (
    <div>
      <div>
        <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter seconds"
        name="time"
        />
        <button onClick={handleSetTime}>Click me to set Time</button>
        <div>
        <button onClick={setTime}>Start timer</button>
        <button onClick={pauseTimer}>pause</button>
        <button onClick={resetTimer}>reset</button>
        </div>
        <div>Ye raha samaye: {time}</div>
      </div>
    </div>
  )

}

export default SimpleTimer;