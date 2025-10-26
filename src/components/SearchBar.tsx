import React from "react";
import { Input } from "antd";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto 24px" }}>
      <Input
        size="large"
        placeholder={placeholder || "Search products..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        allowClear
      />
    </div>
  );
};

export default SearchBar;
