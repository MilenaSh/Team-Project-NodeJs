/* globals $ */

// $('input[name = password]').on('input', function(ev) {
//     const $target = $(ev.target);
//     const password = $target.val();
//     const $button = $('#register-button');

//     const passwordConfirmation = $('input[name = passwordConfirmation]').val();

//     if (password !== passwordConfirmation) {
//         $button.attr('disabled', 'disabled');
//         $button.css('background-color', 'gray');
//         $button.css('background-color', '');
//     } else {
//         $button.removeAttr('disabled');
//     }
// });


$('input[name = passwordConfirmation]').on('input', function(ev) {
    const $target = $(ev.target);
    const passwordConfirmation = $target.val();
    const $button = $('#register-button');

    const password = $('input[name = password]').val();

    if (password !== passwordConfirmation) {
        $button.attr('disabled', 'disabled');
        $button.css('background-color', '#C4C4C4');
        $button.css('color', '#898989');
    } else {
        $button.removeAttr('disabled');
        $button.removeClass('button-disabled');
        $button.css('background-color', '');
        $button.css('color', '');
    }
});