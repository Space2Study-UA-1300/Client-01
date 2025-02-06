import { createContext, useContext, useMemo } from 'react'
import useForm from '~/hooks/use-form'
import { snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useLoginMutation } from '~/services/auth-service'
import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useRole } from './role-context'
import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword
} from '~/utils/validations/signup'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'

interface FormContext {
  [key: string]: {
    handleSubmit: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    data: { [key: string]: string }
    errors: { [key: string]: string }
    isDirty: boolean
  }
}

interface ErrorResponse {
  data: {
    code: string
  }
}
const FormContext = createContext({} as FormContext)

const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setAlert } = useSnackBarContext()
  const [loginUser] = useLoginMutation()
  const { closeModal } = useModalContext()
  const [signUpUser] = useSignUpMutation()
  const { openModal } = useModalContext()
  const { role } = useRole()
  const loginDialog = useForm({
    onSubmit: async () => {
      try {
        await loginUser(loginDialog.data).unwrap()
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

  const signUpDialog = useForm({
    onSubmit: async () => {
      try {
        const res = await signUpUser({ role, ...signUpDialog.data })
        if ('data' in res && res.data.userEmail) {
          openModal({
            component: (
              <EmailConfirmModal
                confirmToken=''
                openModal={openModal}
                userEmail={res.data.userEmail}
              />
            )
          })
        }
      } catch (e) {
        const error = e as ErrorResponse
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${error.data.code}`
        })
      }
    },
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validations: { firstName, lastName, email, password, confirmPassword }
  })

  // Add all forms to an object and use the component name as keyForm to get the required form, when we use useFormContext
  const formContexts = useMemo(
    () => ({
      LoginDialog: loginDialog,
      SignUpDialog: signUpDialog
    }),
    [loginDialog, signUpDialog]
  )

  return (
    <FormContext.Provider value={formContexts}>{children}</FormContext.Provider>
  )
}

const useFormContext = (keyForm: string) => {
  const formContexts = useContext(FormContext)
  return formContexts[keyForm] || {}
}

export { FormProvider, useFormContext }
