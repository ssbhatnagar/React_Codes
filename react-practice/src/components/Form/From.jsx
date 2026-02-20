import React, {useState, useEffect} from 'react'

function Form(){

    const initialData = {
        firstName: "", //text
        address: "",  //textarea
        class: "", //radio
        house: "", //dropdown
        hobbies: [], // checkbox
    }

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("formData");
        return  savedData  ? JSON.parse(savedData) : initialData 
    })

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData))
    }, [formData])


    function handleForm(e){
        const {name, type, checked, value} = e.target;
        if(type === "checkbox"){
            setFormData((prevData) =>
            {
                const updatedHobbies = checked
                ? [...prevData.hobbies, value] : prevData.hobbies.filter((h) => h!==value) 
                return { ...prevData, hobbies:updatedHobbies }
            }
            )
        }else{
            setFormData((prev) => (
            {...prev, [name]:value})
            )
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(formData)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Name</legend>
                <label>
                <input
                type="text"
                value={formData.firstName}
                onChange={handleForm}
                name="firstName"
                placeholder='Enter Name'
                />
                FirstName
                </label>
                </fieldset>
                <textarea
                name='address'
                value={formData.address}
                onChange={handleForm}
                placeholder='enter your address'
                />
                {["10th", "11th", "12th"].map((c) =>
                <label key={c}>
                    <input
                    type='radio'
                    value={c}
                    onChange={handleForm}
                    checked={formData.class === c}
                    name='class'
                    />
                    {c}
                </label>
                )}
                {["cricket", "football", "badmintion"].map((h) =>
                    <label key={h}>
                    <input
                    type='checkbox'
                    value={h}
                    onChange={handleForm}
                    checked={formData.hobbies.includes(h)}
                    name="hobbies"
                    />
                    {h}
                    </label>
                )}
                <select value={formData.house} name='house' onChange={handleForm}>
                    <option value="" disabled>Select your house</option>
                    <option value="Enterprise" >Enterprise</option>
                    <option value="Modesty">Modesty</option>
                </select>
                 <button type='submit'>Submit</button>     
            </form>
           
            
        </div>
    )
}
export default Form