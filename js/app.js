$(document).ready(function () {

    var socket = io.connect('http://127.0.0.1:5000');

    socket.on('connect', function () {
        // socket.send('User has connected!');
    });

    socket.on('message', function (message) {
        
        AppendReceivedMessage(message)
        // console.log('Received message')
    });

    var url;

    $("#message_submit").submit(function (event) {

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var msg_date_time = [$('#input_message').val(), date, time, url]

        event.preventDefault();
        AppendOwnMessage(msg_date_time)
        socket.send(msg_date_time)
        $('#input_message').val('');
    }
    )

    function AppendReceivedMessage(message) {
        $("#chat").append(

            '<div class="media w-50 mb-3"><img src="' + message[3] + '" alt="user" width="50" class="rounded-circle">' +
            '<div class="media-body ml-3">' +
            '<div class="bg-light rounded py-2 px-3 mb-2">' + '<p class="text-small mb-0 text-muted">' + message[0] + '</p>' +
            '</div>' +
            '<p class="small text-muted">'+ message[2] + ' | ' + message[1] + '</p>' +
            '</div>' +
            '</div>'

        );
    }

    function AppendOwnMessage(message) {
        $("#chat").append(

            '<div class="media w-50 ml-auto mb-3">' + 
            '<div class="media-body">' +
              '<div class="bg-primary rounded py-2 px-3 mb-2">' +
                '<p class="text-small mb-0 text-white">' + message[0] + '</p>' +
              '</div>' + 
              '<p class="small text-muted">'+ message[2] + ' | ' + message[1] + '</p>' +
            '</div>' +
          '</div>'

        );
    }

    $("#image_submit").submit(function (event) {

        url = $('input').val()

        event.preventDefault();
        
        $("#image_submit").css("display",'none')
        $("#input_message").show()

        // $('input').val('');
        
    }
    )


});