$('body').on('click', '#next-page-btn', (ev) => {
    let url = window.location.href;
    let page = parseInt(window.location.href.split('=').pop(), 10);
    page++;

    const urlArray = url.split('=');
    urlArray.pop();
    urlArray.push(page);
    url = urlArray.join('=');

    window.location.href = url;
});

$('body').on('click', '#previous-page-btn', (ev) => {
    let url = window.location.href;
    let page = parseInt(window.location.href.split('=').pop(), 10);
    page--;

    const urlArray = url.split('=');
    urlArray.pop();
    urlArray.push(page);
    url = urlArray.join('=');

    window.location.href = url;
});
