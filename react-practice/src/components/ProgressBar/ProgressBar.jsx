import React, { useState } from 'react';

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Progress: {progress}%</h3>
      
      {/* Outer Container (Grey Bar) */}
      <div style={{ width: "100%", backgroundColor: "#e0e0df", borderRadius: "10px" }}>
        {/* Inner Progress (Blue Bar) */}
        <div style={{ 
          height: "20px", 
          width: `${progress}%`, // Width state se control ho rahi hai
          backgroundColor: "#4caf50", 
          borderRadius: "inherit",
          transition: "width 0.4s ease-in" // Smooth animation ke liye
        }}></div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setProgress(prev => Math.min(prev + 10, 100))}>Increase</button>
        <button onClick={() => setProgress(prev => Math.max(prev - 10, 0))}>Decrease</button>
      </div>
    </div>
  );
}

export default ProgressBar;