const init = (db, passport) => {
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