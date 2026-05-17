import { useState, useEffect } from "react";

function CheckboxRadioDropdown(){

    const [workModel, setWorkModel] = useState(""); // for radio
    const [isTandCAccpeted, setIsTandCAccepted] = useState(false); // single checkbox
    const [frontEndSkills, setFrontEndSkills] = useState([]); // multiple checkbox
    const [noticePeriod, setNoticePeriod] = useState(""); // dropdown

    function handleCheckbox(e){
        const isChecked = e.target.checked;
        const skill = e.target.value;
        if(isChecked){
            setFrontEndSkills((prev) => [...prev, skill])
        }else{
            setFrontEndSkills((prev) =>
                prev.filter((s) => s !== skill)
            )
        }
    }

    useEffect(() => {
    console.log("Work Model:", workModel);
    console.log("T&C Accepted:", isTandCAccpeted);
    console.log("Frontend Skills:", frontEndSkills);
    console.log("Notice Period:", noticePeriod);
}, [workModel, isTandCAccpeted, frontEndSkills, noticePeriod]);

    return(
        <div>
            <h1>Checkbox Radio Dropdown</h1>
            <div>
                {/* Task 1 */}
                <fieldset>
                    <legend>Radio for work model</legend>
                    <label>Work from office
                    <input
                    type="radio"
                    value="work from office"
                    name="workModel"
                    checked={workModel === "work from office"}
                    onChange={(e) => setWorkModel(e.target.value)}
                    />
                    </label>
                    <label>Hybrid
                        <input
                        type="radio"
                        value="Hybrid"
                        name="workModel"
                        checked={workModel === "Hybrid"}
                        onChange={(e) => setWorkModel(e.target.value)}
                        />
                    </label>
                    <label>Remote
                        <input
                        type="radio"
                        value="Remote"
                        name="workModel"
                        checked={workModel === "Remote"}
                        onChange={(e) => setWorkModel(e.target.value)}
                        />
                    </label>
                </fieldset>
                {/* Task 3 */}
                <fieldset>
                    <legend>Multiple Checkbox for frontend skills</legend>
                    <label>
                        React.js
                    <input
                    type="checkbox"
                    value="React.js"
                    checked={frontEndSkills.includes("React.js")}
                    onChange={handleCheckbox}
                    />
                    </label>
                    <label>
                        TypeScript
                        <input
                        type="checkbox"
                        value="TypeScript"
                        checked={frontEndSkills.includes("TypeScript")}
                        onChange={handleCheckbox}
                        />
                    </label>
                    <label>
                        Redux Toolkit
                        <input
                        type="checkbox"
                        value="Redux Toolkit"
                        checked={frontEndSkills.includes("Redux Toolkit")}
                        onChange={handleCheckbox}
                        />
                    </label>
                    <label>
                        GraphQL
                        <input
                        type="checkbox"
                        value="GraphQL"
                        checked={frontEndSkills.includes("GraphQL")}
                        onChange={handleCheckbox}
                        />
                    </label>
                </fieldset>
                {/* Task 4  */}
                <fieldset>
                    <legend>Dropdown for Notice Period</legend>
                    <select value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} >
                        <option value={""} disabled >Select notice period</option>
                        <option value={"15 days"} >15 days</option>
                        <option value={"30 days"} >30 days</option>
                        <option value={"60 days"}>60 days</option>
                        <option value={"90 days"}>90 days</option>
                    </select>
                </fieldset>
                {/* Task 2 */}
                <fieldset>
                    <legend>Single checkbox boolean</legend>
                    <label>I authorize the company to conduct a background check
                    <input
                    type="checkbox"
                    checked={isTandCAccpeted}
                    onChange={(e) => setIsTandCAccepted(e.target.checked)}
                    />
                    </label>
                </fieldset>
            </div>
        </div>
    )

}

export default CheckboxRadioDropdown;