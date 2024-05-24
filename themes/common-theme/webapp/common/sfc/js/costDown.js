var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

} );

function showVendorPeriodAmount(){
    var myVPA = $('#tableVendorPeriodAmountList').DataTable({
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
                "url": "/scm/control/ShowVendorPeriodAmount",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.vendorPA;
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
                { data: "VENDOR" },
                { data: "PAYMENT_TERM_ID" },
                { data: "CATEGORY" },
                { data: "LINE_AMOUNT_CNY" },
                { data: "SPEND_PERC" }
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

        // Row selection (multiple rows)
        $('#tableVendorPeriodAmountList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showVendorItemAmount(){
    var myVIA = $('#tableVendorItemAmountList').DataTable({
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
                "url": "/scm/control/ShowVendorItemAmount",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.vendorIA;
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
                { data: "VENDOR" },
                { data: "ITEM_ID" },
                { data: "ITEM_NAME" },
                { data: "ITEM_GROUP_ID" },
                { data: "PURCH_UNIT" },
                { data: "PURCH_QTY" },
                { data: "AVG_PURCH_PRICE_CNY" },
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

        // Row selection (multiple rows)
        $('#tableVendorItemAmountList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showVendorItemDetail(){
    var myVID = $('#tableVendorItemDetailList').DataTable({
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
                "url": "/scm/control/ShowVendorItemDetail",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.vendorID;
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
                { data: "VENDOR" },
                { data: "PURCH_ID" },
                { data: "LINE_NUM" },
                { data: "ITEM_ID" },
                { data: "ITEM_NAME" },
                { data: "MANUFACTURER" },
                { data: "MANUFACTURER_ITEM_ID" },
                { data: "ITEM_GROUP_ID" },
                { data: "PURCH_UNIT" },
                { data: "PURCH_PRICE_CNY" },
                { data: "PURCH_QTY" },
                { data: "LINE_AMOUNT_CNY" },
                { data: "CREATED_DATE" }        
            ],
            columnDefs: [ 
                {targets: 13, render: $.fn.dataTable.render.intlDateTime('en-US')}
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

        // Row selection (multiple rows)
        $('#tableVendorItemDetailList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showItemPriceHistory(){
    var myIPH = $('#tableItemPriceHistoryList').DataTable({
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
                "url": "/scm/control/ShowItemPriceHistory",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.itemPH;
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
                { data: "ITEM_ID" },
                { data: "INVOICE_ACCOUNT" },
                { data: "CURRENCY_CODE" },
                { data: "PURCH_PRICE" },
                { data: "PURCH_UNIT" },
                { data: "VALID_FROM" },
                { data: "VALID_TO" }        
            ],
            columnDefs: [ 
                {targets: 6, render: $.fn.dataTable.render.intlDateTime('en-US')},
                {targets: 7, render: $.fn.dataTable.render.intlDateTime('en-US')}
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

        // Row selection (multiple rows)
        $('#tableItemPriceHistoryList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showCostDownDetail(){
    var myCDD = $('#tableCostDownDetailList').DataTable({
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
                "url": "/scm/control/ShowCostDownDetail",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.costDD;
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
                { data: "VENDOR" },
                { data: "PURCH_ID" },
                { data: "LINE_NUM" },
                { data: "ITEM_ID" },
                { data: "ITEM_NAME" },
                { data: "MANUFACTURER" },
                { data: "MANUFACTURER_ITEM_ID" },
                { data: "ITEM_GROUP_ID" },
                { data: "PURCH_UNIT" },
                { data: "PURCH_PRICE" },
                { data: "CURRENCY_CODE" },
                { data: "EX_RATE" },
                { data: "PURCH_PRICE_CNY" },
                { data: "PURCH_QTY" },
                { data: "AVG_PERIOD_PRICE_CNY" },
                { data: "HAS_RECORDS" },
                { data: "COST_DOWN" },
                { data: "STANDARD_PRICE" },
                { data: "CREATED_DATE" }    
            ],
            columnDefs: [ 
                {targets: 19, render: $.fn.dataTable.render.intlDateTime('en-US')}
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

        // Row selection (multiple rows)
        $('#tableCostDownDetailList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showCostDownVendor(){
    var myCDV = $('#tableCostDownVendorList').DataTable({
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
                "url": "/scm/control/ShowCostDownVendor",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.costDV;
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

        // Row selection (multiple rows)
        $('#tableCostDownVendorList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showCostDownItem(){
    var myCDI = $('#tableCostDownItemList').DataTable({
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
                "url": "/scm/control/ShowCostDownItem",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.costDI;
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
                { data: "ITEM_ID" },
                { data: "ITEM_NAME" },
                { data: "ITEM_GROUP_ID" },
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

        // Row selection (multiple rows)
        $('#tableCostDownItemList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}