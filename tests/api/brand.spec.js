import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { users } from '../test-data/users';
import { access } from 'node:fs';

test.describe('GET requests', () => {
    test('GET all brands (happy path)', async ({ request }) => {
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
    test('GET a specific brand (happy path)', async ({ request }) => {
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
    test('GET a specific brand by search query (happy path)', async ({ request }) => {
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
    test('GET requests returns a 404 error when using a non-existent id', async ({ request }) => {
        const falseId = randomUUID().slice(0,8);

        const getResponse = await request.get(`/brands/${falseId}`);

        expect(getResponse.status()).toBe(404);

        const responseJson = await getResponse.json();

        expect(responseJson.message).toBe('Requested item not found');
    });
});

test.describe('POST requests', () => {
    test('POST request to create new brand (happy path)', async ({ request }) => {
        const brandId = randomUUID().slice(0,8);
        const newBrand = {
            name: `sams brand ${brandId}`,
            slug: `sams-brand-${brandId}`
        }

        const newBrandResponse = await request.post('/brands', {
            data: newBrand,
        });

        const newBrandResponseJson = await newBrandResponse.json();

        expect(newBrandResponse.status()).toBe(201);

        expect(newBrandResponseJson).toHaveProperty('id');
        expect(newBrandResponseJson.name).toBe(newBrand.name);
        expect(newBrandResponseJson.slug).toBe(newBrand.slug);
    });
});

test.describe('PUT requests', () => {
    test('PUT request to update a brand (happy path)', async ({ request }) => {

        /* Create new brand */
        const brandNumber = randomUUID().slice(0,8);
        const newBrand = {
            name: `sams brand ${brandNumber}`,
            slug: `sams-brand-${brandNumber}`
        }

        const newBrandResponse = await request.post('/brands', {
            data: newBrand,
        });

        expect(newBrandResponse.status()).toBe(201);

        const newBrandResponseJson = await newBrandResponse.json();

        /* Update brand */

        const updatedBrand = {
            name: `sams updated brand ${brandNumber}`,
            slug: `sams-updated-brand-${brandNumber}`
        };

        const updatedBrandResponse = await request.put(`/brands/${newBrandResponseJson.id}`, {
            data: updatedBrand,
        });

        expect(updatedBrandResponse.status()).toBe(200);

        const updatedBrandResponseJson = await updatedBrandResponse.json();

        expect(updatedBrandResponseJson.success).toBe(true);

        /* Get updated brand */
        const getUpdateResponse = await request.get(`/brands/${newBrandResponseJson.id}`);

        expect(getUpdateResponse.status()).toBe(200);

        const responseJson = await getUpdateResponse.json();

        expect(responseJson.id).toBe(newBrandResponseJson.id);
        expect(responseJson.name).toBe(updatedBrand.name);
        expect(responseJson.slug).toBe(updatedBrand.slug);
    });
});

test.describe('PATCH requests', () => {
    test('PATCH request to update a brand (happy path)', async ({ request }) => {

        /* Create new brand */
        const brandNumber = randomUUID().slice(0,8);
        const newBrand = {
            name: `sams brand ${brandNumber}`,
            slug: `sams-brand-${brandNumber}`
        }

        const newBrandResponse = await request.post('/brands', {
            data: newBrand,
        });

        expect(newBrandResponse.status()).toBe(201);

        const newBrandResponseJson = await newBrandResponse.json();

        /* Update brand */

        const updatedBrand = {
            name: `sams brand patch ${brandNumber}`,
        };

        const updatedBrandResponse = await request.patch(`/brands/${newBrandResponseJson.id}`, {
            data: updatedBrand,
        });

        expect(updatedBrandResponse.status()).toBe(200);

        const updatedBrandResponseJson = await updatedBrandResponse.json();

        expect(updatedBrandResponseJson.success).toBe(true);

        /* Get updated brand */
        const getUpdateResponse = await request.get(`/brands/${newBrandResponseJson.id}`);

        expect(getUpdateResponse.status()).toBe(200);

        const responseJson = await getUpdateResponse.json();

        expect(responseJson.id).toBe(newBrandResponseJson.id);
        expect(responseJson.name).toBe(updatedBrand.name);
        expect(responseJson.slug).toBe(newBrand.slug);
    });
});

test.describe('DELETE', () => {
 test('DELETE request to remove a brand (happy path)', async ({ request}) => {

    /* Get access token for deletion */
    const loginAdminResponse = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: users.admin.email,
            password: users.admin.password
        }
    });

    await expect(loginAdminResponse.status()).toBe(200);

    const loginAdminResponseJson = await loginAdminResponse.json();
    const accessToken = loginAdminResponseJson.access_token;

    /* Create a new brand */
    const brandNumber = randomUUID().slice(0,8);
    const newBrand = {
        name: `new brand ${brandNumber}`,
        slug: `new-brand-${brandNumber}`
    }

    const newBrandResponse = await request.post('/brands', {
        data: newBrand,
    });

    expect(newBrandResponse.status()).toBe(201);

    const newBrandResponseJson = await newBrandResponse.json();

    /* Delete newly created brand */
    const deletedBrandResponse = await request.delete(`/brands/${newBrandResponseJson.id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    expect(deletedBrandResponse.status()).toBe(204);

    /* Check brand is deleted */
    const getBrandResponse = await request.get(`/brands/${newBrandResponseJson.id}`);

    expect(getBrandResponse.status()).toBe(404);

 });
});

