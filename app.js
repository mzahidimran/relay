
var http = require('http').createServer();
var io = require('socket.io')(http);

var home_servers = {};
io.on('connection', (socket) => {
    console.log('client connected')
    console.log(home_servers)
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('send', (data) => {
      var rec_socket = io.sockets.connected[home_servers[data.to]]
      if (typeof rec_socket === 'undefined') {
        socket.emit('client_not_connected');
      }
      else {
        rec_socket.emit('message', data.data);
      }
      console.log('send' + JSON.stringify(data))
    });
    socket.on('user', (data) => {
      home_servers[data.id] = socket.id
      console.log('user' + JSON.stringify(data))
    });


  });



http.listen(4444, () => {
  console.log('listening on *:4444');
});
