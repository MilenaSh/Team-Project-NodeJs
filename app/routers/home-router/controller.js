/* globals __dirname */
const fs = require('fs');

const init = (db, data) => {
    // multer 
    const multer = require('multer');
    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, __dirname + '/../../../public/images/uploads/');
        },
        filename: (request, file, cb) => {
            cb(null, file.originalname);
        },
    });
    const upload = multer({ storage: storage }).single('avatar');

    const controller = {
        getHome(request, response) {
            return data.getCourses()
                .then((courses) => {
                    const mostPopularCourses = courses
                        .sort((x, y) => {
                            return y.usersLiked.length - x.usersLiked.length;
                        })
                        .slice(0, 6);
                    const latestCourses = courses.slice(-6).reverse();
                    const user = request.user;
                    return response.render('home', {
                        latestCourses: latestCourses,
                        isLoggedIn: request.isAuthenticated(),
                        user: user,
                        mostPopularCourses: mostPopularCourses,
                    });
                });
        },

        getLoginPage(request, response) {
            return response.render('auth/login', {
                isLoggedIn: request.isAuthenticated(),
                messages: request.flash('error'),
            });
        },

        getRegisterPage(request, response) {
            return response.render('auth/register', {
                isLoggedIn: request.isAuthenticated(),
                messages: request.flash('error'),
            });
        },

        getProfilePage(request, response) {
            if (!request.isAuthenticated()) {
                return response.status(401).render('unauthorized');
            }
            const user = request.user;
            const enrolledCourses = user[0].enrolledCourses;

            return response.render('profile', {
                user: user,
                isLoggedIn: request.isAuthenticated(),
                enrolledCourses: enrolledCourses,
            });
        },

        getContactPage(request, response) {
            return response.render('contact-form');
        },

        sendContactForm(request, response) {
            const newContact = {
                name: request.body.name,
                email: request.body.email,
                mobile: request.body.mobile,
                subject: request.body.subject,
                message: request.body.message,
            };
            db.collection('contact').insert(newContact);
            return response.redirect('/');
        },

        serveChat(request, response) {
            const user = request.user;

            return response.render('chat', {
                user: user,
                isLoggedIn: request.isAuthenticated(),
            });
        },

        getAboutPage(request, response) {
            return response.render('about-us');
        },

        updateProfile(request, response) {
            const username = request.body.username;

            const details = {
                fullname: request.body.fullname,
                city: request.body.city,
                street: request.body.street,
                website: request.body.website,
            };

            data.updateUser(username, details);
        },

        postAvatar(request, response) {
            const username = request.user[0].username;

            const regex = new RegExp('^' + username + '\..*$');
            fs
                .readdirSync(__dirname + '/../../../public/images/uploads/')
                .filter((file) => regex.test(file))
                .forEach((f) => {
                    fs.unlinkSync(__dirname +
                        '/../../../public/images/uploads/' +
                        f);
                });
            upload(request, response, (err) => {
                if (err) {
                    console.log(err);
                }
                response.status(201);
            });
        },

        changeAvatar(request, response) {
            const username = request.body.username;
            const regex = new RegExp('^' + username + '\..*$');

            const imageName = fs
                .readdirSync(__dirname + '/../../../public/images/uploads/')
                .filter((file) => regex.test(file))[0];

            const url = '/static/images/uploads/' + imageName;

            data.changeUserAvatar(username, url);
            response.status(201);
        },

        get404(request, response) {
            return response.render('404');
        },
    };
    return controller;
};


module.exports = { init };