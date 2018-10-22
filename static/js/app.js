/*jshint esversion: 6 */
$(function () {
    let datum={
        "bupt":[],
        "jly":[],
        "usa":[],
        "China":[],
        "Apple":[],
        "mcc":[],
        "ali":[],
        "ts":[],
        "bj":[],
        "db":[]
    }
    let socket = io();
    socket.on('bupt', function (data) {
        if (datum.bupt.length > 1000) {
            datum.bupt.unshift()
        }
        datum.bupt.push(data);
        $("#txt1").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('jly', function (data) {
        if (datum.jly.length > 1000) {
            datum.jly.unshift()
        }
        datum.jly.push(data);
        $("#txt2").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('usa', function (data) {
        if (datum.usa.length > 1000) {
            datum.usa.unshift()
        }
        datum.usa.push(data);
        $("#txt3").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('China', function (data) {
        if (datum.China.length > 1000) {
            datum.China.unshift()
        }
        datum.China.push(data);
        $("#txt4").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('Apple', function (data) {
        if (datum.Apple.length > 1000) {
            datum.Apple.unshift()
        }
        datum.Apple.push(data);
        $("#txt5").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('mcc', function (data) {
        if (datum.mcc.length > 1000) {
            datum.mcc.unshift()
        }
        datum.mcc.push(data);
        $("#txt6").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('ali', function (data) {
        if (datum.ali.length > 1000) {
            datum.ali.unshift()
        }
        datum.ali.push(data);
        $("#txt7").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('ts', function (data) {
        if (datum.ts.length > 1000) {
            datum.ts.unshift()
        }
        datum.ts.push(data);
        $("#txt8").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('bj', function (data) {
        if (datum.bj.length > 1000) {
            datum.bj.unshift()
        }
        datum.bj.push(data);
        $("#txt9").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    socket.on('db', function (data) {
        if (datum.db.length > 1000) {
            datum.db.unshift()
        }
        datum.db.push(data);
        $("#txt10").text(`${data[0]}:${data[1]}:${data[2]}.${data[3]}`)
    })
    $("#btn").on('click', function () {
        let source = {};
        let arrCheckbox = $("input[name='check']");
        for (i = 0; i < arrCheckbox.length; i++) {
            if (arrCheckbox[i].checked) {
                source[arrCheckbox[i].value]=datum[arrCheckbox[i].value]
            }
        }
        console.log(source)
    })
    var groupCheckbox = $("input[name='check']");
    // var groupCheckbox = $(".option");
    for (i = 0; i < groupCheckbox.length; i++) {
        console.log(groupCheckbox)
        groupCheckbox[i].onclick = function () {
            console.log(this.checked);
            if (this.checked) {
                this.parentNode.setAttribute("class", "ac")
            } else {
                this.parentNode.setAttribute("class", "qu")
            }
        }
    }

    drawTable()
});


/**
 * 为时与分加0
 * */
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
/**
 * 为毫秒加0
 * */
function checkMsTime(i) {
    console.log('star')
    if (i.length == 1) {
        i = "00" + i;
    } else if (i.length == 2) {
        i = "0" + i;
    }
    return i;
}

function dian(fou) {
    console.log(fou)
    console.log(fou.checked)
}