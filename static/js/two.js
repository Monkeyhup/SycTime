/*jshint esversion: 6 */
$(function () {
    let datum = {
        "bupt": {
            bTime: [],
            errBupt: 0
        },
        "ntsc": {
            nTime: [],
            aveNtsc: []
        },
        "ali": {
            aTime: [],
            aveAli: []
        },
        "ts": {
            tTime: [],
            aveTs: []
        },
        "Apple": {
            apTime: [],
            aveApple: []
        },
        "mic": {
            mTime: [],
            aveMic: []
        },
        "jly": {
            jTime: [],
            aveJly: []
        },
        "mit": {
            mitTime: [],
            aveMit: []
        },
        "nist": {
            niTime: [],
            aveNist: []
        },
        "pool": {
            pTime: [],
            avePool: []
        }
    };
    let socket = io();
    socket.on('bupt', function (data) {
        let baseTime = getLocalTime(data);
        $("#txt1").text(baseTime);
        if (datum.bupt.bTime.length > 100) {
            datum.bupt.bTime.shift();
        }
        datum.bupt.bTime.push(data);
    });
    socket.on('ntsc', function (data) {
        let baseTime = getLocalTime(data.time); //将毫秒转化为时间
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt2").text(baseTime);
        $("#dft2").text(driftTime);
        datum.ntsc.nTime.push(data.time); // 为数组添加时间值
        datum.ntsc.aveNtsc.push(driftTime); // 为数组添加时间值

        if (datum.ntsc.nTime.length == 100) {
            let rateTime = getRateTime(datum.ntsc.nTime); //计算成功率
            let aveTime = getaveTime(datum.ntsc.aveNtsc); //计算平均时间误差

            //更新图表二的数据值
            optionb.series[0].data[0].value = aveTime;

            myChartb.setOption(optionb);

            $("#rate2").text(rateTime); //未成功率赋值
            datum.ntsc.nTime.shift(); //重新开始数组并计算成功率
            datum.ntsc.aveNtsc.shift(); //重新开始数组并计算平均成功率
        }

        //更新图表一的数据值
        if (option.series[0].data.length < 50) {
            option.series[0].data.push(driftTime);
        } else {
            option.series[0].data.shift();
            option.series[0].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('ntscInfo', function (data) {
        $("#ip2").text(data.ip);
        $("#site2").text(data.region);
    });
    //阿里
    socket.on('ali', function (data) {
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt3").text(baseTime);
        $("#dft3").text(driftTime);
        datum.ali.aTime.push(data.time);
        datum.ali.aveAli.push(driftTime);
        if (datum.ali.aTime.length == 100) {
            let rateTime = getRateTime(datum.ali.aTime);
            let aveTime = getaveTime(datum.ali.aveAli); //计算成功率
            //更新图表二的数据值
            optionb.series[0].data[1].value = aveTime;

            myChartb.setOption(optionb);

            $("#rate3").text(rateTime);
            datum.ali.aTime.shift();
            datum.ali.aveAli.shift();
        }
        if (option.series[1].data.length < 50) {
            option.series[1].data.push(driftTime);
        } else {
            option.series[1].data.shift();
            option.series[1].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('aliInfo', function (data) {
        $("#ip3").text(data.ip);
        $("#site3").text(data.region);
    });
    //清华
    socket.on('ts', function (data) {
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt4").text(baseTime);
        $("#dft4").text(driftTime);
        datum.ts.tTime.push(data.time);
        datum.ts.aveTs.push(driftTime);
        if (datum.ts.tTime.length == 100) {
            let rateTime = getRateTime(datum.ts.tTime);
            let aveTime = getaveTime(datum.ts.aveTs); //计算成功率

            //更新图表二的数据值
            optionb.series[0].data[2].value = aveTime;
            myChartb.setOption(optionb);

            $("#rate4").text(rateTime);
            datum.ts.tTime.shift();
            datum.ts.aveTs.shift();
        }
        if (option.series[2].data.length < 50) {
            option.series[2].data.push(driftTime);
        } else {
            option.series[2].data.shift();
            option.series[2].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('tsInfo', function (data) {
        $("#ip4").text(data.ip);
        $("#site4").text(data.region);
    });
    //Apple
    socket.on('Apple', function (data) {
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt5").text(baseTime);
        $("#dft5").text(driftTime);
        datum.Apple.apTime.push(data.time);
        datum.Apple.aveApple.push(driftTime);
        if (datum.Apple.apTime.length == 100) {
            let rateTime = getRateTime(datum.Apple.apTime);
            let aveTime = getaveTime(datum.Apple.aveApple); //计算成功率

            //更新图表二的数据值
            optionb.series[0].data[3].value = aveTime;
            myChartb.setOption(optionb);

            $("#rate5").text(rateTime);
            datum.Apple.apTime.shift();
            datum.Apple.aveApple.shift();
        }
        if (option.series[3].data.length < 50) {
            option.series[3].data.push(driftTime);
        } else {
            option.series[3].data.shift();
            option.series[3].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('appleInfo', function (data) {
        $("#ip5").text(data.ip);
        $("#site5").text(data.region);
    });
    //微软
    socket.on('mic', function (data) {
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt6").text(baseTime);
        $("#dft6").text(driftTime);
        datum.mic.mTime.push(data.time);
        datum.mic.aveMic.push(driftTime);
        if (datum.mic.mTime.length == 100) {
            let rateTime = getRateTime(datum.mic.mTime);
            let aveTime = getaveTime(datum.mic.aveMic); //计算成功率

            //更新图表二的数据值
            optionb.series[0].data[4].value = aveTime;
            myChartb.setOption(optionb);

            $("#rate6").text(rateTime);
            datum.mic.mTime.shift();
            datum.mic.aveMic.shift();
        }
        if (option.series[4].data.length < 50) {
            option.series[4].data.push(driftTime);
        } else {
            option.series[4].data.shift();
            option.series[4].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('micInfo', function (data) {
        $("#ip6").text(data.ip);
        $("#site6").text(data.region);
    });
    //计量院
    socket.on('jly', function (data) {
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt7").text(baseTime);
        $("#dft7").text(driftTime);
        datum.jly.jTime.push(data.time);
        datum.jly.aveJly.push(driftTime);
        if (datum.jly.jTime.length == 100) {
            let rateTime = getRateTime(datum.jly.jTime);
            let aveTime = getaveTime(datum.jly.aveJly); //计算成功率

            //更新图表二的数据值
            optionb.series[0].data[5].value = aveTime;
            myChartb.setOption(optionb);

            $("#rate7").text(rateTime);
            datum.jly.jTime.shift();
            datum.jly.aveJly.shift();
        }
        if (option.series[5].data.length < 50) {
            option.series[5].data.push(driftTime);
        } else {
            option.series[5].data.shift();
            option.series[5].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('jlyInfo', function (data) {
        $("#ip7").text(data.ip);
        $("#site7").text(data.region);
    });
    //mit
    socket.on('mit', function (data) {
        console.log(data);
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt8").text(baseTime);
        $("#dft8").text(driftTime);
        datum.mit.mitTime.push(data.time);
        datum.mit.aveMit.push(driftTime);
        if (datum.mit.mitTime.length == 100) {
            let rateTime = getRateTime(datum.mit.mitTime);
            let aveTime = getaveTime(datum.mit.aveMit); //计算成功率

            //更新图表二的数据值
            optionb.series[0].data[6].value = aveTime;
            myChartb.setOption(optionb);

            $("#rate8").text(rateTime);
            datum.mit.mitTime.shift();
            datum.mit.aveMit.shift();
        }
        if (option.series[6].data.length < 50) {
            option.series[6].data.push(driftTime);
        } else {
            option.series[6].data.shift();
            option.series[6].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('mitInfo', function (data) {
        $("#ip8").text(data.ip);
        $("#site8").text(data.region);
    });
    //nist
    socket.on('nist', function (data) {
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt9").text(baseTime);
        $("#dft9").text(driftTime);
        datum.nist.niTime.push(data.time);
        datum.nist.aveNist.push(driftTime);

        if (datum.nist.niTime.length == 100) {
            let rateTime = getRateTime(datum.nist.niTime);
            let aveTime = getaveTime(datum.nist.aveNist); //计算成功率

            //更新图表二的数据值
            optionb.series[0].data[7].value = aveTime;
            myChartb.setOption(optionb);

            $("#rate9").text(rateTime);
            datum.nist.niTime.shift();
            datum.nist.aveNist.shift();
        }
        if (option.series[7].data.length < 50) {
            option.series[7].data.push(driftTime);
        } else {
            option.series[7].data.shift();
            option.series[7].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('nistInfo', function (data) {
        $("#ip9").text(data.ip);
        $("#site9").text(data.region);
    });
    //pool
    socket.on('pool', function (data) {
        let baseTime = getLocalTime(data.time);
        let driftTime = data.dif; //计算与标准时间的差值
        $("#txt10").text(baseTime);
        $("#dft10").text(driftTime);
        datum.pool.pTime.push(data.time);
        datum.pool.avePool.push(driftTime);
        if (datum.pool.pTime.length == 100) {
            let rateTime = getRateTime(datum.pool.pTime);
            let aveTime = getaveTime(datum.pool.avePool); //计算成功率

            //更新图表二的数据值
            optionb.series[0].data[8].value = aveTime;
            myChartb.setOption(optionb);

            $("#rate10").text(rateTime);
            datum.pool.pTime.shift();
            datum.pool.avePool.shift();
        }
        if (option.series[8].data.length < 50) {
            option.series[8].data.push(driftTime);
        } else {
            option.series[8].data.shift();
            option.series[8].data.push(driftTime);
        }
        myChart.setOption(option);

    });
    socket.on('poolInfo', function (data) {
        $("#ip10").text(data.ip);
        $("#site10").text(data.region);
    });
    

    //以下是图表一，即与标准时间的差值
    let myChart = echarts.init(document.getElementById('dif_table'));

    // 指定图表的配置项和数据
    option = {
        color: ['#759aa0', '#e69d87', '#ea7e53', '#eedd78', '#73a373', '#7289ab', '#91ca8c', '#f49f42', '#dd6b66', '#759aa0'],
        legend: {
            data: [{
                name: '中国国家授时中心',
                textStyle: {
                    color: '#759aa0'
                }
            }, {
                name: '阿里巴巴',
                textStyle: {
                    color: '#e69d87'
                }
            }, {
                name: '清华大学',
                textStyle: {
                    color: '#ea7e53'
                }
            }, {
                name: 'Apple',
                textStyle: {
                    color: '#eedd78'
                }
            }, {
                name: '微软',
                textStyle: {
                    color: '#73a373'
                }
            }, {
                name: '计量院',
                textStyle: {
                    color: '#7289ab'
                }
            }, {
                name: 'MIT',
                textStyle: {
                    color: '#91ca8c'
                }
            }, {
                name: 'NIST',
                textStyle: {
                    color: '#f49f42'
                }
            }, {
                name: 'POOL',
                textStyle: {
                    color: '#dd6b66'
                }
            }]
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            name: 'Time Interval(ms)',
            nameLocation: 'middle',
            nameGap: 20,
            nameTextStyle: {
                color: '#fff'
            },
            boundaryGap: false,
            data: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10000, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20000, 22, 23, 24, 25, 26, 27, 28, 29, 30, 30000, 32, 33, 34, 35, 36, 37, 38, 39, 40, 40000, 42, 43, 44, 45, 46, 47, 48, 49, 50],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#dd6b66',
                    width: 2
                }
            },
            axisLabel: {
                show: true,
                interval: 9,
                margin: 5,
                color: '#fff',
                fontSize: 15,
                fontFamily: 'Times New Roman'

            }
        },
        yAxis: {
            type: 'value',
            name: 'TE(ms)',
            nameTextStyle: {
                color: '#fff'
            },
            nameGap: 40,
            nameLocation: 'middle',
            splitLine: {
                lineStyle: {
                    color: '#fff',
                    width: 1,
                }
            },
            axisLabel: {
                margin: 5,
                color: '#fff',
                fontSize: 15,
                fontFamily: 'Times New Roman'
            },
        },
        tooltip: {
            trigger: 'axis',
            //在这里设置
            formatter: '{a0}: {c0}ms<br />{a1}: {c1}ms<br />{a2}: {c2}ms<br />{a3}: {c3}ms<br />{a4}: {c4}ms<br />{a5}: {c5}ms<br />{a6}: {c6}ms'
        },
        series: [{
            name: '中国国家授时中心',
            type: 'line',
            data: []
        },
        {
            name: '阿里巴巴',
            type: 'line',
            data: []
        },
        {
            name: '清华大学',
            type: 'line',
            data: []
        },
        {
            name: 'Apple',
            type: 'line',
            data: []
        },
        {
            name: '微软',
            type: 'line',
            data: []
        },
        {
            name: '计量院',
            type: 'line',
            data: []
        },
        {
            name: 'MIT',
            type: 'line',
            data: []
        },
        {
            name: 'NIST',
            type: 'line',
            data: []
        },
        {
            name: 'POOL',
            type: 'line',
            data: []
        }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);



    //以下是图表二，即平均差值
    let myChartb = echarts.init(document.getElementById('ave_table'));
    // 指定图表的配置项和数据
    optionb = {
        // legend: {
        //     data: ['中国国家授时中心', '阿里巴巴', '清华大学', 'Apple', 'NTP-POOL', '上海交通大学']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: ['中国国家授时中心', '阿里巴巴', '清华大学', 'Apple', '微软', '计量院', 'MIT', 'NIST', 'NTP.POOL'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#00ff66',
                    width: 2
                }
            },
            axisLabel: {
                show: true,
                rotate: 60,
                color: "#fff"
            },
        },
        yAxis: {
            type: 'value',
            name: 'ms',
            nameTextStyle: {
                color: '#fff',
                fontSize: 15,
            },
            nameGap: 40,
            nameLocation: 'middle',
            splitLine: {
                lineStyle: {
                    color: '#fff',
                    width: 1,
                }
            },
            axisLabel: {
                margin: 5,
                color: '#fff',
                fontSize: 15,
                fontFamily: 'Times New Roman'
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        series: [{
            name: '偏差',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}' + 'ms',
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Times New Roman'
                }
            },
            itemStyle: {
                normal: {
                    color: '#fff',
                }
            },
            data: [{
                name: '中国国家授时中心',
                value: 2.03,
            }, {
                name: '阿里巴巴',
                value: 10.87,
            }, {
                name: '清华大学',
                value: 23.35,
            }, {
                name: 'Apple',
                value: -95.91,
            }, {
                name: '微软',
                value: -86.35,
            }, {
                name: '计量院',
                value: 24.43,
            }, {
                name: 'MIT',
                value: 13.43,
            }, {
                name: 'nist',
                value: 15.31,
            }, {
                name: 'pool',
                value: 12.31,
            }]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartb.setOption(optionb);
});