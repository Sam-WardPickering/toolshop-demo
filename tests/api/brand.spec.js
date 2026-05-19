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
       const brands = await request.get('/brands');
       const brandsJson = await brands.json();

       const brand = brandsJson[0];

       const response = await request.get(`/brands/${brand.id}`);
       const responseJson = await response.json();

       expect(response.status()).toBe(200);

       expect(responseJson.id).toBe(brand.id);
       expect(responseJson.name).toBe(brand.name);
       expect(responseJson.slug).toBe(brand.slug);
    });
    test('GET a specific brand by search query', async ({ request }) => {
        const brands = await request.get('/brands');
        const brandsJson = await brands.json();

        const brand = brandsJson[0];

        const response = await request.get(`/brands/search?q=${brand.name}`);
        const responseJson = await response.json();

        expect(response.status()).toBe(200);

        expect(responseJson[0].id).toBe(brand.id);
        expect(responseJson[0].name).toBe(brand.name);
        expect(responseJson[0].slug).toBe(brand.slug);
    });

});

test.describe('POST requests', () => {
    test.only('POST request to create new brand', async ({ request }) => {
        const newBrand = {
            name: "sams brand",
            slug: "sams-brand"
        }

        const newBrandReponse = await request.post('/brands', {
            data: newBrand,
        });

        expect(newBrandReponse.status()).toBe(201);
    });
});



