import React, { useState, useCallback, useEffect, useRef } from "react";
import "../styles/PasswordGenerator.css";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(4);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    setGeneratedPassword("");
    setError("");
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characterPool = "";
    if (includeUppercase) characterPool += upperCaseChars;
    if (includeLowercase) characterPool += lowerCaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (characterPool === "") {
      setGeneratedPassword("");
      setError("Please select at least one character type.");
      return;
    }
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }
    setGeneratedPassword(password);
  }, [
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  useEffect(() => {
    if (
      includeLowercase ||
      includeUppercase ||
      includeNumbers ||
      includeSymbols
    ) {
      generatePassword();
    } else {
      setGeneratedPassword("");
      setError("Please select at least one character type.");
    }
  }, [
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    generatePassword,
  ]);

  const handleLengthChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 4 && value <= 20) {
      setPasswordLength(value);
      setError("");
    }
  };

  const handleSliderChange = (e) => {
    setPasswordLength(Number(e.target.value));
    setError("");
  };

  const copyPasswordToClipboard = () => {
    // minimal copy handler requested by user
    window.navigator.clipboard.writeText(generatedPassword);
    passwordRef.current?.select();
  };

  return (
    <div className="App">
      <h2>Password Generator</h2>
      <div className="length-input">
        <label>
          Password length
          <input
            type="number"
            min="4"
            max="20"
            value={passwordLength}
            onChange={handleLengthChange}
          />
        </label>
      </div>
      <div className="length-slider">
        <label>
          <input
            type="range"
            min="4"
            max="20"
            value={passwordLength}
            onChange={handleSliderChange}
           
          />
          <span>{passwordLength}</span>
        </label>
      </div>
      <div className="include-uppercase">
        <label>
          Include uppercase
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
        </label>
      </div>
      <div className="include-lowercase">
        <label>
          Include lowercase
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
        </label>
      </div>
      <div className="include-numbers">
        <label>
          Include numbers
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </label>
      </div>
      <div className="include-symbols">
        <label>
          Include symbols
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </label>
      </div>
      <div className="generate-button">
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      <div className="result">
        {error && <p>{error}</p>}
        {generatedPassword && (
          <div className="generated-block">
            <strong>Generated Password:</strong>
            <input
              className="generated-value"
              readOnly
              ref={passwordRef}
              value={generatedPassword}
            />
            <div className="copy-controls">
              <button className="copy-button" onClick={copyPasswordToClipboard}>
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
