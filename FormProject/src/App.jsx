import React, { useState, useEffect } from "react"; // FIXED: useEffect import karna bhul gaye the

function FormApp() {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    address: "",
    dob: "",
    class: "",
    house: "",
    hobbies: [],
    parentIncome: 500000
  };

  // 1. LOCAL STORAGE LOAD (Lazy Initializer)
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("userForm");
    return savedData ? JSON.parse(savedData) : initialValues;
  });

  // 2. LOCAL STORAGE SAVE (Side Effect)
  useEffect(() => {
    localStorage.setItem("userForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const existingHobbies = prev.hobbies;
        const updatedHobbies = checked
          ? [...existingHobbies, value]
          : existingHobbies.filter((h) => h !== value);
        return { ...prev, hobbies: updatedHobbies };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 3. FIXED SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault(); // Ab ye error nahi dega kyunki 'e' niche se pass ho raha hai
    console.log("Final Form Data:", formData);
    alert("Form Submitted!");
  };

  // 4. FIXED RESET
  const handleReset = () => {
    setFormData(initialValues);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      {/* FIXED: onSubmit={handleSubmit} likhna kafi hai, extra arrow function ki zarurat nahi */}
      <form onSubmit={handleSubmit}>
        
        {/* --- Text Inputs --- */}
        <div>
          <label>First Name: </label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Last Name: </label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Phone: </label>
          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Address: </label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>DOB: </label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <br />

        {/* --- Radio Group --- */}
        <fieldset>
          <legend>Class</legend>
          <label>
            <input type="radio" name="class" value="10th" checked={formData.class === "10th"} onChange={handleChange} /> 10th
          </label>
          <label>
            <input type="radio" name="class" value="11th" checked={formData.class === "11th"} onChange={handleChange} /> 11th
          </label>
          <label>
            <input type="radio" name="class" value="12th" checked={formData.class === "12th"} onChange={handleChange} /> 12th
          </label>
        </fieldset>
        <br />

        {/* --- Dropdown --- */}
        <fieldset>
          <legend>House</legend>
          {/* FIXED: name="house" missing tha, iske bina handleChange kaam nahi karta */}
          <select name="house" value={formData.house} onChange={handleChange}>
            <option value="" disabled>Select an option</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Endeavour">Endeavour</option>
          </select>
        </fieldset>
        <br />

        {/* --- Checkboxes --- */}
        <fieldset>
          <legend>Hobbies</legend>
          <label>
            <input type="checkbox" name="hobbies" value="Coding" checked={formData.hobbies.includes("Coding")} onChange={handleChange} /> Coding
          </label>
          <label>
            <input type="checkbox" name="hobbies" value="Singing" checked={formData.hobbies.includes("Singing")} onChange={handleChange} /> Singing
          </label>
        </fieldset>
        <br />

        {/* --- Range Slider --- */}
        <div>
          <label>Parent Income: ₹{formData.parentIncome}</label>
          <input
            type="range"
            name="parentIncome"
            min="100000"
            max="2000000"
            step="50000"
            value={formData.parentIncome}
            onChange={handleChange}
          />
        </div>
        <br />

        <div>
          <button type="submit">Submit Form</button>
          {/* FIXED: onClick={handleReset} kafi hai */}
          <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default FormApp;