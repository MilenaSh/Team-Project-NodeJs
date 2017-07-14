const init = (db) => {

    const getCourses = (filter = {}) => {
        // let filter = { "title": { $regex: new RegExp(request.query.title, "i") } };
        const coursesPromise = db.collection('courses')
            .find(filter)
            .toArray();
        coursesPromise.then((value) => {
            return Promise.resolve(value);
        });
    };

    return Promise.resolve(db);
};

module.exports = { init };