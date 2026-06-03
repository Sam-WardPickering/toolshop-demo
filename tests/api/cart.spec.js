import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test.describe('POST', () => {
    test('Create a new cart (happy path)', async ({ request }) => {
        const newCartResponse = await request.post('/carts');

        expect(newCartResponse.status()).toBe(201);

        expect((await newCartResponse.json()).id).toBeDefined();
    });

    test('Add item to cart (happy path)', async ({ request }) => {
        /* Get existing product for id */
        const products = await request.get('/products');
        expect(products.status()).toBe(200);

        const productsJson = await products.json();

        /* Get ID from first product returned */
        const productId = productsJson.data[0].id;

        /* Create new cart */
        const newCartResponse = await request.post('/carts');

        expect(newCartResponse.status()).toBe(201);

        /* Get cart ID & add cart item*/
        const newCartId = await (await newCartResponse.json()).id;

        expect(newCartId).toBeDefined();

        const cartItem = {
            'product_id': productId, 
            'quantity': 1
        };

        const cartItemResponse = await request.post(`/carts/${newCartId}`, {
            data: cartItem,
        });

        expect(cartItemResponse.status()).toBe(200);

        expect((await cartItemResponse.json()).result).toBe('item added or updated');
    });

});