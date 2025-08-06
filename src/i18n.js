import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // JSON dosyalarını fetch etmek için
  .use(initReactI18next)
  .init({
    lng: 'tr',
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en'],
    ns: ['mainpage','common', 'navbar', 'login', 'dashboard'], // 👈 modüller burada
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 👈 dikkat!
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
