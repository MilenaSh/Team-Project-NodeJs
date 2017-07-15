$('#search-button').on('click', () => {
    let text = $('#search-bar').val();

    text = text.split(' ').join('&');
    const newURL = window.location.href.split('/').slice(0, 3).join('/') + '/courses?title=' + text;

    window.location.href = newURL;
});

$('#search-bar').on('keypress', (ev) => {
    if (ev.keyCode == 13) {
        let text = $('#search-bar').val();

        text = text.split(' ').join('&');
        const newURL = window.location.href.split('/').slice(0, 3).join('/') + '/courses?title=' + text;

        window.location.href = newURL;
    }
});

$('body').on('click', '.like-button', (ev) => {
    const $target = $(ev.target);
    const $container = $(ev.target).parent().parent();

    const lecturer = $container.find('.lecturer-label').text();
    const title = $container.find('.title-label').text();

    const obj = {
        lecturer: lecturer,
        title: title
    };

    const data = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => $.ajax({
        url: '/courses/likeCourse',
        method: 'POST',
        data: data,
        headers: {},
        contentType: 'application/json',
        success: resolve,
        error: reject
    }
    ));

    const newImg = $('<img>')
        .addClass('img-responsive img-rounded unlike-image')
        .attr('src', '/static/images/liked.png');

    const newA = $('<a>')
        .addClass('unlike-button')
        .append(newImg);
    console.log(newA);

    $container.children('a:last-of-type').remove();
    $container.append(newA);
});

$('body').on('click', '.unlike-button', (ev) => {
    const $target = $(ev.target);
    const $container = $(ev.target).parent().parent();

    const lecturer = $container.find('.lecturer-label').text();
    const title = $container.find('.title-label').text();

    const obj = {
        lecturer: lecturer,
        title: title
    };

    const data = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => $.ajax({
        url: '/courses/unlikeCourse',
        method: 'POST',
        data: data,
        headers: {},
        contentType: 'application/json',
        success: resolve,
        error: reject
    }
    ));

    const newImg = $('<img>')
        .addClass('img-responsive img-rounded like-image')
        .attr('src', '/static/images/unliked.png');

    const newA = $('<a>')
        .addClass('like-button')
        .append(newImg);
    console.log(newA);

    $container.children('a:last-of-type').remove();
    $container.append(newA);
});


$('body').on('click', '.enroll-button', (ev) => {
    const courseID = window.location.href.split('/').pop();

    const obj = {
        courseID: courseID
    };

    const data = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => $.ajax({
        url: '/courses/enroll',
        method: 'POST',
        data: data,
        headers: {},
        contentType: 'application/json',
        success: resolve,
        error: reject
    }
    ));
});

$('body').on('click', '.disenroll-button', (ev) => {
    const courseID = window.location.href.split('/').pop();

    const obj = {
        courseID: courseID
    };

    const data = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => $.ajax({
        url: '/courses/disenroll',
        method: 'POST',
        data: data,
        headers: {},
        contentType: 'application/json',
        success: resolve,
        error: reject
    }
    ));
});