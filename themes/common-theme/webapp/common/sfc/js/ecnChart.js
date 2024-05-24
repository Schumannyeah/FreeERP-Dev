$(document).ready(function() {

    $.getJSON("/quality/control/departmentJsonShort", function(data) {
        $("#selectedDepartment").append("<option value='All'>KMCJ - Company</option>");
        $.each(data.departmentsLCD, function(i, item) {
            $("#selectedDepartment").append("<option value='" + item.deptNum + "'>" + item.deptNum + ' - ' + item.deptDesc + "</option>");
        });
    });

    $.getJSON("/quality/control/ecnLineTypeJson", function(data) {
        $("#selectedLineType").append("<option value='All'>All Types</option>");
        $.each(data.ecnLineTypes, function(i, item) {
            $("#selectedLineType").append("<option value='" + item.enumId + "'>" + item.enumId + ' - ' + item.description + "</option>");
        });
    });

} );

var myLineChartEcnDetailByDpt;

function toggleSeriesDpt() {
    // Get all of the datasets in the chart
    const datasets = myLineChartEcnDetailByDpt.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {         
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;     
    });

    // Update the chart
    myLineChartEcnDetailByDpt.update();
}

function ecnByDptChart() {
    // destroy canvas and create it again
    $('#chartEcnDpt').remove();
    $('#divChartEcnDpt').append('<canvas id="chartEcnDpt"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowEcnByDptChart",
        dataType: 'json',
        data: {
            "selectedDepartment": $("#selectedDepartment").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[],
                mySeriesFive=[], mySeriesSix=[];
            $.each(data.listEDBD, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.ACTIVE_ECN_DETAIL_QTY));
                mySeriesTwo.push(parseFloat(item.ACTIVE_DETAIL_AVG_DAY));
                mySeriesThree.push(parseFloat(item.ACTIVE_DETAIL_MAX_DAY));
                mySeriesFour.push(parseFloat(item.ENDED_ECN_DETAIL_QTY));
                mySeriesFive.push(parseFloat(item.ENDED_DETAIL_AVG_DAY));
                mySeriesSix.push(parseFloat(item.ENDED_DETAIL_MAX_DAY));
            });

            var myDept = data.deptid;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Active ECN Detail Qty',
                    data: mySeriesOne,
                    // type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    backgroundColor: 'rgba(244, 67, 54, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active ECN Average Day',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active ECN Max Day',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended ECN Detail Qty',
                    data: mySeriesFour,
                    // type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    backgroundColor: 'rgba(103, 58, 183, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended ECN Average Day',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended ECN Max Day',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y',
                    }
                ]
            };

            var ctx = document.getElementById('chartEcnDpt');
            // combo bar/line chart
            myLineChartEcnDetailByDpt = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'ECN Detail By Department ' + myDept + '- Monthly'
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

var myLineChartEcnDetailByLine;

function toggleSeriesLineType() {
    // Get all of the datasets in the chart
    const datasets = myLineChartEcnDetailByLine.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {         
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;     
    });

    // Update the chart
    myLineChartEcnDetailByLine.update();
}


function ecnByLineTypeChart() {
    // destroy canvas and create it again
    $('#chartEcnLineType').remove();
    $('#divChartEcnLineType').append('<canvas id="chartEcnLineType"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowEcnByLineTypeChart",
        dataType: 'json',
        data: {
            "selectedLineType": $("#selectedLineType").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[],
                mySeriesFive=[], mySeriesSix=[];
            $.each(data.listEDBL, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.ACTIVE_ECN_DETAIL_QTY));
                mySeriesTwo.push(parseFloat(item.ACTIVE_DETAIL_AVG_DAY));
                mySeriesThree.push(parseFloat(item.ACTIVE_DETAIL_MAX_DAY));
                mySeriesFour.push(parseFloat(item.ENDED_ECN_DETAIL_QTY));
                mySeriesFive.push(parseFloat(item.ENDED_DETAIL_AVG_DAY));
                mySeriesSix.push(parseFloat(item.ENDED_DETAIL_MAX_DAY));
            });

            var lineType = data.lineType;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Active ECN Detail Qty',
                    data: mySeriesOne,
                    // type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    backgroundColor: 'rgba(244, 67, 54, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active ECN Average Day',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Active ECN Max Day',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended ECN Detail Qty',
                    data: mySeriesFour,
                    // type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    backgroundColor: 'rgba(103, 58, 183, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended ECN Average Day',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Ended ECN Max Day',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y',
                    }
                ]
            };

            var ctx = document.getElementById('chartEcnLineType');
            // combo bar/line chart
            myLineChartEcnDetailByLine = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'ECN Detail By Line Type ' + lineType + '- Monthly'
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