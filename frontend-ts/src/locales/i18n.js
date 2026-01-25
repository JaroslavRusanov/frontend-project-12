import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './index.js';

i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
