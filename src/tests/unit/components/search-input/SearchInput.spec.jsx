import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput', () => {
  let searchInput
  let searchIcon
  let deleteIcon
  const mockSetSearch = vi.fn()

  beforeEach(() => {
    render(<SearchInput setSearch={mockSetSearch} />)
    searchInput = screen.getByRole('textbox')
    searchIcon = screen.getByTestId('search-icon')
    deleteIcon = screen.getByTestId('delete-icon')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the search input and icons in the document', () => {
    expect(searchInput).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
    expect(deleteIcon).toBeInTheDocument()
  })

  it('renders the search input with the entered text', async () => {
    await userEvent.type(searchInput, 'sometext')
    expect(searchInput).toHaveValue('sometext')
  })

  it('calls setSearch when search icon is clicked', async () => {
    await userEvent.click(searchIcon)
    expect(mockSetSearch).toHaveBeenCalled()
  })

  it('clicking delete icon should call setState with empty string', async () => {
    await userEvent.click(deleteIcon)
    expect(mockSetSearch).toHaveBeenCalledWith('')
  })

  it('clicking Enter keyboard calls setSearch', async () => {
    await userEvent.type(searchInput, 'sometext')
    await userEvent.keyboard('{Enter}')
    expect(mockSetSearch).toHaveBeenCalledWith('sometext')
  })

  it('deleteIcon should have the "hidden" class if the search field is empty', () => {
    if (searchInput.value === '' || searchInput.value === null) {
      expect(deleteIcon).toHaveClass('hidden')
    }
  })

  it('deleteIcon should have the "visible" class if the search field is empty', async () => {
    await userEvent.type(searchInput, 'sometext')
    expect(deleteIcon).toHaveClass('visible')
  })
})
