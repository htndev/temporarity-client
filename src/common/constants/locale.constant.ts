export enum Locale {
  EN_US = 'en-US',
  EN_GB = 'en-GB',
  EN = 'en',
  UK = 'uk'
}

export const LOCALE_FLAG: { [k in Locale | 'DEFAULT']: string } = {
  [Locale.EN_US]: '🇺🇸',
  [Locale.EN_GB]: '🇬🇧',
  [Locale.EN]: '🇬🇧',
  [Locale.UK]: '🇺🇦',
  DEFAULT: '🏴‍☠️'
};

export const DEFAULT_LOCALE = Locale.EN_US;

export const AVAIlABLE_LOCALES = [Locale.EN, Locale.EN_US, Locale.EN_GB, Locale.UK];

export const FALLBACK_LOCALE_I18N_KEY = 'i18n.locale.unknown';
