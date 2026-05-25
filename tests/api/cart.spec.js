import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test.describe('POST', () => {
    test('Create a new cart (happy path)', async ({ request }) => {
        const newCartResponse = await request.post('/carts');

        expect(newCartResponse.status()).toBe(201);

        expect((await newCartResponse.json()).id).toBeDefined();
    });
});