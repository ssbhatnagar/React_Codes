import React, { useState, useRef, useEffect } from "react";

function SimpleTimer() {
  const [time, setTime] = useState(0); // Timer ki value
  const [userInput, setUserInput] = useState(""); // Input field ke liye
  const timerRef = useRef(null); // Interval ID ko store karne ke liye

  // Timer Start karne ka logic
  const startTimer = () => {
    // Agar timer pehle se chal raha hai toh dusra mat chalao
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Timer Pause karne ka logic
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // Timer Reset karne ka logic
  const resetTimer = () => {
    pauseTimer();
    setTime(0);
    setUserInput("");
  };

  // Custom time set karne ka logic
  const handleSetTime = () => {
    const seconds = parseInt(userInput);
    if (!isNaN(seconds) && seconds > 0) {
      setTime(seconds);
    }
  };

  // Cleanup: Agar component band ho jaye toh timer bhi ruk jaye (Memory Leak se bachata hai)
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h2>Timer: {time}s</h2>

      {/* Input section */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Enter seconds"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSetTime}>Set Time</button>
      </div>

      {/* Control Buttons */}
      <div>
        <button onClick={startTimer} style={{ marginRight: "5px" }}>Start</button>
        <button onClick={pauseTimer} style={{ marginRight: "5px" }}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default SimpleTimer;