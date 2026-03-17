
import { useEffect, useState } from 'react';
import styles from './tabForm.module.css';
import Profile from './Profile/Profile';
import Interest from './Interest/Interest';

function TabForm() {

    const [activeTab, setActiveTab] = useState(0);

    const initialData = {

        // these in profile tab
        userName: "", // text field
        age: "", // only numeric
        email: "", // email field

        // below in interest tab
        city: "", // dropdown
        class: "", // radio
        hobbies: [] // checkboxes

        // settings tab

    }


    const [formData, setFormData] = useState(() => {
        const storedData = localStorage.getItem('formData');
        return storedData ? JSON.parse(storedData) : initialData;
    })

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData])

    function handleFormData(e) {
        const { name, value, checked, type } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => {
                const updatedHobbies = checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value)
                return { ...prev, hobbies: updatedHobbies }
            }
            )

        } else {
            setFormData((prev) => (
                { ...prev, [name]: value }
            )
            )
        }
    }

    function formValidation() {
        // 1. Mandatory fields
        if (!formData.userName || !formData.age || !formData.email) {
            alert("All profile fields are mandatory");
            return false;
        }

        // age validation it should be number
        if (isNaN(formData.age) || Number(formData.age) <= 0) {
            alert("Age must be a valid positive number!");
            return false;
        }


        // email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Enter valid email address");
            return false;
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formValidation()) return;
        console.log("Here is form data:", formData)
    }

    return (
        <div>
            <h1 className={styles.heading} >Tab Form</h1>
            <div className={styles.formContainer}>
                <div className={styles.buttonContainer}>
                <button onClick={() => setActiveTab(0)}>Profile</button>
                <button onClick={() => setActiveTab(1)}>Interest</button>
                <button onClick={() => setActiveTab(2)}>Settings</button>
                </div>
                <form onSubmit={handleSubmit}>
                    {activeTab === 0 &&
                        <div>
                            <br />
                            <Profile
                            formData={formData}
                            handleFormData={handleFormData}
                            />
                        </div>}
                    {activeTab === 1 &&
                        <div>
                            <br />
                          <Interest
                          formData={formData}
                          handleFormData={handleFormData}
                          />
                        </div>}
                    {activeTab === 2 &&
                        <div>
                            <br />
                            <fieldset>
                                <legend>Settings</legend>
                                <div>pata nahi yaha kya dalu</div>
                                <button type="submit">Submit</button>
                            </fieldset>
                        </div>}
                </form>
            </div>
        </div>
    )
}

export default TabForm