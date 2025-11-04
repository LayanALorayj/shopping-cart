import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import "../App.css";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  fetchSuggestions?: (query: string) => Promise<string[]>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  onChange,
  placeholder,
  fetchSuggestions,
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [query, setQuery] = useState(value);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (!fetchSuggestions || !query.trim()) return setOptions([]);
    const delay = setTimeout(async () => {
      const results = await fetchSuggestions(query);
      const sliced = results.slice(0, 3).map((r) => ({ value: r }));
      setOptions([
        ...sliced,
        {
          value: "__view_all__",
          label: <span style={{ color: "#ff69b4" }}>View all results</span>,
        },
      ]);
    }, 300);
    return () => clearTimeout(delay);
  }, [query, fetchSuggestions]);

  const handleSelect = (value: string) => {
    if (value === "__view_all__") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else {
      setQuery(value);
      navigate(`/search?query=${encodeURIComponent(value)}`);
    }
  };

  const handleSearch = (newValue: string) => {
    setQuery(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="search-container">
      <AutoComplete
        value={query}
        options={options}
        onSelect={handleSelect}
        onSearch={handleSearch}
        classNames={{
          popup: { root: "search-dropdown" },
        }}
      >
        <Input
          size="large"
          placeholder={placeholder || "Search products..."}
          prefix={<SearchOutlined style={{ color: "#ff69b4" }} />}
          allowClear
          className="search-input"
        />
      </AutoComplete>
    </div>
  );
};

export default SearchBar;
