const init = (db) => {
    const data = {
        db: db,
    };

    const getCourses = () => {
        const coursesPromise = db.collection('courses')
            .find()
            .toArray()
            .then((collection) => {
            return Promise.resolve(collection);
        });
    };

    return Promise.resolve(data);
};

module.exports = { init };
