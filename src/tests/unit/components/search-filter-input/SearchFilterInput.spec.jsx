import { beforeEach, describe, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

describe('SearchFilterInput', () => {
  let mockUpdateFilter
  let inputField

  beforeEach(() => {
    mockUpdateFilter = vi.fn()
    render(
      <SearchFilterInput
        textFieldProps={{ placeholder: 'Search...' }}
        updateFilter={mockUpdateFilter}
      />
    )

    inputField = screen.getByPlaceholderText('Search...')

    fireEvent.change(inputField, { target: { value: 'Test' } })
  })

  it('should render component with input in it', () => {
    expect(inputField).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    expect(inputField).toHaveValue('Test')
  })

  it('should delete typed text when delete button is clicked', () => {
    fireEvent.click(screen.getByTestId('clearIcon'))

    expect(inputField).toHaveValue('')
  })

  it('should call updateFilter function on search button click', () => {
    const searchButton = screen.getByText(/search/i)

    fireEvent.click(searchButton)

    expect(mockUpdateFilter).toHaveBeenCalledOnce()
    expect(mockUpdateFilter).toHaveBeenCalledWith('Test')
  })

  it('should call updateFilter function when enter is pressed', () => {
    fireEvent.keyDown(inputField, { key: 'Enter' })

    expect(mockUpdateFilter).toHaveBeenCalledOnce()
    expect(mockUpdateFilter).toHaveBeenCalledWith('Test')
  })
})
