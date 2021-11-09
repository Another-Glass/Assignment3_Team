const projectContoller = require("../controllers/projectController");

function attachEvent(io) {
  io.on('connection', (socket) => {
    io.emit('news', { serverData: "서버 연결 성공" });
    logger.log("socket connected" + socket.id);

    socket.on('OnCodeChanged', (data) => {
      projectContoller.saveToBuffer(data);
    })
    socket.on('Quit', (data) => {
      projectContoller.bufferToDB(data);
    })

    socket.on('disconnect', (data) => {
      logger.log("socket disconnected" + socket.id);
      projectContoller.bufferToDB(data);
    })
  });
}

module.exports.attachEvent = attachEvent;