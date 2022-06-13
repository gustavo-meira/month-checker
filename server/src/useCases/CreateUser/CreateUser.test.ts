import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../../app';
import { UserRepository } from '../../repositories/prisma/UserRepository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Create User', () => {
  const user = {
    username: 'test',
    email: 'test@test.com',
    password: 'testtest',
  };

  beforeEach(() => {
    sinon
      .stub(UserRepository.prototype, 'create')
      .resolves(true as any);
  });

  afterEach(() => {
    (UserRepository.prototype.create as sinon.SinonStub).restore();
    user.username = 'test';
    user.email = 'test@test.com';
    user.password = 'testtest';
  });

  it('should create a user', async () => {
    const response = await chai
      .request(app)
      .post('/user')
      .send(user);
    

    expect(response.status).to.equal(201);
  });

  it('should return a bad request error when the username is not provided', async () => {
    user.username = '';

    const response = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"username" is required');
  });

  it('should return a bad request error when the email is not provided', async () => {
    user.email = '';

    const response = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"email" is required');
  });

  it('should return a bad request error when the password is not provided', async () => {
    user.password = '';

    const response = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"password" is required');
  });

  it('should return a bad request error when the username is not valid', async () => {
    user.username = 'te';

    const response = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"username" must be at least 3 characters long');

    user.username = 'testtesttesttesttesttest';

    const response2 = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response2.status).to.equal(400);
    expect(response2.body.message).to.equal('"username" must be at most 20 characters long');
  });

  it('should return a bad request error when the email is not valid', async () => {
    user.email = 'test';

    const response = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"email" must have a domain');

    user.email = '@test.com';

    const response2 = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response2.status).to.equal(400);
    expect(response2.body.message).to.equal('"email" must have a prefix');

    user.email = 'test@test';

    const response3 = await chai
      .request(app)
      .post('/user')
      .send(user);

    expect(response3.status).to.equal(400);
    expect(response3.body.message).to.equal('"email" must be a valid email address');
  });
});
