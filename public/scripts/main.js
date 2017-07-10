$('#search-button').on('click', () => {
    let text = $('#search-bar').val();

    text = text.split(' ').join('&');
    const newURL =  window.location.href.split('/').slice(0, 3).join('/') + '/courses?title=' + text;
    
    window.location.href = newURL;
});