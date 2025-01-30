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
  return (
    <Dialog
      aria-describedby='alert-dialog-description'
      aria-labelledby='alert-dialog-title'
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
      <DialogTitle id='alert-dialog-title'>Please confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you certain you want to close? Any unsaved changes will be lost
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={styles.wrapperButton}>
        <Button
          onClick={() => {
            handleClickYes()
          }}
          sx={styles.button}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            handleClickNo()
          }}
          sx={styles.button}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationPopUp
