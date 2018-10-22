/*jshint esversion: 6 */
const Koa = require('koa2');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');

const app = new Koa();
const ntpClient = require('ntp-client');

const staticPath = 'static';

app.use(static(
    path.join(__dirname, staticPath)
));
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

let val = 0;
io.on('connection', function (socket) {
    console.log('a user connected');
    // 北邮内网
    let tw1 = setInterval(function () {
        ntpClient.getNetworkTime("10.3.9.4", 123, 30, function (err, date) {
            if (err) {
                console.error(err);
                val = 'timeout';
                let w_data = val + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/bupt.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('bupt', val);
                return;
            }
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/bupt.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('bupt', date);
            val = date;
        });
    }, 1000);

    //国家授时中心
    let tw2 = setInterval(function () {
        ntpClient.getNetworkTime("ntp.ntsc.ac.cn", 123, 300, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/ntsc.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('ntsc', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/ntsc.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('ntsc', { 'time': date, 'dif': difer });
        });
    }, 1000);

    //阿里
    let tw3 = setInterval(function () {
        ntpClient.getNetworkTime("203.107.6.88", 123, 300, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/ali.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('ali', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/ali.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });

            socket.emit('ali', { 'time': date, 'dif': difer });
        });
    }, 1000);

    //清华大学
    let tw4 = setInterval(function () {
        ntpClient.getNetworkTime("ntp.tuna.tsinghua.edu.cn", 123, 300, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/ts.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('ts', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/ts.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('ts', { 'time': date, 'dif': difer });
        });
    }, 1000);

    //Apple
    let tw5 = setInterval(function () {
        ntpClient.getNetworkTime("17.254.0.27", 123, 450, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/Apple.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('Apple', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/Apple.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('Apple', { 'time': date, 'dif': difer });
        });
    }, 1000);
    //微软
    let tw6 = setInterval(function () {
        ntpClient.getNetworkTime("time.windows.com", 123, 600, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/mic.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('mic', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/mic.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('mic', { 'time': date, 'dif': difer });
        });
    }, 1000);
    //计量院
    let tw7 = setInterval(function () {
        ntpClient.getNetworkTime("111.203.6.13", 123, 600, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/jly.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('jly', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/jly.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('jly', { 'time': date, 'dif': difer });
        });
    }, 1000);
    //MIT
    let tw8 = setInterval(function () {
        ntpClient.getNetworkTime("18.7.33.13", 123, 300, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/mit.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('mit', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/mit.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('mit', { 'time': date, 'dif': difer });
        });
    }, 1000);

    // NIST
    let tw9 = setInterval(function () {
        ntpClient.getNetworkTime("time.nist.gov", 123, 500, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/nist.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('nist', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/nist.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('nist', { 'time': date, 'dif': difer });
        });
    }, 1000);
    //NTP.POOL
    let tw10 = setInterval(function () {
        ntpClient.getNetworkTime("cn.pool.ntp.org", 123, 500, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/pool.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('pool', { 'time': 'timeout', 'dif': 'NaN' });
                return;
            }
            let difer = Number((date - val).toFixed(3));
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/pool.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            socket.emit('pool', { 'time': date, 'dif': difer });
        });
    }, 1000);

    socket.on('disconnect', function () {
        clearInterval(tw1);
        clearInterval(tw2);
        clearInterval(tw3);
        clearInterval(tw4);
        clearInterval(tw5);
        clearInterval(tw6);
        clearInterval(tw7);
        clearInterval(tw8);
        clearInterval(tw9);
        clearInterval(tw10);
    });
});

server.listen(3000, () => {
    console.log('Application is starting on port 3000');
});
