import FormInput from "../FormInput/FormInput"

function Interest({ formData, handleFormData }) {
    return (
        <div>
            <fieldset>
                <legend>Interest</legend>
                {/* city, class, hobbies */}
                <label>Select your city
                    <select name='city' onChange={handleFormData} value={formData.city}>
                        <option value="" disabled>Select your city</option>
                        {["Delhi", "Pune", "Mumbai"].map((citi) =>
                            <option key={citi} value={citi}>{citi}</option>
                        )}
                    </select>
                </label>
                <br />
                <br />
                <fieldset>
                    <legend>class</legend>
                    {["10th", "11th", "12th"].map((cls) =>

                        <FormInput
                            key={cls}
                            label={cls}
                            type="radio"
                            name="class"
                            value={cls} // Yahan map wala 'cls' aayega
                            checked={formData.class === cls} // Ye define karega select hua ya nahi
                            onChange={handleFormData}
                        />
                    )}
                </fieldset>
                <br />
                <fieldset>
                    <legend>Hobbies</legend>
                    {["Cricket", "Swimming", "Cycling"].map((hobb) =>

                        <FormInput
                            key={hobb}
                            label={hobb}
                            type="checkbox"
                            value={hobb}
                            checked={formData.hobbies.includes(hobb)}
                            name="hobbies"
                            onChange={handleFormData}
                        />
                    )}
                </fieldset>
            </fieldset>
        </div>
    )
}

export default Interest