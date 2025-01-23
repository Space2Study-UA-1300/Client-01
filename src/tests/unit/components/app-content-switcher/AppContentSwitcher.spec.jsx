import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { describe, it, expect, vi } from 'vitest'

describe('AppContentSwitcher', () => {
  const switchOptionsMock = {
    left: { tooltip: 'Left Tooltip', text: 'Learn from Experts' },
    right: { tooltip: 'Right Tooltip', text: 'Share your Experience' }
  }
  const onChangeMock = vi.fn()
  const props = {
    active: false,
    onChange: onChangeMock,
    switchOptions: switchOptionsMock,
    typographyVariant: 'h6'
  }

  it('should render with the correct props', () => {
    render(<AppContentSwitcher {...props} />)
    const leftText = screen.getByText('Learn from Experts')
    expect(leftText).toBeInTheDocument()
    const rightText = screen.getByText('Share your Experience')
    expect(rightText).toBeInTheDocument()
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', async () => {
    render(<AppContentSwitcher {...props} />)
    const switchElement = screen.getByRole('checkbox')
    await userEvent.click(switchElement)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', async () => {
    render(<AppContentSwitcher {...props} />)
    const leftText = screen.getByText('Learn from Experts')
    const rightText = screen.getByText('Share your Experience')
    await userEvent.hover(leftText)
    expect(await screen.findByText('Left Tooltip')).toBeInTheDocument()
    await userEvent.hover(rightText)
    expect(await screen.findByText('Right Tooltip')).toBeInTheDocument()
  })
})
