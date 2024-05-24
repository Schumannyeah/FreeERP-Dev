var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

} );

function showVendQuaRank(){
    var myVQR = $('#tableVendQuaRank').DataTable({
        "destroy": true,
        "processing": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "scrollX":   true,
        "scrollY": '55vh',
        "scrollCollapse": true,
        "fixedColumns":   {
            left: 4
        },
        "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "ajax": {
            "url": "/scm/control/ShowVendQuaRank",
            "data": function(d){
                d.startDate = $("#startDate").val(),
                d.endDate = $("#endDate").val()
                // d.otdTolDays = $("#otdTolDays").val()
                },
            "dataSrc": function(d){
                return d.listVendQuaRank;
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
            { data: "VENDOR" },
            { data: "CONF_YM" },
            { data: "QUARANTINE_PERC" },
            { data: "QUARANTINE_CHECK_PERC" },
            { data: "QC_JOB_STATUS" },
        ],
        "order": [[2, 'desc'], [4, 'desc']],
        "select": {
            style:    'os',
            selector: 'td:first-child'
        },
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $('#tableVendQuaRank tbody').on('mouseenter', 'td', function () {
        var colIdx = myVQR.cell(this).index().column;
 
        $(myVQR.cells().nodes()).removeClass('highlight');
        $(myVQR.column(colIdx).nodes()).addClass('highlight');
    });

    // Row selection (multiple rows)
    $('#tableVendQuaRank tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
}

function showVendQuaRankByInd(){
    var myVQRI = $('#tableVendQuaRankByInd').DataTable({
        "destroy": true,
        "processing": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "scrollX":   true,
        "scrollY": '55vh',
        "scrollCollapse": true,
        "fixedColumns":   {
            left: 4
        },
        "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "ajax": {
            "url": "/scm/control/ShowVendQuaRankByInd",
            "data": function(d){
                d.startDate = $("#startDate").val(),
                d.endDate = $("#endDate").val()
                // d.otdTolDays = $("#otdTolDays").val()
                },
            "dataSrc": function(d){
                return d.listVendQuaRankByInd;
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
            { data: "RANK_ID" },
            { data: "BUILD_ID" },
            { data: "VENDOR" },
            { data: "QUARANTINE_PERC" },
            { data: "QUARANTINE_CHECK_PERC" },
            { data: "QC_JOB_STATUS" },
        ],
        "order": [[2, 'asc'], [1, 'asc']],
        "select": {
            style:    'os',
            selector: 'td:first-child'
        },
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]        
    });

    $('#tableVendQuaRankByInd tbody').on('mouseenter', 'td', function () {
        var colIdx = myVQRI.cell(this).index().column;
 
        $(myVQRI.cells().nodes()).removeClass('highlight');
        $(myVQRI.column(colIdx).nodes()).addClass('highlight');
    });

    // Row selection (multiple rows)
    $('#tableVendQuaRankByInd tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
}


function showVendCostDownRank(){
    var myVCD = $('#tableVendCostDownRank').DataTable({
        "destroy": true,
        "processing": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "scrollX":   true,
        "scrollY": '55vh',
        "scrollCollapse": true,
        "fixedColumns":   {
            left: 4
        },
        "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "ajax": {
            "url": "/scm/control/ShowVendCostDownRank",
            "data": function(d){
                d.startDate = $("#startDate").val(),
                d.endDate = $("#endDate").val()
                },
            "dataSrc": function(d){
                return d.listVendCostDownRank;
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
            { data: "RANK_ID" },
            { data: "VENDOR" },
            { data: "STANDARD_PRICE" },
            { data: "COST_DOWN" },
            { data: "LINE_AMOUNT_CNY" }
        ],
        "order": [[1, 'asc']],
        "select": {
            style:    'os',
            selector: 'td:first-child'
        },
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $('#tableVendCostDownRank tbody').on('mouseenter', 'td', function () {
        var colIdx = myVCD.cell(this).index().column;
 
        $(myVCD.cells().nodes()).removeClass('highlight');
        $(myVCD.column(colIdx).nodes()).addClass('highlight');
    });

    // Row selection (multiple rows)
    $('#tableVendCostDownRank tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
}

function showVendCostDownRankByInd(){
    var myVCDI = $('#tableVendCostDownRankByInd').DataTable({
        "destroy": true,
        "processing": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "scrollX":   true,
        "scrollY": '55vh',
        "scrollCollapse": true,
        "fixedColumns":   {
            left: 4
        },
        "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "ajax": {
            "url": "/scm/control/ShowVendCostDownRankByInd",
            "data": function(d){
                d.startDate = $("#startDate").val(),
                d.endDate = $("#endDate").val()
                },
            "dataSrc": function(d){
                return d.listVendCostDownRankByInd;
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
            { data: "RANK_ID" },
            { data: "CATEGORY" },
            { data: "VENDOR" },
            { data: "STANDARD_PRICE" },
            { data: "COST_DOWN" },
            { data: "LINE_AMOUNT_CNY" }
        ],
        "order": [[2, 'asc'], [1, 'asc']],
        "select": {
            style:    'os',
            selector: 'td:first-child'
        },
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $('#tableVendCostDownRankByInd tbody').on('mouseenter', 'td', function () {
        var colIdx = myVCDI.cell(this).index().column;
 
        $(myVCDI.cells().nodes()).removeClass('highlight');
        $(myVCDI.column(colIdx).nodes()).addClass('highlight');
    });

    // Row selection (multiple rows)
    $('#tableVendCostDownRankByInd tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
}

function showVendOtdRank(){
    var myVOTD = $('#tableVendOtdRank').DataTable({
        "destroy": true,
        "processing": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "scrollX":   true,
        "scrollY": '55vh',
        "scrollCollapse": true,
        "fixedColumns":   {
            left: 4
        },
        "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "ajax": {
            "url": "/scm/control/ShowVendOtdRank",
            "data": function(d){
                d.startDate = $("#startDate").val(),
                d.endDate = $("#endDate").val(),
                d.otdTolDays = $("#otdTolDays").val()
                },
            "dataSrc": function(d){
                return d.listVendOtdRank;
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
            { data: "VENDOR" },
            { data: "CONF_YM" },
            { data: "PO_ITEM_YM_COUNT" },
            { data: "ON_TIME_COUNT" },
            { data: "ON_TIME_PERC" }
        ],
        "order": [[2, 'desc'], [5, 'desc']],
        "select": {
            style:    'os',
            selector: 'td:first-child'
        },
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $('#tableVendOtdRank tbody').on('mouseenter', 'td', function () {
        var colIdx = myVOTD.cell(this).index().column;
 
        $(myVOTD.cells().nodes()).removeClass('highlight');
        $(myVOTD.column(colIdx).nodes()).addClass('highlight');
    });

    // Row selection (multiple rows)
    $('#tableVendOtdRank tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
}

function showVendOtdRankByInd(){
    var myVOTDI = $('#tableVendOtdRankByInd').DataTable({
        "destroy": true,
        "processing": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "scrollX":   true,
        "scrollY": '55vh',
        "scrollCollapse": true,
        "fixedColumns":   {
            left: 4
        },
        "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "ajax": {
            "url": "/scm/control/ShowVendOtdRankByInd",
            "data": function(d){
                d.startDate = $("#startDate").val(),
                d.endDate = $("#endDate").val(),
                d.otdTolDays = $("#otdTolDays").val()
                },
            "dataSrc": function(d){
                return d.listVendOtdRankByInd;
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
            { data: "RANK_ID" },
            { data: "BUILD_ID" },
            { data: "VENDOR" },
            { data: "PO_ITEM_YM_COUNT" },
            { data: "ON_TIME_COUNT" },
            { data: "ON_TIME_PERC" }
        ],
        "order": [[2, 'asc'], [1, 'asc']],
        "select": {
            style:    'os',
            selector: 'td:first-child'
        },
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $('#tableVendOtdRankByInd tbody').on('mouseenter', 'td', function () {
        var colIdx = myVOTDI.cell(this).index().column;
 
        $(myVOTDI.cells().nodes()).removeClass('highlight');
        $(myVOTDI.column(colIdx).nodes()).addClass('highlight');
    });

    // Row selection (multiple rows)
    $('#tableVendOtdRankByInd tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
}