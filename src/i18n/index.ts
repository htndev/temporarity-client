import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { AVAIlABLE_LOCALES, Locale } from './../common/constants/locale.constant';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    lng: Locale.EN,
    fallbackLng: AVAIlABLE_LOCALES,
    interpolation: {
      escapeValue: true
    }
  });

export default i18n;
