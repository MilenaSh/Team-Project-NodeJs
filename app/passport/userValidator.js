    const usernameMinLength = 4;
    const usernameContent = new RegExp('^[a-zA-Z0-9]');
    const passwordMinLength = 8;
    const errorMessage = '';

    const userValidator = {

        getErrorMessage() {
            return errorMessage;
        },

        validateUsername(username) {
            if (username.length === 0) {
                errorMessage = 'Username cannot be empty!';
                throw new Error('Username cannot be empty!');
            }
        },

        validateUser(user, cb) {
            this.validateUsername(user.username);
            cb('error', errorMessage);
        },
    };

    module.exports = { userValidator };