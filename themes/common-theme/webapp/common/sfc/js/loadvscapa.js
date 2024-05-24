var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {
    //automatic load work center list when loaded
    showWorkCenterList();

    // bind the datetimepicker
    $('#txtStartFrom').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
    
    $('#txtEndTo').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
} );

var d1;
var d2;
function dayDiffBetween2Dates(d1,d2){
    var timeDiff = Math.abs(d2.getTime() - d1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

function showWorkCenterList(){
    var myWCL = $('#tableWorkCenter').DataTable({
            "destroy": true,
            "processing": true,
            // "serverSide": false,
            "ordering": true,
            // "scrollY": '50vh',
            // "scrollX": true,
            // "scrollCollapse": true,
            // "paging": false,
            "info": true,
            "searching": true,
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/manufacturing/control/ShowWorkCenterList",
                // "data": function(d){
                //     d.codeNr = $("#codeNr").val();
                //     },
                "dataSrc": function(d){
                    return d.listWorkCenter;
                },
                "type": "POST"
            },
            // select:"single",
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "WORK_CENTER_ID" },
                { data: "WORK_CENTER_NAME" },
                { data: "WORK_CENTER_TYPE_ID" },
                { data: "DEPARTMENT_ID" },
                { data: "DEPARTMENT_NAME" },
                { data: "RESOURCE_BARCODE" }
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
        });

        // Row selection (multiple rows)
        $('#tableWorkCenter tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tableWorkCenter tbody').on('dblclick', 'tr', function () {
            // var data = myWCL.row( this ).data();
            var tr = $(this).closest('tr');
            var row = myWCL.row(tr);
            // console.log(row);
            // console.log(row.data());
            // console.log(row.data().WORK_CENTER_NAME);

            //change modal title first
            $("#selectedResourceId").val(row.data().WORK_CENTER_ID);
            $("#selectedDepartmentId").val(row.data().DEPARTMENT_ID);
            $("resourceChartFilterModalTitle").val(row.data().WORK_CENTER_NAME + " Load Vs Capacity Chart");

            $("#resourceChartFilterModal").modal("show");
        } );

}

function chartByResource(){
    $("#resourceChartFilterModal").modal("hide");
    $("#chartModal").modal("show");
    charting();
}

function chartByDepartment(){
    $("#resourceChartFilterModal").modal("hide");
    $("#chartModal").modal("show");
    chartingByDept();
}

function hideChart(){
    $("#chartModal").modal("hide");
}

function hideWorklist(){
    $("#worklistModal").modal("hide");
}

function charting(){
    Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
        "/" +  this.getDate() +
        "/" +  this.getFullYear();
    }
    
    var jsonData = $.ajax({
        method: "POST",
        url: "/manufacturing/control/LoadByResourceJSON",
        dataType: 'json',
        data: {
                "selectedResourceId": $("#selectedResourceId").val(),
                "startdate": $("#txtStartFrom").val(),
                "enddate": $("#txtEndTo").val()
        }, success: function (data) {
            // put the return json into 2 array
            var mylabels=[], myload=[], mycapnorm=[], mycapot=[], mycapmax=[];
            $.each(data.load, function(i, item){
                mylabels.push(new Date(item.CAL_DATE).formatMMDDYYYY());
// 	                	console.log(new Date(item.CAL_DATE).formatMMDDYYYY());
                myload.push(parseFloat(item.SCH_HOURS));
                mycapnorm.push(parseFloat(item.CAP_NORM));
                mycapot.push(parseFloat(item.CAP_OT));
                mycapmax.push(parseFloat(item.CAP_MAX));
// 	                	console.log(parseFloat(item.SCH_HOURS));
            });
            
            var myWC = data.wc;
// 					console.log(myWC);
            
            // set chart data
            var chartData = {
                labels: mylabels,
                datasets: [{
                    type: 'bar',
                    label: myWC,
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
                    data: myload,
                    spanGaps: false
                    },{
                    type: 'line',
                    label: "Normal Capacity",
                    data: mycapnorm,
                    steppedLine: 'middle',
                    borderColor: window.chartColors.yellow,
                    borderWidth: 2,
                    fill: false
                    },{
                    type: 'line',
                    label: "OT Capacity",
                    data: mycapot,
                    steppedLine: 'middle',
                    borderColor: window.chartColors.blue,
                    borderWidth: 2,
                    fill: false
                    },
                    {
                    type: 'line',
                    label: "Max Capacity",
                    data: mycapmax,
                    borderColor: window.chartColors.red,
                    borderWidth: 2,
                    fill: false,
                    steppedLine: 'middle'
                    }	                		
                ]
            };
            
            // get canvas element
            var ctx = document.getElementById('myChart');
            // set height
// 	                ctx.height = 9;
            // instantiate the chart
            var myBarChart = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Load Vs Capacity - ' + myWC
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    },
                    maintainAspectRatio: true,
// 	                		events: ['click']
                    onClick: function (e) {
                        var activePoints = myBarChart.getElementsAtEvent(e);
                        var mySchDate = activePoints[0]._model.label;
                        var myResourceId = activePoints[0]._model.datasetLabel;
                        // console.log(activePoints[0]._model.label);
                        // console.log(activePoints[0]._model.datasetLabel);
                        
                        // do NOT hide the current resource chart
                        // open the worklist table when clicking
                        $("#worklistModal").modal("show");
                        
                        var table = $('#tableworklist').DataTable({
                            //"data": testdata.data,
                            // it has to be destroyed here
                            // otherwise dt won't send any updated tag value to server
                            "destroy": true,
                            // activate the following retrieve if using the initialized one
                            //retrieve: true,
                            "processing": true,
                            "serverSide": false,
                            "ordering": true,
                            "scrollY":        '50vh',
                            "scrollX": true,
                            "scrollCollapse": true,
                            "paging": false,
                            "info": true,
                            "searching": true,
                            //"ajax": "db/sources/objects.txt",
                            "ajax": {
                                "url": "/manufacturing/control/WorklistByResourceSchDateJSON",
                                "data": function(d){
                                    d.resourceid = myResourceId;
                                    d.schdate = mySchDate;
                                },
                                "type": "POST"
                            },
                            select:"single",
                            "columns": [
                                { "data": "OP_ID" },
                                { "data": "RESOURCE_ID"},
                                { "data": "SCH_HOURS" },
                                { "data": "CAL_DATE"},
                                { "data": "PLANNER"},
                                { "data": "OP_PRIORITY" }
                            ],
                            columnDefs: [ 
                                {targets: 3, render: $.fn.dataTable.render.intlDateTime('en-US')}
                                ], 
                            "order": [[1, 'asc']],
                            "createdRow": function( row, data, dataIndex ) {
                                var today = new Date();
                                   var schStart = new Date(data["CAL_DATE"]);
                                   var tdSchStart = $(row).children('td:eq(3)');
                                   if(today>schStart){
                                       $(tdSchStart).addClass('rowDangerous');
                                   }else{
                                    if(dayDiffBetween2Dates(schStart,today)<21){
                                          $(tdSchStart).addClass('rowWarning');
                                    }
                                   }
                              }

                        });
                    }
                }
            });           
        }
    });
}

function chartingByDept(){
    Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
        "/" +  this.getDate() +
        "/" +  this.getFullYear();
    }
    
    var jsonData = $.ajax({
        method: "POST",
        url: "/manufacturing/control/LoadByDepartmentJSON",
        dataType: 'json',
        data: {
                "selectedDepartmentId": $("#selectedDepartmentId").val(),
                "startdate": $("#txtStartFrom").val(),
                "enddate": $("#txtEndTo").val()
        }, success: function (data) {
            // put the return json into 2 array
            var mylabels=[], myload=[], mycapnorm=[], mycapot=[], mycapmax=[];
            $.each(data.load, function(i, item){
                mylabels.push(new Date(item.CAL_DATE).formatMMDDYYYY());
// 	                	console.log(new Date(item.CAL_DATE).formatMMDDYYYY());
                myload.push(parseFloat(item.SCH_HOURS));
                mycapnorm.push(parseFloat(item.CAP_NORM));
                mycapot.push(parseFloat(item.CAP_OT));
                mycapmax.push(parseFloat(item.CAP_MAX));
// 	                	console.log(parseFloat(item.SCH_HOURS));
            });
            
            var myDept = data.deptid;
// 					console.log(myWC);
            
            // set chart data
            var chartData = {
                labels: mylabels,
                datasets: [{
                    type: 'bar',
                    label: myDept,
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
                    data: myload,
                    spanGaps: false
                    },{
                    type: 'line',
                    label: "Normal Capacity",
                    data: mycapnorm,
                    steppedLine: 'middle',
                    borderColor: window.chartColors.yellow,
                    borderWidth: 2,
                    fill: false
                    },{
                    type: 'line',
                    label: "OT Capacity",
                    data: mycapot,
                    steppedLine: 'middle',
                    borderColor: window.chartColors.blue,
                    borderWidth: 2,
                    fill: false
                    },
                    {
                    type: 'line',
                    label: "Max Capacity",
                    data: mycapmax,
                    borderColor: window.chartColors.red,
                    borderWidth: 2,
                    fill: false,
                    steppedLine: 'middle'
                    }	                		
                ]
            };
            
            // get canvas element
            var ctx = document.getElementById('myChart');
            // set height
// 	                ctx.height = 9;
            // instantiate the chart
            var myBarChart = new Chart(ctx, {
                type: 'bar',	
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Load Vs Capacity - ' + myDept
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    },
                    maintainAspectRatio: true,
// 	                		events: ['click']
                    onClick: function (e) {
                        var activePoints = myBarChart.getElementsAtEvent(e);
                        var mySchDate = activePoints[0]._model.label;
                        var myResourceId = activePoints[0]._model.datasetLabel;
                        // console.log(activePoints[0]._model.label);
                        // console.log(activePoints[0]._model.datasetLabel);
                        
                        // do NOT hide the current resource chart
                        // open the worklist table when clicking
                        $("#worklistModal").modal("show");
                        
                        var table = $('#tableworklist').DataTable({
                            //"data": testdata.data,
                            // it has to be destroyed here
                            // otherwise dt won't send any updated tag value to server
                            "destroy": true,
                            // activate the following retrieve if using the initialized one
                            //retrieve: true,
                            "processing": true,
                            "serverSide": false,
                            "ordering": true,
                            "scrollY":        '50vh',
                            "scrollX": true,
                            "scrollCollapse": true,
                            "paging": false,
                            "info": true,
                            "searching": true,
                            //"ajax": "db/sources/objects.txt",
                            "ajax": {
                                "url": "/manufacturing/control/WorklistByDepartmentSchDateJSON",
                                "data": function(d){
                                    d.deptid = $("#selectedDepartmentId").val();
                                    d.schdate = mySchDate;
                                },
                                "type": "POST"
                            },
                            select:"single",
                            "columns": [
                                { "data": "OP_ID" },
                                { "data": "RESOURCE_ID"},
                                { "data": "SCH_HOURS" },
                                { "data": "CAL_DATE"},
                                { "data": "PLANNER"},
                                { "data": "OP_PRIORITY" }
                            ],
                            columnDefs: [ 
                                {targets: 3, render: $.fn.dataTable.render.intlDateTime('en-US')}
                                ], 
                            "order": [[1, 'asc']],
                            "createdRow": function( row, data, dataIndex ) {
                                var today = new Date();
                                   var schStart = new Date(data["CAL_DATE"]);
                                   var tdSchStart = $(row).children('td:eq(3)');
                                   if(today>schStart){
                                       $(tdSchStart).addClass('rowDangerous');
                                   }else{
                                    if(dayDiffBetween2Dates(schStart,today)<21){
                                          $(tdSchStart).addClass('rowWarning');
                                    }
                                   }
                              }

                        });
                    }
                }
            });           
        }
    });
}

//------------------------------------------- Schumi: Open a black popup for importing plan. ------------------------------------------------------
function addNewForecastItem() {
    //make Add FI Editor
    var addFiEditor = $.JST.createFromTemplate({}, "ADD_FI_EDITOR");

    var ndo = createBlackPage(600, 400).append(addFiEditor);
    rebindChosen();

    $("#forecastVersionAddFI").empty();
    var sugForcVer = 'P' + (new Date()).getFullYear();
    var curMonth = (new Date()).getMonth() + 1;
    if (curMonth < 10)
        sugForcVer = sugForcVer + '0' + curMonth;
    else
        sugForcVer = sugForcVer + curMonth;
    var prefForcVer = sugForcVer;
    $.getJSON("/sfa/control/forecastVerJson", function(data) {
        $.each(data.forecastVers, function(i, item) {
            if(prefForcVer == item.progVer){
                $("#forecastVersionAddFI").append("<option value='" + item.progVer + "' selected>" + item.remarks + "</option>");
            }else{
                $("#forecastVersionAddFI").append("<option value='" + item.progVer + "'>" + item.remarks + "</option>");
            }
        });
    });

};