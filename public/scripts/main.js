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

$('.like-button').on('click', (ev) => {
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

    $target.attr('src', '/static/images/unliked.png');
    $container.find('.like-button').attr('class', 'unlike-button');


    // $target.click(function () {
    //     $target.one('load', function () {
            
    //     }).attr('src', '/static/images/unliked.png');
    // });
});

$('.unlike-button').on('click', (ev) => {
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

    $target.attr('src', '/static/images/liked.png');
    $container.find('.unlike-button').attr('class', 'like-button');
});