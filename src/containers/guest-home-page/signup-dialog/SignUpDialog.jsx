import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Logo from '~/containers/logo/Logo'
import styles from '~/containers/guest-home-page/signup-dialog/SignUpDialog.styles'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignUpForm from '../signup-form/SignUpForm'

import useBreakpoints from '~/hooks/use-breakpoints'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import { signup } from '~/constants'
import { useFormContext } from '~/context/form-context'

const SignUpDialog = ({ actionType, keyForm = SignUpDialog.name }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const { data, errors, handleBlur, handleInputChange, handleSubmit, isDirty } =
    useFormContext(keyForm)
  return (
    <Box sx={styles.root}>
      {isMobile && <Logo />}
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
            isDirty={isDirty}
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
