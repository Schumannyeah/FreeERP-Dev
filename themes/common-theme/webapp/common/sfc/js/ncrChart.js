$(document).ready(function() {

    $('#txtStartFromNQBDT').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToNQBDT').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $.getJSON("/quality/control/vendorDesc", function(data) {
        $("#selectedVendorDefect").append("<option value='All'>All</option>");
        $("#selectedVendorDefect").append("<option value='Customer'>Only SO</option>");
        $("#selectedVendorDefect").append("<option value='KMCJ'>Only WO</option>");
        $("#selectedVendorDefect").append("<option value='Vendor'>Only PO</option>");
        $.each(data.vendors, function(i, item) {
            $("#selectedVendorDefect").append("<option value='" + item.vendorNumber + "'>" + item.vendor + "</option>");
        });
    });

    $('#txtStartFromNQCBD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToNQCBD').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    $.getJSON("/quality/control/vendorDesc", function(data) {
        $("#selectedVendorDecision").append("<option value='All'>All</option>");
        $("#selectedVendorDecision").append("<option value='Customer'>Only SO</option>");
        $("#selectedVendorDecision").append("<option value='KMCJ'>Only WO</option>");
        $("#selectedVendorDecision").append("<option value='Vendor'>Only PO</option>");
        $.each(data.vendors, function(i, item) {
            $("#selectedVendorDecision").append("<option value='" + item.vendorNumber + "'>" + item.vendor + "</option>");
        });
    });

} );

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawNcrQtyByDefectTypeChart() {
    // destroy canvas and create it again
    $('#chartNcrQtyByDefectType').remove();
    $('#divChartNcrQtyByDefectType').append('<canvas id="chartNcrQtyByDefectType"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowNcrQtyByDefectTypeChart",
        dataType: 'json',
        data: {
            "selectedVendorDefect": $("#selectedVendorDefect").val(),
            "startdate": $("#txtStartFromNQBDT").val(),
            "enddate": $("#txtEndToNQBDT").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[];
            $.each(data.ncrQtyByDefectType, function(i, item){
                mylabels.push(item.NCR_TYPE_ID);
                mySeriesOne.push(parseFloat(item.TYPE_QTY));
            });

            var selectedPartyDefect = data.selectedParty;

            var colorsOne = [];
            for (var i = 0; i < mylabels.length; i++) {
                colorsOne.push(randomColor());
            }

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Defect Qty;',
                    data: mySeriesOne,
                    // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    backgroundColor: colorsOne,
                    }
                ]
            };

            var ctx = document.getElementById('chartNcrQtyByDefectType');
            // doughnut
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'NCR Qty By Defect Type For - ' + selectedPartyDefect
                        },
                        legend: {
                            position: 'top',
                        }
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

function drawNcrQtyCostByDecisionChart() {
    // destroy canvas and create it again
    $('#chartNcrQtyCostByDecision').remove();
    $('#divChartNcrQtyCostByDecision').append('<canvas id="chartNcrQtyCostByDecision"></canvas>');

    var jsonData = $.ajax({
        method: "POST",
        url: "/quality/control/ShowNcrQtyCostByDecisionChart",
        dataType: 'json',
        data: {
            "selectedVendorDecision": $("#selectedVendorDecision").val(),
            "startdate": $("#txtStartFromVIM").val(),
            "enddate": $("#txtEndToVIM").val()
        }, success: function (data) {
            // Working on return data
            var mylabels=[], mySeriesOne=[], mySeriesTwo=[];
            $.each(data.ncrQtyCostByDecision, function(i, item){
                mylabels.push(item.DECISION_TYPE);
                mySeriesOne.push(parseFloat(item.TYPE_QTY));
                mySeriesTwo.push(parseFloat(item.TYPE_COST));
            });

            var selectedPartyDecision = data.selectedPartyDecision;

            var colorsTwo = [];
            for (var i = 0; i < mylabels.length; i++) {
                colorsTwo.push(randomColor());
            }

            var chartData = {
                labels: mylabels,
                datasets: [{
                    label: 'Decision Qty',
                    data: mySeriesOne,
                    type: 'bar',
                    // steppedLine: 'middle',
                    // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    backgroundColor: colorsTwo,
                    fill: true,
                    yAxisID: 'y',
                    },{
                    label: 'Decision Cost',
                    type: 'line',
                    // steppedLine: 'middle',
                    data: mySeriesTwo,
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    yAxisID: 'y1',
                    }
                ]
            };

            var ctx = document.getElementById('chartNcrQtyCostByDecision');
            // combo bar/line chart
            var myBarChartNcrQtyCost = new Chart(ctx, {
                type: 'line',	
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'NCR Qty & Cost By Decision For - ' + selectedPartyDecision
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