app.controller('monitoring', ["$scope", "$http", "$interval", "$timeout", function (s, h, _i, _t) {

    s.currentTab = 1;
    var refreshInterval = null;
    var timerInterval = null;
    var refreshTime = 5000;
    var timerTime = 1000;
    var blockOptions = {
        message: '<i class="icon-spinner2 spinner"></i>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'none'
        }
    };

    s.auctionAction = function (id, type, index, elem) {
        var parent = $($(elem.target).parent()).parent();
        $(parent).block(blockOptions)
        h.post('../api/monitoring/auctionAction/' + id + '/' + type).then(function (d) {
            if (d.data.stat == 1) {
                    switch (s.currentTab) {
                        case 1:
                            s.activeAuctionedItems.splice(index, 1);
                            break;
                        case 2:
                            s.pendingAuctionedItems.splice(index, 1);
                            break;
                    }
                    s.pendingCount = d.data.pendingCount;
            }
        })
    }
    s.tabChange = function (type, func) {
        if (type == s.currentTab) return;

        if (refreshInterval != null) {
            _i.cancel(refreshInterval);
        }
        if (timerInterval != null) {
            _i.cancel(timerInterval);
        }

        s[func]();
        refreshInterval = _i(function () {
            s[func]();
        }, refreshTime)
        s.currentTab = type;
    }


    s.getTimeLeft = function (data, obj, index) {
        if (data.years > 0) {
            return data.years + 'Y ' + data.months + 'M ' + data.days + 'D '
        } else if (data.months > 0) {
            return data.months + 'M ' + data.days + 'D ' + data.hours + 'h '
        } else if (data.days > 0) {
            return data.days + 'D ' + data.hours + 'h ' + data.minutes + 'm '
        } else if (data.hours > 0) {
            return data.hours + 'h ' + data.minutes + 'm ' + data.seconds + 's'
        } else if (data.minutes > 0) {
            return data.minutes + 'm ' + data.seconds + 's'
        } else if (data.seconds > 0) {
            obj.class = 'text-danger'
            return data.seconds + 's'
        } else {
            _t(function () { s.activeAuctionedItems.splice[index, 1] }, 3000)
            return 'CLOSED'
        }
    }
    s.setWinner = function (bidderID, auctionID, index) {
        h.post('../api/monitoring/setwinner/' + auctionID + '/' + bidderID).then(function (d) {
            if (d.status == 200) {
                h.post("../monitoring/sendFCM?id=" + bidderID).then(function (d) {
                    console.log(d)
                })
                s.pendingAuctionedItems.splice(index, 1);
            }
        })
    }
    s.loadactiveAuctionedItems = function () {
        h.get('../api/Monitoring/activeAuctionedItems').then(function (d) {
            s.activeAuctionedItems = d.data.d;
            s.pendingCount = d.data.pendingCount;
            angular.forEach(s.activeAuctionedItems, function (v, k) {
                //v.dateClaimLimit = new Date(new Date())
                var eventTime = new Date(v.DateTimeLimit).getTime(); 
                var currentTime = new Date(d.data.st).getTime(); 
                var diffTime = eventTime - currentTime;
                var duration = moment.duration(diffTime, 'milliseconds');
                v.duration = duration;
            })
            if (timerInterval != null) {
                _i.cancel(timerInterval);
            }
            timerInterval = _i(function () {
                angular.forEach(s.activeAuctionedItems, function (v, k) {
                    v.duration = moment.duration(v.duration - 1000, 'milliseconds');
                })
            }, timerTime);
        })
    }
    s.loadPendingAuctionedItems = function () {
        h.get('../api/Monitoring/pendingauctioneditems').then(function (d) {
            s.pendingAuctionedItems = d.data.d;
            s.pendingCount = d.data.d.length;
        })
    }
    s.loadAuctionedItemsHistory = function () {
        h.get('../api/Monitoring/auctioneditemshistory').then(function (d) {
            s.auctionedItemsHistory = d.data.d;
            s.pendingCount = d.data.pendingCount;
        })
    }

    s.$watch('pendingCount', function (a, b) {
        $('.badge').addClass("animated rubberBand").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $(this).removeClass("animated rubberBand");
        });
    })
    
    function init() {
        s.loadactiveAuctionedItems();
        refreshInterval = _i(function () {
            s.loadactiveAuctionedItems();
        }, refreshTime)
    }

    init();
}])
app.filter('capitalize', function () {
    return function (input, scope) {
        if (input != null) {
            input = input.toLowerCase();
            var inputArr = input.split(' ');
            for (var i = 0; i < inputArr.length; i++) {
                inputArr[i] = inputArr[i].substring(0, 1).toUpperCase() + inputArr[i].substring(1);
            }
            return inputArr.join(' ');
        }
        return ''
    }
});