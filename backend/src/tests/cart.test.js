const request = require('supertest');
const app = require('../src/app');

describe('Cart API', () => {
    const userId = 'test-user-123';

    describe('POST /api/cart', () => {
        it('should add item to cart', async() => {
            const res = await request(app)
                .post('/api/cart')
                .set('userId', userId)
                .send({ productId: 'p1', qty: 2 });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.items.length).toBeGreaterThan(0);
            expect(res.body.data.subtotal).toBeGreaterThan(0);
        });

        it('should return 400 for missing productId', async() => {
            const res = await request(app)
                .post('/api/cart')
                .set('userId', userId)
                .send({ qty: 2 });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    describe('GET /api/cart', () => {
        it('should return cart', async() => {
            // First add item
            await request(app)
                .post('/api/cart')
                .set('userId', userId)
                .send({ productId: 'p1', qty: 1 });

            // Then get cart
            const res = await request(app)
                .get('/api/cart')
                .set('userId', userId);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('items');
            expect(res.body.data).toHaveProperty('subtotal');
            expect(res.body.data).toHaveProperty('tax');
            expect(res.body.data).toHaveProperty('total');
        });
    });
});