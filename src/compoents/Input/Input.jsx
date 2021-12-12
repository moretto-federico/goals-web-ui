import React from "react";

export default function Input({ id, label, placeholder, value, onChange }) {
  return (
    <div className="form-item">
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
