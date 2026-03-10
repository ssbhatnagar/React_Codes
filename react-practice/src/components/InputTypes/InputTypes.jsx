import React, { useState, useEffect } from "react";;

// const initialData = {
//     firstName: "", // text
//     lastName: "", // text
//     address: "", // textarea
//     city: "", //drop down
//     class: "", // radio
//     hobbies: [""], // checkbox
//     consent: false // checkbox 

// }


function InputTypes() {

    const initialData = {
    firstName: "", // text
    lastName: "", // text
    address: "", // textarea
    city: "", //drop down
    class: "", // radio
    hobbies: [], // checkbox
    consent: false // checkbox 

}
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem("formData")
        return savedData ? JSON.parse(savedData) : initialData
    });

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(data))
    }, [data])


    function handleFromData(e){
        const {name, value, type, checked} = e.target

        if(name === "consent"){
            setData((prev) => (
            {...prev, consent:checked}
            ))
        }
        else if (name === "hobbies"){
            setData((prev) => {
                const updatedHobbies = checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value);
                return {...prev, hobbies: updatedHobbies} 
            })
        }
        else{
            setData((prev) => (
                {...prev, [name]:value}
            ))
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* text field */}
                    <fieldset>
                        <legend>First and Last Name</legend>
                        <label>
                            First Name:
                            <input
                                type="text"
                                value={data.firstName}
                                name="firstName"
                                placeholder="Enter First Name"
                                onChange={handleFromData}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={data.lastName}
                                name="lastName"
                                placeholder = "Enter Last Name"
                                onChange={handleFromData}
                            />
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>Address Section</legend>
                        <textarea
                        name="address"
                        value={data.address}
                        placeholder="Enter your address"
                        onChange={handleFromData}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Select City from Drop down</legend>
                        <select value={data.city} name="city" onChange={handleFromData}> 
                            <option value="" disabled>select city</option>
                        {[ "Delhi", "Pune", "Hyderabad"].map((citi)=>
                        <option key={citi} value={citi}>{citi}</option>
                         )}
                         </select>
                    </fieldset>
                    <fieldset>
                        <legend>Class section</legend>
                        {["10th", "11th", "12th"].map((cls) =>
                        <label key={cls}>
                            {cls}
                            <input
                            type="radio"
                            name="class"
                            value={cls}
                            checked={data.class === cls}
                            onChange={handleFromData}
                            />
                        </label> 
                        )}
                    </fieldset>
                    <fieldset>
                        <legend>Hobbies</legend>
                        {["Cricket", "Badminton", "Football"].map((hobb) =>
                        <label key={hobb}>
                            {hobb}
                        <input
                        type="checkbox"
                        value={hobb}
                        checked={data.hobbies.includes(hobb)}
                        name="hobbies"
                        onChange={handleFromData}
                        />
                        </label>
                        )}
                    </fieldset>
                    <fieldset>
                        <legend>Consent</legend>
                        <label>Is this information correct</label>
                        <input
                        type="checkbox"
                        name="consent"
                        checked={data.consent}
                        onChange={handleFromData}
                        /> 
                    </fieldset>
                </div>
                <div>
                    {console.log(data)}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default InputTypes;