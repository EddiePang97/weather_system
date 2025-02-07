import React from "react";
import { Input } from "antd";
import './floatingLabel.css';

type FloatingLabelInputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="floating-label-container">
      <label className={`floating-label ${value ? 'active' : ''}`}>{placeholder}</label>
      <Input
        value={value}
        style={{ background: "#FFFFFF33", border: "none" ,zIndex:"3",minHeight:"60px",fontSize:'16px' }}
        onChange={onChange}
        allowClear
        size="large"
      />
    </div>
  );
};

export default FloatingLabelInput;
