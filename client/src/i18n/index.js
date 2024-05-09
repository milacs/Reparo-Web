import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translations from './locales';

const i18nSettings = {
  resources: translations,
  fallbackLng: 'pt-BR',
  defaultNS: 'i18n',
};

i18n.use(LanguageDetector).use(initReactI18next).init(i18nSettings);

export default i18n;
