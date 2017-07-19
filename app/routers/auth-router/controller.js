const init = (db, data) => {
    const controller = {
        logout(request, response) {
            request.logout();
            response.redirect('/');
        },

        register(request, response) {


        },
    };
    return controller;
};

module.exports = { init };
