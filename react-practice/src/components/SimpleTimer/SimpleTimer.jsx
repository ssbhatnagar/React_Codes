import React, { useState, useRef, useEffect } from "react";

function SimpleTimer() {
    const [time, setTime] = useState(0);
    const [userInput, setUserInput] = useState("");
    const timeRef = useRef(null);

    function startTimer(){
      if(timeRef.current || time <=0) return;

      timeRef.current = setInterval(() => {
        setTime((prev) =>{
          if(prev<=1){
            clearInterval(timeRef.current);
            timeRef.current = null;
            return 0;
          }
          return prev -1
        }
        )
      }, 1000)
    }

    function pauseTimer(){
      clearInterval(timeRef.current);
      timeRef.current = null;
    }

    function resetTimer(){
      pauseTimer();
      setTime(0);
      setUserInput("");
    }
    function handleSetTime(){
      pauseTimer()
      const seconds = parseInt(userInput);
      if(!isNaN(seconds) && seconds >0){
        setTime(seconds)
      }
    };

    useEffect(() => {
      return () => clearInterval(timeRef.current);
    }, [])

    return(
      <div>
      <input
      type="number"
      placeholder="Enter seconds"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      />
      <h1>Time Remaining: {time}s</h1>
      <div>
        <button onClick={() => handleSetTime()}>setTime</button>
      </div>
       <div>
        {/* ye best practice nahi hai agar hum koi parameter pass nahi kar rahe at that time its best ki hum diretly startTimer pass kar de jaruri nahi ki arrow banana hai */}
        {/* <button onClick={() =>startTimer()}>Start</button>  */}
        <button onClick={startTimer}>Start</button> 
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      </div>
    )
}

export default SimpleTimer;