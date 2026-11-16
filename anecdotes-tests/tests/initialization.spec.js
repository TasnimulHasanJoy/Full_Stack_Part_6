import { test, expect } from '@playwright/test'

test('anecdotes are initialized from the backend', async ({ page, request }) => {
  const response = await request.get('http://localhost:3001/anecdotes')

  expect(response.ok()).toBeTruthy()

  const backendAnecdotes = await response.json()

  await page.goto('/')

  for (const anecdote of backendAnecdotes) {
    await expect(
      page.getByText(anecdote.content, { exact: true })
    ).toBeVisible()
  }
})