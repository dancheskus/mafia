/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    resources: {},
    interpolation: { escapeValue: false },
  });

const loadTranslations = (fileNames: string[]) => {
  fileNames.forEach(namespace => {
    i18n.addResourceBundle('en', namespace, require(`locales/en/${namespace}`));
    i18n.addResourceBundle('ru', namespace, require(`locales/ru/${namespace}`));
  });
};

loadTranslations([
  'common',
  'navBarTitles',
  'playerRoles',
  'roleDealing',
  'zeroNight',
  'navMenu',
  'numbersPanel',
  'night',
  'day',
]);

export default i18n;
