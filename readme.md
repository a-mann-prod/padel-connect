# Padel-connect boilerplate

## Included Libraries

- [Expo](https://expo.dev/)
- [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- [Zod](https://github.com/colinhacks/zod)
- [GlueStack](https://github.com/Raathigesh/gluestack)
- [React Native Async Storage](https://github.com/react-native-async-storage/async-storage)
- [React Query](https://github.com/tannerlinsley/react-query)
- [Day.js](https://github.com/iamkun/dayjs)
- [Moti](https://github.com/wcandillon/moti)
- [Ramda](https://github.com/ramda/ramda)
- [React-i18next](https://github.com/i18next/react-i18next)
- [UUID](https://github.com/uuidjs/uuid)
- [Remeda](https://github.com/remeda/remeda)

## Project Structure

- The repository consists of two main folders:
  - **app**: Contains the application code.

## Get started

Update Application name and slug in `app.config.ts`

Update env token in `eas.json`

Create a `.env` in app racine from `.env.dist` (in general : contact email, privacy policy & terms of use)

## Build app

`eas login`
`eas build:configure`

`eas build --platform ios|android`
