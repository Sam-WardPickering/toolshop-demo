import { test, expect } from '@playwright/test';

test('GET all brands', async ({ request }) => {
    const response = await request.get('/brands');
    const responseJson = await response.json();

    await expect(response.status()).toBe(200);
    console.log(responseJson);

    await expect(Array.isArray(responseJson)).toBeTruthy();
    await expect(responseJson.length).toBeGreaterThan(0);

    for (const brand of responseJson) {
        expect(brand).toHaveProperty('id');
        expect(brand).toHaveProperty('name');
        expect(brand).toHaveProperty('slug');
    }
});