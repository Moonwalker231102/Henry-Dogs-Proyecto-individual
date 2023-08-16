import React from "react";

const InputField = ({ label, id, name, value, onChange, error, type }) => {
    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default InputField;
