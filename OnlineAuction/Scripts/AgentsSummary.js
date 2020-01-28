app.controller("rep_ctrl", function ($scope, $http, $filter) {

    var _s = $scope;
    var _h = $http;
    console.log("dsads");
    getAgentSummary();
    _s.show = 0;
    _s.showNot = 1;
    function getAgentSummary() {
        _h.post("../AgentSummary/getAgentSummary").then(function (d) {
            _s.data_agent = d.data;
            console.log(_s.data_agent);
        })
    }
    _s.view = function (per) {
        _h.post("../AgentSummary/getAgentWhere", { agentid: per.agentID }).then(function (d) {
            _s.data_agentWhere = d.data;
         _s.getGrandTotalIncentives = _s.getTotalIncentives(_s.data_agentWhere, "totalIncentives")
        })
        _s.agentName = per.personalName
    }
    _s.getTotalIncentives = function (items, prop) {
        if (items == null) {
            return 0;
        }
        return items.reduce(function (a, b) {
            return a + b[prop];
        }, 0);
    };
    _s.print = function () {
        //_s.show = 1;
        //_s.showNot = 0;
        //$("#drModal").modal('hide');
    }
    _s.reload = function () {
        history.go(0)
    }
});

