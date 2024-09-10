import { EmailOtpType } from "@supabase/supabase-js";
import { Language } from "../_shared/translations.ts";

type Subject = Partial<Record<EmailOtpType, string>>;

// Email Subjects
const subjects: Record<Language, Subject> = {
  en: {
    signup: "Confirm Your Signup",
    recovery: "Reset Your Password",
    invite: "You have been invited",
    magiclink: "Your Magic Link",
    email_change: "Confirm Email Change",
  },
  fr: {
    signup: "Confirmez votre adresse e-mail",
    recovery: "Réinitialisez votre mot de passe",
    invite: "Vous avez été invité",
    magiclink: "Votre Lien Magique",
    email_change: "Confirmez le changement d’adresse e-mail",
  },
};

// HTML Body
const bodies: Record<Language, Subject> = {
  en: {
    signup: `<h2>Confirm your email</h2><p>Follow this link to confirm your email:</p><p><a href="{{confirmation_url}}">Confirm your email address</a></p><p>Alternatively, enter the code: {{token}}</p>`,
    recovery: `<h2>Reset password</h2><p>Follow this link to reset the password for your user:</p><p><a href="{{confirmation_url}}">Reset password</a></p><p>Alternatively, enter the code: {{token}}</p>`,
    invite: `<h2>You have been invited</h2><p>You have been invited to create a user on {{site_url}}. Follow this link to accept the invite:</p><p><a href="{{confirmation_url}}">Accept the invite</a></p><p>Alternatively, enter the code: {{token}}</p>`,
    magiclink: `<h2>Magic Link</h2><p>Follow this link to login:</p><p><a href="{{confirmation_url}}">Log In</a></p><p>Alternatively, enter the code: {{token}}</p>`,
    email_change: `<h2>Confirm email address change</h2><p>Follow this link to confirm the update of your email address from {{old_email}} to {{new_email}}:</p><p><a href="{{confirmation_url}}">Change email address</a></p><p>Alternatively, enter the codes: {{token}} and {{new_token}}</p>`,
  },
  fr: {
    signup: `<h2>Confirmez votre adresse e-mail</h2><p>Suivez ce lien pour confirmer votre adresse e-mail :</p><p><a href="{{confirmation_url}}">Confirmez votre adresse e-mail</a></p><p>Vous pouvez aussi saisir le code : {{token}}</p>`,
    recovery: `<h2>Réinitialisez votre mot de passe</h2><p>Suivez ce lien pour réinitialiser votre mot de passe :</p><p><a href="{{confirmation_url}}">Réinitialisez votre mot de passe</a></p><p>Vous pouvez aussi saisir le code : {{token}}</p>`,
    invite: `<h2>Vous avez été invité</h2><p>Vous avez été invité à créer un utilisateur sur {{site_url}}. Suivez ce lien pour accepter l'invitation :</p><p><a href="{{confirmation_url}}">Acceptez l'invitation</a></p><p>Vous pouvez aussi saisir le code : {{token}}</p>`,
    magiclink: `<h2>Votre Lien Magique</h2><p>Suivez ce lien pour vous connecter :</p><p><a href="{{confirmation_url}}">Connectez-vous</a></p><p>Vous pouvez aussi saisir le code : {{token}}</p>`,
    email_change: `<h2>Confirmez le changement d’adresse e-mail</h2><p>Suivez ce lien pour confirmer la mise à jour de votre adresse e-mail de {{old_email}} à {{new_email}} :</p><p><a href="{{confirmation_url}}">Changez d’adresse e-mail</a></p><p>Vous pouvez aussi saisir les codes : {{token}} et {{new_token}}</p>`,
  },
};

export const authEmailTranslations = {
  subjects,
  bodies,
};
