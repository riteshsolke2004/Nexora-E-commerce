const request = require('supertest');
const app = require('../src/app');

describe('Checkout API', () => {
    const userId = 'test-user-checkout';

    describe('POST /api/checkout', () => {
        it('should create order successfully', async() => {
            const cartItems = [{
                cartId: 'c1',
                productId: 'p1',
                name: 'Vibe Tee',
                price: 19.99,
                qty: 2,
            }, ];

            const res = await request(app)
                .post('/api/checkout')
                .set('userId', userId)
                .send({
                    name: 'John Doe',
                    email: 'john@example.com',
                    cartItems,
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('receiptId');
            expect(res.body.data).toHaveProperty('total');
            expect(res.body.data.name).toBe('John Doe');
            expect(res.body.data.email).toBe('john@example.com');
        });

        it('should return 400 for invalid email', async() => {
            const res = await request(app)
                .post('/api/checkout')
                .set('userId', userId)
                .send({
                    name: 'John Doe',
                    email: 'invalid-email',
                    cartItems: [],
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });
});