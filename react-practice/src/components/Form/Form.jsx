import React, { useState, useEffect } from "react";

const initialData = {

    // personal info
    name: "",
    email: "",
    // experience rdaio
    experience: "",
    //skills checkbox
    skills: [],
    // work preference dropdown
    workPreference: "",
    reference: [
    ]

}

function Form() {


    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("jobApplicationDraft")
        return savedData ? JSON.parse(savedData) : initialData
    });
    const [isActive, setIsActive] = useState(false);

    const [userNameInput, setUserNameInput] = useState("");
    const [userPhoneInput, setUserPhoneInput] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem("jobApplicationDraft", JSON.stringify(formData));
            console.log("Draft Saved Automatically")
        }, 1000)
        return () => clearTimeout(timer)
    }, [formData])

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        localStorage.removeItem("jobApplicationDraft");
        setFormData(initialData);
        alert("Application Submitted Successfully!");
    }

    function handleFormData(e){
        const {name, value, checked, type} = e.target;
        if(type === 'checkbox'){
            setFormData((prev) => {
                const skillsToBeAdded = checked ? [...prev.skills, value] : prev.skills.filter((s) => s!== value);
                return {...prev, skills: skillsToBeAdded} 
         } )
            
        }else{
            setFormData((prev) => (
            {...prev, [name]: value})
            )
        }
    }

    // function handleNameInput(username) {
    //     setFormData((prev) => ({ ...prev, name: username }))
    // }

    // function handleEmailInput(mail) {
    //     setFormData((prev) => ({ ...prev, email: mail }))
    // }

    // function handleRadioButton(e) {
    //     setFormData((prev) => ({ ...prev, experience: e.target.value }))
    // }
    // function handleCheckboxInput(e) {
    //     setFormData((prev) => {
    //         // Step 1: Nayi array banao e.target.checked ke basis par
    //         const newSkills = e.target.checked
    //             ? [...prev.skills, e.target.value] // Add kar rahe hain (prev.skills use karke)
    //             : prev.skills.filter((skill) => skill !== e.target.value); // Remove kar rahe hain (filter use karke)

    //         // Step 2: Nayi array ko state mein set kar do
    //         return { ...prev, skills: newSkills };
    //     });
    // }

    function handleAddRefrence() {
        setIsActive(true)
    }

    function submitRefrence() {
        const newRefrence = {
            id: Date.now(),
            referenceName: userNameInput,
            phoneNumber: userPhoneInput
        }
        setFormData((prev) => ({ ...prev, reference: [...prev.reference, newRefrence] }))
        setIsActive(false)
        setUserNameInput("")
        setUserPhoneInput("")
    }


    

    return (
        <div>
            <h1>Job Application</h1>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <fieldset>
                        <legend>Personal Information</legend>
                        <label>
                            Enter Name:
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => handleFormData(e)}
                            />
                        </label>
                        <label>
                            Enter Email:
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleFormData(e)}
                            />
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>Experience</legend>
                        {/* Radio */}
                        {["Fresher", "Junior", "Senior"].map((exp) =>
                            <label key={exp}>
                                {exp}
                                <input
                                    name="experience"
                                    type="radio"
                                    value={exp}
                                    checked={formData.experience === exp}
                                    onChange={(e) => handleFormData(e)}
                                />
                            </label>
                        )}
                    </fieldset>
                    <fieldset>
                        <legend>Skills</legend>
                        {/* Checkbox */}
                        {["React", "Node", "AWS", "Python"].map((skill) =>
                            <label key={skill}>
                                {skill}
                                <input
                                    type="checkbox"
                                    value={skill}
                                    checked={formData.skills.includes(skill)}
                                    name="skill"
                                    onChange={(e) => handleFormData(e)}
                                />
                            </label>
                        )}
                    </fieldset>
                    <fieldset>
                        <legend>Work Preference</legend>
                        {/* dropdown */}
                        <select name="workPreference" value={formData.workPreference} onChange={(e) => handleFormData(e)}>
                            <option disabled>select work preference from below</option>
                            {["Remote", "Hybrid", "On-site"].map((mode) =>
                                <option key={mode}>{mode}</option>
                            )}
                        </select>
                    </fieldset>
                    <fieldset>
                        <legend>Add Reference</legend>
                        <button type="button" onClick={handleAddRefrence}>add Reference</button>
                        {isActive && (<div>
                            <label>
                                Reference Name
                                <input
                                    type="text"
                                    value={userNameInput}
                                    onChange={(e) => setUserNameInput(e.target.value)}
                                />
                            </label>
                            <label>
                                Reference Phone
                                <input
                                    type="text"
                                    value={userPhoneInput}
                                    onChange={(e) => setUserPhoneInput(e.target.value)}
                                />
                            </label>
                            <button type="button" onClick={submitRefrence} >Submit</button>
                            
                        </div>)}
                        <div>
                            {formData.reference.length !== 0 && (
                               <div>
                                    <ul>
                                        {formData.reference.map((ref) => 
                                        <li key={ref.id} >
                                            {ref.referenceName} - {ref.phoneNumber}
                                        </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>


                    </fieldset>
                    <button type="submit">Submit Form</button>
                </form>
            </div>
        </div>
    )
}

export default Form;