function Inputs({type, value, required, name, checked, onChange, placeholder}){

    return(
        <div>
            <input
            type={type}
            name={name}
            value={value}
            required={required}
            checked={checked}
            onChange={onChange}
            placeholder={placeholder}
            />
        </div>
    )

}
export default Inputs