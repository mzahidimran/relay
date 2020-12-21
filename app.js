
var http = require('http').createServer();
var io = require('socket.io')(http);

var home_servers = {};
io.on('connection', (socket) => {
    
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('send', (data) => {
      var rec_socket = home_servers[data.to]
      if (typeof rec_socket === 'undefined') {
        socket.emit('client_not_connected');
      }
      else {
        rec_socket.emit('message', data.data);
      }
    });
    socket.on('user', (data) => {
      home_servers[data.id] = socket
    });


  });



http.listen(4444, () => {
  console.log('listening on *:4444');
});
