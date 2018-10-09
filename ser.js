const Koa = require('koa2');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');

const app = new Koa();
const ntpClient = require('ntp-client');

const staticPath = './static';

app.use(static(
    path.join(__dirname, staticPath)
))
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)


io.on('connection', function (socket) {
    console.log('a user connected')
    // 北邮内网
    let tw1 = setInterval(function () {
        ntpClient.getNetworkTime("10.3.9.4", 123,30, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('bupt', 0);
                return;
            }
            socket.emit('bupt', date);
        });
    }, 37);

    //国家授时中心
    let tw2 = setInterval(function () {
        ntpClient.getNetworkTime("ntp.ntsc.ac.cn", 123,300, function (err, date) {
            console.log(date)
            if (err) {
                console.error(err);
                socket.emit('ntsc', 0);
                return;
            }
            socket.emit('ntsc', date);
        });
    }, 629);

    //阿里
    let tw3 = setInterval(function () {
        ntpClient.getNetworkTime("203.107.6.88", 123,300, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('ali', 0);
                return;
            }
            socket.emit('ali', date);
        });
    }, 629);

    //清华大学
    let tw4 = setInterval(function () {
        ntpClient.getNetworkTime("ntp.tuna.tsinghua.edu.cn", 123,300, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('ts', 0);
                return;
            }
            socket.emit('ts', date);
        });
    }, 629);

    //Apple
    let tw5 = setInterval(function () {
        ntpClient.getNetworkTime("17.254.0.27", 123,450, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('Apple', 0);
                return;
            }
            socket.emit('Apple', date);
        });
    }, 629);
    //微软
    let tw6 = setInterval(function () {
        ntpClient.getNetworkTime("time.windows.com", 123,600, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('mic', 0);
                return;
            }
            socket.emit('mic', date);
        });
    }, 629);
    //计量院
    let tw7 = setInterval(function () {
        ntpClient.getNetworkTime("111.203.6.13", 123,600, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('jly', 0);
                return;
            }
            socket.emit('jly', date);
        });
    }, 629);
    //东北大学
    let tw8 = setInterval(function () {
        ntpClient.getNetworkTime("202.118.1.130", 123,300, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('db', 0);
                return;
            }
            socket.emit('db', date);
        });
    }, 629);

    socket.on('disconnect', function () {
        clearInterval(tw1);
        clearInterval(tw2);
        clearInterval(tw3);
        clearInterval(tw4);
        clearInterval(tw5);
        clearInterval(tw6);
        clearInterval(tw7);
        clearInterval(tw8);
    });
})

server.listen(3000, () => {
    console.log('Application is starting on port 3000')
})
