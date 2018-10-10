/*jshint esversion: 6 */
const Koa = require('koa2');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');

const app = new Koa();
const ntpClient = require('ntp-client');


const staticPath = './static';

app.use(static(
    path.join(__dirname, staticPath)
));
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
let a = 1,
    b = 1,
    c = 1,
    d = 1,
    e = 1,
    f = 1,
    g = 1,
    h = 1,
    i = 1,
    j = 1;


io.on('connection', function (socket) {
    console.log('a user connected');
    // google
    // let tw1 = setInterval(function () {
    //     ntpClient.getNetworkTime("time1.google.com", 123,800, function (err, date) {
    //         console.log(date)
    //         if (err) {
    //             console.error(err);
    //             socket.emit('google', 0);
    //             return;
    //         }
    //         socket.emit('google', date);
    //     });
    // },1000);

    //Microsoft
    // let tw2 = setInterval(function () {
    //     ntpClient.getNetworkTime("13.89.190.88", 123,500, function (err, date) {
    //         if (err) {
    //             console.error(err);
    //             socket.emit('mic', 0);
    //             return;
    //         }
    //         socket.emit('mic', date);
    //     });
    // }, 2000);

    //中国计量院
    // let tw3 = setInterval(function () {
    //     ntpClient.getNetworkTime("111.203.6.13", 123,400, function (err, date) {
    //         if (err) {
    //             console.error(err);
    //             socket.emit('jly', 0);
    //             return;
    //         }
    //         socket.emit('jly', date);
    //     });
    // }, 629);

    //NIST
    // let tw4 = setInterval(function () {
    //     ntpClient.getNetworkTime("time.nist.gov", 123,4000, function (err, date) {
    //         if (err) {
    //             console.error(err);
    //             socket.emit('nist', 0);
    //             return;
    //         }
    //         socket.emit('nist', date);
    //     });
    // }, 10000);
    // 
    //北邮
    // let tw5 = setInterval(function () {
    //     ntpClient.getNetworkTime("s2c.time.edu.cn", 123,500, function (err, date) {
    //         if (err) {
    //             console.error(err);
    //             socket.emit('bupt', 0);
    //             return;
    //         }
    //         socket.emit('bupt', date);
    //     });
    // }, 629);
    //清华大学
    let tw6 = setInterval(function () {
        ntpClient.getNetworkTime("cn.pool.ntp.org", 123,500, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('ts', 0);
                return;
            }
            socket.emit('ts', date);
        });
    }, 629);
    //东北大学
    let tw7 = setInterval(function () {
        ntpClient.getNetworkTime("time.nist.gov", 123,800, function (err, date) {
            if (err) {
                console.error(err);
                socket.emit('db', 0);
                return;
            }
            socket.emit('db', date);
        });
    }, 1000);

    socket.on('disconnect', function () {
        // clearInterval(tw1);
        // clearInterval(tw2);
        // clearInterval(tw3);
        // clearInterval(tw4);
        // clearInterval(tw5);
        // clearInterval(tw6);
        clearInterval(tw7);
    });
});




server.listen(3000, () => {
    console.log('Application is starting on port 3000');
});
