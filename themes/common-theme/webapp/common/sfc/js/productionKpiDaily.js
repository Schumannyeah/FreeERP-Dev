$(document).ready(function () {
    $('#txtStartFromPKD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 30)
    });

    $('#txtEndToPKD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date()
    });

    $('#txtStartFromORD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 30)
    });

    $('#txtEndToORD').datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        defaultDate: new Date()
    });

});

var myLineChartProdKpiDaily;

function toggleChartProdKpi() {
    $('#divChartProdKpiToggle').click(function () {
        $('#divChartProdKpiDaily').toggle();
    });    
}

function toggleSeriesOverdue() {
    // Get all of the datasets in the chart
    const datasets = myLineChartProdKpiDaily.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;
    });

    // Update the chart
    myLineChartProdKpiDaily.update();
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawProdKpiDailyChart() {
    // destroy canvas and create it again
    $('#chartProdKpiDaily').remove();
    $('#divChartProdKpiDaily').append('<canvas id="chartProdKpiDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowProdKpiDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromPKD").val(),
            "enddate": $("#txtEndToPKD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels = [], mySeriesOne = [], mySeriesTwo = [], mySeriesThree = [], mySeriesFour = [],
                mySeriesFive = [], mySeriesSix = [], mySeriesSeven = [], mySeriesEight = [],
                mySeriesNine = [], mySeriesTen = [], mySeriesEleven = [], mySeriesTwelve = [],
                mySeriesThirteen = [], mySeriesFourteen = [], mySeriesFifteen = [], mySeriesSixteen = [];
            $.each(data.listPKD, function (i, item) {
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.PD_NON_CONF_WO));
                mySeriesTwo.push(parseFloat(item.PD_OVD_WL_NN_WH));
                mySeriesThree.push(parseFloat(item.PD_OVD_WL_NN_CC));
                mySeriesFour.push(parseFloat(item.PD_OVD_WL_NN_CCT));
                mySeriesFive.push(parseFloat(item.PD_OVD_WL_NN_SI));
                mySeriesSix.push(parseFloat(item.PD_OVD_WL_NN_SIT));
                mySeriesSeven.push(parseFloat(item.PD_OVD_WL_NN_SB));
                mySeriesEight.push(parseFloat(item.PD_OVD_WL_NN_SBT));
                mySeriesNine.push(parseFloat(item.PD_OVD_WL_NN_MF));
                mySeriesTen.push(parseFloat(item.PD_OVD_WL_NN_MFT));
                mySeriesEleven.push(parseFloat(item.PD_OVD_WL_NN_MM));
                mySeriesTwelve.push(parseFloat(item.PD_OVD_WL_NN_MMT));
                mySeriesThirteen.push(parseFloat(item.PD_OVD_WL_NN_TD));
                mySeriesFourteen.push(parseFloat(item.PD_WO_MISS_MAT));
                mySeriesFifteen.push(parseFloat(item.PD_WO_MISS_CAP));
                mySeriesSixteen.push(parseFloat(item.PD_OVD_WO_NC_WH));
            });

            var colorsOne = [];
            for (var i = 0; i < 16; i++) {
                colorsOne.push(randomColor());
            }

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Non Confirmed WO Qty',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: colorsOne[0],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Warehouse',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: colorsOne[1],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Cabinet Console',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: colorsOne[2],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Cabinet Console Target',
                    data: mySeriesFour,
                    type: 'line',
                    borderColor: colorsOne[3],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Sensor Instrument',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: colorsOne[4],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Sensor Instrument Target',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: colorsOne[5],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Switchboard',
                    data: mySeriesSeven,
                    type: 'line',
                    borderColor: colorsOne[6],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Switchboard Target',
                    data: mySeriesEight,
                    type: 'line',
                    borderColor: colorsOne[7],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Metal Frame',
                    data: mySeriesNine,
                    type: 'line',
                    borderColor: colorsOne[8],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Metal Frame Target',
                    data: mySeriesTen,
                    type: 'line',
                    borderColor: colorsOne[9],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Machining',
                    data: mySeriesEleven,
                    type: 'line',
                    borderColor: colorsOne[10],
                    fill: true,
                }, {
                    label: 'Overdue Worklist Machining Target',
                    data: mySeriesTwelve,
                    type: 'line',
                    borderColor: colorsOne[11],
                    fill: true,
                }, {
                    label: 'Overdue Worklist TSD',
                    data: mySeriesThirteen,
                    type: 'line',
                    borderColor: colorsOne[12],
                    fill: true,
                }, {
                    label: 'WO Missing Materials',
                    data: mySeriesFourteen,
                    type: 'line',
                    borderColor: colorsOne[13],
                    fill: true,
                }, {
                    label: 'WO Missing Capacity',
                    data: mySeriesFifteen,
                    type: 'line',
                    borderColor: colorsOne[14],
                    fill: true,
                }, {
                    label: 'WO Not Ended But Done',
                    data: mySeriesSixteen,
                    type: 'line',
                    borderColor: colorsOne[15],
                    fill: true,
                }
                ]
            };

            var ctx = document.getElementById('chartProdKpiDaily');
            // combo bar/line chart
            myLineChartProdKpiDaily = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Production KPI - Daily'
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

// Function that generates the toggle function for the chart
function generateToggleFunction(chart) {
    return function () {
        chart.legend.toggle();
    };
}



























var myLineChartOdReasonDaily;

function toggleChartReason() {
    $('#divChartOdReasonToggle').click(function () {
        $('#divChartOdReasonDaily').toggle();
    });
}

function toggleSeriesOdReason() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;
    });

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function showSeriesAll() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Iterate over all of the other datasets and set their visibility to true (i.e., hide them)
    for (let i = 0; i < datasets.length; i++) {
        datasets[i].hidden = false;
    }

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function showSeriesPlanning() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Set the visibility of the first and third datasets to false (i.e., show them)
    datasets[0].hidden = false;
    datasets[1].hidden = false;
    datasets[2].hidden = false;
    datasets[3].hidden = false;
    datasets[4].hidden = false;

    // Iterate over all of the other datasets and set their visibility to true (i.e., hide them)
    for (let i = 0; i < datasets.length; i++) {
        if (i > 4) {
            datasets[i].hidden = true;
        }
    }

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function showSeriesProduction() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Set the visibility of the first and third datasets to false (i.e., show them)
    datasets[5].hidden = false;
    datasets[6].hidden = false;
    datasets[7].hidden = false;
    datasets[8].hidden = false;
    datasets[9].hidden = false;
    datasets[10].hidden = false;
    datasets[11].hidden = false;
    datasets[12].hidden = false;

    // Iterate over all of the other datasets and set their visibility to true (i.e., hide them)
    for (let i = 0; i < datasets.length; i++) {
        if (i > 12 || i < 5) {
            datasets[i].hidden = true;
        }
    }

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function showSeriesQC() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Set the visibility of the first and third datasets to false (i.e., show them)
    datasets[13].hidden = false;
    datasets[14].hidden = false;
    datasets[15].hidden = false;

    // Iterate over all of the other datasets and set their visibility to true (i.e., hide them)
    for (let i = 0; i < datasets.length; i++) {
        if (i > 15 || i < 13) {
            datasets[i].hidden = true;
        }
    }

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function showSeriesSCM() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Set the visibility of the first and third datasets to false (i.e., show them)
    datasets[16].hidden = false;
    datasets[17].hidden = false;
    datasets[18].hidden = false;

    // Iterate over all of the other datasets and set their visibility to true (i.e., hide them)
    for (let i = 0; i < datasets.length; i++) {
        if (i > 18 || i < 16) {
            datasets[i].hidden = true;
        }
    }

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function showSeriesTSD() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Set the visibility of the first and third datasets to false (i.e., show them)
    datasets[19].hidden = false;
    datasets[20].hidden = false;
    datasets[21].hidden = false;
    datasets[22].hidden = false;
    datasets[23].hidden = false;
    datasets[24].hidden = false;

    // Iterate over all of the other datasets and set their visibility to true (i.e., hide them)
    for (let i = 0; i < datasets.length; i++) {
        if (i > 24 || i < 19) {
            datasets[i].hidden = true;
        }
    }

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function showSeriesWarehouse() {
    // Get all of the datasets in the chart
    const datasets = myLineChartOdReasonDaily.data.datasets;

    // Set the visibility of the first and third datasets to false (i.e., show them)
    datasets[25].hidden = false;
    datasets[26].hidden = false;

    // Iterate over all of the other datasets and set their visibility to true (i.e., hide them)
    for (let i = 0; i < datasets.length; i++) {
        if (i < 25) {
            datasets[i].hidden = true;
        }
    }

    // Update the chart
    myLineChartOdReasonDaily.update();
}

function drawOverdueReasonDailyChart() {
    // destroy canvas and create it again
    $('#chartOdReasonDaily').remove();
    $('#divChartOdReasonDaily').append('<canvas id="chartOdReasonDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowOdReasonDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromORD").val(),
            "enddate": $("#txtEndToORD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels = [], mySeriesOne = [], mySeriesTwo = [], mySeriesThree = [], mySeriesFour = [],
                mySeriesFive = [], mySeriesSix = [], mySeriesSeven = [], mySeriesEight = [],
                mySeriesNine = [], mySeriesTen = [], mySeriesEleven = [], mySeriesTwelve = [],
                mySeriesThirteen = [], mySeriesFourteen = [], mySeriesFifteen = [], mySeriesSixteen = [],
                mySeriesSeventeen = [], mySeriesEighteen = [], mySeriesNineteen = [], mySeriesTwenty = [],
                mySeriesTwentyone = [], mySeriesTwentytwo = [], mySeriesTwentythree = [],
                mySeriesTwentyfour = [], mySeriesTwentyfive = [],
                mySeriesTwentySix = [], mySeriesTwentySeven = [];
            $.each(data.listODR, function (i, item) {
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.PD_WO_RES_CP));
                mySeriesTwo.push(parseFloat(item.PD_WO_RES_ECN));
                mySeriesThree.push(parseFloat(item.PD_WO_RES_LC));
                mySeriesFour.push(parseFloat(item.PD_WO_RES_MM));
                mySeriesNineteen.push(parseFloat(item.PD_WO_DPT_PN));

                mySeriesFive.push(parseFloat(item.PD_WO_RES_PC));
                mySeriesSix.push(parseFloat(item.PD_WO_RES_PCT));
                mySeriesSeven.push(parseFloat(item.PD_WO_RES_PQ));
                mySeriesEight.push(parseFloat(item.PD_WO_RES_PQT));
                mySeriesNine.push(parseFloat(item.PD_WO_RES_PT));
                mySeriesTen.push(parseFloat(item.PD_WO_RES_PTT));
                mySeriesTwenty.push(parseFloat(item.PD_WO_DPT_PD));
                mySeriesTwentyone.push(parseFloat(item.PD_WO_DPT_PDT));

                mySeriesEleven.push(parseFloat(item.PD_WO_RES_NCR));
                mySeriesTwentySeven.push(parseFloat(item.QC_WO_RES_FQC));
                mySeriesTwentytwo.push(parseFloat(item.PD_WO_DPT_QC));

                mySeriesTwelve.push(parseFloat(item.PD_WO_RES_SD));
                mySeriesThirteen.push(parseFloat(item.PD_WO_RES_SQ));
                mySeriesTwentythree.push(parseFloat(item.PD_WO_DPT_PM));

                mySeriesFourteen.push(parseFloat(item.PD_WO_RES_MD));
                mySeriesFifteen.push(parseFloat(item.PD_WO_RES_MR));
                mySeriesSixteen.push(parseFloat(item.PD_WO_RES_BE));
                mySeriesTwentySix.push(parseFloat(item.ME_WO_RES_IAT));
                mySeriesSeventeen.push(parseFloat(item.PD_WO_RES_MT));
                mySeriesTwentyfour.push(parseFloat(item.PD_WO_DPT_TSD));

                mySeriesEighteen.push(parseFloat(item.PD_WO_RES_WHD));
                mySeriesTwentyfive.push(parseFloat(item.PD_WO_DPT_WHD));
            });

            var colorsOne = [];
            for (var i = 0; i < 27; i++) {
                colorsOne.push(randomColor());
            }

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Customer Postponement',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: colorsOne[0],
                    fill: true,
                }, {
                    label: 'Engineering Change Note',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: colorsOne[1],
                    fill: true,
                }, {
                    label: 'Logitics and Customs',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: colorsOne[2],
                    fill: true,
                }, {
                    label: 'Missing Material',
                    data: mySeriesFour,
                    type: 'line',
                    borderColor: colorsOne[3],
                    fill: true,
                }, {
                    label: 'Responsible By Planning',
                    data: mySeriesNineteen,
                    type: 'line',
                    borderColor: colorsOne[18],
                    fill: true,
                }

                    , {
                    label: 'Production Capacity',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: colorsOne[4],
                    fill: true,
                }, {
                    label: 'Production Capacity Target',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: colorsOne[5],
                    fill: true,
                }, {
                    label: 'Production Quality',
                    data: mySeriesSeven,
                    type: 'line',
                    borderColor: colorsOne[6],
                    fill: true,
                }, {
                    label: 'Production Quality Target',
                    data: mySeriesEight,
                    type: 'line',
                    borderColor: colorsOne[7],
                    fill: true,
                }, {
                    label: 'Production Tools',
                    data: mySeriesNine,
                    type: 'line',
                    borderColor: colorsOne[8],
                    fill: true,
                }, {
                    label: 'Production Tools Target',
                    data: mySeriesTen,
                    type: 'line',
                    borderColor: colorsOne[9],
                    fill: true,
                }, {
                    label: 'Responsible By Production',
                    data: mySeriesTwenty,
                    type: 'line',
                    borderColor: colorsOne[19],
                    fill: true,
                }, {
                    label: 'Responsible By Production Target',
                    data: mySeriesTwentyone,
                    type: 'line',
                    borderColor: colorsOne[20],
                    fill: true,
                }

                    , {
                    label: 'Non Confirmity Report',
                    data: mySeriesEleven,
                    type: 'line',
                    borderColor: colorsOne[10],
                    fill: true,
                }, {
                    label: 'Final QC Delay',
                    data: mySeriesTwentySeven,
                    type: 'line',
                    borderColor: colorsOne[26],
                    fill: true,
                }, {
                    label: 'Responsible By QC',
                    data: mySeriesTwentytwo,
                    type: 'line',
                    borderColor: colorsOne[21],
                    fill: true,
                }

                    , {
                    label: 'Supplier Delay',
                    data: mySeriesTwelve,
                    type: 'line',
                    borderColor: colorsOne[11],
                    fill: true,
                }, {
                    label: 'Supplier Quality',
                    data: mySeriesThirteen,
                    type: 'line',
                    borderColor: colorsOne[12],
                    fill: true,
                }, {
                    label: 'Responsible By Sourcing',
                    data: mySeriesTwentythree,
                    type: 'line',
                    borderColor: colorsOne[22],
                    fill: true,
                }

                    , {
                    label: 'Missing Drawing',
                    data: mySeriesFourteen,
                    type: 'line',
                    borderColor: colorsOne[13],
                    fill: true,
                }, {
                    label: 'Missing Route',
                    data: mySeriesFifteen,
                    type: 'line',
                    borderColor: colorsOne[14],
                    fill: true,
                }, {
                    label: 'BOM Error',
                    data: mySeriesSixteen,
                    type: 'line',
                    borderColor: colorsOne[15],
                    fill: true,
                }, {
                    label: 'IAT Delay',
                    data: mySeriesTwentySix,
                    type: 'line',
                    borderColor: colorsOne[25],
                    fill: true,
                }, {
                    label: 'Missing Third Party Parts',
                    data: mySeriesSeventeen,
                    type: 'line',
                    borderColor: colorsOne[16],
                    fill: true,
                }, {
                    label: 'Responsible By TSD',
                    data: mySeriesTwentyfour,
                    type: 'line',
                    borderColor: colorsOne[23],
                    fill: true,
                }

                    , {
                    label: 'Warehouse Delay',
                    data: mySeriesEighteen,
                    type: 'line',
                    borderColor: colorsOne[17],
                    fill: true,
                }, {
                    label: 'Responsible By Warehouse',
                    data: mySeriesTwentyfive,
                    type: 'line',
                    borderColor: colorsOne[24],
                    fill: true,
                }
                ]
            };

            var ctx = document.getElementById('chartOdReasonDaily');
            // combo bar/line chart
            myLineChartOdReasonDaily = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    animation: {
                        onComplete: () => {
                            delayed = true;
                        },
                        delay: (context) => {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                delay = context.dataIndex * 600 + context.datasetIndex * 200;
                            }
                            return delay;
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Overdue Reasons Analysis - Daily'
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