// import { FC } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
// import { PaperProps } from '@mui/material'
import { useModalContext } from '~/context/modal-context'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import { useLoginFormContext } from '~/context/login-context'

// interface PopupDialogProps {
//   content: React.ReactNode
//   paperProps: PaperProps
//   timerId: NodeJS.Timeout | null
//   closeModalAfterDelay: (delay?: number) => void
// }

const ConfirmationPopUp = () => {
  const { isMobile } = useBreakpoints()
  const { closeModal } = useModalContext()
  const { isDirty } = useLoginFormContext()
  const handleDialogClick = () => !isDirty && closeModal()

  return (
    <Dialog
      // PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClose={handleDialogClick}
      open
    >
      <Box data-testid='popupContent' sx={styles.box}>
        <IconButton onClick={closeModal} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}></Box>
      </Box>
    </Dialog>
  )
}

export default ConfirmationPopUp
