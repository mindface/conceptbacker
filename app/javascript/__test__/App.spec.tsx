/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react'
import {
  cleanup,
  fireEvent,
  logDOM,
  render,
  screen,
} from '@testing-library/react'
import App from '../container/App'

afterEach(cleanup)

describe('App', () => {
  it('App changes the text after click', () => {
    const { queryByDisplayValue, getByLabelText } = render(<App />)

    screen.debug()
    const element = screen.getByText(/kokoko/i)
  })

  test('llllllll', () => {
    render(<App />)
    logDOM(screen.getByText('kokoko'))
  })
})
