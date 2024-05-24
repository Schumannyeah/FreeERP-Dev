$(document).ready(function() {

    $.getJSON("/quality/control/employeeJson", function(data) {
        $("#selectedEmployee").append("<option value='All'>All Employees</option>");
        $.each(data.employees, function(i, item) {
            $("#selectedEmployee").append("<option value='" + item.emplId + "'>" + item.fullName + ' - ' + item.emplId + "</option>");
        });
    });

    $.getJSON("/quality/control/departmentJsonShort", function(data) {
        $("#selectedDepartment").append("<option value='All'>KMCJ - Company</option>");
        $.each(data.departmentsLCD, function(i, item) {
            $("#selectedDepartment").append("<option value='" + item.deptNum + "'>" + item.deptNum + ' - ' + item.deptDesc + "</option>");
        });
    });

    $.getJSON("/quality/control/taskSourceTypeJson", function(data) {
        $("#selectedSource").append("<option value='All'>All Types</option>");
        $.each(data.sourceTypes, function(i, item) {
            $("#selectedSource").append("<option value='" + item.enumId + "'>" + item.enumId + ' - ' + item.description + "</option>");
        });
    });

} );

var myLineChartMesTaskByResp;

function toggleSeriesResp() {
    // Get all of the datasets in the chart
    const datasets = myLineChartMesTaskByResp.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {         
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;     
    });

    // Update the chart
    myLineChartMesTaskByResp.update();
}

function mesTaskByRespChart() {
    // destroy canvas and create it again
    $('#chartMesTaskResp').remove();
    $('#divChartMesTaskResp').append('<canvas id="chartMesTaskResp"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowMesTaskByRespChart",
        dataType: 'json',
        data: {
            "selectedEmployee": $("#selectedEmployee").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[],
                mySeriesFive=[], mySeriesSix=[];
            $.each(data.listMTBR, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.ACTIVE_TASK_QTY));
                mySeriesTwo.push(parseFloat(item.ACTIVE_TASK_AVG_DAY));
                mySeriesThree.push(parseFloat(item.ACTIVE_TASK_MAX_DAY));
                mySeriesFour.push(parseFloat(item.ENDED_TASK_QTY));
                mySeriesFive.push(parseFloat(item.ENDED_TASK_AVG_DAY));
                mySeriesSix.push(parseFloat(item.ENDED_TASK_MAX_DAY));
            });

            var emplid = data.emplid;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Active Task Qty',
                    data: mySeriesOne,
                    // type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    backgroundColor: 'rgba(244, 67, 54, 0.5)',
                    fill: true,
                    yAxisID: 'y1',
                    },{
                    label: 'Active Task Average Day',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active Task Max Day',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Qty',
                    data: mySeriesFour,
                    // type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    backgroundColor: 'rgba(103, 58, 183, 0.5)',
                    fill: true,
                    yAxisID: 'y1',
                    },{
                    label: 'Ended Task Average Day',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Max Day',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y',
                    }
                ]
            };

            var ctx = document.getElementById('chartMesTaskResp');
            // combo bar/line chart
            myLineChartMesTaskByResp = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'MES Task By Responsible ' + emplid + ' - Monthly'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        y: {
                          type: 'linear',
                          display: true,
                          position: 'left',
                        },
                        y1: {
                          type: 'linear',
                          display: true,
                          position: 'right',
                  
                          // grid line settings
                          grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                          },
                        },
                    }
                }
            });  
        }
    });
}

var myLineChartMesTaskByDpt;

function toggleSeriesDpt() {
    // Get all of the datasets in the chart
    const datasets = myLineChartMesTaskByDpt.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {         
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;     
    });

    // Update the chart
    myLineChartMesTaskByDpt.update();
}

function mesTaskByDptChart() {
    // destroy canvas and create it again
    $('#chartMesTaskDpt').remove();
    $('#divChartMesTaskDpt').append('<canvas id="chartMesTaskDpt"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowMesTaskByDptChart",
        dataType: 'json',
        data: {
            "selectedDepartment": $("#selectedDepartment").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[],
                mySeriesFive=[], mySeriesSix=[];
            $.each(data.listMTBD, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.ACTIVE_TASK_QTY));
                mySeriesTwo.push(parseFloat(item.ACTIVE_TASK_AVG_DAY));
                mySeriesThree.push(parseFloat(item.ACTIVE_TASK_MAX_DAY));
                mySeriesFour.push(parseFloat(item.ENDED_TASK_QTY));
                mySeriesFive.push(parseFloat(item.ENDED_TASK_AVG_DAY));
                mySeriesSix.push(parseFloat(item.ENDED_TASK_MAX_DAY));
            });

            var myDept = data.deptid;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Active Task Qty',
                    data: mySeriesOne,
                    // type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    backgroundColor: 'rgba(244, 67, 54, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active Task Average Day',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active Task Max Day',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Qty',
                    data: mySeriesFour,
                    // type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    backgroundColor: 'rgba(103, 58, 183, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Average Day',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Max Day',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y',
                    }
                ]
            };

            var ctx = document.getElementById('chartMesTaskDpt');
            // combo bar/line chart
            myLineChartMesTaskByDpt = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'MES Task By Department ' + myDept + '- Monthly'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        y: {
                          type: 'linear',
                          display: true,
                          position: 'left',
                        },
                        y1: {
                          type: 'linear',
                          display: true,
                          position: 'right',
                  
                          // grid line settings
                          grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                          },
                        },
                    }
                }
            });  
        }
    });
}

var myLineChartMesTaskBySource;

function toggleSeriesSource() {
    // Get all of the datasets in the chart
    const datasets = myLineChartMesTaskBySource.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {         
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;     
    });

    // Update the chart
    myLineChartMesTaskBySource.update();
}


function mesTaskBySourceChart() {
    // destroy canvas and create it again
    $('#chartMesTaskSource').remove();
    $('#divChartMesTaskSource').append('<canvas id="chartMesTaskSource"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowMesTaskBySourceTypeChart",
        dataType: 'json',
        data: {
            "selectedSource": $("#selectedSource").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[],
                mySeriesFive=[], mySeriesSix=[];
            $.each(data.listMTBS, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.ACTIVE_TASK_QTY));
                mySeriesTwo.push(parseFloat(item.ACTIVE_TASK_AVG_DAY));
                mySeriesThree.push(parseFloat(item.ACTIVE_TASK_MAX_DAY));
                mySeriesFour.push(parseFloat(item.ENDED_TASK_QTY));
                mySeriesFive.push(parseFloat(item.ENDED_TASK_AVG_DAY));
                mySeriesSix.push(parseFloat(item.ENDED_TASK_MAX_DAY));
            });

            var sourceType = data.sourceType;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Active Task Qty',
                    data: mySeriesOne,
                    // type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    backgroundColor: 'rgba(244, 67, 54, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active Task Average Day',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active Task Max Day',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Qty',
                    data: mySeriesFour,
                    // type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    backgroundColor: 'rgba(103, 58, 183, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Average Day',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended Task Max Day',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y',
                    }
                ]
            };

            var ctx = document.getElementById('chartMesTaskSource');
            // combo bar/line chart
            myLineChartMesTaskBySource = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'MES Task By Source Type ' + sourceType + '- Monthly'
                        },
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        y: {
                          type: 'linear',
                          display: true,
                          position: 'left',
                        },
                        y1: {
                          type: 'linear',
                          display: true,
                          position: 'right',
                  
                          // grid line settings
                          grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                          },
                        },
                    }
                }
            });  
        }
    });
}