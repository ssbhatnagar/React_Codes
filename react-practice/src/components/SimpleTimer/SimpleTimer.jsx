import React, {useRef, useEffect, useState} from "react"

function SimpleTimer(){

  // pehele 2 states banao
  const [userInput, setUserInput] = useState("");
  const[time, setTime] = useState(0); 

  // ab time reference rakho => useRef ka use karo
  const timeRef = useRef(null);

  // startTimer
  function startTimer(){
    // check ki kya timer already chal to nahi raha ya band to nahi
    if(timeRef.current || time <=0) return;
    timeRef.current = setInterval(() => {
      setTime((prev) =>{
        if(prev <= 1){
          clearInterval(timeRef.current);
          timeRef.current = null;
          return 0;
        }
        return prev -1;
      })
    }, 1000)
  } 

  function pauseTimer(){
    if(timeRef.current){
    clearInterval(timeRef.current)
    timeRef.current = null;
    }
  }

  function resetTimer(){
    pauseTimer();
    setTime(0);
    setUserInput("");
  }

  function handleSetTime(){
    const seconds = parseInt(userInput);
    if(!isNaN(seconds) && seconds > 0){
      setTime(seconds);
      pauseTimer();
    }
  }

  // Ye function tumhare component ke andar rahega
const formatTime = () => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // String(seconds).padStart(2, '0') isliye taaki "9" ki jagah "09" dikhe
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

  // useEffect(() => {
  //   return () => clearInterval(timeRef.current);
  // }, [])

  useEffect(() => {
    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, []);

  return(
    <div>
      <label>
        Set your Timer
        <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter time"
        name="timeInput"
        />
      </label>
      <div>
      <button onClick={handleSetTime} >SetTime</button>
      <button onClick={startTimer} >Star timer</button>
      <button onClick={pauseTimer}>Pause Timer</button>
      <button onClick={resetTimer}>reset Timer</button>
      </div>
      <div>
      <strong>{formatTime()}</strong>
      </div>
    </div>
  )

}
export default SimpleTimer;