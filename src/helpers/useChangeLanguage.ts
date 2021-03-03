import { useTranslation } from 'react-i18next';

export default (): [string, (lang: 'en' | 'ru') => void] => {
  const { i18n } = useTranslation();
  return [i18n.language, (lang: 'en' | 'ru') => i18n.changeLanguage(lang)];
};
