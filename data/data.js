const init = (db) => {
    const getCourses = () => {
        // let filter = { "title":
        // { $regex: new RegExp(request.query.title, "i") } };
        const coursesPromise = db.collection('courses')
            .find()
            .toArray();
        coursesPromise.then((collection) => {
            return Promise.resolve(collection);
        });
    };

    return Promise.resolve(db);
};

module.exports = { init };