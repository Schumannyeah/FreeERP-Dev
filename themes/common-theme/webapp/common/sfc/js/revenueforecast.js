$(document).ready(function() {
    // $(window).resize(setTimeout(respondCanvas, 500));
    //GetChartData();
    

    // bind the datetimepicker
    $('#txtStartFrom').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
    
    $('#txtEndTo').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });

    respondCanvas();
} );

function respondCanvas() {
    // destroy canvas and create it again
    $('#myRevChart').remove();
    $('#chartRevForecast').append('<canvas id="myRevChart" width="800" height="600"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/sfa/control/ShowRevenueForecastChart",
        dataType: 'json',
        data: {
            "selectedCostCenter": $("#selectedCostCenter").val(),
            "startdate": $("#txtStartFrom").val(),
            "enddate": $("#txtEndTo").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], myActual=[], myBacklog=[], myBudget=[], myForecast=[];
            $.each(data.listUstKpi, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                myActual.push(parseFloat(item.ACTUAL));
                myBacklog.push(parseFloat(item.BACKLOG));
                myBudget.push(parseFloat(item.BUDGET));
                myForecast.push(parseFloat(item.FORECAST));
            });
            // console.log(mylabels);
            // console.log(myActual);
            // console.log(myBacklog);
            // console.log(myBudget);
            // console.log(myForecast);

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Actual Revenue',
                    data: myActual,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    stack: 'Stack 0',
                    // type: 'bar',
                    // stack: 'combined',
                    // label: 'Actual Revenue',
                    // lineTension: 1,
                    // backgroundColor: "rgba(75,192,192,0.4)",
                    // borderColor: "rgba(75,192,192,1)",
                    // borderCapStyle: 'butt',
                    // borderDash: [],
                    // borderDashOffset: 0.0,
                    // borderJoinStyle: 'miter',
                    // pointBorderColor: "rgba(75,192,192,1)",
                    // pointBackgroundColor: "#fff",
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 5,
                    // pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    // pointHoverBorderColor: "rgba(220,220,220,1)",
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    // pointHitRadius: 10,
                    // data: myActual,
                    // spanGaps: false
                    },{
                    label: 'Order Backlog',
                    data: myBacklog,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    stack: 'Stack 0',
                    // type: 'bar',
                    // stack: 'combined',
                    // label: 'Order Backlog',
                    // lineTension: 1,
                    // backgroundColor: "rgba(255, 159, 64, 0.2)",
                    // borderColor: "rgba(75,192,192,1)",
                    // borderCapStyle: 'butt',
                    // borderDash: [],
                    // borderDashOffset: 0.0,
                    // borderJoinStyle: 'miter',
                    // pointBorderColor: "rgba(75,192,192,1)",
                    // pointBackgroundColor: "#fff",
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 5,
                    // pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    // pointHoverBorderColor: "rgba(220,220,220,1)",
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    // pointHitRadius: 10,
                    // data: myBacklog,
                    // spanGaps: false
                    },{
                    label: 'FORECAST',
                    data: myForecast,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    stack: 'Stack 0',
                    // type: 'bar',
                    // stack: 'combined',
                    // label: 'FORECAST',
                    // lineTension: 1,
                    // backgroundColor: "rgba(153, 102, 255, 0.2)",
                    // borderColor: "rgba(75,192,192,1)",
                    // borderCapStyle: 'butt',
                    // borderDash: [],
                    // borderDashOffset: 0.0,
                    // borderJoinStyle: 'miter',
                    // pointBorderColor: "rgba(75,192,192,1)",
                    // pointBackgroundColor: "#fff",
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 5,
                    // pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    // pointHoverBorderColor: "rgba(220,220,220,1)",
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    // pointHitRadius: 10,
                    // data: myForecast,
                    // spanGaps: false
                    },{
                    type: 'line',
                    stack: 'Stack 0',
                    label: "Budget",
                    data: myBudget,
                    steppedLine: 'middle',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    stepped: true
                    }
                ]
            };

            var ctx = document.getElementById('myRevChart');
            var myBarChart = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Revenue Chart - KMCJ'
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
            // respondCanvas();
        }
    });
}

var GetChartData = function () {
    $.ajax({
        url: "/sfa/control/ShowRevenueForecastChart",
        method: 'POST',
        dataType: 'json',
        data: {
            "selectedCostCenter": $("#selectedCostCenter").val(),
            "startdate": $("#txtStartFrom").val(),
            "enddate": $("#txtEndTo").val()
        },
        success: function (d) {
            // Working on return data
            var mylabels=[], myActual=[], myBudget=[], myForecast=[];
            $.each(d.listUstKpi, function(i, item){
                mylabels.push(item.YEAR_MONTH);
                myActual.push(parseFloat(item.ACTUAL));
                myBudget.push(parseFloat(item.BUDGET));
                myForecast.push(parseFloat(item.FORECAST));
            });
            console.log(mylabels);
            console.log(myActual);

            var chartData = {
                labels: mylabels,
                datasets: [
                    {
                    type: 'bar',
                    label: 'Actual Revenue',
                    lineTension: 1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: myActual,
                    spanGaps: false
                    },{
                    type: 'bar',
                    label: 'FORECAST',
                    lineTension: 1,
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: myForecast,
                    spanGaps: false
                    },{
                    type: 'line',
                    label: "Budget",
                    data: myBudget,
                    steppedLine: 'middle',
                    borderColor: window.chartColors.yellow,
                    borderWidth: 2,
                    fill: false
                    }
                ]
            };

            var ctx = document.getElementById('myRevChart');
            var myBarChart = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Revenue Actual Vs Forecast'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    },
                    maintainAspectRatio: true
                }
            });  
            // respondCanvas();
        }
    });
};