import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'

import loginImg from '~/assets/img/login-dialog/login.svg'
import { login } from '~/constants'

import styles from '~/containers/guest-home-page/login-dialog/LoginDialog.styles'
import { useFormContext } from '~/context/form-context'

const LoginDialog = ({ keyForm = LoginDialog.name }) => {
  const { t } = useTranslation()
  const { data, errors, handleBlur, handleInputChange, handleSubmit, isDirty } =
    useFormContext(keyForm)

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='login' component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t('login.head')}
        </Typography>
        <Box sx={styles.form}>
          <LoginForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
            isDirty={isDirty}
          />
          <GoogleLogin buttonWidth={styles.form.maxWidth} type={login} />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginDialog
