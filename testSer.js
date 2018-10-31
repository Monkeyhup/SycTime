/*jshint esversion: 6 */
const Koa = require('koa2');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');
const wait = require('wait-for-stuff');
const app = new Koa();
const ntpClient = require('ntp-client');


const staticPath = 'static';

app.use(static(
    path.join(__dirname, staticPath)
));
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
let short = 0,
    val = 0;
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
        ntpClient.getNetworkTime("18.26.4.105", 123, 800, function (err, date) {
            console.log(date)
            if (err) {
                console.log(err);
                socket.emit('ts', 'timeout');
                return;
            }
            if(date==0){
                console.log('发送的是0');
                socket.emit('ts', 'timeout');
                wait.for.time(10);
                return;
            }
            socket.emit('ts', date);
        });
    }, 1000);
    let short1 = 0,
    val1 = 0;
    //东北大学
    // let tw7 = setInterval(function () {
    //     ntpClient.getNetworkTime("18.7.33.13", 123, 500, function (err, date) {
    //         if (err) {
    //             console.error(err);
    //             socket.emit('db', 0);
    //             return;
    //         }
    //         val1 = date - short1;
    //         short1 = date;
    //         let w_data = val1 + '\r\n';
    //         let b_data = new Buffer(w_data);
    //         fs.writeFile(__dirname + '/data/base1.txt', b_data, { flag: 'a' }, function (err) {
    //             if (err) {
    //                 console.error(err);
    //             } else {
    //                 console.log('写入成功');
    //             }
    //         });
    //         socket.emit('db', date);
    //     });
    // }, 1000);

    socket.on('disconnect', function () {
        // clearInterval(tw1);
        // clearInterval(tw2);
        // clearInterval(tw3);
        // clearInterval(tw4);
        // clearInterval(tw5);
        clearInterval(tw6);
        // clearInterval(tw7);
    });
});




server.listen(3000, () => {
    console.log('Application is starting on port 3000');
});
