const userValidator = (() => {
    const usernameMinLength = 4;
    const usernameContent = new RegExp('^[a-zA-Z0-9]{4,}$');
    const passwordContent = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).*$');
    const passwordMinLength = 8;
    let errorMessage = '';

    function getErrorMessage() {
        return errorMessage;
    }

    function validateUsername(username) {
        if (username.length === 0) {
            errorMessage = 'Username cannot be empty!';
            throw new Error(errorMessage);
        } else if (username.length < usernameMinLength) {
            errorMessage = 'Username must be at least 4 symbols!';
            throw new Error(errorMessage);
        } else if (!usernameContent.test(username)) {
            errorMessage = 'Username must contain only latin letters and digits!';
            throw new Error(errorMessage);
        }
        return errorMessage;
    }

    function validatePassword(password, passwordConfirmation) {
        if (password.length < passwordMinLength) {
            errorMessage = 'Password must be at least 8 symbols!';
            throw new Error(errorMessage);
        } else if (!passwordContent.test(password)) {
            errorMessage = 'Password should contain at least one lower case and' +
                ' one upper case letter and one special sign!';
            throw new Error(errorMessage);
        }
        return errorMessage;
    }

    function validateUser(user) {
        validateUsername(user.username);
        validatePassword(user.password, user.passwordConfirmation);
    }

    return {
        validateUser: validateUser,
        getErrorMessage: getErrorMessage,
    };
})();

module.exports = { userValidator };