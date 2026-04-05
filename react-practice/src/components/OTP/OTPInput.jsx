import { useState, useRef, useEffect } from "react"
import Styles from '../OTP/CSS/OTPInput.module.css'

const NO_OF_OTP_INPUT = 5

function OTPInput() {

    const [inputArray, setInputArray] = useState(new Array(NO_OF_OTP_INPUT).fill(""));
    const inputRef = useRef([]);

    function handleInputChange(value, index) {
        if (value !== "" && isNaN(value)) 
            { 
                return (window.alert("OTP should be number and non -empty"))
            }
        const newValue = value.trim();     
        const newArr = [...inputArray];
        newArr[index] = newValue.slice(-1);
        
        setInputArray(newArr)
        newValue &&    inputRef.current[index + 1]?.focus();       
        
        
    }

    function handleKeyPress(e, index){
        
        if(!e.target.value && e.key === "Backspace" && index > 0){
            inputRef.current[index - 1]?.focus();
        }
    }

    useEffect(() => {
        inputRef.current[0]?.focus()
    }, [])

    return (
        <div className={Styles.mainWrapper}>
            <h1>Validate OTP</h1>
            <div className={Styles.inputContainer}>
                {inputArray.map((input, index) =>
                    <input
                        key={index}
                        type="text"
                        value={inputArray[index]}
                        onChange={(e) => handleInputChange(e.target.value, index)}
                        ref={(input) => (inputRef.current[index] = input)}
                        onKeyDown={(e) =>handleKeyPress(e, index)}
                    />
                )}
            </div>
        </div>
    )

}
export default OTPInput