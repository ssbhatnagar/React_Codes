import React, { useState } from "react";
import ReactDOM from "react-dom";

// --- 1. THE MODAL COMPONENT (Portal) ---
function MyModal({ isOpen, onClose }) {
  // Agar modal open nahi karna, toh kuch mat dikhao (Return null)
  if (!isOpen) return null;

  // createPortal 2 cheezein leta hai: (1) Kya dikhana hai, (2) Kahan dikhana hai
  return ReactDOM.createPortal(
    // THE OVERLAY (Kala background jo poori screen cover karega)
    <div style={overlayStyle}>
      
      // THE MODAL BOX (Asli safed dabba)
      <div style={modalBoxStyle}>
        <h2>Main Portal se aaya hu! 🚀</h2>
        <p>Main DOM mein ekdum body tag ke paas hu, kisi div ke andar fasa nahi hu.</p>
        
        {/* Close Button */}
        <button onClick={onClose} style={{ padding: "10px 20px", marginTop: "15px", cursor: "pointer" }}>
          Close Modal
        </button>
      </div>

    </div>,
    document.body // Kahan dikhana hai? Seedha HTML ki <body> mein!
  );
}

// --- 2. MAIN APP COMPONENT ---
function App() {
  // Modal ko on/off karne ka Switch
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: "50px", border: "2px solid red" }}>
      <h1>React Portals Example</h1>
      <p>Ye parent div red border ke andar fasa hua hai.</p>

      {/* Button dabane pe switch ON karo */}
      <button onClick={() => setIsModalOpen(true)} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Open Modal
      </button>

      {/* Modal ko render karo, aur usko state aur close function pass karo */}
      <MyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// --- CSS Objects (For Simplicity) ---
const overlayStyle = {
  position: "fixed", // Poori screen cover karne ke liye
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Thoda transparent kala
  display: "flex",
  justifyContent: "center", // Box ko center mein lane ke liye
  alignItems: "center",
  zIndex: 1000, // Sabse upar dikhane ke liye
};

const modalBoxStyle = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
};

export default App;