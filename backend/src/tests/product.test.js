const request = require('supertest');
const app = require('../src/app');

describe('Product API', () => {
    describe('GET /api/products', () => {
        it('should return all products', async() => {
            const res = await request(app).get('/api/products');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBeGreaterThan(0);
        });

        it('should have required product fields', async() => {
            const res = await request(app).get('/api/products');

            const product = res.body.data[0];
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('description');
        });
    });

    describe('GET /api/products/:id', () => {
        it('should return a product by id', async() => {
            const res = await request(app).get('/api/products/p1');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.id).toBe('p1');
            expect(res.body.data.name).toBe('Vibe Tee');
        });

        it('should return 404 for non-existent product', async() => {
            const res = await request(app).get('/api/products/invalid-id');

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
});