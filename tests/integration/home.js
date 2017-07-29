const request = require('supertest');

const { init } = require('../../app');

// // const app = init({});
// const app = request('http://localhost:3002');
const url = 'http://localhost:3002';


describe('Integration Tests', () => {
    describe('Get pages', () => {
        it('Home page to return status 200', (done) => {
            request(url)
                .get('/')
                .expect(200, done);
        });
        it('Login page to return status 200', (done) => {
            request(url)
                .get('/login')
                .expect(200, done);
        });
        it('Registe page to return status 200', (done) => {
            request(url)
                .get('/register')
                .expect(200, done);
        });
        it('Courses page to return status 200', (done) => {
            request(url)
                .get('/courses')
                .expect(200, done);
        });
        it('Profile page to return status 401 when not logged in', (done) => {
            request(url)
                .get('/profile')
                .expect(401, done);
        });
        it('Profile page to return status 200 when logged in', (done) => {
            request(url)
                .post('profile')
                .send({ username: 'mitko', password: 'mitko' })
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Contact page to return status 200', (done) => {
            request(url)
                .get('/contact')
                .expect(200, done);
        });
        it('About page to return status 200', (done) => {
            request(url)
                .get('/about')
                .expect(200, done);
        });
    });
    describe('Login', () => {
        it('Login with wrong details', (done) => {
            request(url)
                .post('/auth/login')
                .send({ username: 'mitko', password: 'pesho' })
                .expect(302)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
    });
    describe('Authorization', () => {
        it('Seriallize user', (done) => {
            request(url)
                .post('/auth/login')
                .send({ username: 'mitko', password: 'mitko' })
                .expect('set-cookie', 'cookie=connect.sid; Path=/')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
    });
});

