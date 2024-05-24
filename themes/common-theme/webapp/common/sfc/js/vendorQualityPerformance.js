$(document).ready(function() {

    $('#txtStartFromVQP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToVQP').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $.getJSON("/quality/control/buildIdDesc", function(data) {
        $("#selectedBuildId").append("<option value='All'>All Industries</option>");
        $.each(data.builds, function(i, item) {
            $("#selectedBuildId").append("<option value='" + item.enumId + "'>" + item.description + "</option>");
        });
    });

    $('#txtStartFromVIM').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToVIM').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $.getJSON("/quality/control/vendorDesc", function(data) {
        $("#selectedVendor").append("<option value='All'>All</option>");
        $.each(data.vendors, function(i, item) {
            $("#selectedVendor").append("<option value='" + item.vendorNumber + "'>" + item.vendor + "</option>");
        });
    });

} );

function drawVendorQualityPerformanceChart() {
    // destroy canvas and create it again
    $('#chartVendorQualityPerformance').remove();
    $('#divChartVendorQualityPerformance').append('<canvas id="chartVendorQualityPerformance"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowVendorQualityPerformanceChart",
        dataType: 'json',
        data: {
            "selectedBuildId": $("#selectedBuildId").val(),
            "startdate": $("#txtStartFromVQP").val(),
            "enddate": $("#txtEndToVQP").val(),
            "batchQty": $("#txtBatchQty").val(),
            "vendorPeriodAmount": $("#txtVendorPeriodAmount").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.vendPerformance, function(i, item){
                mylabels.push(item.SUPPLIER_NAME);
                mySeriesOne.push(parseFloat(item.CHECKED_LINE_QTY));
                mySeriesTwo.push(parseFloat(item.FAIL_LINE_QTY));
                mySeriesThree.push(parseFloat(item.PASS_RATE));
                mySeriesFour.push(parseFloat(item.PASS_TARGET));
            });

            var buildid = data.buildid;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'CHECKED QTY',
                    data: mySeriesOne,
                    type: 'bar',
                    // steppedLine: 'middle',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'FAILED QTY',
                    data: mySeriesTwo,
                    type: 'bar',
                    borderColor: 'rgb(255, 159, 64)',
                    // stack: 'Stack 0',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'PASS_RATE',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    yAxisID: 'y1',
                    },{
                    label: 'TARGET_RATE',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesFour,
                    borderColor: 'rgb(0, 191, 165)',
                    fill: false,
                    yAxisID: 'y1',
                    }
                ]
            };

            var ctx = document.getElementById('chartVendorQualityPerformance');
            // combo bar/line chart
            var myBarChartLoadCapDept = new Chart(ctx, {
                type: 'line',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Vendor Quality Performance'
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

function drawVendIqcMonChart() {
    // destroy canvas and create it again
    $('#chartVendIqcMon').remove();
    $('#divChartVendIqcMon').append('<canvas id="chartVendIqcMon"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowVendorIqcRateMonChart",
        dataType: 'json',
        data: {
            "selectedVendor": $("#selectedVendor").val(),
            "startdate": $("#txtStartFromVIM").val(),
            "enddate": $("#txtEndToVIM").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[], mySeriesThree=[], mySeriesFour=[];
            $.each(data.vendIqcRateMon, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                mySeriesOne.push(parseFloat(item.CHECKED_LINE_QTY));
                mySeriesTwo.push(parseFloat(item.FAIL_LINE_QTY));
                mySeriesThree.push(parseFloat(item.PASS_RATE));
                mySeriesFour.push(parseFloat(item.PASS_TARGET));
            });

            var vendorNumber = data.vendorNumber;

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'CHECKED QTY',
                    data: mySeriesOne,
                    type: 'bar',
                    // steppedLine: 'middle',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'FAILED QTY',
                    data: mySeriesTwo,
                    type: 'bar',
                    borderColor: 'rgb(255, 159, 64)',
                    // stack: 'Stack 0',
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'PASS_RATE',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesThree,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    yAxisID: 'y1',
                    },{
                    label: 'TARGET_RATE',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesFour,
                    borderColor: 'rgb(0, 191, 165)',
                    fill: false,
                    yAxisID: 'y1',
                    }
                ]
            };

            var ctx = document.getElementById('chartVendIqcMon');
            // combo bar/line chart
            var myBarChartVendIqcRatMon = new Chart(ctx, {
                type: 'line',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Vendor ' + vendorNumber + ' IQC Rate By Month'
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