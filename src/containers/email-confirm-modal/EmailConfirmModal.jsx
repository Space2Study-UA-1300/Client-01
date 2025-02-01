import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import { useCallback, useEffect, useState } from 'react'
import { useModalContext } from '~/context/modal-context'
import { useTranslation } from 'react-i18next'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import useAxios from '~/hooks/use-axios'
import { AuthService } from '~/services/auth-service'
import Loader from '~/components/loader/Loader'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import imgInfo from '~/assets/img/guest-home-page/info.svg'

const EmailConfirmModal = ({ confirmToken, openModal, userEmail }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const [statusCode, setStatusCode] = useState(null)
  useEffect(() => {
    fetch('/').then((response) => {
      console.log('response.status =', response.status)
      setStatusCode(response.status)
    })
  }, [])

  const serviceFunction = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )
  const { response, error, loading } = useAxios({
    service: serviceFunction,
    defaultResponse: null
  })
  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  if (loading) {
    return <Loader size={100} />
  }

  if (
    (error && error.code === 'BAD_CONFIRM_TOKEN') ||
    (error && error.code === 'DOCUMENT_NOT_FOUND' && response === null)
  ) {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.badToken')}
          img={imgReject}
          style={styles}
          title={t('modals.emailNotConfirm')}
        />
        <Button onClick={closeModal} sx={styles.button} variant='contained'>
          {t('common.confirmButton')}
        </Button>
      </Box>
    )
  }

  if (error && error.code === 'EMAIL_ALREADY_CONFIRMED') {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.alreadyConfirmed')}
          img={imgReject}
          style={styles}
          title={t('modals.emailAlreadyConfirm')}
        />
        <Button
          onClick={openLoginDialog}
          sx={styles.button}
          variant='contained'
        >
          {t('common.confirmButton')}
        </Button>
      </Box>
    )
  }
  if ((statusCode === 200 && userEmail) || (statusCode === 201 && userEmail)) {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={`${t('signup.confirmEmailMessage')}${userEmail}. ${t('signup.confirmEmailDesc')}`}
          img={imgInfo}
          style={styles}
          title={t('signup.confirmEmailTitle')}
        />
        <Button onClick={closeModal} sx={styles.button} variant='contained'>
          {t('common.confirmButton')}
        </Button>
      </Box>
    )
  }
}

export default EmailConfirmModal
