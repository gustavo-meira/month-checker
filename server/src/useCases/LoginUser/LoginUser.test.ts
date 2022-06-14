import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';

import { app } from '../../app';
import { UserRepository } from '../../repositories/prisma/UserRepository';
import { UserEntity } from '../../entities/UserEntity';

const { expect } = chai;

chai.use(chaiHttp);

describe('Login User use case', () => {
  const user = new UserEntity({
    email: 'test@test.com',
    password: {
      encrypted: false,
      value: 'testtest',
    },
    username: 'test',
  });

  beforeEach(() => {
    sinon
      .stub(UserRepository.prototype, 'validatePassword')
      .resolves(true);

    sinon
      .stub(UserRepository.prototype, 'getByEmail')
      .resolves(user);
  });

  afterEach(() => {
    (UserRepository.prototype.validatePassword as sinon.SinonStub).restore();
    (UserRepository.prototype.getByEmail as sinon.SinonStub).restore();
  });

  it('when the email and password is ok should return a token', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'testtest' });
    
    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a('string');
  });

  it('when the email is not ok should return a error', async () => {
    (UserRepository.prototype.getByEmail as sinon.SinonStub).throwsException('User not found');

    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'testtest' });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"email" or "password" is invalid');
  });

  it('when the password is not ok should return a error', async () => {
    (UserRepository.prototype.validatePassword as sinon.SinonStub).resolves(false);

    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'testtest' });
    
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"email" or "password" is invalid');
  });
});
