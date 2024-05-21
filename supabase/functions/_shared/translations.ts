export type Language = "en" | "fr";

export type Translations = Record<Language, object>;

export const translations = {
  fr: {
    newMatch: {
      title: "🎉 Nouveau match dispos !",
      body: "Des nouveaux matchs t'attendent ! Prêt(e) à donner le meilleur ? 💪",
    },
  },
  en: {
    newMatch: {
      title: "🎉 New matches available!",
      body: "New matches await you! Ready to give it your all? 💪",
    },
  },
};
