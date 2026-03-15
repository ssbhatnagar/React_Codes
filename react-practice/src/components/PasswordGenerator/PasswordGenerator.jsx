import React, { useState } from "react";

function PasswordGenerator() {
  // 1. STATES
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8); // Default length 8 rakh rahe hain

  // 2. THE ENGINE (Generator Logic)
  function generatePassword() {
    // Ye humara "Godown" hai jisme se character uthane hain
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    
    let generatedPass = ""; // Naya password banane ke liye khali dabba

    // Jitni length user ne maangi hai, utni baar loop chalao
    for (let i = 0; i < length; i++) {
      // 1. 'chars' string mein se koi bhi ek random position (index) nikalo
      // Math.random() 0.0 se 0.99 deta hai. Usse length multiply karke Math.floor lagate hain taaki exact index mile
      const randomIndex = Math.floor(Math.random() * chars.length);
      
      // 2. Us position wale character ko string mein jodte jao
      generatedPass += chars[randomIndex];
    }

    // Loop khatam, password tayar. State ko update kar do!
    setPassword(generatedPass);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Password Generator</h2>
      
      {/* RESULT DISPLAY */}
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          value={password} 
          readOnly 
          placeholder="Click generate!"
          style={{ padding: "10px", width: "250px", fontSize: "16px" }}
        />
      </div>

      {/* CONTROLS */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Password Length: <strong>{length}</strong>
          <br />
          <input 
            type="range" 
            min="6" 
            max="20" 
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </label>
      </div>

      {/* ACTION BUTTON */}
      <button onClick={generatePassword} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Generate Password
      </button>

    </div>
  );
}

export default PasswordGenerator;