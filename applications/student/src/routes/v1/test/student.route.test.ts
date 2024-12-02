// tests/student.routes.test.ts
import request from 'supertest';
import express from 'express';
import { authorize } from '../../../middlewares/authorize'; // Assuming you have this middleware
import { studentValidate } from '../../../middlewares/student-validate';
import StatusCode from '../../../utils/http-status-code';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../../../app';

jest.mock('../../../middlewares/authorize');
jest.mock('../../../middlewares/student-validate');


let mongoServer: MongoMemoryServer;
    
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = "mongodb+srv://learnwithkru:gT5jqfgZyQ8UmCNn@learnwithkru.elxl0wh.mongodb.net/student";
  await mongoose.connect(uri, {});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
describe('MongoDB In-Memory Server', () => {
    it('should connect to the in-memory MongoDB server', async () => {
      expect(mongoose.connection.readyState).toBe(1); // 1 indicates connected
    });
  });
   

  

describe('Student Routes', () => {
   
    // (authorize as jest.Mock).mockImplementation(() => (_req: express.Request, _res: express.Response, next: express.NextFunction) => {

    //     next();
    //   });
    // (studentValidate as jest.Mock).mockImplementation(() => (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
    //   next();
    // });



  it('should create a new student', async () => {
    const mockUserId = 'mockUserId';
    const mockRequestBody = {
      userId: mockUserId,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      school_name: 'Mock School',
      education: 'High School',
      grade: 10,
      student_card: 'mockStudentCard.png',
    };

    (authorize as jest.Mock).mockImplementation(() => (_req: express.Request, _res: express.Response, next: express.NextFunction) => {

      next();
    });

    (studentValidate as jest.Mock).mockImplementation(() => (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
      next();
    });

    const response = await request(app)
      .post("/v1/students/become-student")
      .send(mockRequestBody);

    expect(response.status).toBe(StatusCode.CREATED);
    expect(response.body.message).toBe('Create success');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data.firstname).toBe(mockRequestBody.firstname);
    expect(response.body.data.lastname).toBe(mockRequestBody.lastname);
    expect(response.body.data.email).toBe(mockRequestBody.email);
    expect(response.body.data.school_name).toBe(mockRequestBody.school_name);
    expect(response.body.data.education).toBe(mockRequestBody.education);
    expect(response.body.data.grade).toBe(mockRequestBody.grade);
    expect(response.body.data.student_card).toBe(mockRequestBody.student_card);
  });
});
