$(document).ready(function() {
    $('#txtStartFrom').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndTo').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $('#txtStartFromDept').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToDept').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });      

    $('#txtStartFromDeptMon').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 365)
      });
    
    $('#txtEndToDeptMon').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });    

    $('#txtStartFromLCDD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCDD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });
    
    $('#txtStartFromLCDP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCDP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $('#txtStartFromLCDR').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToLCDR').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $.getJSON("/quality/control/employeeJson", function(data) {
        $.each(data.employees, function(i, item) {
            $("#selectedEmployee").append("<option value='" + item.emplId + "'>" + item.fullName + ' - ' + item.emplId + "</option>");
        });
    });

    $.getJSON("/quality/control/departmentJsonShort", function(data) {
        $("#selectedDepartmentDay").append("<option value='All'>KMCJ - Company</option>");
        $.each(data.departmentsLCD, function(i, item) {
            $("#selectedDepartmentDay").append("<option value='" + item.deptNum + "'>" + item.deptNum + ' - ' + item.deptDesc + "</option>");
        });
    });

    $.getJSON("/quality/control/departmentJsonShort", function(data) {
        $("#selectedDepartmentMon").append("<option value='All'>KMCJ - Company</option>");
        $.each(data.departmentsLCD, function(i, item) {
            $("#selectedDepartmentMon").append("<option value='" + item.deptNum + "'>" + item.deptNum + ' - ' + item.deptDesc + "</option>");
        });
    });

    $.getJSON("/quality/control/departmentJsonShort", function(data) {
        $("#selectedDepartmentLCD").append("<option value='All'>KMCJ - Company</option>");
        $.each(data.departmentsLCD, function(i, item) {
            $("#selectedDepartmentLCD").append("<option value='" + item.deptNum + "'>" + item.deptNum + ' - ' + item.deptDesc + "</option>");
        });
    });

    $.getJSON("/quality/control/poolJson", function(data) {
        $.each(data.pools, function(i, item) {
            $("#selectedPoolLCD").append("<option value='" + item.poolId + "'>" + item.poolId + ' - ' + item.poolName + "</option>");
        });
    });

    $.getJSON("/quality/control/resourceJsonShort", function(data) {
        $.each(data.resourcesLCD, function(i, item) {
            $("#selectedWorkCenterLCD").append("<option value='" + item.resourceId + "'>" + item.resourceId + ' - ' 
                                + item.resourceName + ' - ' + item.groupType + ' - ' + item.costCenter + "</option>");
        });
    });

} );

function drawEmpOutDayChart() {
    // destroy canvas and create it again
    $('#chartEmpOutDay').remove();
    $('#divChartEmpOutDay').append('<canvas id="chartEmpOutDay"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowEmployeeOutputDayChart",
        dataType: 'json',
        data: {
            "selectedEmployee": $("#selectedEmployee").val(),
            "startdate": $("#txtStartFrom").val(),
            "enddate": $("#txtEndTo").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.listEODC, function(i, item){
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.MES_HOUR));
                mySeriesTwo.push(parseFloat(item.OUTPUT_HOUR));
                mySeriesThree.push(parseFloat(item.FUNC_AVE_HOUR));
                mySeriesFour.push(parseFloat(item.EMP_NAME));
            });

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Employee MES Registered Hours',
                    data: mySeriesOne,
                    type: 'line',
                    // steppedLine: 'middle',
                    borderColor: 'rgb(255, 159, 64)',
                    fill: false,
                    stepped: 'before',
                    },{
                    label: 'Employee Output Hours',
                    data: mySeriesTwo,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    // stack: 'Stack 0',
                    },{
                    label: 'Department Average Hours',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    stepped: true
                    }
                ]
            };

            var ctx = document.getElementById('chartEmpOutDay');
            // combo bar/line chart
            var myBarChartOutputEmpl = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Employee Output Hours - Daily'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    }
                    // scales: {
                    //     x: {
                    //         stacked: true,
                    //     },
                    //     y: {
                    //         stacked: true
                    //     }
                    // }
                }
            });  
        }
    });
}

function drawDeptOutDayChart() {
    // destroy canvas and create it again
    $('#chartDeptOutDay').remove();
    $('#divChartDeptOutDay').append('<canvas id="chartDeptOutDay"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowDeptOutputDayChart",
        dataType: 'json',
        data: {
            "selectedDepartment": $("#selectedDepartmentDay").val(),
            "startdate": $("#txtStartFromDept").val(),
            "enddate": $("#txtEndToDept").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.listDODC, function(i, item){
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.MES_HOUR));
                mySeriesTwo.push(parseFloat(item.OUTPUT_HOUR));
                mySeriesThree.push(parseFloat(item.FUNC_AVE_HOUR));
                mySeriesFour.push(parseFloat(item.COST_CENTER));
            });

            var chartDataDept = {
                labels: mylabels,
                datasets: [{
                    label: 'Department MES Registered Hours',
                    data: mySeriesOne,
                    type: 'line',
                    steppedLine: 'middle',
                    borderColor: 'rgb(255, 159, 64)',
                    fill: false,
                    stepped: true,
                    },{
                    label: 'Department Output Hours',
                    data: mySeriesTwo,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    stack: 'Stack 0',
                    },{
                    label: 'Department Average Hours',
                    type: 'line',
                    steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    stepped: true
                    }
                ]
            };

            var ctx = document.getElementById('chartDeptOutDay');
            // combo bar/line chart
            var myBarChartOutputDept = new Chart(ctx, {
                type: 'bar',	
                data: chartDataDept,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Department Output Hours - Daily'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }
            });  
        }
    });
}







function drawDeptOutMonChart() {
    // destroy canvas and create it again
    $('#chartDeptOutMon').remove();
    $('#divChartDeptOutMon').append('<canvas id="chartDeptOutMon"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowDeptOutputMonChart",
        dataType: 'json',
        data: {
            "selectedDepartment": $("#selectedDepartmentMon").val(),
            "startdate": $("#txtStartFromDeptMon").val(),
            "enddate": $("#txtEndToDeptMon").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.listDOMC, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.MES_HOUR));
                mySeriesTwo.push(parseFloat(item.OUTPUT_HOUR));
                mySeriesThree.push(parseFloat(item.FUNC_AVE_HOUR));
                mySeriesFour.push(parseFloat(item.COST_CENTER));
            });

            var chartDataDept = {
                labels: mylabels,
                datasets: [{
                    label: 'Department MES Registered Hours',
                    data: mySeriesOne,
                    type: 'line',
                    steppedLine: 'middle',
                    borderColor: 'rgb(255, 159, 64)',
                    fill: false,
                    stepped: true,
                    },{
                    label: 'Department Output Hours',
                    data: mySeriesTwo,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    stack: 'Stack 0',
                    },{
                    label: 'Department Average Hours',
                    type: 'line',
                    steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    stepped: true
                    }
                ]
            };

            var ctx = document.getElementById('chartDeptOutMon');
            // combo bar/line chart
            var myBarChartOutputDept = new Chart(ctx, {
                type: 'bar',	
                data: chartDataDept,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Department Output Hours - Monthly'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }
            });  
        }
    });
}

function drawLoadVsCapDayDeptChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapDailyDept').remove();
    $('#divChartLoadVsCapDailyDept').append('<canvas id="chartLoadVsCapDailyDept"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapDayDeptChart",
        dataType: 'json',
        data: {
            "selectedDepartment": $("#selectedDepartmentLCD").val(),
            "startdate": $("#txtStartFromLCDD").val(),
            "enddate": $("#txtEndToLCDD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
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

            var ctx = document.getElementById('chartLoadVsCapDailyDept');
            // combo bar/line chart
            var myBarChartLoadCapDept = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Department - Daily'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    }
                    // scales: {
                    //     x: {
                    //         stacked: true,
                    //     },
                    //     y: {
                    //         stacked: true
                    //     }
                    // }
                }
            });  
        }
    });
}

function drawLoadVsCapDayPoolChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapDailyPool').remove();
    $('#divChartLoadVsCapDailyPool').append('<canvas id="chartLoadVsCapDailyPool"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapDayPoolChart",
        dataType: 'json',
        data: {
            "selectedPool": $("#selectedPoolLCD").val(),
            "startdate": $("#txtStartFromLCDP").val(),
            "enddate": $("#txtEndToLCDP").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
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

            var ctx = document.getElementById('chartLoadVsCapDailyPool');
            // combo bar/line chart
            var myBarChartLoadCapPool = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Pool - Daily'
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

function drawLoadVsCapDayResChart() {
    // destroy canvas and create it again
    $('#chartLoadVsCapDailyRes').remove();
    $('#divChartLoadVsCapDailyRes').append('<canvas id="chartLoadVsCapDailyRes"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowLoadVsCapDayResChart",
        dataType: 'json',
        data: {
            "selectedWorkCenter": $("#selectedWorkCenterLCD").val(),
            "startdate": $("#txtStartFromLCDR").val(),
            "enddate": $("#txtEndToLCDR").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.load, function(i, item){
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
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

            var ctx = document.getElementById('chartLoadVsCapDailyRes');
            // combo bar/line chart
            var myBarChartLoadCapRes = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Load Vs Capacity By Work Center - Daily'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    }
                    // scales: {
                    //     x: {
                    //         stacked: true,
                    //     },
                    //     y: {
                    //         stacked: true
                    //     }
                    // }
                }
            });  
        }
    });
}