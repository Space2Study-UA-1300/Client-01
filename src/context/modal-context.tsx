import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  isValidElement
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'
import { FormProvider } from '~/context/form-context'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const keyForm = useMemo(() => {
    return isValidElement(modal) && typeof modal.type !== 'string'
      ? modal.type.name
      : ''
  }, [modal])

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps, setTimer])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    ({ component, paperProps }: Component, delayToClose?: number) => {
      setModal(component)

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [setModal, setPaperProps, closeModalAfterDelay]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <FormProvider>
          <PopupDialog
            closeModalAfterDelay={closeModalAfterDelay}
            content={modal}
            keyForm={keyForm}
            paperProps={paperProps}
            timerId={timer}
          />
        </FormProvider>
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
