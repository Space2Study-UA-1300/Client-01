import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'
import { styles } from '~/containers/guest-home-page/signup-form/SignUpForm.styles'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import useInputVisibility from '~/hooks/use-input-visibility'

const SignUpForm = ({
  data,
  errors,
  handleSubmit,
  handleChange,
  handleBlur
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const { t } = useTranslation()
  const { authLoading } = useSelector((state) => state.appMain)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.fullName}>
        <AppTextField
          data-testid={'firstName'}
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          size='large'
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />
        <AppTextField
          data-testid={'lastName'}
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          size='large'
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>
      <AppTextField
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='large'
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <FormControlLabel
        control={
          <Checkbox
            onChange={() => setIsTermsChecked(!isTermsChecked)}
            value={isTermsChecked}
          />
        }
        label={
          <Typography sx={styles.agreement}>
            {t('signup.iAgree')}{' '}
            <Link href='#'>{t('common.labels.terms')}</Link> {t('signup.and')}{' '}
            <Link href='#'>{t('common.labels.privacyPolicy')}</Link>
          </Typography>
        }
      />
      <AppButton loading={authLoading} sx={styles.signUpButton} type='submit'>
      <AppButton
        disabled={
          !isTermsChecked ||
          Object.values(errors).some((error) => error) ||
          Object.values(data).some((value) => !value.trim())
        }
        loading={authLoading}
        sx={styles.signUpButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignUpForm
