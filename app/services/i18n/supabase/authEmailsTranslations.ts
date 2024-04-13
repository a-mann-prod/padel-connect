import { Language } from '../app/types'

export type AuthEmailsTranslation = {
  ConfirmSignup: {
    Title: string
    H2: string
    P: string
    Link: string
  }
  InviteUser: {
    Title: string
    H2: string
    PFirstPart: string
    PSecondPart: string
    Link: string
  }
  MagicLink: {
    Title: string
    H2: string
    P: string
    Link: string
  }
  ChangeEmailAddress: {
    Title: string
    H2: string
    P: string
    To: string
    Last: string
    Link: string
  }
  ResetPassword: {
    Title: string
    H2: string
    P: string
    Link: string
  }
}

export const authEmailsTranslations: Record<Language, AuthEmailsTranslation> = {
  en: {
    ConfirmSignup: {
      Title: 'Confirm Your Signup',
      H2: 'Confirm your signup',
      P: 'Follow this link to confirm your user:',
      Link: 'Confirm your mail',
    },
    InviteUser: {
      Title: 'You have been invited',
      H2: 'You have been invited',
      PFirstPart: 'You have been invited to create a user on',
      PSecondPart: '. Follow this link to accept the invite:',
      Link: 'Accept the invite',
    },
    MagicLink: {
      Title: 'Your Magic Link',
      H2: 'Magic Link',
      P: 'Follow this link to login:',
      Link: 'Log In',
    },
    ChangeEmailAddress: {
      Title: 'Confirm Email Change',
      H2: 'Confirm Change of Email',
      P: 'Follow this link to confirm the update of your email from',
      To: 'to',
      Last: ':',
      Link: 'Change Email',
    },
    ResetPassword: {
      Title: 'Reset Your Password',
      H2: 'Reset Password',
      P: 'Follow this link to reset the password for your user:',
      Link: 'Reset Password',
    },
  },
  fr: {
    ConfirmSignup: {
      Title: 'Confirmez votre inscription',
      H2: 'Confirmez votre inscription',
      P: 'Suivez ce lien pour confirmer votre compte :',
      Link: 'Confirmez votre adresse email',
    },
    InviteUser: {
      Title: 'Vous avez été invité',
      H2: 'Vous avez été invité',
      PFirstPart: 'Vous avez été invité à créer un compte sur',
      PSecondPart: ". Suivez ce lien pour accepter l'invitation :",
      Link: "Accepter l'invitation",
    },
    MagicLink: {
      Title: 'Votre lien magique',
      H2: 'Lien magique',
      P: 'Suivez ce lien pour vous connecter :',
      Link: 'Se connecter',
    },
    ChangeEmailAddress: {
      Title: "Confirmez le changement d'adresse e-mail",
      H2: "Confirmez le changement d'adresse email",
      P: 'Suivez ce lien pour confirmer la mise à jour de votre adresse email de',
      To: 'à',
      Last: ' :',
      Link: "Changer l'adresse email",
    },
    ResetPassword: {
      Title: 'Réinitialisez votre mot de passe',
      H2: 'Réinitialiser le mot de passe',
      P: 'Suivez ce lien pour réinitialiser le mot de passe de votre compte :',
      Link: 'Réinitialiser le mot de passe',
    },
  },
}
