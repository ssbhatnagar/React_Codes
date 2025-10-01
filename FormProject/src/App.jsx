import React, { useState } from "react";

function FormExample() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [standard, setStandard] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [house, setHouse] = useState("");

  function handleRadioChange(e){
    setStandard(e.target.value)
  }

  function handleCheckbox(e){
    const value = e.target.value
    if(subjects.includes(value)){
      setSubjects(subjects.filter((subject) => subject !== value))
    }else{
      setSubjects([...subjects, value])
    }
  }

  function handleDropdown(e){
    setHouse(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log("FirstName: ", firstName);
    console.log("LastName: ", lastName);
    console.log("MobileNo: ", mobileNo);
    console.log("Email: ", email)
    console.log("Password: ", password);
    console.log("Standard: ", standard);
    console.log("Subjects: ", subjects);
    console.log("House: ", house);

  }

  function handleReset(){
    setFirstName("");
    setLastName("");
    setMobileNo("");
    setEmail("");
    setPassword("");
    setStandard("");
    setSubjects([]);
    setHouse("");
  }

  return (
    <div>
        {/* FirstName, LastName, MobileNo, Email, Password*/}
        <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>
              <h1>Student Registration Form</h1>
            </label>
          </div>
          <br />
          <div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label>Mobile No</label>
              <input
                type="tel"
                placeholder="Mobile no"
                pattern="[0-9]{10}"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <br />
        <div>
          {/* Radio buttons for standard 10th, 11th and 12th */}
          <fieldset>
            <legend>Select your class :</legend>
            <div>
              <label>
                <input
                  type="radio"
                  value="10th"
                  checked={standard === "10th"}
                  onChange={handleRadioChange}
                />
                10th
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="11th"
                  checked={standard === "11th"}
                  onChange={handleRadioChange}
                />
                11th
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="12th"
                  checked={standard === "12th"}
                  onChange={handleRadioChange}
                />
                12th
              </label>
            </div>
          </fieldset>
        </div>
        <br />
        <div>
          {/* Checkbox for selecting subjectss, each student can have multiple subjects out of physics, chemistry, bio,
       maths, english, Engineering Graphics(ED), IT , Physical*/}
          <fieldset>
            <legend>Select your subjectss : </legend>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Physics"
                  checked={subjects.includes("Physics")}
                  onChange={handleCheckbox}
                />
                Physics
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Chemistry"
                  checked={subjects.includes("Chemistry")}
                  onChange={handleCheckbox}
                />
                Chemistry
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Bio"
                  checked={subjects.includes("Bio")}
                  onChange={handleCheckbox}
                />
                Bio
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Maths"
                  checked={subjects.includes("Maths")}
                  onChange={handleCheckbox}
                />
                Maths
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="English"
                  checked={subjects.includes("English")}
                  onChange={handleCheckbox}
                />
                English
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="ED"
                  checked={subjects.includes("ED")}
                  onChange={handleCheckbox}
                />
                ED
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="IT"
                  checked={subjects.includes("IT")}
                  onChange={handleCheckbox}
                />
                IT
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Physical"
                  checked={subjects.includes("Physical")}
                  onChange={handleCheckbox}
                />
                Physical
              </label>
            </div>
          </fieldset>
        </div>
        <br />
        <div>
          {/* Dropdown for selecting House out of Enterprise, Endeavour, Courage, Modesty */}
          <fieldset>
            <legend>Select your house</legend>
            <select value={house} onChange={handleDropdown}>
              <option value="" disabled>
                {" "}
                select an option
              </option>
              <option value="Enterprise">Enterprise</option>
              <option value="Endeavour">Endeavour</option>
              <option value="Courage">Courage</option>
              <option value="Modesty">Modesty</option>
            </select>
          </fieldset>
        </div>
        <br />
        <div>
          {/* Submit and Reset Button*/}
          <div>
            <button type="submit">Submit</button>
          </div>
          <br />
          <div>
            {/* point to remember - agar tume ek button bana rahe ho form tag ke andar to tumhe specify karna padga button ka type kyuki by defaut koi bhi button from ke andar wala submit ka kaam karta hai, agar mai reset button mai type button na du to vo submit ka kaam karega
        now another doubt type maine reset kyu nahi diya? button hi kyu? agar mai type reset de deta to vo sab states ko reset kar deta jo mai nahi chahta mai states ko control karna chahta hu khud se isliye maine type button diya aur phir usko custom function pass kiya named as - handleReset */}
            <button type="button" onClick={handleReset} >Reset</button>
          </div>
        </div>
        </form>
      </div>
  );
}

export default FormExample;
