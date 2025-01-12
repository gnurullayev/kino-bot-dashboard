import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import styles from "./SvgSelector.module.css";
import langIcon from "../../assets/icons/lang.svg";
const LanguageSelector = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  // const [currentLanguage, setCurrentLanguage] = useState(language)
  const handleChangeLanguage = () => {
    //     const newLanguage = currentLanguage === "uz" ? "ru" : "uz";
    //     setCurrentLanguage(newLanguage);
    //     changeLanguage(newLanguage);
  };
  return (
    <span className={styles.lang} onClick={handleChangeLanguage}>
      <img src={langIcon} />
      {t("lang.lang")}
    </span>
  );
};

export default LanguageSelector;
