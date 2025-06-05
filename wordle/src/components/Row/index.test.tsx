import { render, screen } from '@testing-library/react'
import WordleRow from './index'

describe('WordleRow component', () => {
  it('Should Render 5 empty cells by default', () => {
    render(<WordleRow guess={[]} />)
    const cells = screen.getAllByTestId('cell')
    expect(cells.length).toBe(5)
    cells.forEach(cell => {
      expect(cell.textContent).toBe('')
    })
  })
})