const init = (db) => {
    const ObjectId = require('mongodb').ObjectID;
    const controller = {
        getCourseById(request, response) {
            const id = request.params.id;

            const selectedCoursePromise = db.collection('courses')
                .find({ "_id": ObjectId(id) })
                .toArray();

            // TODO: add logged in bool variable to determine whether to show enroll button or not
            selectedCoursePromise
                .then((value) => {
                    response.render('selected-course', {
                        course: value,
                        isLoggedIn: request.isAuthenticated(),
                        user: request.user
                    });
                });
        },
        getCourses(request, response) {
            let filter = { "title": { $regex: new RegExp(request.query.title, "i") } };
            const coursesPromise = db.collection('courses')
                .find(filter)
                .toArray();
            coursesPromise.then((value) => {
                return response.render('courses', {
                    courses: value,
                    isLoggedIn: request.isAuthenticated(),
                    user: request.user
                });
            });
        },
        likeCourse(request, response) {
            let id = request.user[0]._id;
            id = String(id);
            const title = request.body.title;
            const lecturer = request.body.lecturer;

            db.collection('courses')
                .update({
                    lecturer: lecturer,
                    title: title
                }, {
                    $push: {
                        likeByUserId: id
                    }
                });
        },

        unlikeCourse(request, response) {
            let id = request.user[0]._id;
            id = String(id);
            const title = request.body.title;
            const lecturer = request.body.lecturer;

            db.collection('courses')
                .update({
                    lecturer: lecturer,
                    title: title
                }, {
                    $pull: {
                        likeByUserId: id
                    }
                });
        },
    };
    return controller;
};



module.exports = { init };