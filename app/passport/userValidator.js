const userValidator = (() => {
    const usernameMinLength = 4;
    const usernameContent = new RegExp('^[a-zA-Z0-9]');
    //  const passwordMinLength = 8;
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
        }
        return errorMessage;
    }

    function validateUser(user) {
        validateUsername(user.username);
    }

    return {
        validateUser: validateUser,
        getErrorMessage: getErrorMessage,
    };
})();

module.exports = { userValidator };