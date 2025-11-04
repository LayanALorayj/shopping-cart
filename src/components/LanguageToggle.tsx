import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../App.css";

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <button onClick={toggleLang} className="lang-switch-btn gradient-btn">
      {lang === "en" ? "ع" : "En"}
    </button>
  );
};

export default LanguageToggle;
