import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../../app';
import { UserRepository } from '../../repositories/prisma/UserRepository';

chai.use(chaiHttp);

const { expect } = chai;


describe('User/Email exist use case', () => {
  beforeEach(() => {
    sinon
      .stub(UserRepository.prototype, 'getByEmail')
      .throwsException();

    sinon
      .stub(UserRepository.prototype, 'getByUsername')
      .throwsException();
  });

  afterEach(() => {
    (UserRepository.prototype.getByEmail as sinon.SinonStub).restore();
    (UserRepository.prototype.getByUsername as sinon.SinonStub).restore();
  });

  it('should return ok status when the username does not exist', async () => {
    const response = await chai
      .request(app)
      .post('/user/check?username=test')
      .send();

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({});
  });

  it('should return ok status when the email does not exist', async () => {
    const response = await chai
      .request(app)
      .post('/user/check?email=test@test.com')
      .send();

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({});
  });

  it('should return ok status when the username and email does not exist', async () => {
    const response = await chai
      .request(app)
      .post('/user/check?username=test&email=test@test.com')
      .send();

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({});
  });

  it('should return a bad request error when the username and email is not provided', async () => {
    const response = await chai
      .request(app)
      .post('/user/check')
      .send();

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"username" or "email" is required');
  });

  it('should return a conflict error when the username exists', async () => {
    (UserRepository.prototype.getByUsername as sinon.SinonStub).resolves();

    const response = await chai
      .request(app)
      .post('/user/check?username=test')
      .send();

    expect(response.status).to.equal(409);
    expect(response.body).to.deep.equal({});
  });

  it('should return a conflict error when the email exists', async () => {
    (UserRepository.prototype.getByEmail as sinon.SinonStub).resolves();

    const response = await chai
      .request(app)
      .post('/user/check?email=test@test.com')
      .send();

    expect(response.status).to.equal(409);
    expect(response.body).to.deep.equal({});
  });

  it('should return a conflict error when the username and email exists', async () => {
    (UserRepository.prototype.getByUsername as sinon.SinonStub).resolves();
    (UserRepository.prototype.getByEmail as sinon.SinonStub).resolves();

    const response = await chai
      .request(app)
      .post('/user/check?username=test&email=test@test.com')
      .send();

    expect(response.status).to.equal(409);
    expect(response.body).to.deep.equal({});
  });
});
