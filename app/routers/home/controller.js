const init = (db) => {
    const controller = {
        getHome(request, response) {
            return response.render('home');
        },
        getAbout(request, response) {
            const coursesPromise = db.collection('courses')
                .find()
                .toArray();
            coursesPromise.then((value) => {
                return response.render('about', {
                    courses: value
                });
            });
        }
    }
    return controller;
};



module.exports = { init };