export type Language = "en" | "fr";

export type Translations = Record<Language, object>;

export const translations = {
  fr: {
    newMatch: {
      title: "Nouveau match dispo ! 🎉",
      body: "Un nouveau match t'attend ! Prêt(e) à donner le meilleur ? 💪",
    },
    newMatchRequest: {
      title: "Nouvelle demande de match ! 🎉",
      body: "Une nouvelle personne veut rejoindre ton match !",
    },
    matchRequestAccepted: {
      title: "Ta demande de match a été acceptée ! 🎉",
      body: "Hésite pas à envoyer un message pour préparer au mieux la rencontre !",
    },
    matchRequestRefused: {
      title: "Ta demande de match a été refusée 😵",
      body: "Ne perds pas de temps pour retrouver un match ! 💪",
    },
  },
  en: {
    newMatch: {
      title: "New match available! 🎉",
      body: "New match await you! Ready to give it your all? 💪",
    },
    newMatchRequest: {
      title: "New match Request! 🎉",
      body: "A new person wants to join your match!",
    },
    matchRequestAccepted: {
      title: "Your match request has been accepted! 🎉",
      body: "Feel free to send a message to prepare for the meeting!",
    },
    matchRequestRefused: {
      title: "Your match request has been refused 😵",
      body: "Don't waste time finding a new match! 💪",
    },
  },
};
