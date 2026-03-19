import Inputs from "./Inputs"

function Interest({ formData, handleFormData }) {

    return (
        <div>
            <fieldset>
                <legend>
                    Class
                </legend>

                {["10th", "11th", "12th"].map((cls) =>
                    <label key={cls}>
                        {cls}
                        <Inputs
                            type={"radio"}
                            name={"class"}
                            required={true}
                            value={cls}
                            checked={formData.class === cls}
                            onChange={handleFormData}
                        />

                    </label>
                )}
            </fieldset>
            <br />
            <fieldset>
                <legend>
                    Hobbies
                </legend>
                {["Cricket", "Swimming", "Badmintion"].map((hobb) =>
                    <label key={hobb}>
                        {hobb}
                        <Inputs
                            type={"checkbox"}
                            name={"habbies"}
                            required={true}
                            value={hobb}
                            checked={formData.hobbies.includes(hobb)}
                            onChange={handleFormData}
                        />

                    </label>
                )}
            </fieldset>
            <fieldset>
                <legend>
                    Select your city
                </legend>
                {/* SELECT */}
            </fieldset>
        </div>
    )
}

export default Interest