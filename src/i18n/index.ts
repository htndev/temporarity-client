import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { AVAIlABLE_LOCALES } from '../common/constants/locale.constant';
import { DEFAULT_LOCALE } from '../common/constants/locale.constant';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    lng: DEFAULT_LOCALE,
    fallbackLng: AVAIlABLE_LOCALES,
    interpolation: {
      escapeValue: true
    }
  });

export default i18n;
