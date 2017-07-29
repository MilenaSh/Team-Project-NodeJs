/* globals $ io */

$(function() {
    const socket = io.connect('http://localhost:3000');
    const $messageForm = $('#messageForm');
    const $message = $('#message');
    const $chat = $('#chat');

    $messageForm.submit(function(e) {
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    socket.on('new message', function(someData) {
        $chat.append('<div class="well">' + someData.msg + '</div>');
    });
});