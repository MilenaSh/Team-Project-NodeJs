const init = (db) => {
    const ObjectId = require('mongodb').ObjectID;
    const controller = {
        getCourseById(request, response) {
            const id = request.params.id;

            const selectedCoursePromise = db.collection('courses')
                .find({'_id': ObjectId(id)})
                .toArray();

            // TODO: add logged in bool variable to determine whether to show enroll button or not
            selectedCoursePromise
                .then((value) => {
                    response.render('selected-course', {
                        course: value
                    });
                });
        },
    };
    return controller;
};



module.exports = { init };