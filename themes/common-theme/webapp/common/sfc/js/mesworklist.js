$(document).ready(function() {
    $('#tableMesWorklistList tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });

    // $(window).resize(setTimeout(respondCanvas, 500));
    // showMesWorklist();

    // bind the datetimepicker
    $('#faufCommittedDate').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });

    // bind the datetimepicker
    $('#txtStartFrom').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
        });

    $('#txtEndTo').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
        });

    $('#txtStartFromDept').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
        });

    $('#txtEndToDept').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
        });
        
} );

function showMesWorklist(){
    var myMWL = $('#tableMesWorklistList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 3
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/manufacturing/control/ShowMesWorklist",
                "dataSrc": function(d){
                    return d.listWorkList;
                },
                "type": "POST"
            },
            "columns": [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "render": function () {
                        return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                    },
                    width:"10px"
                },
                { data: "OP_ID" },
                { data: "OPR_ID" },
                { data: "WORK_CENTER" },
                { data: "WORKSHOP" },
                { data: "PROD_POOL_ID" },
                {
                	"orderable": true,
		            "data": "SCH_START",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "SCH_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "AX_OP_STATUS" },
                { data: "OP_CONF_STATUS" },
                { data: "WO_STATUS" },
                { data: "FINISH_QTY" },
                { data: "OP_QTY" },
                { data: "ITEM_ID" },
                { data: "WO_NAME" },
                { data: "PLANNER" },
                { data: "OP_PRIORITY" },
                { data: "OP_NOTES" },
                { data: "MES_NOTES" }
            ],
            "order": [[6, 'asc'],[16, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "createdRow": function( row, data, dataIndex ) {
                var tdOpId = $(row).children('td:eq(0)');
	           	var tdOprId = $(row).children('td:eq(1)');
	           	var tdWorkCenter = $(row).children('td:eq(2)');
	           	$(tdOpId).addClass('mesfixedcol');
                $(tdOprId).addClass('mesfixedcol');
                $(tdWorkCenter).addClass('mesfixedcol');

                var today = new Date();
                var mesSchStart = data["SCH_START"];
                var mesSchEnd = data["SCH_END"];

            	var axOpStatus = data["AX_OP_STATUS"];
            	var opConfStatus = data["OP_CONF_STATUS"];
            	var woStatus = data["WO_STATUS"];

                var tdSchdStart = $(row).children('td:eq(6)');
                var tdSchdEnd = $(row).children('td:eq(7)');

                var tdAxOpStatus = $(row).children('td:eq(8)');
                var tdOpConfStatus = $(row).children('td:eq(9)');
                var tdWoStatus = $(row).children('td:eq(10)');

                if (opConfStatus == "DONE") {
                    $(tdOpConfStatus).addClass('rowOk');
                } else {
                    $(tdOpConfStatus).addClass('rowAttention');
                }

                if (woStatus == "PRUN_COMPLETED") {
                    $(tdWoStatus).addClass('rowOk');
                    $(tdAxOpStatus).addClass('rowOk');
                    // $(tdOpConfStatus).addClass('rowOk');
                    $(tdSchdStart).addClass('rowOk');
                    $(tdSchdEnd).addClass('rowOk');
                } else {
                    if (axOpStatus == "DONE") {
                        $(tdAxOpStatus).addClass('rowOk');
                        $(tdSchdStart).addClass('rowOk');
                        $(tdSchdEnd).addClass('rowOk');
                    } else {
                        if (opConfStatus == "DONE") {
                            // $(tdOpConfStatus).addClass('rowOk');
                            $(tdSchdStart).addClass('rowOk');
                            $(tdSchdEnd).addClass('rowOk');
                        } else {
                            if(Date.parse(mesSchStart) < today){
                                $(tdSchdStart).addClass('rowDangerous');
                            }else {
                                if (dayDiffBetween2Dates(Date.parse(mesSchStart),today)<5) {
                                    $(tdSchdStart).addClass('rowAttention');
                                }
                            }
            
                            if(Date.parse(mesSchEnd) < today){
                                $(tdSchdEnd).addClass('rowDangerous');
                            }else {
                                if (dayDiffBetween2Dates(today, Date.parse(mesSchStart))<5) {
                                    $(tdSchdEnd).addClass('rowAttention');
                                }
                            }
                        }
                    }
                }
            },
            "initComplete": function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;
     
                        $('input', this.footer()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            } 
        });

        $('div.toolbar').html('<b>Only Showing Worklist Scheduled in MES.</b>');

        $('#tableMesWorklistList tbody').on('mouseenter', 'td', function () {
            var colIdx = myMWL.cell(this).index().column;
     
            $(myMWL.cells().nodes()).removeClass('highlight');
            $(myMWL.column(colIdx).nodes()).addClass('highlight');
        });

        // Add event listener for opening and closing details
        $('#tableMesWorklistList tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var tdi = tr.find("i.fa");
            var row = myMWL.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
                tdi.first().removeClass('fa-minus-square');
                tdi.first().addClass('fa-plus-square');
            }
            else {
                // Open this row
                row.child(format(row.data())).show();     
                var opIdSelected = row.data().OP_ID;
                var workCenterSelected = row.data().WORK_CENTER;
                var workshopSelected = row.data().WORKSHOP;
                
                $("#opId").val(opIdSelected);
                $("#resourceIdForResGantt").val(workCenterSelected);

                $("#selectedResourceId").val(workCenterSelected);
                $("#selectedDepartmentId").val(workshopSelected.substring(0,5));
                
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square');
                tdi.first().addClass('fa-minus-square');
            }
        });
        
        myMWL.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        }); 

        // Row selection (multiple rows)
        $('#tableMesWorklistList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );
};

function format(d){
    // `d` is the original data object for the row
    return '<table class="popout" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
            '<td><input type="hidden" id="myRowID" value="'+ d.id +'"></td>' +
            '<td colspan="9"><input type="hidden" id="myFaufNr' + d.id + '" value="'+ d.prodid +'">'+
            '<td> <button id="btnShowWo" type="button" class="rowWarning" onclick="showJc()">Job Confirmation</button> </td>' +
            '<td> <button id="btnEditWoDateAndNote" type="button" class="rowWarning" onclick="showResChartModal()">Work Center Load Vs Cap</button> </td>' +
            '<td> <button id="btnShowWoGantt" type="button" class="rowWarning" onclick="showDeptChartModal()">Department Load Vs Cap</button> </td>' +
            '<td> <button id="btnShowResGantt" type="button" class="rowWarning" onclick="showResGantt()">Show Resource Gantt</button> </td>' +
        '</tr>' +	        
    '</table>';  
}

function showJc(){
    // Store, it would be destroyed only after closing the browser
    //localStorage.setItem("opId", $("#opId").val());
    setCookie("opId",$("#opId").val(),"","");

    $("#showJobConfModal").modal("show");
}

function hideJc(){
    $("#showJobConfModal").modal("hide");
}

function showResGantt(){
    var resourceId = $("#resourceIdForResGantt").val();
    const dToday = new Date();
    const dStart = new Date();
    const dEnd = new Date();

    dStart.setDate(dToday.getDate() - 7);
    dEnd.setDate(dToday.getDate() + 7);

    var dStartStr = printDateStrInMmDdYyyy(dStart);
    var dEndStr = printDateStrInMmDdYyyy(dEnd);

    // Store, it would be destroyed only after closing the browser
    localStorage.setItem("directOpenFauf", "No");
    localStorage.setItem("resourceForGantt", resourceId);
    localStorage.setItem("directOpenPool", "No");
    localStorage.setItem("directOpenResource", "Yes");
    localStorage.setItem("schType", "byResource");
    localStorage.setItem("faufActiveForResource", "Yes");    

    localStorage.setItem("resourceStartForGantt", dStartStr);
    localStorage.setItem("resourceEndForGantt", dEndStr);    

    $("#showResGanttModal").modal("show");
}

function showResChartModal(){
    const dToday = new Date();
    const dStart = new Date();
    const dEnd = new Date();

    dStart.setDate(dToday.getDate() - 7);
    dEnd.setDate(dToday.getDate() + 14);

    $('#txtStartFrom').val(printDateStrInMmDdYyyy(dStart));
    $('#txtEndTo').val(printDateStrInMmDdYyyy(dEnd));
    $("#resourceChartFilterModal").modal("show");
}

function showDeptChartModal(){
    const dToday = new Date();
    const dStart = new Date();
    const dEnd = new Date();

    dStart.setDate(dToday.getDate() - 7);
    dEnd.setDate(dToday.getDate() + 14);

    $('#txtStartFromDept').val(printDateStrInMmDdYyyy(dStart));
    $('#txtEndToDept').val(printDateStrInMmDdYyyy(dEnd));
    $("#deptChartFilterModal").modal("show");
}

function chartByResource(){
    $("#resourceChartFilterModal").modal("hide");
    $("#chartModal").modal("show");
    charting();
}

function chartByDepartment(){
    $("#deptChartFilterModal").modal("hide");
    $("#chartModal").modal("show");
    chartingByDept();
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
                "startdate": $("#txtStartFromDept").val(),
                "enddate": $("#txtEndToDept").val()
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