import React, { useState, useEffect } from "react";

function CustomTimer() {
  // 1. THE DS (State)
  const [inputMinutes, setInputMinutes] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 2. THE ENGINE (useEffect)
  useEffect(() => {
    let timerId; // Isko ek 'Driver' maan le

    // Agar gaadi ON hai (isRunning) AUR tanki mein petrol hai (totalSeconds > 0)
    if (isRunning && totalSeconds > 0) {
      // Driver ko bolo har 1000ms (1 second) mein value 1 kam kare
      timerId = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } 
    // Agar tanki khali ho gayi (0), toh gaadi band kar do
    else if (totalSeconds === 0) {
      setIsRunning(false);
    }

    // THE CLEANUP (Bohot Zaroori!): Jab component hate ya state change ho, toh purane driver ko hata do warna bohot saare driver ek sath chalne lagenge (Memory Leak/Fast Timer bug)
    return () => clearInterval(timerId);
    
  }, [isRunning, totalSeconds]); // Dependency: Engine tabhi check hoga jab Switch on/off ho, ya seconds badlein

  // 3. ACTIONS (Buttons)
  function handleStart() {
    // Agar timer 0 par hai, toh pehle input wale minutes ko seconds banakar tanki mein daalo
    if (totalSeconds === 0 && inputMinutes > 0) {
      setTotalSeconds(inputMinutes * 60);
    }
    setIsRunning(true); // Gaadi start!
  }

  function handleStop() {
    setIsRunning(false); // Gaadi rok do (Pause)
  }

  function handleReset() {
    setIsRunning(false); // Gaadi band
    setTotalSeconds(0);  // Tanki khali
    setInputMinutes(""); // Input saaf
  }

  // 4. THE DASHBOARD (Derived State - No use of SetState here!)
  // Math.floor fraction ko hata deta hai (e.g., 2.5 ko 2 bana dega)
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Formatting: "5:3" ko "05:03" dikhane ke liye padStart use karte hain
  const displayTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Custom Timer</h1>
      
      {/* DASHBOARD */}
      <h2 style={{ fontSize: "3rem", margin: "10px" }}>{displayTime}</h2>

      {/* INPUT */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter Minutes"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
          disabled={isRunning} // Chalti gaadi mein petrol mat dalo
          style={{ padding: "10px", fontSize: "16px" }}
        />
      </div>

      {/* CONTROLS */}
      <div>
        {!isRunning ? (
          <button onClick={handleStart} style={{ padding: "10px 20px", marginRight: "10px" }}>Start</button>
        ) : (
          <button onClick={handleStop} style={{ padding: "10px 20px", marginRight: "10px" }}>Stop</button>
        )}
        <button onClick={handleReset} style={{ padding: "10px 20px" }}>Reset</button>
      </div>
    </div>
  );
}

export default CustomTimer;