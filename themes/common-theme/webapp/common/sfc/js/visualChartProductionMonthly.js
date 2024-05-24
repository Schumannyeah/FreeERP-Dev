$(document).ready(function() {

    $('#txtStartFromLCMD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCMD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });
    
    $('#txtStartFromLCMP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCMP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $('#txtStartFromLCMR').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCMR').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $.getJSON("/quality/control/departmentJsonShort", function(data) {
        $("#selectedDepartmentLCM").append("<option value='All'>KMCJ - Company</option>");
        $.each(data.departmentsLCD, function(i, item) {
            $("#selectedDepartmentLCM").append("<option value='" + item.deptNum + "'>" + item.deptNum + ' - ' + item.deptDesc + "</option>");
        });
    });

    $.getJSON("/quality/control/poolJson", function(data) {
        $.each(data.pools, function(i, item) {
            $("#selectedPoolLCM").append("<option value='" + item.poolId + "'>" + item.poolId + ' - ' + item.poolName + "</option>");
        });
    });

    $.getJSON("/quality/control/resourceJsonShort", function(data) {
        $.each(data.resourcesLCD, function(i, item) {
            $("#selectedWorkCenterLCM").append("<option value='" + item.resourceId + "'>" + item.resourceId + ' - ' 
                                + item.resourceName + ' - ' + item.groupType + ' - ' + item.costCenter + "</option>");
        });
    });

} );

function drawLoadVsCapMonDeptChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapMonthlyDept').remove();
    $('#divChartLoadVsCapMonthlyDept').append('<canvas id="chartLoadVsCapMonthlyDept"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapMonDeptChart",
        dataType: 'json',
        data: {
            "selectedDepartment": $("#selectedDepartmentLCM").val(),
            "startdate": $("#txtStartFromLCMD").val(),
            "enddate": $("#txtEndToLCMD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.SCH_HOURS));
                mySeriesTwo.push(parseFloat(item.CAP_NORM));
                mySeriesThree.push(parseFloat(item.CAP_OT));
                mySeriesFour.push(parseFloat(item.CAP_MAX));
            });

            var myDept = data.deptid;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: myDept,
                    data: mySeriesOne,
                    // steppedLine: 'middle',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    fill: false,
                    stepped: 'before',
                    },{
                    label: 'Normal Capacity',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(255, 159, 64)',
                    stepped: 'before',
                    // stack: 'Stack 0',
                    },{
                    label: 'OT Capacity',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    stepped: true
                    }
                ]
            };

            var ctx = document.getElementById('chartLoadVsCapMonthlyDept');
            // combo bar/line chart
            var myBarChartLoadCapDept = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Department - Monthly'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    }
                }
            });  
        }
    });
}

function drawLoadVsCapMonPoolChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapMonthlyPool').remove();
    $('#divChartLoadVsCapMonthlyPool').append('<canvas id="chartLoadVsCapMonthlyPool"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapMonPoolChart",
        dataType: 'json',
        data: {
            "selectedPool": $("#selectedPoolLCM").val(),
            "startdate": $("#txtStartFromLCMP").val(),
            "enddate": $("#txtEndToLCMP").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.SCH_HOURS));
                mySeriesTwo.push(parseFloat(item.CAP_NORM));
                mySeriesThree.push(parseFloat(item.CAP_OT));
                mySeriesFour.push(parseFloat(item.CAP_MAX));
            });

            var myPool = data.poolid;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: myPool,
                    data: mySeriesOne,
                    // steppedLine: 'middle',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    fill: false,
                    stepped: 'before',
                    },{
                    label: 'Normal Capacity',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(255, 159, 64)',
                    stepped: 'before',
                    // stack: 'Stack 0',
                    },{
                    label: 'OT Capacity',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    stepped: true
                    }
                ]
            };

            var ctx = document.getElementById('chartLoadVsCapMonthlyPool');
            // combo bar/line chart
            var myBarChartLoadCapPool = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Pool - Monthly'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    }
                }
            });  
        }
    });
}

function drawLoadVsCapMonResChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapMonthlyRes').remove();
    $('#divChartLoadVsCapMonthlyRes').append('<canvas id="chartLoadVsCapMonthlyRes"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapMonResChart",
        dataType: 'json',
        data: {
            "selectedWorkCenter": $("#selectedWorkCenterLCM").val(),
            "startdate": $("#txtStartFromLCMR").val(),
            "enddate": $("#txtEndToLCMR").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.SCH_HOURS));
                mySeriesTwo.push(parseFloat(item.CAP_NORM));
                mySeriesThree.push(parseFloat(item.CAP_OT));
                mySeriesFour.push(parseFloat(item.CAP_MAX));
            });

            var myWC = data.resid;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: myWC,
                    data: mySeriesOne,
                    // steppedLine: 'middle',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    fill: false,
                    stepped: 'before',
                    },{
                    label: 'Normal Capacity',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(255, 159, 64)',
                    stepped: 'before',
                    // stack: 'Stack 0',
                    },{
                    label: 'OT Capacity',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    stepped: true
                    }
                ]
            };

            var ctx = document.getElementById('chartLoadVsCapMonthlyRes');
            // combo bar/line chart
            var myBarChartLoadCapRes = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Work Center - Monthly'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    }
                }
            });  
        }
    });
}