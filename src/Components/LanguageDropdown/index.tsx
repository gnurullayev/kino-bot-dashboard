import { useState, FC } from "react";
import styles from "./LanguageDropdown.module.css";
import { language } from "@/constants";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { dispatch } from "@/redux";

type LanguageType = {
  img: any;
  value: string;
  label: string;
};

const LanguageDropdown: FC = () => {
  const lng = useSelector((state: any) => state.language.lng);
  const [activeLanguage, setActiveLanguage] = useState(
    language.find((el) => el.value === lng) || language[0]
  );
  const [active, setActive] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (el: LanguageType) => {
    i18n.changeLanguage(el.value);
    dispatch.language.changeLanguage(el.value);
    setActiveLanguage(el);
    setActive(false);
  };

  return (
    <div className={styles.language_container}>
      <button
        className={`${styles.language_btn} ${styles.language_btn_lg}`}
        onClick={() => setActive((prev) => !prev)}
      >
        <div className={styles.flag_img_lg}>
          <img src={activeLanguage.img} alt={activeLanguage.value} />
        </div>
        {/* <span>{activeLanguage.label}</span> */}
      </button>

      <ul
        className={styles.language_list}
        style={{ display: active ? "block" : "none" }}
      >
        {language.map(
          (el) =>
            el.value !== activeLanguage.value && (
              <li
                className={styles.language_item}
                key={el.value}
                onClick={() => changeLanguage(el)}
              >
                <img src={el.img} alt={el.value} width={40} height={24} />
                {/* <span>{el.label}</span> */}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
