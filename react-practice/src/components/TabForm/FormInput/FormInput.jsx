// FormInput mein 'checked' prop add kar
function FormInput({ label, type, name, placeholder, value, onChange, required, checked }) {
    return (
        <div>
            <label>
                {label}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    checked={checked} /* YE LINE ADD KARNI HAI */
                    onChange={onChange}
                />
            </label>
            <br /><br />
        </div>
    )
}

export default FormInput