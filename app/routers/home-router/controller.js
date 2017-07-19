const init = (db, data) => {
    const controller = {
        getHome(request, response) {
            data.getCourses()
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
            });
        },

        getRegisterPage(request, response) {
            return response.render('auth/register', {
                isLoggedIn: request.isAuthenticated(),
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
    };
    return controller;
};


module.exports = { init };
