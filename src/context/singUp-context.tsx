import { FC, createContext, useContext, useMemo } from 'react'
import useForm from '~/hooks/use-form'

interface SingUpFormProviderContext {
  handleSubmit: () => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  data: { [key: string]: string }
  errors: { [key: string]: string }
  isDirty: boolean
}

interface SingUpFormProviderProps {
  children: React.ReactElement
}

const SingUpFormContext = createContext({} as SingUpFormProviderContext)

const SingUpFormProvider: FC<SingUpFormProviderProps> = ({ children }) => {
  const { handleSubmit, handleInputChange, handleBlur, data, errors, isDirty } =
    useForm({
      onSubmit: async () => {},
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    })

  const contextValue = useMemo(
    () => ({
      handleSubmit,
      handleInputChange,
      handleBlur,
      data,
      errors,
      isDirty
    }),
    [handleSubmit, handleInputChange, handleBlur, data, errors, isDirty]
  )

  return (
    <SingUpFormContext.Provider value={contextValue}>
      {children}
    </SingUpFormContext.Provider>
  )
}

const useSingUpFormContext = () => useContext(SingUpFormContext)

export { SingUpFormProvider, useSingUpFormContext }
