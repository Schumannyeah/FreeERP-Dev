$(document).ready(function() {
    $('#txtStartFromMeKD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 30)
      });
    
    $('#txtEndToMeKD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

} );

var myLineChartMeKpiDaily;

function toggleSeries() {
    // Get all of the datasets in the chart
    const datasets = myLineChartMeKpiDaily.data.datasets;

    // Iterate over all of the datasets and toggle their visibility    
    datasets.forEach((dataset) => {         
        // Toggle the visibility of the dataset        
        dataset.hidden = !dataset.hidden;     
    });

    // Update the chart
    myLineChartMeKpiDaily.update();
}

function drawMeKpiDailyChart() {
    // destroy canvas and create it again
    $('#chartMeKpiDaily').remove();
    $('#divChartMeKpiDaily').append('<canvas id="chartMeKpiDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowMeKpiDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromMeKD").val(),
            "enddate": $("#txtEndToMeKD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[],
                mySeriesFive=[], mySeriesSix=[], mySeriesSeven=[];
            $.each(data.listMeKD, function(i, item){
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.ME_INH_NO_BOM));
                mySeriesTwo.push(parseFloat(item.ME_INH_NO_ROUTE));
                mySeriesThree.push(parseFloat(item.ME_INH_NO_DWG));
                mySeriesFour.push(parseFloat(item.ME_NO_IGI));
                mySeriesFive.push(parseFloat(item.ME_INH_CONF_LATE));
                mySeriesSix.push(parseFloat(item.ME_INH_CONF_TOTAL));
                mySeriesSeven.push(parseFloat(item.ME_INH_CONF_RATE));
            });

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'No BOM ID Qty',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'No Route ID Qty',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'No DWG Qty',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'No Item Group Item Qty',
                    data: mySeriesFour,
                    type: 'line',
                    borderColor: 'rgb(103, 58, 183)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'ME Late Conf WO Qty',
                    data: mySeriesFive,
                    type: 'line',
                    borderColor: 'rgb(159, 168, 218)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Total Active WO Qty',
                    data: mySeriesSix,
                    type: 'line',
                    borderColor: 'rgb(0, 188, 212)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'ME WO Conf OnTime Rate',
                    data: mySeriesSeven,
                    type: 'line',
                    borderColor: 'rgb(76, 175, 80)',
                    fill: true,
                    yAxisID: 'y1',
                    }
                ]
            };

            var ctx = document.getElementById('chartMeKpiDaily');
            // combo bar/line chart
            myLineChartMeKpiDaily = new Chart(ctx, {
                type: 'line',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'ME KPI - Daily'
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
