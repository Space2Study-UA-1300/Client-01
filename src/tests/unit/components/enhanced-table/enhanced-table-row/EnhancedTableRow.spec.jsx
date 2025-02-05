import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

const mockedHandleSelectClick = vi.fn()

const mockedCommonProps = {
  columns: [
    { field: 'firstCell', label: 'First cell' },
    { field: 'secondCell', label: 'Second cell' }
  ],
  isSelection: false,
  item: { _id: 'testId', firstCell: 'First cell', secondCell: 'Second cell' },
  rowActions: [],
  select: {
    isSelected: () => false,
    handleSelectClick: mockedHandleSelectClick
  },
  selectedRows: [{ _id: 'test' }]
}

describe('EnhancedTableRow component', () => {
  it('should render table row with correct data', () => {
    render(<EnhancedTableRow {...mockedCommonProps} />)

    expect(screen.getByRole('row')).toBeInTheDocument()

    mockedCommonProps.columns.forEach((column) => {
      expect(
        screen.getByText(mockedCommonProps.item[column.field])
      ).toBeInTheDocument()
    })
  })

  it('should render table row with correct data when calculatedCellValue function is passed', () => {
    const columns = [
      {
        field: 'test',
        label: 'test',
        calculatedCellValue: () => 'Calculated value'
      }
    ]
    render(<EnhancedTableRow {...mockedCommonProps} columns={columns} />)

    expect(screen.getByText('Calculated value')).toBeInTheDocument()
  })

  it('should call handleSelectClick when checkbox is clicked', () => {
    const mockedAdditionalProps = {
      isSelection: true
    }

    render(
      <EnhancedTableRow {...mockedCommonProps} {...mockedAdditionalProps} />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()

    fireEvent.click(checkbox)

    expect(mockedHandleSelectClick).toHaveBeenCalledOnce()
    expect(mockedHandleSelectClick).toHaveBeenCalledWith(
      expect.any(Object),
      mockedCommonProps.item._id
    )
  })

  it('should call onRowClick when row is clicked', () => {
    const mockedOnRowClick = vi.fn()
    render(
      <EnhancedTableRow {...mockedCommonProps} onRowClick={mockedOnRowClick} />
    )

    const row = screen.getByRole('row')

    fireEvent.click(row)

    expect(mockedOnRowClick).toHaveBeenCalledOnce()
    expect(mockedOnRowClick).toHaveBeenCalledWith(mockedCommonProps.item)
  })
})

describe('EnhancedTableRow action menu', () => {
  let refetchData
  const mockedAdditionalActionMenuFunction = vi.fn()
  beforeEach(() => {
    refetchData = vi.fn()
    const mockedAdditionalActionMenuProps = {
      rowActions: [
        { label: 'Test action', func: mockedAdditionalActionMenuFunction }
      ],
      refetchData
    }
    render(
      <EnhancedTableRow
        {...mockedCommonProps}
        {...mockedAdditionalActionMenuProps}
      />
    )

    const menuIcon = screen.getByTestId('menu-icon')
    fireEvent.click(menuIcon)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render action menu when menu icon is clicked', () => {
    const menu = screen.getByRole('menu')

    expect(menu).toBeInTheDocument()
  })

  it('should call onAction function when clicking on the menu item', () => {
    const menuItem = screen.getByRole('menuitem')

    fireEvent.click(menuItem)

    expect(mockedAdditionalActionMenuFunction).toHaveBeenCalledOnce()
    expect(mockedAdditionalActionMenuFunction).toHaveBeenCalledWith(
      mockedCommonProps.item._id
    )
  })

  it('should call refetchData function if passed when clicking on the menu item', async () => {
    const menuItem = screen.getByRole('menuitem')

    fireEvent.click(menuItem)

    await waitFor(() => {
      expect(refetchData).toHaveBeenCalledOnce()
    })
  })

  it('should close menu when "escape" is pressed', () => {
    const menu = screen.getByRole('menu')
    fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' })

    expect(screen.queryByRole('menu')).toBeNull()
  })
})
