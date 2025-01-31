import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import { ThemeProvider } from '@mui/material/styles'
import { render, waitFor } from '@testing-library/react'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'

import { vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { axiosClient } from '~/plugins/axiosClient'
import { LoginFormProvider } from '~/context/login-context'
import { SingUpFormProvider } from '~/context/singUp-context'

export const renderWithProviders = (
  ui,
  {
    initialEntries = '/',
    preloadedState,
    store = configureStore({ reducer: { appMain: reducer }, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntries]}>
        <ThemeProvider theme={theme}>
          <ContextProviders>{children}</ContextProviders>
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  )
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

const ContextProviders = ({ children }) => (
  <SnackBarProvider>
    <ConfirmationDialogProvider>
      <ModalProvider>
        <LoginFormProvider>
          <SingUpFormProvider>{children}</SingUpFormProvider>
        </LoginFormProvider>
      </ModalProvider>
    </ConfirmationDialogProvider>
  </SnackBarProvider>
)

export const getFakeTestEvent = (key, value) => ({
  preventDefault: vi.fn(),
  target: { [key]: value }
})

export const mockAxiosClient = new MockAdapter(axiosClient)

export const waitForTimeout = (callback, options) => {
  const mergedOptions = { timeout: 5000, ...options }
  return waitFor(callback, mergedOptions)
}
