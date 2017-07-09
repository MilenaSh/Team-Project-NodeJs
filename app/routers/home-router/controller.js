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
        getRegisterPage(request, response) {
            return response.render('auth/register');
        }
    };
    return controller;
};



module.exports = { init };