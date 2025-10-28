import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import "../../App.css";

const HeaderSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!query) return setOptions([]);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();

        const top3 = data.products.slice(0, 3).map((p: any) => ({
          value: p.title,
          label: p.title,
          id: p.id,
        }));

        setOptions([
          ...top3,
          {
            value: "__view_all__",
             label: <span style={{ color: "#ff69b4" }}>{t("header.viewAllResults")}</span>,
          },
        ]);
      } catch (err) {
        setOptions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (value: string, option: any) => {
    if (value === "__view_all__") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else if (option.id) {
      navigate(`/product/${option.id}`);
    } else {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <AutoComplete
      value={query}
      options={options}
      onSelect={handleSelect}
      onSearch={setQuery}
      classNames={{
        popup: { root: "header-search-dropdown" },
      }}
      className="header-search"
    >
      <Input
        size="large"
         placeholder={t("header.searchPlaceholder")}
        prefix={<SearchOutlined style={{ color: "#ff69b4" }} />}
        allowClear
        className="header-search-input"
      />
    </AutoComplete>
  );
};

export default HeaderSearch;
