require('dotenv').config();
const app = require('../../server');
const db = require('../../models');
const fs = require('fs');
const Items = db.items;
const Orders = db.orders;
const Op = db.Sequelize.Op;
const request = require('supertest');


let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';
let invalidId = 'Invalid-id-for-negative-cases';


const testAddOrder = {
    customer_id: "b3bd81e4-50f3-473a-ae32-0d1604875eea",
    item_id: "886ada3a-f975-4e1a-b865-b95a7545595f",
    qty: 80,
    amount: 80 * 100,
    status: "pending",
    payment_method: "cash"
}

describe('Order Endpoints', () => {
    it('POST /api/customer/login with valid email and pass, response should be 200', async () => {
        const res = await request(app)
          .post('/api/customer/login')
          .set('Accept', 'application/json')
          .send({
            email: process.env.LOGIN_EMAIL,
            password: process.env.LOGIN_PASSWORD
          });
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toMatch('string');
        validToken = res.body.token;
      })

    it('POST /api/order/addOrders with valid values, response should be 201', async () => {
        jest.setTimeout(5000);
        const res = await request(app)
            .post('/api/order/addOrders')
            .send(testAddOrder)
            .set('Accept', 'application/json')
            .set('authorization', validToken)

        expect(res.status).toBe(201)
        expect(typeof res.body).toMatch('object')
        
    })

    it('POST /api/order/addOrders with invalid token, response should be 401', async () => {
        const res = await request(app)
            .post('/api/order/addOrders')
            .send(testAddOrder)
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)

        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty('message');
        expect(typeof res.body.message).toBe('string');
    })

    it('POST /api/order/addOrders with without token, response should be 401', async () => {
        const res = await request(app)
            .post('/api/order/addOrders')
            .send(testAddOrder)
            .set('Accept', 'application/json')

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toMatch('string');
    })
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> POST /api/order/addOrders<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // it('POST /api/order/addOrders invalid customer_id, response should be 404', async () => {
    //     const res = await request(app)
    //         .post('/api/order/addOrders')
    //         .send({
    //             customer_id: 'invalid-customer-id',
    //             item_id: 'a42334ab-46b0-4bbd-ad2d-e1a3571fff4a',
    //             qty: 80,
    //             amount: 64000,
    //             status: "pending",
    //             payment_method: "cash"
    //         })
    //         .set('Accept', 'application/json')
    //         .set('authorization', validToken)
            
    //     expect(res.status).toEqual(401);
    //     expect(res.body).toHaveProperty('message');
    //     expect(typeof res.body.message).toBe('string');
    // })

    // it('POST /api/order/addOrders invalid item_id, response should be 401', async () => {
    //     const res = await request(app)
    //         .post('/api/order/addOrders')
    //         .set('Accept', 'application/x-www-form-urlencoded')
    //         .set('authorization', validToken)
    //         .send({
    //             customer_id: '19531131-13d2-40fb-b4f6-8e09649e598b',
    //             item_id: 'invalid-item-id',
    //             qty: 80,
    //             amount: 64000,
    //             status: "pending",
    //             payment_method: "cash"
    //         })

    //     expect(res.status).toEqual(401);
    //     expect(res.body).toHaveProperty('message');
    //     expect(typeof res.body.message).toBe('string');
    // })

 // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET /api/order/orders/cusId <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 

 it('GET /api/order/orders/cusId with valid customer_id, response should be 200', async () => {
        const res = await request(app)
            .get('/api/order/orders/cusId')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('authorization', validToken)
            .query({
                customer_id: '19531131-13d2-40fb-b4f6-8e09649e598b'
            })

        expect(res.status).toEqual(200);
        expect(typeof res.body).toMatch('object');
    }),


    it('GET /api/order/orders/cusId with invalid token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/cusId')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('authorization', invalidToken)
            .query({
                customer_id: "d75c070f-06ce-4d16-b640-34492bb3069e"
            })

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toMatch('string');
    })

    it('GET /api/order/orders/cusId with without token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/cusId')
            .set('Accept', 'application/x-www-form-urlencoded')
            .query({
                customer_id: "d75c070f-06ce-4d16-b640-34492bb3069e"
            })

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toMatch('string');
    })

    // it('GET /api/order/orders/cusId with invalid customer_id, response should be 401', async () => {
    //     const res = await request(app)
    //         .get('/api/order/orders/cusId')
    //         .set('Accept', 'application/x-www-form-urlencoded')
    //         .set('authorization', validToken)
    //         .query({
    //             customer_id: "invalid-customer-id"
    //         })

    //     expect(res.status).toEqual(401);
    //     expect(res.body).toHaveProperty('error');
    //     expect(typeof res.body.message).toBe('string');
    // })

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET /api/order/orders/:id <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    it('GET /api/order/orders/:id with valid token, response should be 200', async () => {
        const res = await request(app)
            .get('/api/order/orders/c4cb5618-d299-4a12-8d32-cadd91930aad')
            .set('Accept', 'application/json')
            .set('authorization', validToken)
            .expect(200);

        expect(res.body).toHaveProperty(
            'id',
            'customer_id',
            'item_id',
            'qty',
            'amount',
            'status',
            'payment_method'
        );
    })
    

    it('GET /api/order/orders/:id with invalid token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/020c3352-e0de-44b9-ab7a-19bb83c37e76')
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
    })

    it('GET /api/order/orders/:id with without token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/020c3352-e0de-44b9-ab7a-19bb83c37e76')
            .set('Accept', 'application/json')

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
    })

    // it('GET /api/order/orders/:id with wrong id, response should be 404', async () => {
    //     const res = await request(app)
    //         .get('/api/order/orders/:id')
    //         .send({
    //             id: invalidId
    //         })
    //         .set('Accept', 'application/json')
    //         .set('authorization', validToken)


    //     expect(res.status).toBe(401);
    //     expect(res.body).toHaveProperty('message');
    // })

    it('PUT /api/order/orders/:id with valid token, response should be 203', async () => {
        const res = await request(app)
            .put('/api/order/orders/c4cb5618-d299-4a12-8d32-cadd91930aad')
            .send({
                customer_id   : "b3bd81e4-50f3-473a-ae32-0d1604875eea",
                item_id       : "18268373-e24d-45bc-a559-02b167e89113",
                qty           : 11,
                amount        : 11 * 8000,
                status        : "approved",
                payment_method: "credit"
            })
            .set('Accept', 'application/json')
            .set('authorization', validToken)

        expect(res.status).toBe(203);
        expect(res.body).toHaveProperty('message');
    })

    it('PUT /api/order/orders/:id with invalid token, response should be 401', async () => {
        const res = await request(app)
            .put('/api/order/orders/d053ce18-e21f-4b4d-9b81-e10c03148c8e')
            .send({
                customer_id   : "b3bd81e4-50f3-473a-ae32-0d1604875eea",
                item_id       : "18268373-e24d-45bc-a559-02b167e89113",
                qty           : 11,
                amount        : 11 * 8000,
                status        : "pending",
                payment_method: "Pay Pal"
            })
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
    })

    it('PUT /api/order/orders/:id with without token, response should be 401', async () => {
        const res = await request(app)
            .put('/api/order/orders/d053ce18-e21f-4b4d-9b81-e10c03148c8e')
            .send({
                customer_id   : "b3bd81e4-50f3-473a-ae32-0d1604875eea",
                item_id       : "18268373-e24d-45bc-a559-02b167e89113",
                qty           : 11,
                amount        : 11 * 8000,
                status        : "pending",
                payment_method: "Pay Pal"
            })
            .set('Accept', 'application/json')
            .expect(401);
    })

    // it('DELETE /api/order/orders/:id with valid token, response should be 200', async () => {
    //     const res = await request(app)
    //         .delete('/api/order/orders/107cba25-0db8-4dfe-a7ca-3ccd32f4303f')
    //         .set('Accept', 'application/json')
    //         .set('authorization', validToken)
    //         .expect(200);

    //     expect(res.body).toHaveProperty('message');
    // })

    it('DELETE /api/order/orders/:id with invalid token, response should be 401', async () => {
        const res = await request(app)
            .delete('/api/order/orders/107cba25-0db8-4dfe-a7ca-3ccd32f4303f')
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)
            .expect(401);

        expect(res.body).toHaveProperty('message');
    })

    it('DELETE /api/order/orders/:id with without token, response should be 401', async () => {
        const res = await request(app)
            .delete('/api/order/orders/107cba25-0db8-4dfe-a7ca-3ccd32f4303f')
            .set('Accept', 'application/json')
            .expect(401);

        expect(res.body).toHaveProperty('message');
    })
})