/* globals $ */

$('body').on('click', '#edit-button', (ev) => {
    const $target = $(ev.target);

    const fullname = $('#fullname-field').text();
    const city = $('#city-field').text();
    const street = $('#street-field').text();
    const website = $('#website-field').text();

    const $textField = $('<input/>').attr('type', 'text');

    const $fieldContainer = $('#field-container');
    $fieldContainer.children().remove();
    $fieldContainer.append($textField
        .clone()
        .attr('id', 'fullname-textfield')
        .val(fullname));
    $fieldContainer.append($textField
        .clone()
        .attr('id', 'city-textfield')
        .val(city));
    $fieldContainer.append($textField
        .clone()
        .attr('id', 'street-textfield')
        .val(street));
    $fieldContainer.append($textField
        .clone()
        .attr('id', 'website-textfield')
        .val(website));

    $target
        .attr('id', 'save-button')
        .text('Save Changes');
});

$('body').on('click', '#save-button', (ev) => {
    const $target = $(ev.target);

    const fullname = $('#fullname-textfield').val();
    const city = $('#city-textfield').val();
    const street = $('#street-textfield').val();
    const website = $('#website-textfield').val();

    const username = $('#username-label')
        .text()
        .split('\'s ')[0];

    const obj = {
        username: username,
        fullname: fullname,
        city: city,
        street: street,
        website: website,
    };

    const data = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => $.ajax({
        url: '/profile',
        method: 'PUT',
        data: data,
        headers: {},
        contentType: 'application/json',
        success: resolve,
        error: reject,
    }));

    const $h4 = $('<h4>');

    const $fieldContainer = $('#field-container');
    $fieldContainer.children().remove();
    $fieldContainer.append($h4
        .clone()
        .attr('id', 'fullname-field')
        .text(fullname));
    $fieldContainer.append($h4
        .clone()
        .attr('id', 'city-field')
        .text(city));
    $fieldContainer.append($h4
        .clone()
        .attr('id', 'street-field')
        .text(street));
    $fieldContainer.append($h4
        .clone()
        .attr('id', 'website-field')
        .text(website));

    $target
        .attr('id', 'edit-button')
        .text('Edit Profile');
});

$('body').on('click', '#edit-avatar-button', (ev) => {
    const username = $('#username-label')
        .text()
        .split('\'s ')[0];

    const obj = {
        username: username,
    };

    const data = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => $.ajax({
        url: '/profile/avatar',
        method: 'PUT',
        data: data,
        headers: {},
        contentType: 'application/json',
        success: resolve,
        error: reject,
    }
    ));
});
