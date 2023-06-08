import { Language } from "@/schemas/user.schema"
import type { Locale } from "vue-i18n"

export const mapLocaleToLanguage = (locale: Locale) => {
  switch (locale) {
    case 'de-DE':
      return Language.DE
    default:
      return Language.EN_US
  }
}

export const mapLanguageToLocale = (language?: Language) => {
  switch (language) {
    case Language.DE:
      return 'de-DE'
    default:
      return 'en-US'
  }
}

export const mapStringToLocale = (language?: string) => {
  switch (language) {
    case 'de-DE':
      return 'de-DE'
    default:
      return 'en-US'
  }
}
