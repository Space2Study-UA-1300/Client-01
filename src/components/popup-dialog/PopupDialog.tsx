import { FC } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'
import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import { useState } from 'react'
import ConfirmationPopUp from '~/components/popup-confirmation/ConfirmationPopUp'
import { useSingUpFormContext } from '~/context/singUp-context'
import { useLoginFormContext } from '~/context/login-context'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
  type: string | undefined
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay,
  type
}) => {
  const { isDirty: isLoginDirty } = useLoginFormContext()
  const { isDirty: isSignUpDirty } = useSingUpFormContext()

  const isDirty = type === 'LoginDialog' ? isLoginDirty : isSignUpDirty

  const [open, setOpen] = useState(false)
  const { isMobile } = useBreakpoints()
  const { closeModal } = useModalContext()

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()
  const handleDialogClick = () => isDirty && setOpen(true)
  const handleClickCloseAll = () => {
    setOpen(false)
    closeModal()
  }
  const handleClickCloseConfirmationPopUp = () => {
    setOpen(false)
  }

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClose={handleDialogClick}
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={closeModal} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
        <ConfirmationPopUp
          handleClickNo={handleClickCloseConfirmationPopUp}
          handleClickYes={handleClickCloseAll}
          open={open}
        />
      </Box>
    </Dialog>
  )
}

export default PopupDialog
