$(document).ready(function() {

    $('#txtStartFromLCWD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCWD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });
    
    $('#txtStartFromLCWP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCWP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $('#txtStartFromLCWR').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCWR').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $.getJSON("/quality/control/departmentJsonShort", function(data) {
        $("#selectedDepartmentLCW").append("<option value='All'>KMCJ - Company</option>");
        $.each(data.departmentsLCD, function(i, item) {
            $("#selectedDepartmentLCW").append("<option value='" + item.deptNum + "'>" + item.deptNum + ' - ' + item.deptDesc + "</option>");
        });
    });

    $.getJSON("/quality/control/poolJson", function(data) {
        $.each(data.pools, function(i, item) {
            $("#selectedPoolLCW").append("<option value='" + item.poolId + "'>" + item.poolId + ' - ' + item.poolName + "</option>");
        });
    });

    $.getJSON("/quality/control/resourceJsonShort", function(data) {
        $.each(data.resourcesLCD, function(i, item) {
            $("#selectedWorkCenterLCW").append("<option value='" + item.resourceId + "'>" + item.resourceId + ' - ' 
                                + item.resourceName + ' - ' + item.groupType + ' - ' + item.costCenter + "</option>");
        });
    });

} );

function drawLoadVsCapWeekDeptChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapWeeklyDept').remove();
    $('#divChartLoadVsCapWeeklyDept').append('<canvas id="chartLoadVsCapWeeklyDept"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapWeekDeptChart",
        dataType: 'json',
        data: {
            "selectedDepartment": $("#selectedDepartmentLCW").val(),
            "startdate": $("#txtStartFromLCWD").val(),
            "enddate": $("#txtEndToLCWD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(item.YEAR_WEEK);
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

            var ctx = document.getElementById('chartLoadVsCapWeeklyDept');
            // combo bar/line chart
            var myBarChartLoadCapDept = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Department - Weekly'
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

function drawLoadVsCapWeekPoolChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapWeeklyPool').remove();
    $('#divChartLoadVsCapWeeklyPool').append('<canvas id="chartLoadVsCapWeeklyPool"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapWeekPoolChart",
        dataType: 'json',
        data: {
            "selectedPool": $("#selectedPoolLCW").val(),
            "startdate": $("#txtStartFromLCWP").val(),
            "enddate": $("#txtEndToLCWP").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(item.YEAR_WEEK);
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

            var ctx = document.getElementById('chartLoadVsCapWeeklyPool');
            // combo bar/line chart
            var myBarChartLoadCapPool = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Pool - Weekly'
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

function drawLoadVsCapWeekResChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapWeeklyRes').remove();
    $('#divChartLoadVsCapWeeklyRes').append('<canvas id="chartLoadVsCapWeeklyRes"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapWeekResChart",
        dataType: 'json',
        data: {
            "selectedWorkCenter": $("#selectedWorkCenterLCW").val(),
            "startdate": $("#txtStartFromLCWR").val(),
            "enddate": $("#txtEndToLCWR").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(item.YEAR_WEEK);
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

            var ctx = document.getElementById('chartLoadVsCapWeeklyRes');
            // combo bar/line chart
            var myBarChartLoadCapRes = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Work Center - Weekly'
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