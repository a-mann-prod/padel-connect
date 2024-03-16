export const handleUnverifiedUser = () => {
  throw new Error('email_not_confirmed', {
    cause: 'No session returned means email is not confirmed',
  })
}
