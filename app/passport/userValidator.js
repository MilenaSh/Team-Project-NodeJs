const userValidator = () => {
    const usernameMinLength = 4;
    const usernameContent = new RegExp('^[a-zA-Z0-9]');
    const passwordMinLength = 8;
    const errorMessage = '';

    function validateUsername(username) {
        if (!username) {
            errorMessage = 'Username cannot be empty!';
            throw new Error('Username cannot be empty!');
        }
    }

    function validateUser(user) {
        validateUsername(user.username);
    }
    return {
        validateUser: validateUser,
    };
};

module.exports = { userValidator };