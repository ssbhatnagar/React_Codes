import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Profile from './components/Profile';
import Inputs from './components/Inputs';
import Interest from './components/Interest';


const initialData = {
  // for profile
  userName: "",
  age: "",
  email: "",
  // for interest
  class: "",
  hobbies: [],
  city: "",
  // for settings
  theme: ""
}


function App() {

  const [activeTab, setActiveTab] = useState(0);


  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("savedData");
    return savedFormData ? JSON.parse(savedFormData) : initialData
  })

  useEffect(() => {
    localStorage.setItem("savedData", JSON.stringify(formData))
  }, [formData])

  function handleFormData(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) =>
      {
        const updatedHobbies = checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value)
        return {...prev, hobbies: updatedHobbies}
      }
      )
    } else {
      setFormData((prev) => (
        {
          ...prev, [name]: value

        }
      )
      )
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted", formData)
  }

  function handleValidation() {
    // validation
  }


  return (
    <div>    <h1 className='heading'>Tab Form</h1>
      <div className='main-container'>

        <form className='form-container' onSubmit={handleSubmit}>
          <div>
            <h2 onClick={() => setActiveTab(0)} >Profile</h2>
            {activeTab === 0 && (
              <Profile 
              formData={formData}
              handleFormData={handleFormData}
              />
            )}
          </div>

          <h2 onClick={() => setActiveTab(1)}>Interest</h2>
          <div>
            {activeTab === 1 && (
              <Interest
               formData={formData}
               handleFormData={handleFormData}
               />
            )}
          </div>
          <div>
            <h2 onClick={() => setActiveTab(2)}>Settings</h2>
            {activeTab === 2 && (
              <div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          </div>

        </form>
      </div>
    </div>

  )
}

export default App
