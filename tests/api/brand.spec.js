import { test, expect } from '@playwright/test';

test.describe('GET requests', () => {
    test('GET all brands', async ({ request }) => {
        const response = await request.get('/brands');
        const responseJson = await response.json();

        expect(response.status()).toBe(200);

        await expect(Array.isArray(responseJson)).toBeTruthy();
        await expect(responseJson.length).toBeGreaterThan(0);

        for (const brand of responseJson) {
            expect(brand).toHaveProperty('id');
            expect(brand).toHaveProperty('name');
            expect(brand).toHaveProperty('slug');
        }
    });
    test('GET a specific brand', async ({ request }) => {
       const brandId = '01KRYVYXYSN58RD3A71EK1FXTY';

       const response = await request.get(`/brands/${brandId}`);
       const responseJson = await response.json();

       expect(response.status()).toBe(200);

       console.log(responseJson);
    })

});



