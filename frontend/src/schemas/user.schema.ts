export enum Language {
  EN_US = 'EN_US',
  DE_DE = 'DE_DE',
}

export type User = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  isAdmin: boolean,
  language: Language,
}
