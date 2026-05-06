import React, { useEffect, useState } from "react";

function SimpleTimer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    // FIX 3: Empty state ko "" (empty string) se initialize kiya.
    // Isse React "uncontrolled input" ka laal error nahi dega.
    const [inputTime, setInputTime] = useState("");

    useEffect(() => {
        // FIX 1: The Switch Stuck ON Bug
        // Agar time 0 ho gaya hai aur switch ON hai, toh usko OFF kar do.
        if (time <= 0 && isRunning) {
            setIsRunning(false);
            return;
        }

        // Agar engine OFF hai ya time pehle se 0 hai, toh interval mat chalao
        if (!isRunning || time <= 0) return;

        const timeRef = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timeRef);
    }, [time, isRunning]);

    const min = Math.floor(time / 60).toString().padStart(2, '0');
    const sec = Math.floor(time % 60).toString().padStart(2, '0');

    function handleStart() {
        if (time <= 0) return;
        setIsRunning(true);
    }

    function pauseTimer() {
        if (isRunning) {
            setIsRunning(false);
        }
    }

    function resetTimer() {
        setIsRunning(false);
        setTime(0);
        setInputTime(""); // UX Polish: Reset karne par input box bhi khali kar diya
    }

    function handleSetTime() {
        // FIX 2: String ko Number mein convert kiya aur 60 se multiply kiya (Minutes to Seconds)
        const timeInMinutes = Number(inputTime);
        
        // Agar gaadi chal rahi hai ya user ne negative/zero time daala hai, toh aage mat badho
        if (isRunning || timeInMinutes <= 0) return;
        
        setTime(timeInMinutes * 60);
        setInputTime(""); // UX Polish: Time set hone ke baad input box khali kar do
    }

    return (
        <div>
            <h1>Simple Timer</h1>
            <div>
                <input
                    type="number"
                    placeholder="Enter minutes..."
                    value={inputTime}
                    onChange={(e) => setInputTime(e.target.value)}
                />
            </div>
            
            <span style={{ fontSize: "2rem", fontWeight: "bold", margin: "10px 0", display: "block" }}>
                {`${min}:${sec}`}
            </span>
            
            <div>
                <button onClick={handleSetTime}>Set Time</button>
                <button onClick={handleStart}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default SimpleTimer;