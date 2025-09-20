import React, { useState, useCallback, useEffect } from "react";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(4);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div>
      <h2>Password Generator</h2>
      <div>
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
      <div>
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
      <div>
        <label>
          Include uppercase
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Include lowercase
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Include numbers
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Include symbols
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      <div>
        {error && <p>{error}</p>}
        {generatedPassword && (
          <div>
            <strong>Generated Password:</strong>
            <div>{generatedPassword}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
