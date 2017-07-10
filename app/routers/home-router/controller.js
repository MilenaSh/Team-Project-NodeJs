const init = (db) => {
    const controller = {
        getHome(request, response) {
            return response.render('home');
        },

        getCourses(request, response) {
            const coursesPromise = db.collection('courses')
                .find()
                .toArray();
            coursesPromise.then((value) => {
                return response.render('courses', {
                    courses: value
                });
            });
        },

        getLoginPage(request, response) {
            return response.render('auth/login');
        },

        // TODO render information for the courses
        postLoginPage(request, response) {
            return response.render('courses');
        },

        getRegisterPage(request, response) {
            return response.render('auth/register');
        },

        // TODO render information for successful registration
        postRegisterPage(request, response) {
            return response.render('home');
        }
    };
    return controller;
};



module.exports = { init };