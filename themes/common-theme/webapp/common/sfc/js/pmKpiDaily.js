$(document).ready(function () {
    $('#txtStartFromPmKD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 30)
    });

    $('#txtEndToPmKD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date()
    });

});

var myLineChartPmKpiDaily;

function toggleSeries() {
    // Get all of the datasets in the chart
    const datasets = myLineChartPmKpiDaily.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;
    });

    // Update the chart
    myLineChartPmKpiDaily.update();
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawPmKpiDailyChart() {
    // destroy canvas and create it again
    $('#chartPmKpiDaily').remove();
    $('#divChartPmKpiDaily').append('<canvas id="chartPmKpiDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowPmKpiDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromPmKD").val(),
            "enddate": $("#txtEndToPmKD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels = [], mySeriesOne = [], mySeriesTwo = [], mySeriesThree = [], mySeriesFour = [],
                mySeriesFive = [], mySeriesSix = [], mySeriesSeven = [], mySeriesEight = [],
                mySeriesNine = [], mySeriesTen = [], mySeriesEleven = [], mySeriesTwelve = [],
                mySeriesThirteen = [], mySeriesFourteen = [];
            $.each(data.listPmKD, function (i, item) {
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.PM_ITEM_WO_VEND));
                mySeriesTwo.push(parseFloat(item.PM_ITEM_WO_VENDT));
                mySeriesThree.push(parseFloat(item.PM_ITEM_WO_PRIC));
                mySeriesFour.push(parseFloat(item.PM_ITEM_WO_PRICT));
                mySeriesFive.push(parseFloat(item.PM_LINE_WO_CONF));
                mySeriesSix.push(parseFloat(item.PM_LINE_WO_CONFT));
                mySeriesSeven.push(parseFloat(item.PM_LINE_DEL_LATE));
                mySeriesEight.push(parseFloat(item.PM_LINE_DEL_LATET));
                mySeriesNine.push(parseFloat(item.PM_LINE_INV_LATE));
                mySeriesTen.push(parseFloat(item.PM_LINE_INV_LATET));
                mySeriesEleven.push(parseFloat(item.PM_VD_NOT_INV));
                mySeriesTwelve.push(parseFloat(item.PM_VD_NOT_INVT));
                mySeriesThirteen.push(parseFloat(item.PN_SD_NOT_INV));
                mySeriesFourteen.push(parseFloat(item.PN_SD_NOT_INVT));
            });

            var colorsOne = [];
            for (var i = 0; i < 14; i++) {
                colorsOne.push(randomColor());
            }

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Purchased Item Without Primary Vendor',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: colorsOne[0],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Purchased Item Without Primary Vendor Target',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: colorsOne[1],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Purchased Item Without Purchase Price',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: colorsOne[2],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Purchased Item Without Purchase Price Target',
                    data: mySeriesFour,
                    type: 'line',
                    borderColor: colorsOne[3],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Without Confirmed Delivery Date',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: colorsOne[4],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Without Confirmed Delivery Date Target',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: colorsOne[5],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Delivered Late',
                    data: mySeriesSeven,
                    type: 'line',
                    borderColor: colorsOne[6],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Delivered Late Target',
                    data: mySeriesEight,
                    type: 'line',
                    borderColor: colorsOne[7],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Invoiced Late',
                    data: mySeriesNine,
                    type: 'line',
                    borderColor: colorsOne[8],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Invoiced Late Target',
                    data: mySeriesTen,
                    type: 'line',
                    borderColor: colorsOne[9],
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Delivered But not Invoiced',
                    data: mySeriesEleven,
                    type: 'line',
                    borderColor: colorsOne[10],
                    fill: true,
                    yAxisID: 'y1',
                }, {
                    label: 'PO Delivered But not Invoiced Target',
                    data: mySeriesTwelve,
                    type: 'line',
                    borderColor: colorsOne[11],
                    fill: true,
                    yAxisID: 'y1',
                }, {
                    label: 'SO Shipped But not Invoiced',
                    data: mySeriesThirteen,
                    type: 'line',
                    borderColor: colorsOne[12],
                    fill: true,
                    yAxisID: 'y1',
                }, {
                    label: 'SO Shipped But not Invoiced Target',
                    data: mySeriesFourteen,
                    type: 'line',
                    borderColor: colorsOne[13],
                    fill: true,
                    yAxisID: 'y1',
                }
                ]
            };

            var ctx = document.getElementById('chartPmKpiDaily');
            // combo bar/line chart
            myLineChartPmKpiDaily = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Supply Chain Management KPI - Daily'
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


function drawPmKpiDailyChartBackUp() {
    // destroy canvas and create it again
    $('#chartPmKpiDaily').remove();
    $('#divChartPmKpiDaily').append('<canvas id="chartPmKpiDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowPmKpiDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromPmKD").val(),
            "enddate": $("#txtEndToPmKD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels = [], mySeriesOne = [], mySeriesTwo = [], mySeriesThree = [], mySeriesFour = [],
                mySeriesFive = [], mySeriesSix = [], mySeriesSeven = [];
            $.each(data.listPmKD, function (i, item) {
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.PM_ITEM_WO_VEND));
                mySeriesTwo.push(parseFloat(item.PM_ITEM_WO_PRIC));
                mySeriesThree.push(parseFloat(item.PM_LINE_WO_CONF));
                mySeriesFour.push(parseFloat(item.PM_LINE_DEL_LATE));
                mySeriesFive.push(parseFloat(item.PM_LINE_INV_LATE));
                mySeriesSix.push(parseFloat(item.PM_VD_NOT_INV));
                mySeriesSeven.push(parseFloat(item.PN_SD_NOT_INV));
            });

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Purchased Item Without Primary Vendor',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'Purchased Item Without Purchase Price',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Without Confirmed Delivery Date',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Delivered Late',
                    data: mySeriesFour,
                    type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Lines Invoiced Late',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                }, {
                    label: 'PO Delivered But not Invoiced',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y1',
                }, {
                    label: 'SO Shipped But not Invoiced',
                    data: mySeriesSeven,
                    type: 'line',
                    borderColor: 'rgb(76, 175, 80)',
                    fill: true,
                    yAxisID: 'y1',
                }
                ]
            };

            var ctx = document.getElementById('chartPmKpiDaily');
            // combo bar/line chart
            myLineChartPmKpiDaily = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Supply Chain Management KPI - Daily'
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
