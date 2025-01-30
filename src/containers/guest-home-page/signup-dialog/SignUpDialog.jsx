import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useForm from '~/hooks/use-form'

import styles from '~/containers/guest-home-page/signup-dialog/SignUpDialog.styles'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignUpForm from '../signup-form/SignUpForm'

import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import { signup } from '~/constants'

import { useSignUpMutation } from '~/services/auth-service'

const SignUpDialog = ({ actionType }) => {
  const { t } = useTranslation()
  const [signUpUser] = useSignUpMutation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          const res = await signUpUser({ role: actionType, ...data })
        } catch (error) {
          console.error('Signup failed:', error)
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='sign'
          component='img'
          src={actionType === 'student' ? studentImg : tutorImg}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t(`signup.head.${actionType}`)}
        </Typography>
        <Box sx={styles.form}>
          <SignUpForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            role={''}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog
