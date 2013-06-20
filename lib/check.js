var system = require('system');
var page = require('webpage').create();

function webSiteCheck() {
    var checkHandlers = {};

    checkHandlers.display = {
        desc: 'Check whether the container element is displayed',
        check: function () {
            var res = true;
            var ele = document.getElementById('BDBridgeWrap');
            
            if (!ele) {
                console.log('Can not find the container element');
                res = false;
            }
            else if (ele.style.display == 'none' 
                    || ele.style.visibility == 'hidden') {
                console.log('Container is not visibile');
                res = false;
            }

            return res;
        }
    };


    var res = [];
    var handler;
    for (var key in checkHandlers) {
        if (checkHandlers.hasOwnProperty(key)) {
            handler = checkHandlers[key];
            res.push(
                {
                    name: key,
                    desc: handler.desc,
                    result: handler.check()
                }
            );
        }
    }

    return res;
}

function report(res) {
    var rep = [];

    res.forEach(function (item) {
        rep.push(
            item.name.charAt(0).toUpperCase() 
            + item.name.substring(1)
            + ' -- '
            + (item.result ? 'pass' : 'fail')
        );
        rep.push(item.desc + '\n');
    });

    console.log(rep.join('\n'));
}

var url = system.args[1];
if (!url) {
    console.log('Please input the website url');
    phantom.exit();
}

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Vist ' + url + ' fail...');
        phantom.exit();
    }

    page.onConsoleMessage = function (msg) {
        console.log('[Page Context] ' + msg);
    };

    var res = page.evaluate(webSiteCheck);

    report(res);

    phantom.exit();
});

