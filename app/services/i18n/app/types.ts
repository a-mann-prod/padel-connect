export const availableLanguages = ['en', 'fr'] as const

export type Language = (typeof availableLanguages)[number]
export type Translation = Record<Language, any>
