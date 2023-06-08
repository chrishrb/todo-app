import { createI18n } from 'vue-i18n';
import de from './locales/de'
import en from './locales/en-US'

const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en-US',
  messages: {
    'en-US': en,
    'de': de
  },
});

export default i18n;