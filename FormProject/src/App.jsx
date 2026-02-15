import React, { useState, useEffect } from "react";

function FormApp() {

  // STEP 1 Pehele sabse intial values ko rakhenge ek jagah par yaha use state use nahi karemge kyuki step 2 mai useSate ka role aayega jaha local storage assign hogi
  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "", // lowercase 'd'
    address: "",
    class: "",
    hobbies: [],
    house: ""
  };

  // STEP 2. GET: Lazy Initializer yaha hum local stodage ko get karnege usestate se, pehele dekhenge ki kya usme alrady kuch stored hai ?? agar stored hai to waha se get kar lenge nahi to initial values ko get kar lenge jo ki sabse pehele run par empty hi hongi. 
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("userForm");
    return savedData ? JSON.parse(savedData) : initialValues;
  });

  // STEP 3 SET: Auto-save on every change yaha hum useEffect ka use karenge aur autosave feature add kar denge, jaba jab fromData mai koi change hoga tab tab ye run hoga aur save kar dega data ko local storgae mai set kar denge
  useEffect(() => {
    localStorage.setItem("userForm", JSON.stringify(formData));
  }, [formData]);

  // STEP 4. Single Handler for all Inputs ye to clear hai hi yaha sirf ek baat dhyan deni hi ki iska kaam kaise ho raha hai e as event liya hai uske baad name value vo sab param hai aur e.target hai baki add remove hobby ka logic ek baar dhaayn se samjh lo line by line likha hai

  function handleFormData(e) {
    const { name, value, type, checked } = e.target; // param mai pass kar diya 
    if (type === "checkbox") { 
      setFormData((prev) => {
        const updatedHobbies = checked // updated hobbies jo check se mili unko save kr liya 
          ? [...prev.hobbies, value] // Add hobby
          : prev.hobbies.filter((h) => h !== value); // Remove hobby
        return { ...prev, hobbies: updatedHobbies };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value })); // yaha [name] : value sab key value par iterate kar lega 
    }
  }

  // STEP 5. handle submit ka use
  function handleSubmit(e) {
    e.preventDefault(); // Ye zaroori hai submit par
    console.log("Final form Data 2", formData);
    alert("Form Submitted!");
  }

  // STEP 6 reset from
  function resetForm() {
    setFormData(initialValues);
  }

  // STEP 7 JSX ka part
  return (
    <div>
      <form onSubmit={handleSubmit}> {/* onSubmit yahan hona chahiye */}
        <fieldset>
          <legend>Name Section</legend>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormData} // Direct pass karo, 'e' apne aap chala jayega
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormData}
            placeholder="Last Name"
          />
        </fieldset>

        <fieldset>
          <legend>DOB & Address</legend>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleFormData}
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleFormData}
            placeholder="Address"
          />
        </fieldset>

        <fieldset>
          <legend>Class</legend>
          {["10th", "11th", "12th"].map((cls) => (
            <label key={cls}>
              <input
                type="radio"
                name="class"
                value={cls}
                checked={formData.class === cls}
                onChange={handleFormData}
              /> {cls}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Hobbies</legend>
          {["singing", "dancing", "cricket"].map((hobby) => (
            <label key={hobby}>
              <input
                type="checkbox"
                name="hobbies"
                value={hobby}
                checked={formData.hobbies.includes(hobby)}
                onChange={handleFormData}
              /> {hobby}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>House</legend>
          <select name="house" value={formData.house} onChange={handleFormData}>
            <option value="" disabled>Select an option</option>
            <option value="enterprise">Enterprise</option>
            <option value="modesty">Modesty</option>
            <option value="courage">Courage</option>
          </select>
        </fieldset>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default FormApp;