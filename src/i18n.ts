import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import uzJSON from './translate/uz.json';
import ruJSON from './translate/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: uzJSON
    },
    ru: {
      translation: ruJSON
    },
  },
  lng: "uz", // Set the initial language of the App
  fallbackLng: "uz", // Fallback language in case the current language doesn't have the translation
  interpolation: {
    escapeValue: true, // React already escapes by default
  },
});
