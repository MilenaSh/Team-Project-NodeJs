const request = require('supertest');

const { init } = require('../../app');

// // const app = init({});
// const app = request('http://localhost:3002');
const url = 'http://localhost:3002';


describe('GET /', () => {
    it('Home page return status 200', (done) => {
        request(url)
            .get('/')
            .expect(200, done);
    });
    it('Courses page return status 200', (done) => {
        request(url)
            .get('/courses')
            .expect(200, done);
    });
    it('Profile page return status 200', (done) => {
        request(url)
            .get('/profile')
            .expect(401, done);
    });
});

