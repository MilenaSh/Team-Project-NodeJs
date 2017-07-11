const init = (db, passport) => {
    const controller = {
        getHome(request, response) {
            const coursesPromise = db.collection('courses')
                .find()
                .toArray();
            coursesPromise.then((value) => {
                const latestCourses = value.slice(-6).reverse();
                return response.render('home', {
                    latestCourses: latestCourses,
                    isLoggedIn: request.isAuthenticated(),
                });
            });
        },

        getLoginPage(request, response) {
            return response.render('auth/login', {
                isLoggedIn: request.isAuthenticated()
            });
        },

        getRegisterPage(request, response) {
            return response.render('auth/register', {
                isLoggedIn: request.isAuthenticated()
            });
        },

        getProfilePage(request, response) {
            if (!request.isAuthenticated()) {
                return response.status(401).render('unauthorized');
            }
            else {
                const user = request.user;
                return response.render('profile', {
                    user: user[0],
                    isLoggedIn: request.isAuthenticated()
                });
            }
        }
    };
    return controller;
};



module.exports = { init };