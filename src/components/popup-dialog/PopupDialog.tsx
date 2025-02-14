import { isValidElement, FC } from 'react'
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
import { useFormContext } from '~/context/form-context'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
  keyForm: string
}

interface PopupContentProps {
  closeOnClickOutside?: boolean
  closeOnIconClick?: boolean
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay,
  keyForm
}) => {
  const { isDirty } = useFormContext(keyForm)
  const [open, setOpen] = useState(false)
  const { isMobile } = useBreakpoints()
  const { closeModal } = useModalContext()

  const closeOnClickOutside = isValidElement(content)
    ? (content.props as PopupContentProps).closeOnClickOutside ?? false
    : false

  const closeOnIconClick = isValidElement(content)
    ? (content.props as PopupContentProps).closeOnIconClick ?? false
    : false

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  const closeConfirmationPopUp = () => setOpen(false)
  const openConfirmationPopUp = () => setOpen(true)

  const handleClickOut = () =>
    closeOnClickOutside && (isDirty ? openConfirmationPopUp() : closeModal())

  const handleClickCloseAll = () => {
    closeConfirmationPopUp()
    closeModal()
  }

  const handlerCloseIcon = () =>
    closeOnIconClick ? closeModal() : openConfirmationPopUp()

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClose={handleClickOut}
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={handlerCloseIcon} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
        <ConfirmationPopUp
          handleClickNo={closeConfirmationPopUp}
          handleClickYes={handleClickCloseAll}
          open={open}
        />
      </Box>
    </Dialog>
  )
}

export default PopupDialog
