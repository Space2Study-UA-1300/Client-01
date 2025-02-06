import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { styles } from '~/components/popup-confirmation/ConfirmationPopUp.styles'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

interface ConfirmationPopUpProps {
  open: boolean
  handleClickYes: () => void
  handleClickNo: () => void
}

const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({
  open,
  handleClickYes,
  handleClickNo
}) => {
  const { t } = useTranslation()
  return (
    <Dialog
      aria-describedby='alert-dialog-description'
      aria-labelledby='alert-dialog-title'
      onClose={() => handleClickNo()}
      open={open}
    >
      <IconButton
        onClick={() => {
          handleClickNo()
        }}
        sx={styles.icon}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle id='alert-dialog-title'>
        {t('confirmationPopUp.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('confirmationPopUp.subtitle')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={styles.wrapperButton}>
        <Button
          onClick={() => {
            handleClickYes()
          }}
          sx={styles.button}
        >
          {t('common.yes')}
        </Button>
        <Button
          onClick={() => {
            handleClickNo()
          }}
          sx={styles.button}
        >
          {t('common.no')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationPopUp
