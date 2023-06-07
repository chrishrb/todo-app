import { createI18n } from 'vue-i18n';
import de from './locales/de'
import en from './locales/en'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    de: de
  },
});

export default i18n;