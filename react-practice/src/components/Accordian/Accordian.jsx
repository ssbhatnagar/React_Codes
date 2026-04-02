import React, { useState } from "react";
import Styles from './css/Accordian.module.css';

const items = [
    {
        title: "Javascript Basics",
        content: "Learn closure, hoisting"
    },
    {
        title: "React JS",
        content: "understand components and hooks"
    },
    {
        title: "NodeJS",
        content: "learn backend development"
    },
    {
        title: "full stack",
        content: "u are a full stack"
    }
];

function Accordian() {
    const [openIndex, setOpenIndex] = useState(null);

    function handleToggle(index) {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className={Styles.appContainer}>
            <h1 className={Styles.heading}>Accordian</h1>
            
            <div className={Styles.accordionWrapper}>
                {items.map((itm, index) => (
                    <div key={index} className={Styles.itemContainer}>
                        
                        {/* The naked button is now dressed up */}
                        <button 
                            className={Styles.accordionButton} 
                            onClick={() => handleToggle(index)}
                        >
                            <span>{itm.title}</span>
                            <span>{openIndex === index ? "🔼" : "🔽"}</span>
                        </button>

                        {/* Content Area */}
                        {openIndex === index && (
                            <div className={Styles.accordionContent}>
                                <p style={{ margin: 0 }}>{itm.content}</p>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accordian;