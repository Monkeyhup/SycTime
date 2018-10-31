/*jshint esversion: 6 */
const Koa = require('koa2');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');
const ntpClient = require('ntp-client');
const dns = require('dns');
const iplocate = require("node-iplocate");
const staticPath = 'static';
const app = new Koa();
const maxmind = require('maxmind');
let timer = (new function () {
    var stos = [], sivs = [], that = this;
    this.setTimeout = function (fn, delay) {
        var id = stos.length;
        stos[id] = {
            fn: fn,
            paused: false,
            delay: delay,
            start: new Date().getTime(),
            id: setTimeout(function () {
                fn && fn();
                timer.clearTimeout(id);
            }, delay)
        };
        return id;
    };
    this.clearTimeout = function (id) {
        var sto = stos[id];
        if (sto === undefined) return false;
        // 清空Timeout
        clearTimeout(sto.id);
        // 删除 id
        stos.splice(id, 1);
        return true;
    };
    this.pauseTimeout = function (id) {
        var sto = stos[id];
        if (sto === undefined || sto.paused === true) return false;
        // 标记暂停
        sto.paused = true;
        // 清空Timeout
        clearTimeout(sto.id);
        var elapse = new Date().getTime() - sto.start;
        // 重置 delay
        sto.delay = sto.delay - elapse;
        return true;
    };
    this.resumeTimeout = function (id) {
        var sto = stos[id];
        if (sto === undefined || sto.paused === false) return false;
        // 标记为恢复
        sto.paused = false;
        // 新建一个 timeout 表示继续 
        sto.id = stos[timer.setTimeout(sto.fn, sto.delay)].id;
        return true;
    };
    this.setInterval = function (fn, delay) {
        var id = sivs.length;
        sivs[id] = {
            fn: fn,
            paused: false,
            delay: delay,
            start: new Date().getTime(),
            id: setInterval(fn, delay)
        };
        return id;
    };
    this.clearInterval = function (id) {
        var siv = sivs[id];
        if (siv === undefined) return false;
        // 清空Interval
        clearInterval(siv.id);
        // 删除 id
        sivs.splice(id, 1);
        return true;
    };
    // 清空所有的 timeout
    this.cleanTimeout = function () {
        for (var i = 0; i < stos.length; ++i) {
            var sto = stos[id];
            // 清空Timeout
            sto === undefined || clearTimeout(sto.id);
        }
        // 清空 stos 数组
        stos = [];
    };
    // 清空所有的 interval
    this.cleanInterval = function () {
        for (var i = 0; i < sivs.length; ++i) {
            var siv = sivs[id];
            // 清空Timeout
            siv === undefined || clearInterval(siv.id);
        }
        // 清空 stos 数组
        sivs = [];
    };
    // 清空所有的 timeout 和 interval
    this.clean = function () {
        this.cleanTimeout();
        this.cleanInterval();
        return true;
    };
    this.pauseInterval = function (id) {
        var siv = sivs[id];
        if (siv === undefined || siv.paused === true) return false;
        // 标记暂停
        siv.paused = true;
        // 清空 Interval
        clearInterval(siv.id);
        var elapse = (new Date().getTime() - siv.start) % siv.delay;
        // 添加一个 wait 属性
        siv.wait = siv.delay - elapse;
        return true;
    };
    this.resumeInterval = function (id) {
        var siv = sivs[id];
        if (siv === undefined || siv.paused === false) return false;
        // 标记恢复
        siv.paused = false;
        // 调一个 setTimeout 执行 wait 的时间
        this.setTimeout(function () {
            siv.fn();
            // 新建一个 interval 表示继续
            siv.id = sivs[timer.setInterval(siv.fn, siv.delay)].id;
        }, siv.wait);
    };

    // 综合 API
    this.pause = function (id) {
        if (id === undefined) {
            // 表示暂停全部 timeout & interval
            stos.forEach(function (item, id) {
                that.pauseTimeout(id);
            });
            sivs.forEach(function (item, id) {
                that.pauseInterval(id);
            });
            return true;
        }
        else if (stos[id] !== undefined) {
            this.pauseTimeout(id);
            return true;
        }
        else if (sivs[id] !== undefined) {
            this.pauseInterval(id);
            return true;
        }
        return false;
    };
    this.resume = function (id) {
        if (id === undefined) {
            // 表示暂停全部 timeout & interval
            stos.forEach(function (item, id) {
                that.resumeTimeout(id);
            });
            sivs.forEach(function (item, id) {
                that.resumeInterval(id);
            });
            return true;
        }
        else if (stos[id] !== undefined) {
            this.resumeTimeout(id);
            return true;
        }
        else if (sivs[id] !== undefined) {
            this.resumeInterval(id);
            return true;
        }
        return false;
    };
}());

app.use(static(
    path.join(__dirname, staticPath)
));
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
let val = 0,
    temp_tw2 = 0,
    pause_tw2 = 0;
io.on('connection', function (socket) {
    console.log('a user connected');
    // 北邮内网
    let tw1 = setInterval(function () {
        ntpClient.getNetworkTime("10.3.9.4", 123, 30, function (err, date) {
            let a = new Date();
            let calendar = a.getFullYear() + '' + (a.getMonth() + 1) + a.getDate();
            if (err) {
                console.error(err);
                val='timeout';
                //国家授时中心
                getNTP('ntp.ntsc.ac.cn', 300, 'ntsc', 'timeout').then((v) => {
                    socket.emit('ntsc', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('ntsc', { 'time': 'timeout', 'dif': 'NaN' });
                });
                //阿里
                getNTP('time1.aliyun.com', 300, 'ali', 'timeout').then((v) => {
                    socket.emit('ali', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('ali', { 'time': 'timeout', 'dif': 'NaN' });
                });
                //清华
                getNTP('ntp.tuna.tsinghua.edu.cn', 300, 'ts', 'timeout').then((v) => {
                    socket.emit('ts', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('ts', { 'time': 'timeout', 'dif': 'NaN' });
                });
                //Apple
                getNTP('time1.apple.com', 500, 'Apple', 'timeout').then((v) => {
                    socket.emit('Apple', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('Apple', { 'time': 'timeout', 'dif': 'NaN' });
                });
                //微软
                getNTP('time.windows.com', 600, 'mic', 'timeout').then((v) => {
                    socket.emit('mic', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('mic', { 'time': 'timeout', 'dif': 'NaN' });
                });
                //计量院
                getNTP('ntp1.nim.ac.cn', 600, 'jly', 'timeout').then((v) => {
                    socket.emit('jly', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('jly', { 'time': 'timeout', 'dif': 'NaN' });
                });
                //nist
                getNTP('time.nist.gov', 600, 'nist', 'timeout').then((v) => {
                    socket.emit('nist', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('nist', { 'time': 'timeout', 'dif': 'NaN' });
                });
                //pool
                getNTP('cn.pool.ntp.org', 600, 'pool', 'timeout').then((v) => {
                    if (v == 0) {
                        socket.emit('pool', { 'time': 'zero', 'dif': 'NaN' });
                        return;
                    }
                    socket.emit('pool', { 'time': v, 'dif': 'NaN' });
                }, (err) => {
                    socket.emit('pool', { 'time': 'timeout', 'dif': 'NaN' });
                });
                let w_data = date + '\r\n';
                let b_data = Buffer.from(w_data);
                fs.writeFile(__dirname + '/data/bupt/'+calendar+'.txt', b_data, { flag: 'a+' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                socket.emit('bupt', 'timeout');
                return;
            }
            if (pause_tw2 == 1) {
                temp_tw2++;
                console.log('[temp_tw2]' + temp_tw2);
                while (temp_tw2 > 60) {
                    console.log('执行恢复函数');
                    pause_tw2 = 0;
                    temp_tw2 = 0;
                    timer.resume(tw2);
                }
            }
            //国家授时中心
            getNTP('ntp.ntsc.ac.cn', 300, 'ntsc', date).then((v) => {
                let difer = sub(v,val);
                socket.emit('ntsc', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('ntsc', { 'time': 'timeout', 'dif': 'NaN' });
            });
            //阿里
            getNTP('time1.aliyun.com', 300, 'ali', date).then((v) => {
                let difer = sub(v,val);
                socket.emit('ali', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('ali', { 'time': 'timeout', 'dif': 'NaN' });
            });
            //清华
            getNTP('ntp.tuna.tsinghua.edu.cn', 300, 'ts', date).then((v) => {
                let difer = sub(v,val);
                socket.emit('ts', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('ts', { 'time': 'timeout', 'dif': 'NaN' });
            });
            //Apple
            getNTP('time1.apple.com', 500, 'Apple', date).then((v) => {
                let difer = sub(v,val);
                socket.emit('Apple', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('Apple', { 'time': 'timeout', 'dif': 'NaN' });
            });
            //微软
            getNTP('time.windows.com', 600, 'mic', date).then((v) => {
                let difer = sub(v,val);
                socket.emit('mic', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('mic', { 'time': 'timeout', 'dif': 'NaN' });
            });
            //计量院
            getNTP('ntp1.nim.ac.cn', 600, 'jly', date).then((v) => {
                let difer = sub(v,val);
                socket.emit('jly', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('jly', { 'time': 'timeout', 'dif': 'NaN' });
            });
            //nist
            getNTP('time.nist.gov', 600, 'nist', date).then((v) => {
                let difer = sub(v,val);
                socket.emit('nist', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('nist', { 'time': 'timeout', 'dif': 'NaN' });
            });
            //pool
            getNTP('cn.pool.ntp.org', 600, 'pool', date).then((v) => {
                if (v == 0) {
                    socket.emit('pool', { 'time': 'zero', 'dif': 'NaN' });
                    return;
                }
                let difer = sub(v,val);
                socket.emit('pool', { 'time': v, 'dif': difer });
            }, (err) => {
                socket.emit('pool', { 'time': 'timeout', 'dif': 'NaN' });
            });
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/bupt/'+calendar+'.txt', b_data, { flag: 'a+' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            val=date;
            socket.emit('bupt', date);
        });
    }, 1000);
    let tw2 = timer.setInterval(() => {
        console.log('执行tw2');
        getNTP('18.26.4.105', 800, 'mit',val).then((v) => {
            if (v == 0) {
                pause_tw2 = 1;
                console.log('[pause_tw2]' + pause_tw2);
                socket.emit('mit', { 'time': 'zero', 'dif': 'NaN' });
                console.log('mit发送0');
                timer.pause(tw2);
                return;
            }
            console.log('发送mit');
            let difer = sub(v,val);
            socket.emit('mit', { 'time': v, 'dif': difer });
        }, (err) => {
            console.log('发送err');
            socket.emit('mit', { 'time': 'timeout', 'dif': 'NaN' });
        });
    }, 1000);


    //获取DNS的信息
    getDNSInfo('ntp.ntsc.ac.cn').then((v) => {
        // console.log(v);
        socket.emit('ntscInfo', v);
    });
    getDNSInfo('time1.aliyun.com').then((v) => {
        // console.log(v);
        socket.emit('aliInfo', v);
    });
    getDNSInfo('ntp.tuna.tsinghua.edu.cn').then((v) => {
        // console.log(v);
        socket.emit('tsInfo', v);
    });
    getDNSInfo('time1.apple.com').then((v) => {
        // console.log(v);
        socket.emit('appleInfo', v);
    });
    getDNSInfo('time.windows.com').then((v) => {
        // console.log(v);
        socket.emit('micInfo', v);
    });
    getDNSInfo('ntp1.nim.ac.cn').then((v) => {
        // console.log(v);
        socket.emit('jlyInfo', v);
    });
    getDNSInfo('bonehed.lcs.mit.edu').then((v) => {
        // console.log(v);
        socket.emit('mitInfo', v);
    });
    getDNSInfo('time.nist.gov').then((v) => {
        // console.log(v);
        socket.emit('nistInfo', v);
    });
    getDNSInfo('cn.pool.ntp.org').then((v) => {
        // console.log(v);
        socket.emit('poolInfo', v);
    });
    let task1 = setInterval(() => {
        getDNSInfo('ntp.ntsc.ac.cn').then((v) => {
            socket.emit('ntscInfo', v);
        });
        getDNSInfo('time1.aliyun.com').then((v) => {
            socket.emit('aliInfo', v);
        });
        getDNSInfo('ntp.tuna.tsinghua.edu.cn').then((v) => {
            socket.emit('tsInfo', v);
        });
        getDNSInfo('time1.apple.com').then((v) => {
            socket.emit('appleInfo', v);
        });
        getDNSInfo('time.windows.com').then((v) => {
            socket.emit('micInfo', v);
        });
        getDNSInfo('ntp1.nim.ac.cn').then((v) => {
            socket.emit('jlyInfo', v);
        });
        getDNSInfo('bonehed.lcs.mit.edu').then((v) => {
            socket.emit('mitInfo', v);
        });
        getDNSInfo('time.nist.gov').then((v) => {
            socket.emit('nistInfo', v);
        });
        getDNSInfo('cn.pool.ntp.org').then((v) => {
            socket.emit('poolInfo', v);
        });
    }, 3600000);


    socket.on('disconnect', function () {
        clearInterval(tw1);
        // timer.clearInterval(tw8);
        clearInterval(task1);
    });
});

server.listen(3000, () => {
    console.log('Application is starting on port 3000');
});
/* 获取NTP时间 */
function getNTP(url, timeout, server, lab) {
    let promise = new Promise((resolve, reject) => {
        ntpClient.getNetworkTime(url, 123, timeout, function (err, date) {
            if (err) {
                wrTxt(lab, 'timeout', server);
                reject('timeout');
                return;
            }
            wrTxt(lab, date, server);
            resolve(date);
        });
    });
    return promise;
}
/* 获取DNS信息 */
function getDNSInfo(url) {
    let promise = new Promise((resolve, reject) => {
        dns.lookup(url, function onLookup(err, addresses, family) {
            if (err) {
                console.log(err);
                return;
            }
            maxmind.open(__dirname + '/static/sources/dbs/GeoLite2-City.mmdb', (err, cityLookup) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(JSON.stringify(cityLookup.get(addresses).city) + '/n')
                let city = cityLookup.get(addresses);
                let region = city.city ? city.city.names['en'] : city.country.names['en'];
                resolve({ 'ip': addresses, 'region': region });
            });
        });
    });
    return promise;
}
/* 写入文件信息 */
function wrTxt(base, time, server) {
    let difer = sub(time,base);
    let w_data = base + '-' + time + '-' + difer + '\r\n';
    let b_data = Buffer.from(w_data);
    let a = new Date();
    let date = a.getFullYear() + '' + (a.getMonth() + 1) + a.getDate();
    fs.writeFile(__dirname + '/data/' + server + '/' + date + '.txt', b_data, { flag: 'a+' }, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

/* 精确减法 */
function sub(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum - num2 * baseNum) / baseNum;
}
