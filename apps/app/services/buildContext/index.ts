import { Context, createContext, Provider, useContext } from 'react'

export const buildContext = <T>(
  typeName: string = ''
): [Context<T | null>, Provider<T | null>, () => T] => {
  const Context = createContext<T | null>(null)
  const Provider = Context.Provider
  const useTContext = () => {
    const contextInstance = useContext(Context)
    if (!contextInstance) {
      throw new Error(
        `use${typeName}Context should be wrapped within ${typeName}Provider`
      )
    }
    return contextInstance
  }
  return [Context, Provider, useTContext]
}
