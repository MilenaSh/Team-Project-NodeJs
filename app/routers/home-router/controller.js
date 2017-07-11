const init = (db, passport) => {
    const controller = {
        getHome(request, response) {
            const coursesPromise = db.collection('courses')
                .find()
                .toArray();
            coursesPromise.then((value) => {
                const latestCourses = value.slice(-6).reverse();
                return response.render('home', {
                    latestCourses: latestCourses
                });
            });
        },

        getLoginPage(request, response) {
            return response.render('auth/login');
        },

        // TODO render information for the courses
        postLoginPage(request, response) {
            // passport.authenticate('local', {
            //     failureRedirect: '/login',
            //     successRedirect: '/'
            // });
            return response.status(200).redirect('/');
        },

        getRegisterPage(request, response) {
            return response.render('auth/register');
        },

        // TODO render information for successful registration
        postRegisterPage(request, response) {
            return response.render('home');
        },

        getProfilePage(request, response) {
            if (!request.isAuthenticated()) {
                return response.status(401).render('unauthorized');
            }
            else {
                const user = request.user;
                console.log(user)
                return response.render('profile', {
                    user: user[0]
                });
            }
        }
    };
    return controller;
};



module.exports = { init };