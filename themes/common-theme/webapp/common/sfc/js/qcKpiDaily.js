$(document).ready(function() {
    $('#txtStartFromQcKD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 30)
      });
    
    $('#txtEndToQcKD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

} );

function drawQcKpiDailyChart() {
    // destroy canvas and create it again
    $('#chartQcKpiDaily').remove();
    $('#divChartQcKpiDaily').append('<canvas id="chartQcKpiDaily"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowQcKpiDailyChart",
        dataType: 'json',
        data: {
            "startdate": $("#txtStartFromQcKD").val(),
            "enddate": $("#txtEndToQcKD").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[];
            $.each(data.listQcKD, function(i, item){
                mylabels.push(moment(item.CAL_DATE).format('YYYY-MM-DD'));
                // mylabels = mylabels.map(date => moment(date).format('YYYY-MM-DD'));
                mySeriesOne.push(parseFloat(item.QC_OPEN_NCR_SO));
                mySeriesTwo.push(parseFloat(item.QC_OPEN_NCR_PO));
                mySeriesThree.push(parseFloat(item.QC_OPEN_NCR_WO));
            });

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Open NCR Qty - SO',
                    data: mySeriesOne,
                    type: 'line',
                    borderColor: 'rgb(244, 67, 54)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Open NCR Qty - PO',
                    data: mySeriesTwo,
                    type: 'line',
                    borderColor: 'rgb(233, 30, 99)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Open NCR Qty - WO',
                    data: mySeriesThree,
                    type: 'line',
                    borderColor: 'rgb(156, 39, 176)',
                    fill: true,
                    yAxisID: 'y',
                    }
                ]
            };

            var ctx = document.getElementById('chartQcKpiDaily');
            // combo bar/line chart
            var myLineChartQcKpiDaily = new Chart(ctx, {
                type: 'line',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Quality Check KPI - Daily'
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
