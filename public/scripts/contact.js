/* globals $ */

$('body').on('click', '#submit', (ev) => {
    const name = $('#name').val();
    const email = $('#email').val();
    const mobile = $('#mobile').val();
    const subject = $('#subject').val();
    const message = $('#message').val();

    const obj = {
        name: name,
        email: email,
        mobile: mobile,
        subject: subject,
        message: message,
    };

    const data = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => $.ajax({
        url: '/contact',
        method: 'POST',
        data: data,
        headers: {},
        contentType: 'application/json',
        success: resolve,
        error: reject,
    }));

    const url = window.location.href.split('//').pop().split('/').shift();
    window.location.href = url;
});