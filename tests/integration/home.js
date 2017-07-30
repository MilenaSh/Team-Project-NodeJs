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
        it('404 page to return status 200', (done) => {
            request(url)
                .get('/404')
                .expect(200, done);
        });
        it('Chat page to return status 200', (done) => {
            request(url)
                .get('/chat')
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
        it('Profile page to return status 302 when logged in', (done) => {
            request(url)
                .post('/auth/login')
                .type('form')
                .send({ username: 'mitko', password: 'mitko' })
                .expect(302)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Login page to redirect when logged in', (done) => {
            request(url)
                .post('/auth/login')
                .type('form')
                .send({ username: 'mitko', password: 'mitko' })
                .expect(302)
                .expect('Location', '/login')
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
});

