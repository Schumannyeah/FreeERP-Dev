$(document).ready(function() {
    // $(window).resize(setTimeout(respondCanvas, 500));
    // showCompanyPassRate();
    // showItemQtyPassRate();
    // showDeptPassRate();
    // showPoolPassRate();
    // showPoBatchPassRate();
    // showEmpCheckQtyRank();
    // showEmpCheckFailQty();
    

    // bind the datetimepicker
    $('#txtStartFrom').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
    
    $('#txtEndTo').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });

    //respondCanvas();
} );

function respondCanvas() {
    // destroy canvas and create it again
    $('#myRevChart').remove();
    $('#chartRevForecast').append('<canvas id="myRevChart" width="1200" height="600"></canvas>');

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

function showPoBatchPassRate(){
    var myIQC = $('#tableIqcBatchPassRateList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/quality/control/ShowPoBatchPassRate",
                "dataSrc": function(d){
                    return d.listIqcPassRate;
                },
                "type": "POST"
            },
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "SUPPLIER_NAME" },
                { data: "YEAR_MONTH" },
                { data: "CHECKED_LINE_QTY" },
                { data: "FAIL_LINE_QTY" },
                // { data: "PASS_RATE" },
                {
                	"orderable": true,
		            "data": "PASS_RATE",
		            "render": function (d) {
		            	return d.toFixed(4)*100 + '%';
		            }
                },
            ],
            //"order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tableIqcBatchPassRateList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tableIqcBatchPassRateList tbody').on('dblclick', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = myIQC.row(tr);
            var supplierName = row.data().SUPPLIER_NAME;
            var yearMonth = row.data().YEAR_MONTH;

            //change modal title first
            $("eqcChartIqcModalTitle").val("Supplier Failed Batch Line in " + yearMonth);
            $("#eqcChartIqcModal").modal("show");

            var table = $('#eqcChartIqclist').DataTable({
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
                    "url": "/quality/control/IqcPassRateByYearMonthJSON",
                    "data": function(d){
                        d.supplierName = supplierName;
                        d.yearMonth = yearMonth;
                    },
                    "type": "POST"
                },
                select:"single",
                "columns": [
                    { "data": "LOG_ID" },
                    { "data": "SOURCE_TYPE"},
                    { "data": "ORDER_ID" },
                    { "data": "POINT_ID"},
                    { "data": "CHECK_QTY"},
                    { "data": "CHECK_VAL_DIM" },
                    { "data": "CHECK_RESULT" },
                    { "data": "FULL_NAME"},
                    { "data": "CREATED_DATE" },
                    { "data": "NCR_DETAIL_ID"},
                    { "data": "LOG_TYPE"},
                    { "data": "REMARKS" }
                ],
                columnDefs: [ 
                    {targets: 8, render: $.fn.dataTable.render.intlDateTime('en-US')}
                    ], 
                "order": [[1, 'asc']],
                "createdRow": function( row, data, dataIndex ) {
                    var today = new Date();
                    var createdDate = new Date(data["CREATED_DATE"]);
                    var tdCreatedDate = $(row).children('td:eq(8)');
                    if(today>createdDate){
                        $(tdCreatedDate).addClass('rowDangerous');
                    }
                }
            });
        } );
};

function showPoolPassRate(){
    var myPPRL = $('#tablePoolPassRateList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/quality/control/ShowPoolPassRate",
                "dataSrc": function(d){
                    return d.listPoolPassRate;
                },
                "type": "POST"
            },
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "POOL_ID" },
                { data: "YEAR_MONTH" },
                { data: "CHECKED_LINE_QTY" },
                { data: "FAIL_LINE_QTY" },
                // { data: "PASS_RATE" },
                {
                	"orderable": true,
		            "data": "PASS_RATE",
		            "render": function (d) {
		            	return d.toFixed(4)*100 + '%';
		            }
                },
            ],
            //"order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tablePoolPassRateList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tablePoolPassRateList tbody').on('dblclick', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = myPPRL.row(tr);
            var poolId = row.data().POOL_ID;
            var yearMonth = row.data().YEAR_MONTH;

            //change modal title first
            $("eqcChartPoolModalTitle").val("Pool Failed Batch Line in " + yearMonth);
            $("#eqcChartPoolModal").modal("show");

            var table = $('#eqcChartPoollist').DataTable({
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
                    "url": "/quality/control/PoolPassRateByYearMonthJSON",
                    "data": function(d){
                        d.poolId = poolId;
                        d.yearMonth = yearMonth;
                    },
                    "type": "POST"
                },
                select:"single",
                "columns": [
                    { "data": "LOG_ID" },
                    { "data": "SOURCE_TYPE"},
                    { "data": "ORDER_ID" },
                    { "data": "POINT_ID"},
                    { "data": "CHECK_QTY"},
                    { "data": "CHECK_VAL_DIM" },
                    { "data": "CHECK_RESULT" },
                    { "data": "FULL_NAME"},
                    { "data": "CREATED_DATE" },
                    { "data": "NCR_DETAIL_ID"},
                    { "data": "LOG_TYPE"},
                    { "data": "REMARKS" }
                ],
                columnDefs: [ 
                    {targets: 8, render: $.fn.dataTable.render.intlDateTime('en-US')}
                    ], 
                "order": [[1, 'asc']],
                "createdRow": function( row, data, dataIndex ) {
                    var today = new Date();
                    var createdDate = new Date(data["CREATED_DATE"]);
                    var tdCreatedDate = $(row).children('td:eq(8)');
                    if(today>createdDate){
                        $(tdCreatedDate).addClass('rowDangerous');
                    }
                }
            });
        } );
};

function showEmpCheckQtyRank(){
    var myECL = $('#tableEmpCheckQtyRankList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/quality/control/ShowEmpCheckQtyRank",
                "dataSrc": function(d){
                    return d.listEmpCheckQtyRank;
                },
                "type": "POST"
            },
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "YEAR_MONTH" },
                { data: "EMP_NAME" },
                { data: "CHECKED_LINE_QTY" }
            ],
            //"order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tableEmpCheckQtyRankList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tableEmpCheckQtyRankList tbody').on('dblclick', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = myECL.row(tr);
            var empName = row.data().EMP_NAME;
            var yearMonth = row.data().YEAR_MONTH;

            //change modal title first
            $("eqcChartEcqModalTitle").val("Employee Checked Lines Qty in " + yearMonth);
            $("#eqcChartEcqModal").modal("show");

            var table = $('#eqcChartEcqlist').DataTable({
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
                    "url": "/quality/control/EcqPassRateByYearMonthJSON",
                    "data": function(d){
                        d.empName = empName;
                        d.yearMonth = yearMonth;
                    },
                    "type": "POST"
                },
                select:"single",
                "columns": [
                    { "data": "SOURCE_TYPE"},
                    { "data": "ORDER_ID" },
                    { "data": "FULL_NAME"},
                    { "data": "CHECK_QTY"}
                ],
                "order": [[1, 'asc']]
            });
        } );
};

function showEmpCheckFailQty(){
    var myEFL = $('#tableEmpCheckFailQtyList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/quality/control/ShowEmpCheckFailQty",
                "dataSrc": function(d){
                    return d.listEmpCheckFailQty;
                },
                "type": "POST"
            },
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "YEAR_MONTH" },
                { data: "EMP_NAME" },
                { data: "FAIL_LINE_QTY" }
            ],
            //"order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tableEmpCheckFailQtyList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tableEmpCheckFailQtyList tbody').on('dblclick', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = myEFL.row(tr);
            var empName = row.data().EMP_NAME;
            var yearMonth = row.data().YEAR_MONTH;

            //change modal title first
            $("eqcChartEfqModalTitle").val("Employee Found Failed Lines Qty in " + yearMonth);
            $("#eqcChartEfqModal").modal("show");

            var table = $('#eqcChartEfqlist').DataTable({
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
                    "url": "/quality/control/EfqPassRateByYearMonthJSON",
                    "data": function(d){
                        d.empName = empName;
                        d.yearMonth = yearMonth;
                    },
                    "type": "POST"
                },
                select:"single",
                "columns": [
                    { "data": "SOURCE_TYPE"},
                    { "data": "ORDER_ID" },
                    { "data": "FULL_NAME"},
                    { "data": "FAILED_QTY"}
                ],
                "order": [[1, 'asc']]
            });
        } );
};

function showDeptPassRate(){
    var myDPR = $('#tableDeptPassRateList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/quality/control/ShowDeptPassRate",
                "dataSrc": function(d){
                    return d.listDeptPassRate;
                },
                "type": "POST"
            },
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "DEPT_NAME" },
                { data: "YEAR_MONTH" },
                { data: "CHECKED_LINE_QTY" },
                { data: "FAIL_LINE_QTY" },
                // { data: "PASS_RATE" },
                {
                	"orderable": true,
		            "data": "PASS_RATE",
		            "render": function (d) {
		            	return d.toFixed(4)*100 + '%';
		            }
                },
            ],
            //"order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tableDeptPassRateList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tableDeptPassRateList tbody').on('dblclick', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = myDPR.row(tr);
            var deptName = row.data().DEPT_NAME;
            var yearMonth = row.data().YEAR_MONTH;

            //change modal title first
            $("eqcChartDeptModalTitle").val("Department Failed Batch Line in " + yearMonth);
            $("#eqcChartDeptModal").modal("show");

            var table = $('#eqcChartDeptlist').DataTable({
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
                    "url": "/quality/control/DeptPassRateByYearMonthJSON",
                    "data": function(d){
                        d.deptName = deptName;
                        d.yearMonth = yearMonth;
                    },
                    "type": "POST"
                },
                select:"single",
                "columns": [
                    { "data": "LOG_ID" },
                    { "data": "SOURCE_TYPE"},
                    { "data": "ORDER_ID" },
                    { "data": "POINT_ID"},
                    { "data": "CHECK_QTY"},
                    { "data": "CHECK_VAL_DIM" },
                    { "data": "CHECK_RESULT" },
                    { "data": "FULL_NAME"},
                    { "data": "CREATED_DATE" },
                    { "data": "NCR_DETAIL_ID"},
                    { "data": "LOG_TYPE"},
                    { "data": "REMARKS" }
                ],
                columnDefs: [ 
                    {targets: 8, render: $.fn.dataTable.render.intlDateTime('en-US')}
                    ], 
                "order": [[1, 'asc']],
                "createdRow": function( row, data, dataIndex ) {
                    var today = new Date();
                    var createdDate = new Date(data["CREATED_DATE"]);
                    var tdCreatedDate = $(row).children('td:eq(8)');
                    if(today>createdDate){
                        $(tdCreatedDate).addClass('rowDangerous');
                    }
                }
            });
        } );
};

function showCompanyPassRate(){
    var myCPRL = $('#tableCompanyPassRateList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/quality/control/ShowCompanyPassRate",
                "dataSrc": function(d){
                    return d.listFirmPassRate;
                },
                "type": "POST"
            },
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "COMPANY" },
                { data: "YEAR_MONTH" },
                { data: "CHECKED_LINE_QTY" },
                { data: "FAIL_LINE_QTY" },
                // { data: "PASS_RATE" },
                {
                	"orderable": true,
		            "data": "PASS_RATE",
		            "render": function (d) {
		            	return d.toFixed(4)*100 + '%';
		            }
                },
            ],
            //"order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tableCompanyPassRateList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tableCompanyPassRateList tbody').on('dblclick', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = myCPRL.row(tr);
            var yearMonth = row.data().YEAR_MONTH;

            //change modal title first
            $("eqcChartCompModalTitle").val("Company Failed Batch Line in " + yearMonth);
            $("#eqcChartCompModal").modal("show");

            var table = $('#eqcChartComplist').DataTable({
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
                    "url": "/quality/control/CompanyPassRateByYearMonthJSON",
                    "data": function(d){
                        d.yearMonth = yearMonth;
                    },
                    "type": "POST"
                },
                select:"single",
                "columns": [
                    { "data": "LOG_ID" },
                    { "data": "SOURCE_TYPE"},
                    { "data": "ORDER_ID" },
                    { "data": "POINT_ID"},
                    { "data": "CHECK_QTY"},
                    { "data": "CHECK_VAL_DIM" },
                    { "data": "CHECK_RESULT" },
                    { "data": "FULL_NAME"},
                    { "data": "CREATED_DATE" },
                    { "data": "NCR_DETAIL_ID"},
                    { "data": "LOG_TYPE"},
                    { "data": "REMARKS" }
                ],
                columnDefs: [ 
                    {targets: 8, render: $.fn.dataTable.render.intlDateTime('en-US')}
                    ], 
                "order": [[1, 'asc']],
                "createdRow": function( row, data, dataIndex ) {
                    var today = new Date();
                    var createdDate = new Date(data["CREATED_DATE"]);
                    var tdCreatedDate = $(row).children('td:eq(8)');
                    if(today>createdDate){
                        $(tdCreatedDate).addClass('rowDangerous');
                    }
                }
            });
        } );
};

function showItemQtyPassRate(){
    var myCPRL = $('#tableItemQtyPassRateList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/quality/control/ShowItemQtyPassRate",
                "dataSrc": function(d){
                    return d.listItemQtyPassRate;
                },
                "type": "POST"
            },
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "PRODUCT_ID" },
                { data: "PRODUCT_NAME" },
                { data: "YEAR_MONTH" },
                { data: "CHECK_QTY" },
                { data: "FAIL_QTY" },
                {
                	"orderable": true,
		            "data": "PASS_RATE",
		            "render": function (d) {
		            	return d.toFixed(4)*100 + '%';
		            }
                },
            ],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tableItemQtyPassRateList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tableItemQtyPassRateList tbody').on('dblclick', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = myCPRL.row(tr);
            var yearMonth = row.data().YEAR_MONTH;

            //change modal title first
            $("eqcChartCompModalTitle").val("Company Failed Batch Line in " + yearMonth);
            $("#eqcChartCompModal").modal("show");

            var table = $('#eqcChartComplist').DataTable({
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
                    "url": "/quality/control/CompanyPassRateByYearMonthJSON",
                    "data": function(d){
                        d.yearMonth = yearMonth;
                    },
                    "type": "POST"
                },
                select:"single",
                "columns": [
                    { "data": "LOG_ID" },
                    { "data": "SOURCE_TYPE"},
                    { "data": "ORDER_ID" },
                    { "data": "POINT_ID"},
                    { "data": "CHECK_QTY"},
                    { "data": "CHECK_VAL_DIM" },
                    { "data": "CHECK_RESULT" },
                    { "data": "FULL_NAME"},
                    { "data": "CREATED_DATE" },
                    { "data": "NCR_DETAIL_ID"},
                    { "data": "LOG_TYPE"},
                    { "data": "REMARKS" }
                ],
                columnDefs: [ 
                    {targets: 8, render: $.fn.dataTable.render.intlDateTime('en-US')}
                    ], 
                "order": [[1, 'asc']],
                "createdRow": function( row, data, dataIndex ) {
                    var today = new Date();
                    var createdDate = new Date(data["CREATED_DATE"]);
                    var tdCreatedDate = $(row).children('td:eq(8)');
                    if(today>createdDate){
                        $(tdCreatedDate).addClass('rowDangerous');
                    }
                }
            });
        } );
};

function hideEqcChartComp(){
    $("#eqcChartCompModal").modal("hide");
}

function hideEqcChartDept(){
    $("#eqcChartDeptModal").modal("hide");  
}

function hideEqcChartPool(){
    $("#eqcChartPoolModal").modal("hide");  
}

function hideEqcChartIqc(){
    $("#eqcChartIqcModal").modal("hide");  
}

function hideEqcChartEcq(){
    $("#eqcChartEcqModal").modal("hide");  
}

function hideEqcChartEfq(){
    $("#eqcChartEfqModal").modal("hide");  
}