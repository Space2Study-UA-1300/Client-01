import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'

import { theme } from './styles/app-theme/custom-mui.styles'
import { RoleProvider } from './context/role-context'
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <RoleProvider>
          <ConfirmationDialogProvider>
            <ModalProvider>
              <Outlet />
            </ModalProvider>
          </ConfirmationDialogProvider>
        </RoleProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}
export default App
