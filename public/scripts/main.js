$('#search-button').on('click', () => {
    const url = window.location.href;
    let text = $('#search-bar').val();

    text = text.split(' ').join('&');
    const newURL =  window.location.href.split('/').slice(0, 3).join('/') + '/' + text;
    
    window.location.href = newURL;
});