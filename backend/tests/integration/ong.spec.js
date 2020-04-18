const request = require('supertest');
const app = require('../../src/app');
const connection =  require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });

    it('deve criar uma nova ONG', async() => {
        const response = await request(app)
        .post('/ongs')
        .send({
                name: "Vila Vicentina",
                email: "vila@vincentina.com",
                whatsapp: "83985478445",
                city: "João Pessoa",
                uf: "PB"
        });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

    });
});