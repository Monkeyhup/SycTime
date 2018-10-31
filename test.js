/*jshint esversion: 6 */
const iplocation = require("iplocation").default;
const ntpClient = require('ntp-client');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');
const dns = require('dns');
const wait = require('wait-for-stuff');
const iplocate = require("node-iplocate");
let maxmind = require('maxmind');
maxmind.open(__dirname+'/static/sources/dbs/GeoLite2-City.mmdb',(err,cityLookup)=>{
    if(err){
        console.log(err);
        return;
    }
    let city=cityLookup.get('85.199.214.100');
    console.log(city);
});
iplocate("203.107.6.88", null, function (err, results) {
    // ...
    console.log(results);
    console.log(JSON.stringify(results, null, 2));
    
});

dns.lookup('114.118.7.163', function onLookup(err, addresses, family) {
    // console.log('addresses:', addresses);
});

iplocation('114.118.7.163', [], (err, res) => {
    /* res:
 
        {
            as: 'AS11286 KeyBank National Association',
            city: 'Cleveland',
            country: 'United States',
            countryCode: 'US',
            isp: 'KeyBank National Association',
            lat: 41.4875,
            lon: -81.6724,
            org: 'KeyBank National Association',
            query: '156.77.54.32',
            region: 'OH',
            regionName: 'Ohio',
            status: 'success',
            timezone: 'America/New_York',
            zip: '44115'
        }
 
    */
    if (err) {
        console.log(err);
        return;
    }
    console.log('asd');
    console.log(res);
    console.log(res.region);
});

function getDNSInfo(url) {
    let promise = new Promise((resolve, reject) => {
        dns.lookup(url, function onLookup(err, addresses, family) {
            if (err) {
                console.log(err);
                return;
            }
            iplocation(addresses, [], (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                resolve({ 'ip': addresses, 'region': res.region });
            });
        });
    });
    return promise;
}
/*
没有精简之前的获取ntp时间的代码 
*/
/* let tw10 = setInterval(function () {
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
}, 1000); */
let task1 = setInterval(() => {
    let obj = {
        "ntsc": [],
        "ali": [],
        "ts": [],
        "apple": [],
        "mic": [],
        "jly": [],
        "mit": [],
        "nist": [],
        "pool": []
    };
    getDNSInfo('ntp.ntsc.ac.cn').then((v) => {
        obj.ntsc = v;
    });
    getDNSInfo('time1.aliyun.com').then((v) => {
        obj.ali = v;
    });
    getDNSInfo('ntp.tuna.tsinghua.edu.cn').then((v) => {
        obj.ts = v;
    });
    getDNSInfo('time1.apple.com').then((v) => {
        obj.apple = v;
    });
    getDNSInfo('time.windows.com').then((v) => {
        obj.mic = v;
    });
    getDNSInfo('ntp1.nim.ac.cn').then((v) => {
        obj.jly = v;
    });
    getDNSInfo('bonehed.lcs.mit.edu').then((v) => {
        obj.mit = v;
    });
    getDNSInfo('time.nist.gov').then((v) => {
        obj.nist = v;
    });
    getDNSInfo('cn.pool.ntp.org').then((v) => {
        obj.pool = v;
    });
}, 1000);
function getNTP(url, timeout, file) {
    let promise = new Promise((resolve, reject) => {
        ntpClient.getNetworkTime(url, 123, timeout, function (err, date) {
            if (err) {
                console.error(err);
                let w_data = 'timeout' + '\r\n';
                let b_data = new Buffer(w_data);
                fs.writeFile(__dirname + '/data/' + file + '.txt', b_data, { flag: 'a' }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                reject('timeout');
                return;
            }
            let w_data = date + '\r\n';
            let b_data = new Buffer(w_data);
            fs.writeFile(__dirname + '/data/' + file + '.txt', b_data, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            resolve(date);
        });
    });
    return promise;
}
/* let task3 = setInterval(() => {
    getNTP('time.windows.com',300,'ntsc').then((v) => {
        let difer = Number((v - val).toFixed(3));
        socket.emit('ntsc', { 'time': date, 'dif': difer });
        console.log(v);
    },(err)=>{
        socket.emit('ntsc', { 'time': 'timeout', 'dif': 'NaN' });
        console.log(err);
    });
}, 1000); */

