import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('Memory Game', async () => {
  await setup({
    host: 'http://localhost:3000',
    server: false,
    browser: true,
  })

  it('displays the game board', async () => {
    const page = await createPage('/memory')

    await page.getByRole('button', { name: 'Start Game' }).click()
    
    expect(page.getByRole('button', { name: 'Reset Game' })).toBeTruthy()

    const boardContainer = page.getByTestId('game-board')
    expect(boardContainer).toBeTruthy()
    
    const cards = await boardContainer.allInnerTexts()
    expect(cards.length).toBeGreaterThan(0)
  })
})
