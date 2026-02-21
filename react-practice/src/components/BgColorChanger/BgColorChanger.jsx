import React, { useState } from 'react';

function BgColorChanger() {
  // Step 1: State banayi default color 'lightblue' ke saath
  const [color, setColor] = useState("lightblue");

  // Step 2: Function jo color update karega
  // Isme hum 'newColor' parameter le rahe hain taaki ye universal ban jaye
  function changeColor(newColor) {
    setColor(newColor);
  }

  return (
    // Step 4: Div banayi aur Inline style (Dynamic styling) di
    <div style={{ 
      backgroundColor: color, 
      height: "100vh", 
      width: "100vw", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      transition: "background-color 0.5s ease" // Smooth transition ke liye
    }}>
      
      <h1>Current Color: {color}</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        {/* Step 3: Buttons jisme handlers pass kiye */}
        <button onClick={() => changeColor("tomato")}>Tomato</button>
        <button onClick={() => changeColor("#4CAF50")}>Green</button>
        <button onClick={() => changeColor("orange")}>Orange</button>
        <button onClick={() => changeColor("lightblue")}>Reset</button>
      </div>

    </div>
  );
}

export default BgColorChanger;