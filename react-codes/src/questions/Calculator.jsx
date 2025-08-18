// import React, { useState } from "react";

// function Calculator(){

//     const [ans, setAns] = useState(0);
//     const[num1, setNum1] = useState(0);
//     const[num2, setNum2] = useState(0);

//     function handleAddition(){
//         setAns(num1+num2);
//     }
//     function handleSubtraction(){
//         setAns(num1-num2);
//     }
//     function handleMultiplication(){
//         setAns(num1*num2);
//     }
//     function handleDivision(){
//         setAns(num1/num2);
//     }

//     return(
//         <div>
//             <div className="inputfields">
//                 <input placeholder="enter number 1" type="number" onChange={(e) => setNum1(Number(e.target.value))}/>
//                 <input placeholder="enter number 2" type="number" onChange={(e) => setNum2(Number(e.target.value))}/>
//             </div>
//             <div>
//                 <button onClick={handleAddition}> + </button>
//                 <button onClick={handleSubtraction}> - </button>
//                 <button onClick={handleMultiplication}> * </button>
//                 <button onClick= {handleDivision}> / </button>
//             </div>

//             <div>
//                 <span> Ans = {ans}</span>
//             </div>


//         </div>
//     )

// }
// export default Calculator;


import React, { useState } from "react";

function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [ans, setAns] = useState(0);

  // Common function to handle all operations
  const handleOperation = (operation) => {
    let result;
    switch (operation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        // Division by zero case
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
        break;
      default:
        result = "Invalid operation";
    }
    setAns(result);
  };

  return (
    <div className="calculator-container">
      <h1 className="title">Simple Calculator</h1>
      <div className="input-group">
        <input
          className="input-field"
          placeholder="Enter number 1"
          type="number"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
        />
        <input
          className="input-field"
          placeholder="Enter number 2"
          type="number"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
        />
      </div>
      <div className="button-group">
        <button className="operator-button" onClick={() => handleOperation("+")}>+</button>
        <button className="operator-button" onClick={() => handleOperation("-")}>-</button>
        <button className="operator-button" onClick={() => handleOperation("*")}>*</button>
        <button className="operator-button" onClick={() => handleOperation("/")}>/</button>
      </div>
      <div className="result-container">
        <span className="result-text">Ans: {ans}</span>
      </div>
    </div>
  );
}

export default Calculator;