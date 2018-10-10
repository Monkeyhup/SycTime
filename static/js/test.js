/*jshint esversion: 6 */
$(function () {
    let datum={
        "google":[],
        "mic":[],
        "jly":[],
        "nist":[],
        "bupt":[],
        "ts":[],
        "db":[]
    };
    let socket = io();
    // socket.on('google', function (data) {
    //     console.log(data)
    //     let baseTime = getLocalTime(data);
    //     if (datum.google.length > 1000) {
    //         datum.google.shift()
    //     }
    //     datum.google.push(baseTime);
    //     $("#txt1").text(baseTime)
    // })
    /* socket.on('mic', function (data) {
        let baseTime = getLocalTime(data);
        if (datum.mic.length > 1000) {
            datum.mic.shift()
        }
        datum.mic.push(baseTime);
        $("#txt2").text(baseTime)
    }) */
    // socket.on('jly', function (data) {
    //     let baseTime = getLocalTime(data);
    //     if (datum.jly.length > 1000) {
    //         datum.jly.shift()
    //     }
    //     datum.jly.push(baseTime);
    //     $("#txt3").text(baseTime)
    // })
    // socket.on('nist', function (data) {
    //     let baseTime = getLocalTime(data);
    //     if (datum.nist.length > 1000) {
    //         datum.nist.shift()
    //     }
    //     datum.nist.push(baseTime);
    //     $("#txt4").text(baseTime)
    // })
    // socket.on('bupt', function (data) {
    //     let baseTime = getLocalTime(data);
    //     if (datum.bupt.length > 1000) {
    //         datum.bupt.shift()
    //     }
    //     datum.bupt.push(baseTime);
    //     $("#txt5").text(baseTime)
    // })
    socket.on('ts', function (data) {
        let baseTime = getLocalTime(data);
        if (datum.ts.length > 1000) {
            datum.ts.shift();
        }
        datum.ts.push(baseTime);
        $("#txt6").text(baseTime);
    });
    socket.on('db', function (data) {
        let baseTime = getLocalTime(data);
        if (datum.db.length > 1000) {
            datum.db.shift();
        }
        datum.db.push(baseTime);
        $("#txt7").text(baseTime);
    });
    $("#btn").on('click', function () {
        let source = {};
        let arrCheckbox = $("input[name='check']");
        for (i = 0; i < arrCheckbox.length; i++) {
            if (arrCheckbox[i].checked) {
                source[arrCheckbox[i].value]=datum[arrCheckbox[i].value];
            }
        }
        console.log(source);
    });
    var groupCheckbox = $("input[name='check']");
    // var groupCheckbox = $(".option");
    for (i = 0; i < groupCheckbox.length; i++) {
        console.log(groupCheckbox);
        groupCheckbox[i].onclick = function () {
            console.log(this.checked);
            if (this.checked) {
                this.parentNode.setAttribute("class", "ac");
            } else {
                this.parentNode.setAttribute("class", "qu");
            }
        };
    }
});
