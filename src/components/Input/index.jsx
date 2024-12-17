import React, { useState } from 'react';
import './index.css';



export default function Input(props) {
    const {
        type = 'text',
        placeholder,
        value,
        onChange,
        disabled = false,
        label,
        danger = false,
        defaultValue,
    } = props;

    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(defaultValue);

    const inputClassName = `
        input 
            ${danger ? 'danger' : ''} 
            ${focused ? 'focused' : ''} 
            ${disabled ? 'disabled' : ''}
        `;

    const labelClassName = `
        label 
            ${danger ? 'danger' : ''} 
            ${focused ? 'focused' : ''} 
            ${disabled ? 'disabled' : ''}
        `;

    const handleChange = (e) => {
        if (onChange) onChange(e); 
        if (!value) setInputValue(e.target.value);
    };
        

    return (
        <div className="inputBlock">
            {label && <p className={labelClassName}>{label}</p>}
            <input
                type={type}
                placeholder={placeholder} 
                value={value !== undefined ? value : inputValue}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={inputClassName}
                disabled={disabled}
            />
        </div>
    );
}
