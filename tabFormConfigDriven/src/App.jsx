import { useEffect, useState } from 'react';
import styles from './tabForm.module.css';

// 1. FORM CONFIGURATION (Ye API se bhi aa sakta hai future mein)
const formConfig = [
    {
        tabName: "Profile",
        fields: [
            { name: "userName", label: "UserName:", type: "text", placeholder: "Enter your name", required: true },
            { name: "age", label: "Age:", type: "number", placeholder: "Enter your age", required: true },
            { name: "email", label: "Email:", type: "email", placeholder: "Enter your email", required: true }
        ]
    },
    {
        tabName: "Interest",
        fields: [
            { name: "city", label: "Select your city:", type: "select", options: ["Delhi", "Pune", "Mumbai"] },
            { name: "class", label: "Class:", type: "radio", options: ["10th", "11th", "12th"] },
            { name: "hobbies", label: "Hobbies:", type: "checkbox", options: ["Cricket", "Swimming", "Cycling"] }
        ]
    },
    {
        tabName: "Settings",
        fields: [] // Settings ke andar koi field nahi hai as per requirement
    }
];

function TabForm() {
    const [activeTab, setActiveTab] = useState(0);

    const initialData = {
        userName: "",
        age: "",
        email: "",
        city: "",
        class: "",
        hobbies: []
    };

    const [formData, setFormData] = useState(() => {
        const storedData = localStorage.getItem('formData');
        return storedData ? JSON.parse(storedData) : initialData;
    });

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    // Same perfect logic without duplicate bugs
    function handleFormData(e) {
        const { name, value, checked, type } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => {
                const updatedHobbies = checked 
                    ? (prev.hobbies.includes(value) ? prev.hobbies : [...prev.hobbies, value]) 
                    : prev.hobbies.filter((h) => h !== value);
                return { ...prev, hobbies: updatedHobbies };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    }

    function formValidation() {
        if (!formData.userName || !formData.age || !formData.email) {
            alert("All profile fields are mandatory");
            return false;
        }

        if (isNaN(formData.age) || Number(formData.age) <= 0) {
            alert("Age must be a valid positive number!");
            return false;
        }

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
        console.log("Here is final form data:", formData);
        alert("Form Submitted Successfully! Data in console.");
    }

    // 2. DYNAMIC RENDERING FUNCTION
    // Ye function check karta hai field.type kya hai aur waisa input return karta hai
    const renderField = (field) => {
        switch (field.type) {
            case "text":
            case "number":
            case "email":
                return (
                    <div key={field.name} style={{ marginBottom: "15px" }}>
                        <label>
                            {field.label}
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                value={formData[field.name]}
                                onChange={handleFormData}
                                style={{ marginLeft: "10px" }}
                            />
                        </label>
                    </div>
                );
            case "select":
                return (
                    <div key={field.name} style={{ marginBottom: "15px" }}>
                        <label>
                            {field.label}
                            <select name={field.name} value={formData[field.name]} onChange={handleFormData} style={{ marginLeft: "10px" }}>
                                <option value="" disabled>Select option</option>
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                );
            case "radio":
                return (
                    <fieldset key={field.name} style={{ marginBottom: "15px" }}>
                        <legend>{field.label}</legend>
                        {field.options.map((opt) => (
                            <label key={opt} style={{ marginRight: "10px" }}>
                                {opt}
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={opt}
                                    checked={formData[field.name] === opt}
                                    onChange={handleFormData}
                                />
                            </label>
                        ))}
                    </fieldset>
                );
            case "checkbox":
                return (
                    <fieldset key={field.name} style={{ marginBottom: "15px" }}>
                        <legend>{field.label}</legend>
                        {field.options.map((opt) => (
                            <label key={opt} style={{ marginRight: "10px" }}>
                                {opt}
                                <input
                                    type="checkbox"
                                    name={field.name}
                                    value={opt}
                                    checked={formData[field.name].includes(opt)}
                                    onChange={handleFormData}
                                />
                            </label>
                        ))}
                    </fieldset>
                );
            default:
                return null;
        }
    };

    const currentTabConfig = formConfig[activeTab];

    return (
        <div>
            <h1 className={styles.heading}>Tab Form (Config Driven)</h1>
            <div className={styles.formContainer}>
                
                {/* DYNAMIC TAB BUTTONS */}
                <div className={styles.buttonContainer}>
                    {formConfig.map((tab, index) => (
                        <button 
                            key={tab.tabName} 
                            onClick={() => setActiveTab(index)}
                            style={{ fontWeight: activeTab === index ? "bold" : "normal" }}
                        >
                            {tab.tabName}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <fieldset style={{ minWidth: "300px", padding: "20px" }}>
                        <legend>{currentTabConfig.tabName}</legend>
                        
                        {/* DYNAMIC FORM FIELDS RENDERING */}
                        {currentTabConfig.fields.map((field) => renderField(field))}

                        {/* HARDCODED SETTINGS TAB TEXT (Kyunki ye requirement thi) */}
                        {activeTab === 2 && (
                            <div style={{ marginBottom: "20px" }}>
                                Pata nahi yaha kya dalu (Settings text)
                            </div>
                        )}

                        {/* SUBMIT BUTTON ONLY ON LAST TAB */}
                        {activeTab === formConfig.length - 1 && (
                            <button type="submit" style={{ marginTop: "10px" }}>Submit Final Form</button>
                        )}
                    </fieldset>
                </form>

            </div>
        </div>
    );
}

export default TabForm;