import { test, expect } from '@playwright/test';

test('GET all brands', async ({ request }) => {
    const response = await request.get('/brands');
    const responseJson = await response.json();

    await expect(response.status()).toBe(200);
});