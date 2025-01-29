import { FC, createContext, useContext, useMemo } from 'react'
import useForm from '~/hooks/use-form'
import { snackbarVariants } from '~/constants'
import { email } from '~/utils/validations/login'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useLoginMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'

interface ErrorResponse {
  data: {
    code: string
  }
}
interface LoginFormProviderContext {
  handleSubmit: () => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  data: { [key: string]: string }
  errors: { [key: string]: string }
  isDirty: boolean
}

interface LoginFormProviderProps {
  children: React.ReactElement
}

const LoginFormContext = createContext({} as LoginFormProviderContext)

const LoginFormProvider: FC<LoginFormProviderProps> = ({ children }) => {
  const { setAlert } = useSnackBarContext()
  const [loginUser] = useLoginMutation()
  const { closeModal } = useModalContext()
  const { handleSubmit, handleInputChange, handleBlur, data, errors, isDirty } =
    useForm({
      onSubmit: async () => {
        try {
          await loginUser(data).unwrap()
          closeModal()
        } catch (e) {
          const error = e as ErrorResponse
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${error.data.code}`
          })
        }
      },
      initialValues: { email: '', password: '' },
      validations: { email }
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
    <LoginFormContext.Provider value={contextValue}>
      {children}
    </LoginFormContext.Provider>
  )
}

const useLoginFormContext = () => useContext(LoginFormContext)

export { LoginFormProvider, useLoginFormContext }
