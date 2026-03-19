import Inputs from "./Inputs";

function Profile({formData, handleFormData}){

    return(
        <div>
                <label>
                  user name:
                  <Inputs
                  type={"text"}
                  placeholder={"Enter your namme"}
                  name={"userName"}
                  required={true}
                  value={formData.userName}
                  onChange={handleFormData}
                  />
                </label>
                <br />
                <br />
                <label>
                  Age:
                  <Inputs
                  type={"number"}
                  placeholder={"Enter your age"}
                  name={"age"}
                  required={true}
                  value={formData.age}
                  onChange={handleFormData}
                  />
                </label>
                <br />
                <br />
                <label>
                  Email:
                  <Inputs
                  type={"email"}
                  placeholder={"Enter your email"}
                  name={"email"}
                  required={true}
                  value={formData.email}
                  onChange={handleFormData}
                  />
                </label>
              </div>
    )
}

export default Profile;