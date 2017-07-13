const init = (db, passport) => {
    const controller = {
        logout(request, response) {
            request.logout();
            response.redirect('/');
        }
    };
    return controller;
};



module.exports = { init };