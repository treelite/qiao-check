var system = require('system');
var page = require('webpage').create();

var url = system.args[1];
if (!url) {
    console.log('Please input the website url');
    phantom.exit();
}

var stHM;
var stQiao;
var et;

page.onResourceRequested = function (req) {
    if (!stHM && req.url.indexOf('hm.baidu.com') >= 0) {
        stHM = new Date(); 
    }

    if (!stQiao && req.url.indexOf('qiao.baidu.com') >= 0) {
        stQiao = new Date(); 
    }
};

page.onResourceReceived = function (res) {
    if (res.url.indexOf('qiao.baidu.com') >= 0) {
        et = new Date();
    }
};

var pSt;
page.onLoadStarted = function () {
    pSt = new Date();
};

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Vist ' + url + ' fail...');
        phantom.exit();
    }

    var pEt = new Date(); 

    console.log('Start: ' + stHM);
    console.log('Start Qiao: ' + stQiao);
    console.log('End: ' + et);
    console.log('Dis: ' + (et.getTime() - stHM.getTime()));
    console.log('Dis HM: ' + (stQiao.getTime() - stHM.getTime()));
    console.log('Dis Qiao: ' + (et.getTime() - stQiao.getTime()));
    console.log('Dis Page: ' + (pEt.getTime() - pSt.getTime()));

    phantom.exit();
});
