import { fireEvent, render, screen } from '@testing-library/react'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { beforeEach, describe, expect, vi } from 'vitest'

describe('AppChipsList component', () => {
  const chipsItems = [
    'Mathematics',
    'English Literature',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Computer Science',
    'Art and Design',
    'Physical Education'
  ]

  it('It should show chips', () => {
    const defaultQuantity = 5
    render(<AppChipList defaultQuantity={defaultQuantity} items={chipsItems} />)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(defaultQuantity)
  })

  it('It should show chips with +3', () => {
    const defaultQuantity = chipsItems.length - 3
    render(<AppChipList defaultQuantity={defaultQuantity} items={chipsItems} />)

    const chip = screen.getByTestId('amount-of-chips')
    expect(chip).toBeInTheDocument()
    expect(chip).toHaveTextContent('+3')
  })

  it('It should show only 7 chips', () => {
    const defaultQuantity = 7
    render(<AppChipList defaultQuantity={defaultQuantity} items={chipsItems} />)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(defaultQuantity)
  })

  it('It should show only 10 chips', () => {
    const defaultQuantity = 10
    render(<AppChipList defaultQuantity={defaultQuantity} items={chipsItems} />)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(defaultQuantity)
  })
})

describe('AppChipsList with delete icon', () => {
  let items = ['Chemistry', 'Physics']

  const deleteItem = (item) => {
    items = items.filter((subject) => subject !== item)
  }

  const mockedDeleteItem = vi.fn(deleteItem)

  beforeEach(() =>
    render(
      <AppChipList
        defaultQuantity={2}
        handleChipDelete={mockedDeleteItem}
        items={items}
      />
    )
  )

  it('it should show delete icon', () => {
    const deleteIcons = screen.getAllByTestId('close-btn')

    expect(deleteIcons).toHaveLength(items.length)

    deleteIcons.forEach((icon) => expect(icon).toBeInTheDocument())
  })

  it('it should delete 1 chip', () => {
    const itemToDelete = items[0]

    const deleteIcons = screen.getAllByTestId('close-btn')

    fireEvent.click(deleteIcons[0])

    expect(mockedDeleteItem).toHaveBeenCalledOnce()

    expect(mockedDeleteItem).toHaveBeenCalledWith(itemToDelete)
  })
})
