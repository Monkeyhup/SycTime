/* 获取NTP时间 
第一版，尚未简写写入
*/
function getNTP(url, timeout, file) {
    let promise = new Promise((resolve, reject) => {
        ntpClient.getNetworkTime(url, 123, timeout, function (err, date) {
            if (err) {
                // console.error(err);
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
/* 获取NTP时间 */
function getNTP(url, timeout, server,lab) {
    let promise = new Promise((resolve, reject) => {
        ntpClient.getNetworkTime(url, 123, timeout, function (err, date) {
            if (err) {
                wrTxt(lab,'timeout',server);
                reject('timeout');
                return;
            }
            wrTxt(lab,date,server);
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
                console.log(JSON.stringify(cityLookup.get(addresses).city)+'/n')
                let city = cityLookup.get(addresses);
                let region =city.city? city.city.names['en']:city.country.names['en'];
                resolve({ 'ip': addresses, 'region': region });
            });
        });
    });
    return promise;
}
/* 写入文件信息 */
function wrTxt(base, time, server) {
    let w_data = base + '-' + time + '\r\n';
    let b_data = Buffer.from(w_data);
    let a = new Date();
    let date = a.getFullYear() + '' + (a.getMonth() + 1) + a.getDate();
    fs.writeFile(__dirname + '/data/' + server + '/' + date + '.txt', b_data, { flag: 'a+' }, function (err) {
        if (err) {
            console.error(err);
        }
    });
}
