function FormInput({ label, type, name, placeholder, value, onChange, required }) {
    return (
        <div>
            <label>
                {label}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required={required} // Agar wahan se required pass hoga tabhi ye true hoga
                    value={value}
                    onChange={onChange}
                />
            </label>
            <br />
            <br />
        </div>
    )
}

export default FormInput