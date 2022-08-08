import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Locale } from '../common/constants/locale.constant';
import EN_LOCALES from './locales/en.json';
import UK_LOCALES from './locales/uk.json';

const resources = {
  [Locale.EN]: EN_LOCALES,
  [Locale.UK]: UK_LOCALES
};

i18n.use(initReactI18next).init({
  resources,
  lng: Locale.EN,
  fallbackLng: Locale.EN,
});

export default i18n;
