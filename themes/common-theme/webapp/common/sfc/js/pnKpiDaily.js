$(document).ready(function () {
    $('#txtStartFromPnKD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 30)
    });

    $('#txtEndToPnKD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date()
    });

});

var myLineChartPnKpiDaily;

function toggleSeries() {
    // Get all of the datasets in the chart
    const datasets = myLineChartPnKpiDaily.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;
    });

    // Update the chart
    myLineChartPnKpiDaily.update();
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawPnKpiDailyChart() {
    // destroy canvas and create it again
    $('#chartPnKpiDaily').remove();
    $('#divChartPnKpiDaily').append('<canvas id="chartPnKpiDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowPnKpiDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromPnKD").val(),
            "enddate": $("#txtEndToPnKD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels = [], mySeriesOne = [], mySeriesTwo = [], mySeriesThree = [], mySeriesFour = [],
                mySeriesFive = [], mySeriesSix = [], mySeriesSeven = [], mySeriesEight = [],
                mySeriesNine = [], mySeriesTen = [], mySeriesEleven = [], mySeriesTwelve = [],
                mySeriesThirteen = [], mySeriesFourteen = [], mySeriesFifteen = [];
            $.each(data.listPnKD, function (i, item) {
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.PN_INH_NO_LT));
                mySeriesTwo.push(parseFloat(item.PN_INH_NO_LTT));
                mySeriesThree.push(parseFloat(item.PN_PUR_NO_LT));
                mySeriesFour.push(parseFloat(item.PN_PUR_NO_LTT));
                mySeriesFive.push(parseFloat(item.PN_OVD_AX_PPO));
                mySeriesSix.push(parseFloat(item.PN_OVD_AX_PPOT));
                mySeriesSeven.push(parseFloat(item.PN_OVD_MES_PPO));
                mySeriesEight.push(parseFloat(item.PN_OVD_MES_PPOT));
                mySeriesNine.push(parseFloat(item.PN_OVD_SO_LINE));
                mySeriesTen.push(parseFloat(item.PN_OVD_SO_LINET));
                mySeriesEleven.push(parseFloat(item.PN_OVD_WO_FOR_SO));
                mySeriesTwelve.push(parseFloat(item.PN_AX_WO_QTY));
                mySeriesThirteen.push(parseFloat(item.PN_AX_WO_QTYT));
                mySeriesFourteen.push(parseFloat(item.PN_OVD_SO_CONF));
                mySeriesFifteen.push(parseFloat(item.PN_OVD_SO_CONFT));
            });

            var colorsOne = [];
            for (var i = 0; i < 15; i++) {
                colorsOne.push(randomColor());
            }

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Inhouse Item Without LT',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: colorsOne[0],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Inhouse Item Without LT Target',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: colorsOne[1],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Purchased Item Without LT',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: colorsOne[2],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Purchased Item Without LT Target',
                    data: mySeriesFour,
                    type: 'line',
                    borderColor: colorsOne[3],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue AX PPO',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: colorsOne[4],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue AX PPO Target',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: colorsOne[5],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue MES PPO',
                    data: mySeriesSeven,
                    type: 'line',
                    borderColor: colorsOne[6],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue MES PPO Target',
                    data: mySeriesEight,
                    type: 'line',
                    borderColor: colorsOne[7],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue Shipping SO Lines',
                    data: mySeriesNine,
                    type: 'line',
                    borderColor: colorsOne[8],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue Shipping SO Lines Target',
                    data: mySeriesTen,
                    type: 'line',
                    borderColor: colorsOne[9],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue WO for SO',
                    data: mySeriesEleven,
                    type: 'line',
                    borderColor: colorsOne[10],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'AX WO Qty',
                    data: mySeriesTwelve,
                    type: 'line',
                    borderColor: colorsOne[11],
                    fill: true,
                }, {
                    label: 'AX WO Qty Target',
                    data: mySeriesThirteen,
                    type: 'line',
                    borderColor: colorsOne[12],
                    fill: true,
                }, {
                    label: 'Overdue Confirming SO Lines',
                    data: mySeriesFourteen,
                    type: 'line',
                    borderColor: colorsOne[13],
                    fill: true,
                }, {
                    label: 'Overdue Confirming SO Lines Target',
                    data: mySeriesFifteen,
                    type: 'line',
                    borderColor: colorsOne[14],
                    fill: true,
                }
                ]
            };

            var ctx = document.getElementById('chartPnKpiDaily');
            // combo bar/line chart
            myLineChartPnKpiDaily = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Planning & Logistics KPI - Daily'
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


function drawPnKpiDailyChartBackUp() {
    // destroy canvas and create it again
    $('#chartPnKpiDaily').remove();
    $('#divChartPnKpiDaily').append('<canvas id="chartPnKpiDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowPnKpiDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromPnKD").val(),
            "enddate": $("#txtEndToPnKD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels = [], mySeriesOne = [], mySeriesTwo = [], mySeriesThree = [], mySeriesFour = [],
                mySeriesFive = [], mySeriesSix = [], mySeriesSeven = [], mySeriesEight = [];
            $.each(data.listPnKD, function (i, item) {
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.PN_INH_NO_LT));
                mySeriesTwo.push(parseFloat(item.PN_PUR_NO_LT));
                mySeriesThree.push(parseFloat(item.PN_OVD_AX_PPO));
                mySeriesFour.push(parseFloat(item.PN_OVD_MES_PPO));
                mySeriesFive.push(parseFloat(item.PN_OVD_SO_LINE));
                mySeriesSix.push(parseFloat(item.PN_OVD_WO_FOR_SO));
                mySeriesSeven.push(parseFloat(item.PN_AX_WO_QTY));
                mySeriesEight.push(parseFloat(item.PN_OVD_SO_CONF));
            });

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Inhouse Item Without LT',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Purchased Item Without LT',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue AX PPO',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue MES PPO',
                    data: mySeriesFour,
                    type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue Shipping SO Lines',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Overdue WO for SO',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'AX WO Qty',
                    data: mySeriesSeven,
                    type: 'line',
                    borderColor: 'rgb(76, 175, 80)',
                    fill: true,
                }, {
                    label: 'Overdue Confirming SO Lines',
                    data: mySeriesEight,
                    type: 'line',
                    borderColor: 'rgb(205, 220, 57)',
                    fill: true,
                }
                ]
            };

            var ctx = document.getElementById('chartPnKpiDaily');
            // combo bar/line chart
            myLineChartPnKpiDaily = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Planning & Logistics KPI - Daily'
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
