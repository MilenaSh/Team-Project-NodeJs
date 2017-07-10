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