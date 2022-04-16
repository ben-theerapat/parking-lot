import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('API Endpoints testing (e2e)', () => {
  let app: INestApplication;
  let parkResponse: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /parkinglot/create to create a parking lot', () => {
    it('successed', async () => {
      const res = await request(app.getHttpServer())
        .post('/parkinglot/create')
        .send({
          name: 'parkinglot_03',
          rank: 3,
          slots: {
            smalls: 1,
            mediums: 2,
            larges: 3,
          },
        });
      expect(res.status).toBe(201);
    });
  });

  describe('GET /parkinglot/status to get available slots of all parking slots', () => {
    it('successed', async () => {
      const res = await request(app.getHttpServer()).get('/parkinglot/status');

      expect(res.status).toBe(200);
    });
  });

  describe('POST /car/park to park a car in a parking lot', () => {
    it('if invalid carSize should return 400', async () => {
      const res = await request(app.getHttpServer()).post('/car/park').send({
        plateNumber: 'abc-1234',
        carSize: 'big',
      });
      expect(res.status).toBe(400);
    });

    it('successed', async () => {
      const res = await request(app.getHttpServer()).post('/car/park').send({
        plateNumber: 'abc-1234',
        carSize: 'small',
      });
      parkResponse = res;
      expect(res.status).toBe(201);
    });
  });

  describe('POST /car/exit to leave the parking slot', () => {
    it('if ticketId is none existing should return 404', async () => {
      const res = await request(app.getHttpServer()).post('/car/exit').send({
        ticketId: '625966c25be726e914e0af82',
      });
      expect(res.status).toBe(404);
    });

    it('successed', async () => {
      const res = await request(app.getHttpServer()).post('/car/exit').send({
        ticketId: parkResponse.body._id,
      });

      expect(res.status).toBe(201);
      expect(res.body.exitAt).toBeDefined();
    });
  });

  describe('GET /ticket to get registration plate number', () => {
    it('successed', async () => {
      const res = await request(app.getHttpServer()).get('/ticket');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /ticket?carSize=[carSize] to get registration plate number with list by car size', () => {
    it('successed', async () => {
      const res = await request(app.getHttpServer()).get(
        '/ticket?carSize=small',
      );
      expect(res.status).toBe(200);
    });
  });
});
