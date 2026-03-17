import FormInput from "../FormInput/FormInput"

function Profile({ formData, handleFormData }) {
    return (
        <div>
            <fieldset>
                <legend> Profile </legend>
                
                <FormInput 
                    label="UserName:"
                    type="text"
                    name="userName"
                    placeholder="Enter your name"
                    required={true} /* Aise likh ya seedha 'required' likh de ek hi baat hai */
                    value={formData.userName}
                    onChange={handleFormData}
                />
                
                <FormInput 
                    label="Age:"
                    type="number"
                    name="age"
                    placeholder="enter your age"
                    required 
                    value={formData.age}
                    onChange={handleFormData}
                />
                
                <FormInput 
                    label="Email:"
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    required 
                    value={formData.email}
                    onChange={handleFormData}
                />

            </fieldset>
        </div>
    )
}

export default Profile