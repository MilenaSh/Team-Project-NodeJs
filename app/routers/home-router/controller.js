const init = (db, passport) => {
    const ObjectId = require('mongodb').ObjectID;
    const controller = {
        getHome(request, response) {
            const coursesPromise = db.collection('courses')
                .find()
                .toArray();
            coursesPromise.then((value) => {
                const mostPopularCourses = value
                    .sort((x, y) => {
                        return y.likeByUserId.length - x.likeByUserId.length;
                    })
                    .slice(0, 6);
                const latestCourses = value.slice(-6).reverse();
                const user = request.user;
                return response.render('home', {
                    latestCourses: latestCourses,
                    isLoggedIn: request.isAuthenticated(),
                    user: user,
                    mostPopularCourses: mostPopularCourses
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
                const enrolledCourseIDs = user[0].enrolledCourseIDs;
                db.collection('courses')
                    .find({
                        _id: {
                            $in: enrolledCourseIDs.map((id) => {
                                return ObjectId(id);
                            })
                        }
                    })
                    .toArray()
                    .then((courses) => {
                        return response.render('profile', {
                            user: user,
                            isLoggedIn: request.isAuthenticated(),
                            enrolledCourses: courses
                        });
                    });
            }
        }
    };
    return controller;
};



module.exports = { init };