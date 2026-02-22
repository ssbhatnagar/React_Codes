import React, { useState, useEffect } from "react";

function Form() {

    const initialValues = {
        firstName: "", // text
        address: "", // text area
        class: "", // radio
        hobbies: [], // checkbox
        house: "" // dropdown
    }

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("formData");
        return savedData ? JSON.parse(savedData) : initialValues
    })

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData])

    function handleInputs(e) {
        const { value, name, type, checked } = e.target

        if (type === "checkbox") {
            setFormData((prev) => {
                const updatedHobbies = checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value)
                return { ...prev, hobbies: updatedHobbies }
            })

        } else {
            setFormData((prev) => (
                { ...prev, [name]: value }
            )
            )
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputs}
                    name="firstName"
                    placeholder="name"
                />
                <textarea
                    placeholder="Enter Address"
                    onChange={handleInputs}
                    value={formData.address}
                    name="address"
                />
                <div>
                    {/* Radio */}
                    {["10th", "11th", "12th"].map((cls) =>
                        <label key={cls}>
                            {cls}
                            <input
                                type="radio"
                                name="class"
                                value={cls}
                                onChange={handleInputs}
                                checked={formData.class === cls}
                            />
                        </label>
                    )}
                </div>
                <div>
                    {/* checkbox */}
                    {["Cricket", "football", "badminton"].map((hobb) =>
                        <label key={hobb}>
                            {hobb}
                            <input
                                type="checkbox"
                                name="hobbies"
                                value={hobb}
                                onChange={handleInputs}
                                checked={formData.hobbies.includes(hobb)}
                            />
                        </label>
                    )}
                </div>
                <div>
                    {/* dropdown */}
                    <select
                        name="house"
                        value={formData.house}
                        onChange={handleInputs}
                    >
                        <option value="" disabled>Choose an option</option>
                        {["Enterprise", "Modesty", "Courage", "Loyalty"].map((houseName) => (
                            <option key={houseName} value={houseName}>
                                {houseName}
                            </option>
                        ))}
                    </select>

                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default Form;